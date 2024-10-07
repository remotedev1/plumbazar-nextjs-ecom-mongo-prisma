import Image from "next/image";
// import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import useCart from "@/hooks/use-cart";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { AddCart } from "@/components/frontend/add-cart";
import { useMemo } from "react";

const CartItem = ({ data, remove = true }) => {
  const cart = useCart();
  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onAddToCart = () => {
    cart.addItem(data);
  };

  const onRemoveFromCart = () => {
    cart.decrementItem(data.id);
  };

  const msp = Number(data.msp);
  const gst = Number(data.gst ?? 0);
  const quantity = Number(data.quantity);

  const total = (msp + (msp * gst) / 100) * quantity;


  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden ">
        {data?.images && (
          <Image
            fill
            src={data?.images[0]}
            alt=""
            className="object-cover object-center"
          />
        )}
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 -top-4">
          {remove && <IconButton onClick={onRemove} icon={<X size={15} />} />}
        </div>
        <div className="relative pr-9 sm:grid sm:gap-x-6 sm:pr-0">
          <div>
            <p className="text-sm md:text-lg font-semibold text-black">
              {data.name}
            </p>

            <h5 className="flex justify-between items-center">
              <span>Unit cost:</span>
              <Currency value={data.msp} />
            </h5>

            <h5 className="flex justify-between items-center">
              <span>Total:</span>
              <Currency value={data.quantity * data.msp} />
            </h5>

            <h5 className="flex justify-between items-center text-red-600 font-semibold">
              <span>GST + Total:</span>
              <Currency value={total} />
            </h5>
          </div>
        </div>
        {remove && <AddCart product={data} />}
      </div>
    </li>
  );
};

export default CartItem;
