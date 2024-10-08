"use client";

import { useCallback, useEffect, useState } from "react";

// RHF
import { Controller, useFormContext, useWatch } from "react-hook-form";

// DnD
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ShadCn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Components

// Icons
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import BaseButton from "../../BaseButton";
import Select from "react-select";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { useDebounce } from "@/hooks/useDebounce";
import { useParams } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";

const SingleItem = ({
  name,
  index,
  fields,
  field,
  moveFieldUp,
  moveFieldDown,
  removeField,
  errors,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const debouncedSearch = useDebounce(inputValue, 500);
  const params = useParams();

  const { control, setValue } = useFormContext();

  // Items
  const itemName = useWatch({
    name: `${name}[${index}].name`,
    control,
  });

  const quantity = useWatch({
    name: `${name}[${index}].quantity`,
    control,
  });
  const gst = useWatch({
    name: `${name}[${index}].gst`,
    control,
  });

  const msp = useWatch({
    name: `${name}[${index}].msp`,
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

  // Currency
  const currency = useWatch({
    name: `details.currency`,
    control,
  });

  // Calculate total whenever purchasePrice or quantity changes
  useEffect(() => {
    if (msp !== null && quantity !== null) {
      const calculatedTotal = (msp + (msp * gst) / 100) * quantity.toFixed(2);
      setValue(`${name}[${index}].total`, Number(calculatedTotal));
    }
  }, [quantity, setValue, name, index, gst, msp]);

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
            stock: product.stock,
            gst: product.gst,
          }));
          setOptions(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }
  }, [debouncedSearch, params.storeId]);

  // DnD
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const boxDragClasses = isDragging
    ? "border-2 bg-gray-200 border-blue-600 dark:bg-slate-900 z-10"
    : "border";

  const gripDragClasses = isDragging
    ? "opacity-0 group-hover:opacity-100 transition-opacity cursor-grabbing"
    : "cursor-grab";

  const handleInputChange = useCallback((newValue) => {
    setInputValue(newValue);
  }, []);

  const handleSelectChange = useCallback(
    (selectedOption) => {

      if (selectedOption) {
        setValue(`${name}[${index}].id`, selectedOption?.value || "");
        setValue(`${name}[${index}].name`, selectedOption?.label || "");
        setValue(`${name}[${index}].stock`, selectedOption?.stock || 0);
        setValue(`${name}[${index}].msp`, selectedOption.msp);
        setValue(`${name}[${index}].gst`, selectedOption.gst);
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
          <p className="font-medium">#{index + 1} -</p>
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
            name={`${name}[${index}].id`}
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
          {errors?.details?.items?.[index]?.id && (
            <FormMessage>
              {errors?.details?.items?.[index].id.message}
            </FormMessage>
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
              {errors?.details?.items?.[index]?.quantity && (
                <FormMessage>
                  {errors?.details?.items?.[index].quantity.message}
                </FormMessage>
              )}
            </div>
          )}
        />

        {/* Selling Price */}
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
              {errors?.details?.items?.[index]?.msp && (
                <FormMessage>
                  {errors?.details?.items?.[index].msp.message}
                </FormMessage>
              )}
            </div>
          )}
        />

        {/* in stock */}
        {/* <div className="inline">
          <FormLabel>In stock</FormLabel>
          <p
            className={cn(
              "text-left font-bold text-lg",
              stock <= 0 ? "text-destructive" : "text-green-500"
            )}
          >
            {stock}
          </p>
        </div> */}

        <div className="flex flex-col gap-2">
          <div>
            <Label>total</Label>
          </div>
          <Input
            value={`${total} ${currency}`}
            readOnly
            placeholder="Item total"
            className="border-none font-medium text-lg bg-transparent"
            size={10}
          />
        </div>
      </div>

      <div>
        {/* Not allowing deletion for first item when there is only 1 item */}
        {fields.length > 1 && (
          <BaseButton variant="destructive" onClick={() => removeField(index)}>
            <Trash2 />
            remove
          </BaseButton>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
