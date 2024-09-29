// Import necessary dependencies
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios"; // Add Axios for API calls
import { calculateDiscountAndGST } from "@/lib/helpers";

// Create a custom hook called useCart
const useCart = create(
  persist(
    (set, get) => ({
      items: [], // An array to store the products in the cart

      // Action to add an item to the cart
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          existingItem.quantity++; // Increment quantity if item already exists
          set({ items: [...currentItems] });
          toast.success("Item increased.");
        } else {
          set({
            items: [
              ...currentItems,
              {
                id: data.id,
                quantity: 1,
              },
            ],
          });
          toast.success("Item added to cart.");
        }
      },

      // Action to remove an item from the cart
      removeItem: (id) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] }); // Filter out the item with the specified ID
        toast.success("Item removed from cart.");
      },

      // Action to remove all items from the cart
      removeAll: () => set({ items: [] }),

      // Action to decrement the quantity of an item
      decrementItem: (id) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === id
        );

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

      // New action to fetch product details using cart item IDs
      fetchProducts: async () => {
        const currentItems = get().items;
        const ids = currentItems.map((item) => item.id); // Extract product IDs from cart items

        if (ids.length === 0) {
          return; // No items to fetch
        }

        try {
          // Make the API request to fetch product details by ID
          const response = await axios.post("/api/search-product/by-id", {
            ids,
          });
          const products = response.data;

          // Update cart items with the fetched product details and discount data
          const updatedItems = currentItems.map((cartItem) => {
            const product = products.find(
              (product) => product.id === cartItem.id
            );

            if (product) {
              // Assuming your API includes discount data (e.g., discountPercentage, discountAmount, gstAmount, offerId)
              const { discountPercentage, discountAmount, gstAmount, offerId } =
                calculateDiscountAndGST(product);

              return {
                ...cartItem,
                ...product, // Merge cart item with fetched product details
                discountPercentage, // Add discount data to the cart item
                gstAmount,
                msp: discountAmount, // Set msp to the discountAmount, fallback to original msp if not available
                offerId: offerId,
              };
            }

            return cartItem; // Return original cart item if no product details are found
          });
          set({ items: updatedItems });
        } catch (error) {
          console.error("Error fetching product details:", error);
          toast.error("Failed to fetch product details.");
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
