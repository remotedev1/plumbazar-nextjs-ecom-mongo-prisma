"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import NoResults from "@/components/frontend/no-results";
import ProductCard from "@/components/ui/product-card";
import { SkeletonCard } from "@/components/common/card-skeleton";

const Products = ({ searchParams }) => {
  const [products, setProducts] = useState([]); // Products state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [skip, setSkip] = useState(0); // Pagination: how many products to skip
  const [take] = useState(10); // Pagination: how many products to take per request
  const [searchQuery, setSearchQuery] = useState(searchParams.query || ""); // Search query
  const [selectedBrand, setSelectedBrand] = useState(searchParams.brand || ""); // Selected brand
  const [hasMore, setHasMore] = useState(true); // To track if there are more products to load

  // Function to build query string dynamically
  const buildQueryString = (filter) => {
    const queryParams = Object.keys(filter)
      .filter((key) => filter[key] !== undefined && filter[key] !== "")
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`)
      .join("&");
    return queryParams;
  };

  // Function to fetch products from the API
  const fetchProducts = async (isLoadMore = false) => {
    setLoading(true);

    try {
      const filter = {
        query: searchQuery,
        brand: selectedBrand,
        skip: isLoadMore ? skip : 0, // Increment skip for loading more
        take,
      };

      // Build the query string and make the API request
      const queryString = buildQueryString(filter);
      const response = await axios.get(`/api/search-product?${queryString}`);

      const fetchedProducts = response.data.map((product) => ({
        ...product,
      }));

      if (isLoadMore) {
        setProducts((prev) => [...prev, ...fetchedProducts]); // Append products on load more
      } else {
        setProducts(fetchedProducts); // Replace products on filter/search change
      }

      setHasMore(fetchedProducts.length === take); // Check if there are more products to load
      setSkip((prev) => prev + take); // Update skip for the next "load more"

    } catch (err) {
      setError("Error fetching products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when the component mounts or when filters change
  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedBrand]);

  // Handle search query change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle brand filter change
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("");
  };

  // Load more products
  const handleLoadMore = () => {
    fetchProducts(true); // Fetch products with the "load more" flag
  };

  // If loading, display a spinner
  if (loading && !products.length) {
    return (
      <section className="py-14 relative overflow-x-hidden min-h-[80vh]">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <FaSpinner className="w-10 h-10 mx-auto text-black animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 relative overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-5">
          {/* Sidebar: Search and Brand Filter */}
          <div className="col-span-12 md:col-span-3 max-w-72 mx-auto">
            <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
              <h6 className="font-medium text-base leading-7 text-black mb-5">Search</h6>
              <div className="border-2 focus-within:border-gray-400 rounded-full px-6 py-3 flex">
                <input
                  type="text"
                  placeholder="Search something..."
                  className="w-full text-sm bg-transparent outline-none pr-2"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
            </div>
            <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
              <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                <p className="font-medium text-base leading-7 text-black">Filter By</p>
                <p
                  className="font-medium text-xs text-gray-500 cursor-pointer hover:text-indigo-600"
                  onClick={handleResetFilters}
                >
                  RESET
                </p>
              </div>
              <div>
                <label htmlFor="Brand" className="font-medium text-sm leading-6 text-gray-600 mb-1">
                  Brand
                </label>
                <div className="relative w-full mb-7">
                  <select
                    id="Brand"
                    value={selectedBrand}
                    onChange={handleBrandChange}
                    className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full w-full py-2.5 px-4 bg-white"
                  >
                    <option disabled>Select</option>
                    {/* Map through brand options */}
                    {["Brand1", "Brand2", "Brand3"].map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main content: Products List */}
          <div className="col-span-12 md:col-span-9 mx-auto">
            {error && <p className="text-red-500">{error}</p>}
            {products.length === 0 && !loading && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
              {products.length === 0 && loading
                ? [1, 2, 3, 4, 5].map((item) => <SkeletonCard key={item} />)
                : products.map((product) => <ProductCard key={product.id} data={product} />)}
            </div>

            {/* Load More Button */}
            {hasMore && !loading && (
              <div className="text-center mt-8">
                <button
                  className="bg-indigo-600 text-white py-2 px-4 rounded-full"
                  onClick={handleLoadMore}
                >
                  {loading ? <FaSpinner className="animate-spin" /> : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
