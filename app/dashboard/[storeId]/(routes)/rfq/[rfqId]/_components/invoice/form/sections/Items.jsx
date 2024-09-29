"use client";

import React, { useCallback, useState } from "react";

// RHF
import { useFieldArray, useFormContext } from "react-hook-form";

// DnD
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Icons
import { Plus } from "lucide-react";

// Components
import Subheading from "../../../Subheading";
import SingleItem from "../SingleItem";
import BaseButton from "../../../BaseButton";

const Items = () => {
  const { control, setValue, formState: { errors }, getValues } = useFormContext();
  const ITEMS_NAME = "details.items";
  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: ITEMS_NAME,
  });

console.log(getValues("details.items"));


  const addNewField = () => {
    append({
      name: "",
      description: "",
      quantity: null,
      msp: null,
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
    async (event) => {
      const { active, over } = event;
      setActiveId(active.id);

      if (active.id !== over?.id) {
        const oldIndex = fields.findIndex((item) => item.id === active.id);
        const newIndex = fields.findIndex((item) => item.id === over?.id);

        move(oldIndex, newIndex);
      }
    },
    [fields, setValue]
  );


  return (
    <section className="flex flex-col gap-2 w-full">
      <Subheading>Line items:</Subheading>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(event) => {
          const { active } = event;
          setActiveId(active.id);
        }}
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
              errors={errors}
              moveFieldUp={moveFieldUp}
              moveFieldDown={moveFieldDown}
              removeField={removeField}
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
      <BaseButton
        tooltipLabel="Add a new item to the list"
        onClick={addNewField}
      >
        <Plus />
        add new
      </BaseButton>
    </section>
  );
};

export default Items;
