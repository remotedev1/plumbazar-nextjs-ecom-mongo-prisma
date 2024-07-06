// Import necessary dependencies
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Create a custom hook called useCart
const useCart = create(
  // Use the persist middleware to persist cart state
  persist(
    // Define the store's initial state and actions
    (set, get) => ({
      items: [], // An array to store the products in the cart
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          existingItem.quantity++; // Increment quantity if item already exists
          set({ items: [...currentItems] });
        } else {
          set({ items: [...currentItems, { ...data, quantity: 1 }] });
          toast.success("Item added to cart.");
        }
      },
      removeItem: (id) => {
        // Function to remove an item from the cart
        set({ items: [...get().items.filter((item) => item.id !== id)] }); // Filter out the item with the specified ID
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ items: [] }),
      decrementItem: (id) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex((item) => item.id === id);

        if (existingItemIndex !== -1) {
          if (currentItems[existingItemIndex].quantity > 1) {
            currentItems[existingItemIndex].quantity--; // Decrement quantity if greater than 1
          } else {
            // If quantity is 1 or less, remove the item from the cart
            currentItems.splice(existingItemIndex, 1);
          }
          set({ items: [...currentItems] });
          toast.success("Item removed from cart.");
        }
      },
    }),
    {
      // Configuration for persistence
      name: "cart-storage", // Name for the persisted store
      storage: createJSONStorage(() => localStorage), // Use localStorage for storage
    }
  )
);

export default useCart;
