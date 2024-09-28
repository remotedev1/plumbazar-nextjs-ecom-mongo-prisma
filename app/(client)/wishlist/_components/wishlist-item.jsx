import Image from "next/image";
// import { toast } from "react-hot-toast";
import { ShoppingCart, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useWishlist from "@/hooks/use-wishlist";
import { AddCart } from "@/components/frontend/add-cart";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

const WishListItem = ({ data }) => {
  const wishlist = useWishlist();
  const cart = useCart();


  const onRemove = () => {
    wishlist.removeItem(data.id);
  };

  const onAddToCart = () => {
    cart.addItem(data);
    !!onRemove && onRemove(data.id);
  };
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0]}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div >
            <p className=" text-lg font-semibold text-black">{data.name}</p>
          <Currency value={data.msp} />

          </div>

        </div>
        <Button onClick={onAddToCart} size="lg">
          Add to cart <ShoppingCart />
        </Button>
      </div>
    </li>
  );
};

export default WishListItem;
