"use client";

import Image from "next/image";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import useWishlist from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";
import { AddCart } from "../frontend/add-cart";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";

const ProductCard = ({ data }) => {
  const wishlist = useWishlist();
  const user = useSession();

  const router = useRouter();
  const handleClick = () => {
    router.push(`/products/${data?.id}`);
  };

  // const previewModal = usePreviewModal();
  // const onPreview = (e) => {
  //   e.stopPropagation();
  //   previewModal.onOpen(data);
  // };

  const onAddToWishlist = (e) => {
    e.stopPropagation();
    wishlist.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        {user.status === "authenticated" && (
          <Button
            className=" z-10 bg-white w-10 h-10 p-2 rounded-full absolute top-2 right-2 shadow-lg"
            onClick={onAddToWishlist}
            variant="ghost"
          >
            {wishlist.isItemInWishlist(data.id) ? (
              <FaHeart size={20} color="red" />
            ) : (
              <FaRegHeart size={20} />
            )}
          </Button>
        )}
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Product Image"
          className="aspect-square object-cover rounded-md"
        />
        {/* <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-4 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div> */}
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500"> {data.category.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>

      <div className="mt-3">
        <AddCart product={data} />
      </div>
    </div>
  );
};

export default ProductCard;
