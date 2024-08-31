"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

const OrderActions = ({
  orderId,
  storeId,
  productComparison,
  orderCommitted,
}) => {
  const [loading, setLoading] = useState(false);

  const processOrder = productComparison.some(
    (item) => item.canBeFulfilled === false
  );

  const handleProcessOrder = async () => {
    try {
      const response = await axios.patch(`/api/${storeId}/orders`, {
        orderId,
      });
      if (response.status === 200) {
        toast.success("Order processed successfully");
      } else {
        throw new Error("Failed to process order");
      }
    } catch (error) {
      console.error("Failed to process order:", error);
      toast.error("Failed to process order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end mt-4 space-x-2">
      {processOrder && (
        <Link
          href={`/dashboard/${storeId}/stock-in`}
          target="_blank"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Stock in
        </Link>
      )}

      <Button
        onClick={handleProcessOrder}
        disabled={processOrder || loading || !!orderCommitted}
      >
        {loading
          ? "Processing..."
          : orderCommitted
          ? "Order Committed"
          : "Process Order"}
      </Button>
    </div>
  );
};

export default OrderActions;
