"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/actions/get-products";
import ProductList from "@/components/frontend/product-list";
import { getBrands } from "@/actions/get-brands";
import { FaSpinner } from "react-icons/fa";
import NoResults from "@/components/frontend/no-results";
import { SkeletonCard } from "@/components/common/card-skeleton";
import ProductCard from "@/components/ui/product-card";

const Products = ({ searchParams }) => {
  // State variables to manage search query, selected brand, selected color, products, brands, and colors
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(searchParams.brand || "");
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  // Fetch products, brands, and colors from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedProducts = await getProducts({ isFeatured: true });
      const fetchedBrands = await getBrands();
      setProducts(fetchedProducts);
      setBrands(fetchedBrands);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Event handler for search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Event handler for brand selection change
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  // Event handler to reset selected brand and color filters
  const handleResetFilters = () => {
    setSelectedBrand("");
  };

  // Filter products based on search query, selected brand, and selected color
  const filteredProducts = products.filter(
    (product) =>
      (searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedBrand === "" || product.brand.name === selectedBrand)
  );

  if (isLoading) {
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
          <div className="col-span-12 md:col-span-3 max-w-72 mx-auto">
            <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
              <h6 className="font-medium text-base leading-7 text-black mb-5">
                Search
              </h6>

              <div className=" border-2 focus-within:border-gray-400 rounded-full px-6 py-3 overflow-hidden flex">
                <input
                  type="text"
                  placeholder="Search something..."
                  className="w-full text-sm bg-transparent outline-none pr-2"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="16px"
                  className="cursor-pointer fill-gray-600"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                </svg>
              </div>
            </div>
            <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
              <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                <p className="font-medium text-base leading-7 text-black ">
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
                    <option selected="" disabled>
                      select
                    </option>

                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>

                  <svg
                    className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                      stroke="#111827"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 mx-auto">
            {products.length === 0 && <NoResults />}
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mx-auto">
              {products.length > !0
                ? [1, 2, 3, 4, 5].map((item) => <SkeletonCard key={item} />)
                : products.map((item) => (
                    <>
                      <ProductCard key={item.id} data={item} />
                    </>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
