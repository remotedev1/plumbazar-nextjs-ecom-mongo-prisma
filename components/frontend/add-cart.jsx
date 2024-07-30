import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";

export const AddCart = ({ product, onRemove }) => {
  const cart = useCart();
  const existingItem = cart.items.find((item) => item.id === product.id);

  //   const onAddToCart = (e) => {
  //     e.stopPropagation();
  //     cart.addItem(product);
  //   };

  const onAddToCart = () => {
    cart.addItem(product);
    !!onRemove && onRemove(product.id);
  };

  const onRemoveFromCart = () => {
    cart.decrementItem(product.id);
  };

  return (
    <div className="py-2">
      {existingItem && existingItem.quantity > 0 ? (
        <div className="flex items-center justify-center gap-x-2 border w-max font-extrabold text-3xl">
          <Button onClick={onRemoveFromCart} variant="ghost" className="text-red-500 text-3xl">-</Button>
          <span>{existingItem.quantity}</span>
          <Button onClick={onAddToCart} variant="ghost" className="text-blue-500 text-3xl">+</Button>
        </div>
      ) : (
        <Button onClick={onAddToCart} size="lg">
          Add to cart <ShoppingCart />
        </Button>
      )}
    </div>
  );
};
