"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce"; // Assuming you have this custom hook
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

// Helper function to build the query string for filtering
const buildQueryString = (filter) => {
  const params = new URLSearchParams();
  if (filter.query) params.append("query", filter.query);
  if (filter.brand) params.append("brand", filter.brand);
  if (filter.category) params.append("category", filter.category);
  params.append("skip", filter.skip);
  params.append("take", filter.take);
  return params.toString();
};

const MassUpdateProducts = () => {
  const { storeId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Debounce the search term
  const debouncedSearch = useDebounce(searchTerm, 500); // This will delay search by 500ms
  const itemsPerPage = 50;

  useEffect(() => {
    setIsMounted(true); // This ensures the component renders only on the client.
  }, []);

  // Fetch products function that runs on load and on dependencies change
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * itemsPerPage;
      const filter = {
        query: debouncedSearch,
        brand: selectedBrand,
        category: selectedCategory,
        skip,
        take: itemsPerPage,
      };
      const queryString = buildQueryString(filter);
      const response = await axios.get(
        `/api/search-product?${queryString}&fetchCount=true`
      );
      const { products, totalProducts } = response.data;

      setData(products);
      const calculatedTotalPages = totalProducts
        ? Math.ceil(totalProducts / itemsPerPage)
        : 1;
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on page, debouncedSearch, selectedBrand, or selectedCategory change
  useEffect(() => {
    fetchProducts();
  }, [page, debouncedSearch, selectedBrand, selectedCategory]);

  // Handle product update request
  const handleUpdate = async (productId, updatedMsp, updatedMrp) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("msp", updatedMsp);
      formData.append("mrp", updatedMrp);
      await axios.patch(
        `/api/${storeId}/products/${productId}/mass-edit`,
        formData
      );
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Failed to update product", error);
    } finally {
      setLoading(false);
    }
  };

  // Update product's msp or mrp in state
  const handleChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  if (!isMounted) {
    return null; // Prevents server-side rendering.
  }

  return (
    <div className="max-w-7xl mx-auto px-5 mt-24 pb-20">
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products here."
        />
      </div>
      <Separator className="my-4" />

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="border rounded px-4 py-2"
        />
      </div>
      {loading && <p>Loading...</p>}
      {/* Product List with editable MSP and MRP */}
      {data.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-2 sm:grid-cols-3  gap-1 border p-4 mb-2"
        >
          <div className="flex flex-col">
            <span>{product.name}</span>
            <span>{product.id}</span>
          </div>
          <div className="flex flex-col">
            <Image
              width={100}
              height={100}
              src={product.images[0]}
              alt="image"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <Label htmlFor={`mrp-${product.id}`}>
              MRP &nbsp;
              <input
                id={`mrp-${product.id}`}
                type="number"
                value={product.mrp}
                onChange={(e) =>
                  handleChange(product.id, "mrp", e.target.value)
                }
                className="border rounded px-2 py-1"
                placeholder="MRP"
                min="0" // Prevent negative values
              />
            </Label>
            <Label htmlFor={`msp-${product.id}`}>
              MSP &nbsp;
              <input
                id={`msp-${product.id}`}
                type="number"
                value={product.msp}
                onChange={(e) =>
                  handleChange(product.id, "msp", e.target.value)
                }
                className="border rounded px-2 py-1"
                placeholder="MSP"
                min="0" // Prevent negative values
              />
            </Label>
            <Button
              disabled={loading}
              onClick={() => handleUpdate(product.id, product.msp, product.mrp)}
              className="w-fit"
            >
              Update
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <Button
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <Button
          disabled={page === totalPages || loading}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MassUpdateProducts;
