"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Controller, useWatch } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import BaseButton from "@/components/dashboard/BaseButton";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const SingleItem = ({
  name,
  index,
  fields,
  field,
  moveFieldUp,
  moveFieldDown,
  removeField,
  control,
  setValue,
  errors,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const debouncedSearch = useDebounce(inputValue, 500);
  const params = useParams();

  // Watching fields for dynamic updates
  const itemName = useWatch({
    name: `${name}[${index}].name`,
    control,
  });

  const purchasePrice = useWatch({
    name: `${name}[${index}].purchasePrice`,
    control,
  });
  const quantity = useWatch({
    name: `${name}[${index}].quantity`,
    control,
  });
  const total = useWatch({
    name: `${name}[${index}].total`,
    control,
  });
  const stock = useWatch({
    name: `${name}[${index}].stock`,
    control,
  });


  // Calculate total whenever purchasePrice or quantity changes
  useEffect(() => {
    if (purchasePrice !== undefined && quantity !== undefined) {
      const calculatedTotal = (purchasePrice * quantity).toFixed(2);
      setValue(`${name}[${index}].total`, calculatedTotal);
    }
  }, [purchasePrice, quantity, setValue, name, index]);

  // Fetch product options from the API
  useEffect(() => {
    if (debouncedSearch) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `/api/${params.storeId}/products/search?query=${debouncedSearch}`
          );
          const products = response.data.map((product) => ({
            label: product.name,
            value: product.id,
            msp: product.msp,
            mrp: product.mrp,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
          }));
          setOptions(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }
  }, [debouncedSearch, params.storeId]);

  // DnD logic
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = useMemo(
    () => ({
      transition,
      transform: CSS.Transform.toString(transform),
    }),
    [transition, transform]
  );

  const boxDragClasses = useMemo(
    () =>
      isDragging
        ? "border-2 bg-gray-200 border-blue-600 dark:bg-slate-900 z-10"
        : "border",
    [isDragging]
  );

  const gripDragClasses = useMemo(
    () =>
      isDragging
        ? "opacity-0 group-hover:opacity-100 transition-opacity cursor-grabbing"
        : "cursor-grab",
    [isDragging]
  );

  const handleInputChange = useCallback((newValue) => {
    setInputValue(newValue);
  }, []);

  const handleSelectChange = useCallback(
    (selectedOption) => {
      setValue(`${name}[${index}].id`, selectedOption?.value || "");
      if (selectedOption) {
        setValue(`${name}[${index}].name`, selectedOption?.label || "");
        setValue(`${name}[${index}].stock`, selectedOption?.stock || 0);
        setValue(`${name}[${index}].msp`, selectedOption.msp || 0); 
        setValue(`${name}[${index}].mrp`, selectedOption.mrp || 0); 
        setValue(
          `${name}[${index}].purchasePrice`,
          selectedOption.purchasePrice || 0
        ); 
      }
    },
    [setValue, name, index]
  );

  return (
    <div
      style={style}
      {...attributes}
      className={`${boxDragClasses} group flex flex-col gap-y-5 p-3 my-2 cursor-default rounded-xl bg-gray-50 dark:bg-slate-800 dark:border-gray-600`}
    >
      {isDragging && <div className="bg-blue-600 h-1 rounded-full"></div>}

      <div className="flex flex-wrap justify-between">
        {itemName != "" ? (
          <p className="font-medium">
            #{index + 1} - {itemName}
          </p>
        ) : (
          <p className="font-medium">#{index + 1} - Empty name</p>
        )}

        <div className="flex gap-3">
          {/* Drag and Drop Button */}
          <div
            className={`${gripDragClasses} flex justify-center items-center`}
            ref={setNodeRef}
            {...listeners}
          >
            <GripVertical className="hover:text-blue-600" />
          </div>

          {/* Up Button */}
          <BaseButton
            size={"icon"}
            tooltipLabel="Move the item up"
            onClick={() => moveFieldUp(index)}
            disabled={index === 0}
          >
            <ChevronUp />
          </BaseButton>

          {/* Down Button */}
          <BaseButton
            size={"icon"}
            tooltipLabel="Move the item down"
            onClick={() => moveFieldDown(index)}
            disabled={index === fields.length - 1}
          >
            <ChevronDown />
          </BaseButton>
        </div>
      </div>
      <div
        className="flex flex-wrap justify-between gap-y-5 gap-x-2"
        key={index}
      >
        {/* Product Name */}
        <div className="w-full">
          <Label>Name</Label>
          <Controller
            name={`${name}[${index}].productId`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                onInputChange={handleInputChange}
                onChange={handleSelectChange}
                value={
                  options.find((product) => product.value === field.value) ||
                  null
                }
                placeholder="Search and select item"
                isSearchable
                isClearable
              />
            )}
          />
          {errors?.[name]?.[index]?.productId && (
            <FormMessage>{errors[name][index].productId.message}</FormMessage>
          )}
        </div>

        {/* Quantity */}
        <Controller
          name={`${name}[${index}].quantity`}
          control={control}
          render={({ field }) => (
            <div className="inline">
              <FormLabel>Quantity</FormLabel>
              <Input
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                type="number"
                placeholder="Quantity"
                className="w-[8rem]"
              />
              {errors?.[name]?.[index]?.quantity && (
                <FormMessage>
                  {errors[name][index].quantity.message}
                </FormMessage>
              )}
            </div>
          )}
        />

        {/* Purchase Price */}
        <Controller
          name={`${name}[${index}].purchasePrice`}
          control={control}
          render={({ field }) => (
            <div className="inline">
              <FormLabel>Purchase price</FormLabel>
              <Input
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                type="number"
                placeholder="Purchase Price"
                className="w-[8rem]"
              />
              {errors?.[name]?.[index]?.purchasePrice && (
                <FormMessage>
                  {errors[name][index].purchasePrice.message}
                </FormMessage>
              )}
            </div>
          )}
        />

        {/* mrp Price */}
        <Controller
          name={`${name}[${index}].mrp`}
          control={control}
          render={({ field }) => (
            <div className="inline">
              <FormLabel>Retail price</FormLabel>
              <Input
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                type="number"
                placeholder="retail price"
                className="w-[8rem]"
              />
              {errors?.[name]?.[index]?.mrp && (
                <FormMessage>{errors[name][index].price.message}</FormMessage>
              )}
            </div>
          )}
        />
        {/* msp Price */}
        <Controller
          name={`${name}[${index}].msp`}
          control={control}
          render={({ field }) => (
            <div className="inline">
              <FormLabel>Selling price</FormLabel>
              <Input
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                type="number"
                placeholder="Selling price"
                className="w-[8rem]"
              />
              {errors?.[name]?.[index]?.msp && (
                <FormMessage>{errors[name][index].price.message}</FormMessage>
              )}
            </div>
          )}
        />
        {/* in stock */}
        <div className="inline">
          <FormLabel>In stock</FormLabel>
          <p
            className={cn(
              "text-left font-bold text-lg",
              stock <= 0 ? "text-destructive" : "text-green-500"
            )}
          >
            {stock}
          </p>
        </div>

        {/* Total */}
        <div className="flex flex-col gap-2">
          <Label>Total</Label>
          <Input
            value={`${total} INR`}
            readOnly
            placeholder="Item total"
            className="border-none font-medium text-lg bg-transparent"
            size={10}
          />
        </div>
      </div>

      {/* Remove Button */}
      <div>
        {fields.length > 1 && (
          <BaseButton variant="destructive" onClick={() => removeField(index)}>
            <Trash2 />
            Remove
          </BaseButton>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
