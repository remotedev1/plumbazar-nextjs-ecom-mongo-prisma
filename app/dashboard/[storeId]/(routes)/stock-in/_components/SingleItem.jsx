"use client";

import { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import BaseButton from "@/components/dashboard/BaseButton";
import { FormLabel, FormMessage} from "@/components/ui/form";

const SingleItem = ({
  name,
  index,
  fields,
  field,
  moveFieldUp,
  moveFieldDown,
  removeField,
  products,
  control,
  setValue,
  errors
}) => {
  // Watching fields for dynamic updates
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


  useEffect(() => {
    // Calculate total whenever purchasePrice or quantity changes
    if (purchasePrice !== undefined && quantity !== undefined) {
      const calculatedTotal = (purchasePrice * quantity).toFixed(2);
      setValue(`${name}[${index}].total`, calculatedTotal);
    }
  }, [purchasePrice, quantity, control, index, name]);

  // DnD logic
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

  return (
    <div
      style={style}
      {...attributes}
      className={`${boxDragClasses} group flex flex-col gap-y-5 p-3 my-2 cursor-default rounded-xl bg-gray-50 dark:bg-slate-800 dark:border-gray-600`}
    >
      <div className="flex flex-wrap justify-between">
        <p className="font-medium">#{index + 1}</p>

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
                options={products.map((product) => ({
                  value: product.id,
                  label: product.name,
                }))}
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.value || "")
                }
                value={
                  products.find((product) => product.id === field.value)
                    ? {
                        value: field.value,
                        label: products.find(
                          (product) => product.id === field.value
                        )?.name,
                      }
                    : null
                }
                placeholder="Search and select item"
                isSearchable
                isClearable
              />
            )}
          />
           {errors?.[name]?.[index]?.productId && (
                  <FormMessage>
                    {errors[name][index].productId.message}
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
        {/* selling Price */}
        <Controller
          name={`${name}[${index}].price`}
          control={control}
          render={({ field }) => (
            <div className="inline">
              <FormLabel>Selling price</FormLabel>
              <Input
                {...field}
                type="number"
                placeholder="selling price"
                className="w-[8rem]"
              />
               {errors?.[name]?.[index]?.price && (
                <FormMessage>{errors[name][index].price.message}</FormMessage>
              )}
            </div>
          )}
        />

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
