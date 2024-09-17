"use client";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { responsiveProductCarousel } from "@/lib/variables";
import ProductCard from "./product-card";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SkeletonCard } from "../common/card-skeleton";

const ProductCarousel = ({ title, filter }) => {
  const [fetchedProducts, setFetchedProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Helper function to build query parameters based on filter object
  const buildQueryString = (filter) => {
    const queryParams = new URLSearchParams();

    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        queryParams.append(key, filter[key]); // Append non-empty values
      }
    });

    return queryParams.toString(); // Returns a query string for the API
  };

  useEffect(() => {
    // Function to fetch products based on filter criteria
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before the request

      try {
        const queryString = buildQueryString(filter); // Build query string dynamically
        const response = await axios.get(`/api/search-product?${queryString}`); // Fetch products from the API

        const products = response.data.products.map((product) => ({
          ...product,
        }));

        setFetchedProducts(products); // Update the state with fetched products
      } catch (err) {
        setError("Error fetching products"); // Handle errors
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false); // Set loading to false when the request is done
      }
    };

    if (filter) {
      fetchProducts(); // Trigger fetch when the filter is available
    }
  }, [filter]);

  // Handle error display
  if (error) {
    return <div>{error}</div>;
  }

  // // Handle loading state
  // if (loading) {
  //   return <div className="text-center">Loading products...</div>;
  // }

  // Limit products to 10 for carousel display
  const productsToDisplay = fetchedProducts;

  // Define custom arrow buttons for carousel navigation
  const CustomButtonGroupAsArrows = ({ next, previous, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="carousel-button-group absolute right-3 top-5 -translate-y-1/2 space-x-1">
        <Button
          className={cn(
            "bg-slate-100 text-black hover:text-white",
            currentSlide === 0 ? "disable" : ""
          )}
          onClick={() => previous()}
        >
          <ChevronsLeft />
        </Button>
        <Button
          className={cn("bg-slate-100 text-black hover:text-white", "")}
          onClick={() => next()}
        >
          <ChevronsRight />
        </Button>
      </div>
    );
  };

  return (
    <div className="relative my-8">
      {/* Carousel Title */}
      <h2 className="text-xl md:text-3xl font-bold text-left mb-10">{title}</h2>

      <div className="w-[95vw] mx-auto">
        {/* Carousel Component */}
        <Carousel
          showDots={false}
          responsive={responsiveProductCarousel}
          swipeable
          minimumTouchDrag={80}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<CustomButtonGroupAsArrows />} // Custom arrow buttons
          autoPlay
          autoPlaySpeed={5000}
          shouldResetAutoplay
          pauseOnHover
          infinite
          additionalTransfrom={0}
          itemClass="p-1"
          centerMode={false}
        >
          {/* Map through products and display them in the carousel */}

          {loading &&
            !productsToDisplay &&
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          {productsToDisplay.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
