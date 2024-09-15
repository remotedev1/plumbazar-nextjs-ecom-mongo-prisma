"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/actions/get-products";
import ProductCard from "@/components/ui/product-card";
import { FaSpinner } from "react-icons/fa";
import NoResults from "@/components/frontend/no-results";
import { SkeletonCard } from "@/components/common/card-skeleton";

const Products = ({ searchParams }) => {
  // State for managing filters and pagination
  const [searchQuery, setSearchQuery] = useState(searchParams.query || "");
  const [selectedBrand, setSelectedBrand] = useState(searchParams.brand || "");
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const take = 10; // Number of products to load per request

  // Fetch products from the API with pagination
  const fetchProducts = async (isLoadMore = false) => {
    setIsLoading(true);
    try {
      const fetchedProducts = await getProducts({
        query: searchQuery,
        brand: selectedBrand,
        skip,
        take,
      });
      if (isLoadMore) {
        setProducts((prev) => [...prev, ...fetchedProducts]); // Append more products on load more
      } else {
        setProducts(fetchedProducts); // Replace products on filter/search change
      }
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch brands and initial products on mount or when search parameters change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Fetch initial products based on query params
      await fetchProducts();
      const fetchedBrands = await getBrands();
      setBrands(fetchedBrands);
      setIsLoading(false);
    };
    fetchData();
  }, [searchQuery, selectedBrand]);

  // Event handler for search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSkip(0); // Reset pagination when a new search is initiated
  };

  // Event handler for brand selection change
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSkip(0); // Reset pagination when brand filter is changed
  };

  // Event handler for "Load More" button click
  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + take); // Increment skip value
    fetchProducts(true); // Fetch next set of products
  };

  // Event handler to reset filters
  const handleResetFilters = () => {
    setSelectedBrand("");
    setSearchQuery("");
    setSkip(0);
    fetchProducts(); // Reset and refetch products
  };

  return (
    <section className="py-14 relative overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-5">
          {/* Filters Sidebar */}
          <div className="col-span-12 md:col-span-3 max-w-72 mx-auto">
            <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
              <h6 className="font-medium text-base leading-7 text-black mb-5">
                Search
              </h6>
              <div className="border-2 focus-within:border-gray-400 rounded-full px-6 py-3 overflow-hidden flex">
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
                  className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-indigo-600"
                  onClick={handleResetFilters}
                >
                  RESET
                </p>
              </div>
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
                    className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
                  >
                    <option disabled value="">
                      Select
                    </option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-span-12 md:col-span-9 mx-auto">
            {products.length === 0 && !isLoading && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
              {isLoading && products.length === 0
                ? [1, 2, 3, 4, 5].map((item) => <SkeletonCard key={item} />)
                : products.map((item) => <ProductCard key={item.id} data={item} />)}
            </div>
            {products.length > 0 && !isLoading && (
              <button
                className="mt-8 btn btn-primary w-full"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
