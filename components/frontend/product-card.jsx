"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useWishlist from "@/hooks/use-wishlist";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Currency from "../ui/currency";
import { Button } from "../ui/button";
import { calculateDiscountPercentage } from "@/lib/helpers";
import { calculatePriceWithGST } from "@/lib/variables";

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

  const { gstAmount, priceWithGST } = calculatePriceWithGST(
    data.discountedPrice,
    18
  );

  return (
    <div
      className="relative  w-full   overflow-hidden rounded-lg bg-white  shadow-md cursor-pointer h-full"
      onClick={handleClick}
    >
      <div>
        <div className="relative h-24 xs:h-36 sm:h-40 md:h-60 w-full aspect-square  rounded-md p-5">
          <Image
            src={data?.images?.[0]}
            fill
            alt="Product Image"
            className="object-contain"
          />
        </div>
        <div className="z-10 absolute uppercase left-2.5 right-2.5 md:left-4 top-4 text-white items-center font-semibold text-center rounded-full back bg-red-600  flex justify-center  w-8 h-8 text-[9px]">
          {calculateDiscountPercentage(data?.price, data?.discountedPrice)}%{" "}
          <br />
          OFF
        </div>
        {user.status === "authenticated" && (
          <Button
            className=" z-10 w-10 h-10 p-2 rounded-full absolute top-2 right-2 shadow-sm"
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
      </div>
      <div className="px-1 w-full flex flex-col pl-2.5 justify-start space-y-2 pb-3">
        <h5 className="text-[10px] xs:text-xs md:text-lg font-semibold tracking-tight text-slate-900">
          {data.name}
        </h5>

        <div className=" flex items-start flex-wrap leading-none text-red-600  font-bold ">
            <span className="flex w-full text-sm md:text-base">
              <Currency value={data?.discountedPrice} />
            </span>
            <span className="text-[10px] md:text-sm md:mt-1 mb-1  text-gray-500 font-normal">
              <Currency value={priceWithGST} /> incl. GST
            </span>
        </div>
        <div className="md:mt-1.5  text-[10px] md:text-base uppercase text-gray-500 ">
            <span className="">mrp</span>
            <span className="ml-1 font-normal">
              <Currency value={data?.price} lineThrough={true} />
            </span>
            <span className="text-red-600 text-xs font-medium px-1 italic uppercase">
              (76% OFF)
            </span>
        </div>
        {/* <div className="mt-2.5 mb-5 flex items-center">
          <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
            5.0
          </span>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
