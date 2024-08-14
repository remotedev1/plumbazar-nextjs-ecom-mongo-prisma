import Image from "next/image";
// import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import useCart from "@/hooks/use-cart";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { AddCart } from "@/components/frontend/add-cart";

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


  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden ">
        <Image
          fill
          src={data.images[0]}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          {remove && <IconButton onClick={onRemove} icon={<X size={15} />} />}
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{data.name}</p>
          </div>

          
          <div className="flex">
            <h5>{data.quantity} * &nbsp; </h5> <Currency value={data.price} />
          </div>
        </div>
        {remove ? <AddCart product={data} /> : <Currency value={data.price * data.quantity} />}
      </div>
    </li>
  );
};

export default CartItem;
