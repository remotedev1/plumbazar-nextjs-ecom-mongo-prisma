"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce"; // Import your debounce hook
import { Search } from "lucide-react"; // Import the search icon from Lucide
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import Currency from "../ui/currency";

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
        const products = response.data.products.map((product) => ({
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          mrp: product.mrp,
          msp: product.msp,
          gst: product.gst,
          offers: product.offers,
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
    <div className="w-full max-w-md max-h-[80vh]">
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
          {debouncedSearch && options.length ? (
            <ScrollArea className="h-96  rounded-md border">
              <ul>
                {options.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center space-x-2 justify-between border-b p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {/* Product Image */}
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="rounded-md"
                      layout="intrinsic"
                      priority // Load image with priority
                    />

                    <div className="flex flex-col space-y-2 flex-1">
                      {/* Product Name */}

                      <span className="font-medium text-sm">
                        {product.name}
                      </span>
                      <div className=" flex items-start flex-wrap leading-none text-red-600  font-bold ">
                        <span className="flex w-full text-sm md:text-base">
                          <Currency value={product?.price} />
                        </span>
                      </div>
                      {/* View Product Button */}
                      {/* <Button
                        onClick={() => handleProductClick(product.id)}
                        className="w-fit"
                      >
                        View
                      </Button> */}
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <div>No products found...</div>
          )}

          {/* Close Button */}
          <Button onClick={() => setIsOpen(false)} className=" bg-red-500">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
