"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";
import { getSession } from "next-auth/react";

import CartItem from "../cart/components/cart-item";
import { FaRupeeSign } from "react-icons/fa";
import Currency from "@/components/ui/currency";
import { ShippingAddress } from "./_components/shipping-address";
import toast from "react-hot-toast";
import { postOrder } from "@/actions/post-order";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { cn } from "@/lib/utils";

export default function Checkout() {
  const router = useRouter();
  const cart = useCart();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const cartItems = useMemo(
    () =>
      cart.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        msp: item.msp,
        offerId: item.offerId,
        gst: item.gst,
      })),
    [cart.items]
  );

  // Calculate total using useMemo to optimize
  const total = useMemo(
    () =>
      cart.items.reduce(
        (total, item) =>
          total +
          (Number(item.msp) + (Number(item.gst) * Number(item.msp)) / 100) *
            Number(item.quantity),
        0
      ),
    [cart.items]
  );

  function calculateTotalWithShipping(total) {
    let shippingCost = 0;

    if (total < 5000) {
      shippingCost = 200;
    } else if (total >= 5000 && total < 10000) {
      shippingCost = 500;
    } else if (total >= 10000) {
      shippingCost = 1000;
    }

    const finalTotal = total + shippingCost;

    return { finalTotal, shippingCost };
  }
  // Example usage:
  const { finalTotal, shippingCost } = calculateTotalWithShipping(total);

  const removeAll = useCart((state) => state.removeAll);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(total)) return;
    setLoading(true);
    if (cartItems.length <= 0) {
      toast.error("Please add items to cart to checkout");
      return;
    }

    const updatedSession = await getSession(); // Get the latest session data
    const updatedAddress = updatedSession?.user?.address;

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
      postOrder(values).then(async (data) => {
        if (data?.error) {
          toast.error(data.error);
        } else if (data?.success) {
          toast.success("proceed to payment");
          removeAll();

          // Use the order ID from the response as the transaction ID
          const transactionId = data.order.id;
          const merchantUserId = `MUID-${Date.now()}`; // Use a dynamically generated merchant user ID

          const payload = {
            merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
            merchantTransactionId: transactionId, // Set the order ID as the transaction ID
            merchantUserId: merchantUserId,
            amount: (data.order.total + data.order.shippingCost) * 100, // Convert amount to paise
            redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/confirm-order-payment?merchantTransactionId=${transactionId}`,
            callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/confirm-order-payment?merchantTransactionId=${transactionId}`,
            redirectMode: "POST",
            mobileNumber: updatedAddress.phone, // Use the phone number from the updated address
            paymentInstrument: {
              type: "PAY_PAGE",
            },
          };

          const dataPayload = JSON.stringify(payload);
          const dataBase64 = Buffer.from(dataPayload).toString("base64");
          const fullURL =
            dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
          const dataSha256 = sha256(fullURL);
          const checksum =
            dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

          const UAT_PAY_API_URL =
            "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

          try {
            const response = await axios.post(
              UAT_PAY_API_URL,
              {
                request: dataBase64,
              },
              {
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
                  "X-VERIFY": checksum,
                },
              }
            );

            // Assuming the response includes the redirect URL for payment confirmation
            const redirect =
              response.data.data.instrumentResponse.redirectInfo.url;

            // Redirect the user to the payment page
            router.push(redirect);
          } catch (error) {
            toast.error("An error occurred while processing the payment.");
            console.error("Payment error:", error);
          }
        }
      });
    });
    setLoading(false);
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
            {/*  <span className="peer-checked:border-blue-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-blue-800 bg-white" />
            <label className="peer-checked:border-2 peer-checked:border-blue-700 peer-checked:bg-gray-50 flex items-center cursor-pointer select-none rounded-lg border border-gray-300 p-4">
              <FaRupeeSign size={20} />
              <div className="ml-5">
                <span className="mt-2 font-semibold">COD</span>
                <p className="text-slate-500 text-sm leading-6">
                  Cash on delivery
                </p>
              </div>
            </label>*/}
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
                    <Currency value={shippingCost} />
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                <Currency value={finalTotal} />
              </p>
            </div>
          </div>
          <button
            className={`${cn(
              "w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white",
              {
                "cursor-not-allowed bg-gray-300": loading || isPending,
              }
            )}`}
            type="submit"
            disabled={loading || isPending}
            onClick={onSubmit}
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
