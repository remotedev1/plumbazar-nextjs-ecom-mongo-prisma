"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";

import CartItem from "./components/cart-item";
import { Summary } from "./components/summary";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Call fetchProducts only once when the component is mounted
  useEffect(() => {
    if (isMounted && cart.items.length > 0) {
      cart.fetchProducts();
    }
  }, [isMounted]); // Only runs when `isMounted` changes to true

  if (!isMounted) {
    return null;
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex items-center justify-center font-extrabold text-5xl min-h-[80vh]">
        Cart is empty
      </div>
    );
  }

  



  return (
    <div className="bg-white  min-h-[80vh] py-14">
      <Container>
        <div className="px-4  sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7 border p-3 rounded-md">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No items added to cart.</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
