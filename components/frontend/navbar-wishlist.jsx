"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import useWishlist from "@/hooks/use-wishlist";
import { Heart } from "lucide-react";

const NavbarWishlist = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const wishlist = useWishlist();
  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/wishlist")}
        className="flex items-center rounded-full  px-4 py-2"
        variant="link"
      >
        <Heart size={20} color={pathname === "/wishlist" ? "blue" : "black"} />
        <span className="absolute right-2 -ml-1 top-2 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
          {wishlist.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarWishlist;
