"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import both ChevronDown and ChevronUp

export const CustomDropdownMenu = ({
  label = "Menu",
  title,
  options,
  buttonContent, // Accept buttonContent as a prop to include button inside dropdown
}) => {
  const [open, setOpen] = useState(false); // Track dropdown open state

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {title}
          {open ? (
            <ChevronUp className="ml-2 h-4 w-4" /> // Show ChevronUp when open
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" /> // Show ChevronDown when closed
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option, index) =>
          option.href ? (
            <DropdownMenuItem asChild key={index}>
              <Link href={option.href} className="cursor-pointer">{option.label}</Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuCheckboxItem
              key={index}
              checked={option.checked}
              onCheckedChange={option.setChecked}
              disabled={option.disabled}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          )
        )}
        <DropdownMenuSeparator />
        {/* Render a button if passed */}
        {buttonContent && (
          <div className="p-2">
            {buttonContent} {/* Button inside dropdown content */}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
