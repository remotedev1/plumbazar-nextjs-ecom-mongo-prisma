"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useWishlist from "@/hooks/use-wishlist";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Currency from "../ui/currency";
import { Button } from "../ui/button";

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
      className="relative  w-full  overflow-hidden rounded-lg bg-white shadow-md cursor-pointer h-full"
      onClick={handleClick}
    >
      <div>
        <Image
          src={data?.images?.[0]}
          width={200}
          height={200}
          alt="Product Image"
          className="h-60 w-full aspect-square object-contain rounded-md p-5"
        />
        <div className="z-10 absolute uppercase left-2.5 right-2.5 md:left-4 top-4 text-white items-center font-semibold text-center rounded-full back bg-red-600  flex justify-center  w-12 h-12 text-sm">
          71% OFF
        </div>
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
      </div>
      <div className="px-1 w-full flex flex-col pl-2.5 justify-start space-y-3 flex-1 pb-3">
        <h5 className="text-md font-semibold tracking-tight text-slate-900">
          {data.name}
        </h5>

        <div className="flex flex-col mt-1 mb-1 ">
          <div className="flex flex-col mt-1 mb-1">
            <div className="text-base flex items-start flex-wrap leading-none text-red-600 flex-row justify-between font-bold ">
              <div>
                <span className="flex w-full">
                  <Currency value={data?.price} />
                </span>
                <span className="md:text-xs md:mt-1 mb-1 text-11 text-gray-500 font-normal">
                  incl. GST
                </span>
              </div>
            </div>
            <div className="md:text-xs md:mt-1.5 text-11 uppercase text-gray-500 ">
              <div>
                <span className="">mrp</span>
                <span className="ml-1 font-normal">
                  <Currency value={data?.price} lineThrough={true} />
                </span>
                <span className="text-red-600 text-xs font-medium px-1 italic uppercase">
                  (76% OFF)
                </span>
              </div>
            </div>
          </div>
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
