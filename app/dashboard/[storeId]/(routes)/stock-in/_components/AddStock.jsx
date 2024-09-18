"use client";

import { useCallback, useMemo, useState } from "react";
import { useFieldArray, useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

import { StockInSchema } from "@/schemas";

// DnD
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SingleItem from "./SingleItem";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormMessage } from "@/components/ui/form";

export const AddStock = ({
  items = [
    {
      id: "",
      name:"",
      quantity: 0,
      purchasePrice: 0,
      mrp: 0,
      msp: 0,
      total: 0,
    },
  ],
}) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toastMessage = "Stock added successfully";
  const action = "Stock in";

  // Form initialization
  const form = useForm({
    resolver: zodResolver(StockInSchema),
    defaultValues: {
      notes: "",
      products: items,
    },
  });



  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const ITEMS_NAME = "products";
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: ITEMS_NAME,
  });

  const addNewField = () => {
    append({
      id: "",
      name:"",
      quantity: 0,
      purchasePrice: 0,
      mrp: 0,
      msp: 0,
      total: 0,
    });
  };

  const removeField = (index) => {
    remove(index);
  };

  const moveFieldUp = (index) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };

  const moveFieldDown = (index) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  // DnD
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        const oldIndex = fields.findIndex((item) => item.id === active.id);
        const newIndex = fields.findIndex((item) => item.id === over?.id);

        move(oldIndex, newIndex);
      }
    },
    [fields, move]
  );

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post(`/api/${params.storeId}/stock-in`, data);
      toast.success(toastMessage);
      reset();
      router.refresh();
    } catch (error) {
      toast.error(error.response?.data || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Watch for the products array to calculate total cost and total line items
  const productsData = useWatch({
    control,
    name: "products",
  });

  // Calculate total line items and total cost
  const { totalItems, totalCost } = useMemo(() => {
    const totalItems = productsData.length;
    const totalCost = productsData
      .reduce((acc, item) => {
        return acc + parseFloat(item.total || 0);
      }, 0)
      .toFixed(2);

    return { totalItems, totalCost };
  }, [productsData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((field, index) => (
            <SingleItem
              key={field.id}
              name={ITEMS_NAME}
              index={index}
              fields={fields}
              field={field}
              moveFieldUp={moveFieldUp}
              moveFieldDown={moveFieldDown}
              removeField={removeField}
              control={control}
              setValue={setValue}
              errors={errors}
            />
          ))}
        </SortableContext>
        <DragOverlay
          dropAnimation={{
            duration: 500,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}
        >
          <div className="w-[10rem]">
            <p>Click to drop</p>
          </div>
        </DragOverlay>
      </DndContext>
      <Button
        onClick={addNewField}
        disabled={loading}
        className="flex items-center gap-2"
        type="button"
      >
        Add New item
      </Button>

      {/* Summary Section */}
      <div className="border-t pt-4 mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <p>
            Total Line Items: :{" "}
            <span className="font-bold text-red-500">{totalItems} </span>
          </p>
          <p>
            Total Cost:{" "}
            <span className="font-bold text-red-500">{totalCost} INR </span>
          </p>
        </div>

        {/* Notes Section */}
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <Textarea id="notes" placeholder="Add any notes..." {...field} />
            )}
          />
          {errors.notes && <FormMessage>{errors.notes.message}</FormMessage>}
        </div>
      </div>
      <Button
        disabled={loading}
        className="w-full ml-auto bg-blue-500 hover:bg-blue-300"
        type="submit"
      >
        {action}
      </Button>
    </form>
  );
};
