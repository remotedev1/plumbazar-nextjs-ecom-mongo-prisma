"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import NoResults from "@/components/frontend/no-results";
import { SkeletonCard } from "@/components/common/card-skeleton";
import { useDebounce } from "@/hooks/useDebounce"; // Import the debounce hook
import ProductCard from "@/components/frontend/product-card";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const ProductsList = ({ searchParams, brands, categories }) => {
  const [products, setProducts] = useState([]); // Products state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [skip, setSkip] = useState(0); // Pagination: how many products to skip
  const [take] = useState(10); // Pagination: how many products to take per request
  const [searchQuery, setSearchQuery] = useState(searchParams.query || ""); // Search query
  const [selectedBrand, setSelectedBrand] = useState(searchParams.brand || ""); // Selected brand
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.category || ""
  ); // Selected category
  const [hasMore, setHasMore] = useState(true); // To track if there are more products to load

  // Debounced search query
  const debouncedSearch = useDebounce(searchQuery, 500); // Debounce the search query with 500ms delay

  // Function to build query string dynamically
  const buildQueryString = (filter) => {
    const queryParams = Object.keys(filter)
      .filter((key) => filter[key] !== undefined && filter[key] !== "")
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`
      )
      .join("&");
    return queryParams;
  };

  // Function to fetch products from the API
  const fetchProducts = async (isLoadMore = false) => {
    setLoading(true); // Set loading to true while fetching

    try {
      const filter = {
        query: debouncedSearch, // Use debounced search query
        brand: selectedBrand,
        category: selectedCategory,
        skip: isLoadMore ? skip : 0, // If loading more, skip previously loaded products
        take,
      };

      // Build the query string and make the API request
      const queryString = buildQueryString(filter);
      const response = await axios.get(`/api/search-product?${queryString}`);

      const { products: fetchedProducts, hasMore: apiHasMore } = response.data;

      if (isLoadMore) {
        setProducts((prev) => [...prev, ...fetchedProducts]); // Append products when loading more
        setSkip((prev) => prev + fetchedProducts.length); // Update skip for pagination
      } else {
        setProducts(fetchedProducts); // Replace products on filter/search change
        setSkip(fetchedProducts.length); // Reset skip when filters change
      }

      // Update hasMore state based on API response
      setHasMore(apiHasMore);
    } catch (err) {
      setError("Error fetching products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Fetch products when the component mounts or when filters or debounced search change
  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, selectedBrand, selectedCategory]); // Now watching debouncedSearch instead of searchQuery

  // Handle search query change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery state
  };

  // Handle brand filter change
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("");
    setSelectedCategory("");
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
    <section className="py-8 overflow-x-hidden">
      <div className="w-full  mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-4">
        {/* Sidebar: Search, Brand, and Category Filter */}
        <div className="hidden md:block col-span-12 md:col-span-3 max-w-72 mx-auto ">
          <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
            <h6 className="font-medium text-base leading-7 text-black mb-5">
              Search
            </h6>
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
              <p className="font-medium text-base leading-7 text-black">
                Filter By
              </p>
              <p
                className="font-medium text-xs text-gray-500 cursor-pointer hover:text-indigo-600"
                onClick={handleResetFilters}
              >
                RESET
              </p>
            </div>

            {/* Brand Filter */}
            <div>
              <label
                htmlFor="Brand"
                className="font-medium text-sm leading-6 text-gray-600 mb-1"
              >
                Brand
              </label>
              <div className="relative w-full mb-7">
                <select
                  id="Brand"
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full w-full py-2.5 px-4 bg-white"
                >
                  <option disabled>Select Brand</option>
                  {/* Map through brand options */}
                  {brands.map((brand) => (
                    <option key={brand.name} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label
                htmlFor="Category"
                className="font-medium text-sm leading-6 text-gray-600 mb-1"
              >
                Category
              </label>
              <div className="relative w-full mb-7">
                <select
                  id="Category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full w-full py-2.5 px-4 bg-white"
                >
                  <option disabled>Select Category</option>
                  {/* Map through category options */}
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* //mobile view */}
        <div className="md:hidden mx-auto ">
          <Drawer>
            <DrawerTrigger  asChild>
              <Button variant="outline">Open filter</Button>
            </DrawerTrigger >
            <DrawerContent className="h-[90vh] w-full bg-primary/30 shadow-2xl">
              <div className="w-[70vw] mx-auto mt-4">
                <div className=" rounded-xl  bg-white p-6 w-full md:max-w-sm">
                  <h6 className="font-medium text-base leading-7  text-black mb-5">
                    Search
                  </h6>
                  <div className="border-2 focus-within:border-gray-400 rounded-full px-6 py-3 flex">
                    <input
                      type="text"
                      placeholder="Search something..."
                      className="w-full text-sm outline-none pr-2 text-slate-600"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                </div>
                <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
                  <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                    <p className="font-medium text-base leading-7 text-black">
                      Filter By
                    </p>
                    <p
                      className="font-medium text-xs text-gray-500 cursor-pointer hover:text-indigo-600"
                      onClick={handleResetFilters}
                    >
                      RESET
                    </p>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <label
                      htmlFor="Brand"
                      className="font-medium text-sm leading-6 text-gray-600 mb-1"
                    >
                      Brand
                    </label>
                    <div className="relative w-full mb-7">
                      <select
                        id="Brand"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full w-full py-2.5 px-4 bg-white"
                      >
                        <option disabled>Select Brand</option>
                        {/* Map through brand options */}
                        {brands.map((brand) => (
                          <option key={brand.name} value={brand.name}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label
                      htmlFor="Category"
                      className="font-medium text-sm leading-6 text-gray-600 mb-1"
                    >
                      Category
                    </label>
                    <div className="relative w-full mb-7">
                      <select
                        id="Category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full w-full py-2.5 px-4 bg-white"
                      >
                        <option disabled>Select Category</option>
                        {/* Map through category options */}
                        {categories.map((category) => (
                          <option key={category.name} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="flex-1">
          {/* Main content: Products List */}
          {products.length === 0 && !loading ? (
            <NoResults />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {loading && products.length === 0
                ? [...Array(10).keys()].map((i) => <SkeletonCard key={i} />)
                : products.map((product) => (
                    <ProductCard key={product.id} data={product} />
                  ))}
            </div>
          )}
          {/* Load More Button */}
          {hasMore && products.length > 0 && (
            <div className="mt-10 text-center">
              <button
                onClick={handleLoadMore}
                className="btn btn-outline bg-primary w-44 text-white p-4 rounded-sm shadow-sm"
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin" /> : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsList;
