"use client";

import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

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
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SingleItem from "./SingleItem";


export const AddStock = ({ products }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = "Add Stock";
  const description = "Handle stock and inventory";

  const toastMessage = "Stock added successfully";
  const action = "Save Changes";

  // Form initialization
  const form = useForm({
    resolver: zodResolver(StockInSchema),
    defaultValues: {
      details: {
        notes: "",
        products: [],
      },
    },
  });

  const { control, handleSubmit } = form;

  const ITEMS_NAME = "details.products";
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: ITEMS_NAME,
  });

  const addNewField = () => {
    append({
      id: "",
      quantity: 0,
      purchasePrice: 0,
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
  const [activeId, setActiveId] = useState();

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      setActiveId(active.id);

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
      const formData = new FormData();
      formData.append("notes", data.details.notes);

      // Assuming you want to send product data as well
      data.details.products.forEach((product, index) => {
        formData.append(`products[${index}][name]`, product.name);
        formData.append(`products[${index}][description]`, product.description);
        formData.append(`products[${index}][quantity]`, product.quantity);
        formData.append(`products[${index}][unitPrice]`, product.unitPrice);
        formData.append(`products[${index}][total]`, product.total);
      });

      await axios.post(`/api/${params.storeId}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.refresh();
      router.push(`/dashboard/${params.storeId}/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error(error.response?.data || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(event) => {
              const { active } = event;
              setActiveId(active.id);
            }}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
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
                />
              ))}
            </SortableContext>
          </DndContext>

          <Button
            onClick={addNewField}
            disabled={loading}
            className="ml-auto"
            type="button"
          >
            Add New Product
          </Button>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
