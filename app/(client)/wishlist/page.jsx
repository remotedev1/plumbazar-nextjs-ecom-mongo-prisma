"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";

import useWishlist from "@/hooks/use-wishlist";
import WishListItem from "./_components/wishlist-item";
import { usePathname } from "next/navigation";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const wishlist = useWishlist();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white min-h-[80vh]  py-14">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Wishlists</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {wishlist.items.length === 0 && (
                <p className="text-neutral-500">No items in wishlist.</p>
              )}
              <ul>
                {wishlist.items.map((item) => (
                  <WishListItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
