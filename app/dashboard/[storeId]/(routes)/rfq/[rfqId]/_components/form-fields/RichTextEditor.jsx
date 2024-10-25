"use client";
import React from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form"; // Import useFormContext

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const RichTextEditor = ({
  name,
  label,
  labelHelper,
  placeholder,
  ...props
}) => {
  const { control, setValue } = useFormContext(); // Access form context

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{`${label}:`}</FormLabel>}

          {labelHelper && <span className="text-xs">{labelHelper}</span>}

          <FormControl>
            <ReactQuill
              value={field.value || ""} // Use field value to display in the editor
              theme="snow"
              placeholder={placeholder}
              onChange={(value) => setValue(name, value)} // Update value directly
              className="max-w-[50rem]" // You can style it as needed
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RichTextEditor;
