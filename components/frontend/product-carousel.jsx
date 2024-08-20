"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveProductCarousel } from "@/lib/variables";
import ProductCard from "./product-card";

const ProductCarousel = ({ productData, title }) => {
  const product = productData
    .map((item) => <ProductCard data={item} key={item.name} />)
    .slice(0, 10);

  return (
    <div className="w-full">
      <h1 className="text-4xl md:text-7xl font-bold mb-5  text-capitalize  text-gray-600">
        {title}
      </h1>
      <Carousel
        showDots={false}
        responsive={responsiveProductCarousel}
        swipeable
        minimumTouchDrag={80}
        autoPlay
        autoPlaySpeed={2000}
        shouldResetAutoplay
        pauseOnHover
        infinite
        additionalTransfrom={0}
        
        centerMode={false}
      >
        {product}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
