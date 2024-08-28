"use client";

import { useEffect } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// DnD
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ShadCn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Components
import Select from 'react-select'
// Icons
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import BaseButton from "@/components/dashboard/BaseButton";
import FormInput from "../../rfq/[rfqId]/process-invoice/_components/form-fields/FormInput";


const SingleItem = ({
  name,
  index,
  fields,
  field,
  moveFieldUp,
  moveFieldDown,
  removeField,
  products
}) => {
  const { control, setValue } = useFormContext();

  // Items
  const itemName = useWatch({
    name: `${name}[${index}].product`,
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

  const handleSelectChange = (selectedOption) => {
    setValue(`${name}[${index}].product`, selectedOption.value);
  };


  useEffect(() => {
    // Calculate total when rate or quantity changes
    if (purchasePrice != undefined && quantity != undefined) {
      const calculatedTotal = (purchasePrice * quantity).toFixed(2);
      setValue(`${name}[${index}].total`, calculatedTotal);
    }
  }, [purchasePrice, quantity]);

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

  return (
    <div
      style={style}
      {...attributes}
      className={`${boxDragClasses} group flex flex-col gap-y-5 p-3 my-2 cursor-default rounded-xl bg-gray-50 dark:bg-slate-800 dark:border-gray-600`}
    >
      {/* {isDragging && <div className="bg-blue-600 h-1 rounded-full"></div>} */}
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
        <div className="w-full">
          <Label>Name</Label>
          <Select
            options={products.map((product) => ({
              value: product.name,
              label: product.name,
            }))}
            onChange={handleSelectChange}
            value={products.find((option) => option.value === itemName)}
            placeholder="Search and select item"
            isSearchable
          />
        </div>

        <FormInput
          name={`${name}[${index}].quantity`}
          type="number"
          label="quantity"
          placeholder="quantity"
          className="w-[8rem]"
          vertical
        />

        <FormInput
          name={`${name}[${index}].purchasePrice`}
          type="number"
          label="purchasePrice"
          labelHelper="INR"
          placeholder="purchasePrice"
          className="w-[8rem]"
          vertical
        />

        <div className="flex flex-col gap-2">
          <div>
            <Label>total</Label>
          </div>
          <Input
            value={`${total} INR`}
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
