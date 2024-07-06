"use client";
import { changePaymentStatus } from "@/actions/change-payment-status";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";

export const ChangePaymentStatus = ({ order }) => {
  const [selectedValue, setSelectedValue] = useState(order.isPaid);
  const [isPending, startTransition] = useTransition();
  const handleValueChange = (value) => {
    setSelectedValue(value);
    startTransition(async () => {
      await changePaymentStatus({ value, orderId: order.id });
    });
  };

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
          <SelectItem value={true}>Paid</SelectItem>
          <SelectItem value={false}>UnPaid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
