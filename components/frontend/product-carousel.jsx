"use client";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios"; // Ensure axios is imported
import { responsiveProductCarousel } from "@/lib/variables";
import ProductCard from "./product-card";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductCarousel = ({ title, filter }) => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to build query parameters
  const buildQueryString = (filter) => {
    const queryParams = new URLSearchParams();

    // Loop through the filter object and append non-empty values
    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        queryParams.append(key, filter[key]);
      }
    });

    return queryParams.toString(); // Returns query string like "category=bathroom&name=shower"
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // Build the query string dynamically based on the filter
        const queryString = buildQueryString(filter);

        // Use the dynamic query string in the API request
        const response = await axios.get(`/api/search-product?${queryString}`);
        const products = response.data.map((product) => ({
          ...product,
        }));

        setFetchedProducts(products);
      } catch (err) {
        setError("Error fetching products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (filter) {
      fetchProducts();
    }
  }, [filter]);

  // Handle error
  if (error) {
    return <div>{error}</div>;
  }

  const productsToDisplay = fetchedProducts;

  const product = productsToDisplay
    .map((item) => <ProductCard data={item} key={item.id} />)
    .slice(0, 10); // Limit products to 10 for carousel

  const CustomButtonGroupAsArrows = ({
    next,
    previous,
    goToSlide,
    ...rest
  }) => {
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
    <div className="relative  my-8">
      <h2 className="text-xl md:text-3xl font-bold text-left mb-10">{title}</h2>

      {loading && <div className="text-center">Loading products...</div>}

      <div className="w-[95vw] mx-auto">
        <Carousel
          showDots={false}
          responsive={responsiveProductCarousel}
          swipeable
          minimumTouchDrag={80}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<CustomButtonGroupAsArrows />}
          autoPlay
          autoPlaySpeed={5000}
          shouldResetAutoplay
          pauseOnHover
          infinite
          additionalTransfrom={0}
          itemClass="p-1 "
          centerMode={false}
        >
          {product}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
