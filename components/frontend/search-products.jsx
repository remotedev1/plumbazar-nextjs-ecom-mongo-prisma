"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce"; // Import your debounce hook
import { Search } from "lucide-react"; // Import the search icon from Lucide
import Image from "next/image";

export const SearchProducts = ({ params }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const router = useRouter();

  // Debounced search value
  const debouncedSearch = useDebounce(searchQuery, 500);

  const storeId = "667ec838d471b19705804a1e";

  const fetchProducts = useCallback(async () => {
    if (debouncedSearch) {
      try {
        const response = await axios.get(
          `/api/search-product?query=${debouncedSearch}`
        );
        const products = response.data.map((product) => ({
          id: product.id,
          name: product.name,
          imageUrl: product.images[0], 
          price: product.price,
        }));
        setOptions(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setOptions([]); 
    }
  }, [debouncedSearch, storeId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleProductClick = (id) => {
    router.push(`/products/${id}`);
    setIsOpen(false); // Close the modal after navigation
  };

  return (
    <div className="w-full max-w-md ">
      {/* Search Icon Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center p-3 rounded-full bg-transparent hover:bg-transparent text-primary hover:text-primary/75"
      >
        <Search className="h-6 w-6" />
      </Button>

      {/* Search Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>

          {/* Search Input inside modal */}
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded-lg p-2"
          />

          {/* Search results or query */}
          <div className="mt-4 space-y-4">
            {debouncedSearch && options.length ? (
              <ul className="h-96 overflow-y-scroll">
                {options.map((product) => (
                  <li key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    {/* Product Image */}
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                      layout="intrinsic"
                      priority // Load image with priority
                    />

                    {/* Product Name */}
                    <span className="font-bold">{product.name}</span>

                    {/* View Product Button */}
                    <Button
                      variant="outline"
                      onClick={() => handleProductClick(product.id)}
                      className="ml-4"
                    >
                      View
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No products found...</div>
            )}
          </div>

          {/* Close Button */}
          <Button onClick={() => setIsOpen(false)} className="mt-6">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
