import Image from "next/image";
// import { toast } from "react-hot-toast";
import { ShoppingCart, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import useWishlist from "@/hooks/use-wishlist";
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
    <li className="flex flex-col py-6 border-b justify-center">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0]}
          alt=""
          className="object-cover object-center"
        />
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
      </div>

      {/* <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div >
            <p className=" text-lg font-semibold text-black">{data.name}</p>
          <Currency value={discountAmount} />

          </div>

        </div> */}
      <Button onClick={onAddToCart} size="lg" className="w-fit mt-6">
        Add to cart <ShoppingCart />
      </Button>
    </li>
  );
};

export default WishListItem;
