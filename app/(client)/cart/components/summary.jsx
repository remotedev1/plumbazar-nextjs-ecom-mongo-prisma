"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";

export const Summary = () => {
  const router = useRouter();
  const items = useCart((state) => state.items);

  // Calculate total using useMemo to optimize
  const total = items?.reduce(
    (total, item) =>
      total +
      (Number(item.msp) + (Number(item.gst) * Number(item.msp)) / 100) *
        Number(item.quantity),
    0
  );

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={total} />
        </div>
      </div>
      <Button
        onClick={() => router.push("/checkout")}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};
