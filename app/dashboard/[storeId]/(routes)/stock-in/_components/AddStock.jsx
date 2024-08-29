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
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SingleItem from "./SingleItem";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormMessage } from "@/components/ui/form";

export const AddStock = ({ products }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const toastMessage = "Stock added successfully";
  const action = "Save Changes";

  // Form initialization
  const form = useForm({
    resolver: zodResolver(StockInSchema),
    defaultValues: {
      notes: "",
      products: [
        {
          productId: "",
          quantity: 0,
          purchasePrice: 0,
          price: 0,
          total: 0,
        },
      ],
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
      productId: "",
      quantity: 0,
      purchasePrice: 0,
      price: 0,
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
      await axios.post(`/api/${params.storeId}/products`, data);
      toast.success(toastMessage);
      reset(); // Optionally reset the form after successful submission
      router.push(`/dashboard/${params.storeId}/products`);
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
              products={products}
              control={control}
              setValue={setValue}
              errors={errors}
            />
          ))}
        </SortableContext>
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
      <Button disabled={loading} className="ml-auto" type="submit">
        {action}
      </Button>
    </form>
  );
};
