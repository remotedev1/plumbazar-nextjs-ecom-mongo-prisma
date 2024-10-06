"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";

// Helper function to build the query string
const buildQueryString = (filter) => {
  const params = new URLSearchParams();
  if (filter.query) params.append("query", filter.query);
  if (filter.brand) params.append("brand", filter.brand);
  if (filter.category) params.append("category", filter.category);
  params.append("skip", filter.skip);
  params.append("take", filter.take);
  return params.toString();
};

const ProductsClient = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Pagination state
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [totalProducts, setTotalProducts] = useState(0); // Total product count
  const [searchTerm, setSearchTerm] = useState(""); // Search term from input
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced search term
  const [selectedBrand, setSelectedBrand] = useState(null); // Brand filter state
  const [selectedCategory, setSelectedCategory] = useState(null); // Category filter state

  const router = useRouter();
  const params = useParams();
  const itemsPerPage = 100; // Number of products per page

  // Debounce search term to avoid excessive API calls while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to the first page when the search term changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch products when page, debounced search, brand, or category changes
  useEffect(() => {
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
        const response = await axios.get(`/api/search-product?${queryString}&fetchCount=true`);

        const { products, totalProducts } = response.data;

        setData(products); // Set fetched products
        setTotalProducts(totalProducts || 0); // Set the total product count

        // Calculate total pages
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

    fetchProducts();
  }, [page, debouncedSearch, selectedBrand, selectedCategory]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${totalProducts})`} // Show actual total product count
          description="Manage products for your store."
        />

        <Button
          onClick={() =>
            router.push(`/dashboard/${params.storeId}/products/new`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      {/* Search Input and Button */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="border rounded px-4 py-2"
        />
        <Button onClick={() => setPage(1)}>Search</Button>
      </div>

      {/* Render the DataTable component */}
      <DataTable searchKey="name" columns={columns} data={data} />

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <Button
          disabled={page === totalPages || totalPages === 0} // Disable next if no more pages
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </div>

      {loading && <p>Loading...</p>}
    </>
  );
};

export default ProductsClient;
