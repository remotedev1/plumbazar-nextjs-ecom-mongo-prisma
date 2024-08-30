"use client";

import { useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";
import { getSession } from "next-auth/react";

import CartItem from "../cart/components/cart-item";
import { FaRupeeSign } from "react-icons/fa";
import Currency from "@/components/ui/currency";
import { ShippingAddress } from "./_components/shipping-address";
import toast from "react-hot-toast";
import { postOrder } from "@/actions/post-order";

export default function Checkout() {
  const router = useRouter();
  const cart = useCart();
  const [isPending, startTransition] = useTransition();

  const cartItems = useMemo(
    () =>
      cart.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      })),
    [cart.items]
  );

  // Calculate total using useMemo to optimize
  const total = useMemo(
    () =>
      cart.items.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      ),
    [cart.items]
  );

  const totalPrice = total > 500 ? total : 500 + total;

  const removeAll = useCart((state) => state.removeAll);

  const onSubmit = async () => {
    const updatedSession = await getSession(); // Get the latest session data

    const updatedAddress = updatedSession?.user?.address;
    setAddress(updatedAddress);

    if (cartItems.length <= 0) {
      toast.error("Please add items to cart to checkout");
      return;
    }

    if (
      !updatedAddress ||
      !updatedAddress.address ||
      !updatedAddress.city ||
      !updatedAddress.state ||
      !updatedAddress.zip ||
      !updatedAddress.phone
    ) {
      toast.error("Please select a shipping address");
      return;
    }

    const values = { address: updatedAddress, cartItems };

    startTransition(() => {
      postOrder(values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else if (data?.success) {
          toast.success(data.success);
          removeAll();
          router.push(`/order-summary/${data.order.id}`);
        }
      });
    });
  };

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-between py-14 text-black">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Checkout Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping address.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <ul>
              {cart.items.map((item) => (
                <CartItem key={item.id} data={item} remove={false} />
              ))}
            </ul>
          </div>
          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <div className="relative">
            <input
              className="peer hidden"
              id="radio_1"
              type="radio"
              name="radio"
              defaultChecked=""
            />
            <span className="peer-checked:border-blue-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-blue-800 bg-white" />
            <label className="peer-checked:border-2 peer-checked:border-blue-700 peer-checked:bg-gray-50 flex items-center cursor-pointer select-none rounded-lg border border-gray-300 p-4">
              <FaRupeeSign size={20} />
              <div className="ml-5">
                <span className="mt-2 font-semibold">COD</span>
                <p className="text-slate-500 text-sm leading-6">
                  Cash on delivery
                </p>
              </div>
            </label>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your shipment details.
          </p>
          <div className="mt-4">
            <ShippingAddress />
            {/* Total */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  <Currency value={total} />
                </p>
              </div>
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <div>
                  <p className="font-semibold text-gray-900 text-end">
                    <Currency value={500} lineThrough={total > 500} />
                  </p>
                  <p className="text-xs  text-gray-900">
                    Free shipping over <Currency value={500} />.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                <Currency value={totalPrice} />
              </p>
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            type="submit"
            disabled={isPending}
            onClick={onSubmit}
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
