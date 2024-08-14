// Import necessary dependencies
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Create a custom hook called useWishlist
const useWishlist = create(
  // Use the persist middleware to persist wishlist state
  persist(
    // Define the store's initial state and actions
    (set, get) => ({
      items: [], // An array to store the products in the wishlist
      addItem: (data) => {
        // Function to add an item to the wishlist
        const currentItems = get().items; // Get the current items in the wishlist
        const existingItem = currentItems.find((item) => item.id === data.id); // Check if the item already exists in the wishlist

        if (existingItem) {
          // If the item already exists, show a toast message
          set({ items: [...get().items.filter((item) => item.id !== data.id)] }); // Filter out the item with the specified ID

          return toast.success("Item removed from wishlist.");
        }

        // If the item is not in the wishlist, add it to the wishlist
        set({ items: [...get().items, data] });
        toast.success("Item added to wishlist."); // Show a success toast message
      },
      removeItem: (id) => {
        // Function to remove an item from the wishlist
        set({ items: [...get().items.filter((item) => item.id !== id)] }); // Filter out the item with the specified ID
        toast.success("Item removed from wishlist.");
      },
      removeAll: () => set({ items: [] }),
      isItemInWishlist: (id) => {
        // Function to add an item to the wishlist
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);
        if (existingItem) {
          return true;
        }
      },
    }),
    {
      // Configuration for persistence
      name: "wishlist-storage", // Name for the persisted store
      storage: createJSONStorage(() => localStorage), // Use localStorage for storage
    }
  )
);

export default useWishlist;
