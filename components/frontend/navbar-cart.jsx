"use client";

import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";
import { Button } from "../ui/button";

const NavbarCart = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const cart = useCart();
  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full  px-4 py-2"
        variant="link"
      >
        <ShoppingCart size={20} color={  pathname === "/cart" ? "blue" : "black"} />
        <span className="absolute right-2 -ml-1 top-2 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarCart;
