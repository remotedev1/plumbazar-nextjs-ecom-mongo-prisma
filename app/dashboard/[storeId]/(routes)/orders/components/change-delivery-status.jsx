"use client";
import { changeDeliveryStatus } from "@/actions/change-delivery-status";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";

export const ChangeDeliveryStatus = ({ order }) => {
  const [selectedValue, setSelectedValue] = useState(order.deliveryStatus);
  const [isPending, startTransition] = useTransition();
  const handleValueChange = (value) => {
    setSelectedValue(value);
    startTransition(async () => {
      await changeDeliveryStatus({ value, orderId: order.id });
    });
  };

  const Status = ["PROCESSING","PACKING", "SHIPPED", "OUT_TO_DELIVER", "DELIVERED"];

  return (
    <div>
      <Select
        disabled={isPending}
        onValueChange={handleValueChange}
        value={selectedValue}
        defaultValue={selectedValue}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="change payment status"
            defaultValue={selectedValue}
          />
        </SelectTrigger>

        <SelectContent>
          {Status.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
