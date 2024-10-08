"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { AddStock } from "../../stock-in/_components/AddStock";
import { AddProductModel } from "../../stock-in/_components/Add-product";
import { useRouter } from "next/navigation";

const OrderActions = ({
  orderId,
  storeId,
  productComparison,
  orderCommitted,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const processOrder = productComparison.some(
    (item) => item.canBeFulfilled === false
  );

  const itemsToStockIn = productComparison
    .filter((item) => item.canBeFulfilled === false)
    .map((data) => {
      return {
        productId: data.id,
        name: data.name,
        msp: data.msp,
        mrp: data.mrp,
        stock: data.stock,
        purchasePrice: data.purchasePrice,
        total: 0,
      };
    });

  const handleProcessOrder = async () => {
    setLoading(true);

    try {
      await axios.patch(`/api/${storeId}/orders/${orderId}/order-process`, {
        orderId,
        data: productComparison.map((item) => item.id),
      });
      toast.success("Order processed successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to process order:", error);
      toast.error("Failed to process order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  flex-col justify-end mt-4 space-x-2">
      {processOrder ? (
        <div className="border rounded-lg p-2">
          <h3 className="py-3 font-bold text-lg text-red-500">
            Stock in to continue
          </h3>
          <AddProductModel />
          <AddStock items={itemsToStockIn} />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default OrderActions;
