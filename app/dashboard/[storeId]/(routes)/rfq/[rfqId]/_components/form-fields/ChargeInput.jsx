"use client";

import React from "react";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Components
import BaseButton from "../BaseButton";

// Icons
import { Percent, RefreshCw } from "lucide-react";

const ChargeInput = ({
  label,
  name,
type,
  currency,
}) => {
  const { control } = useFormContext();

  return (
    <>
      <div className="flex justify-between items-center">
        <div>{label}</div>
        <div className="flex items-center gap-1">
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center text-sm">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[7rem]"
                      placeholder={label}
                      type="number"
                      min="0"
                      max={type && 100}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
       
        <div className="flex items-center gap-1">{type ==="percent" ? <Percent/> :currency }</div>
        </div>
      </div>
    </>
  );
};

export default ChargeInput;
