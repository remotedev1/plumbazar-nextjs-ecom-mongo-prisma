"use client";

import { Button } from "@/components/ui/button";
import useWishlist from "@/hooks/use-wishlist";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const WishList = ({ product }) => {
  const wishlist = useWishlist();

  const onAddToWishlist = (e) => {
    e.stopPropagation();
    wishlist.addItem(product);
  };

  return (
    <div>
      <Button
        className="z-10 w-10 h-10 p-2 rounded-full absolute top-2 right-2 shadow-sm bg-slate-100 hover:bg-slate-200 text-red-500 hover:text-red-600"
        onClick={onAddToWishlist}
        variant="ghost"
      >
        {wishlist.isItemInWishlist(product.id) ? (
          <FaHeart size={20} color="red" />
        ) : (
          <FaRegHeart size={20} />
        )}
      </Button>
    </div>
  );
};

export default WishList;
