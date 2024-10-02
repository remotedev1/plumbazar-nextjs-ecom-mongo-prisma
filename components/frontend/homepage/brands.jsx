"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveBrandsCarousel } from "@/lib/variables";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useData } from "@/providers/data-provider";

const BrandList = () => {
  const { brands, loading, error } = useData();
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
      <div className="carousel-button-group absolute right-3 top-12 -translate-y-1/2 space-x-1 ">
        <Button
          className={cn(
            "bg-slate-100 text-black",
            currentSlide === 0 ? "disable" : ""
          )}
          onClick={() => previous()}
        >
          <ChevronsLeft />
        </Button>
        <Button
          className={cn("bg-slate-100 text-black", "")}
          onClick={() => next()}
        >
          <ChevronsRight />
        </Button>
      </div>
    );
  };

  return (
    <div className="relative  px-6 py-8">
      <div className="flex flex-col items-start space-y-4 mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-left ">
          Shop by Brands
        </h2>
      </div>

      <div className="w-[95vw] mx-auto">
        <Carousel
          showDots={false}
          responsive={responsiveBrandsCarousel}
          swipeable
          minimumTouchDrag={80}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<CustomButtonGroupAsArrows />}
          autoPlay
          autoPlaySpeed={3000}
          shouldResetAutoplay
          pauseOnHover
          infinite
          additionalTransfrom={0}
          itemClass="p-2"
          centerMode={true}
        >
          {brands.map((brand, index) => (
            <div className="flex flex-col items-center" key={index}>
              <div className="w-16 h-16 md:w-24 md:h-20 rounded-md overflow-hidden relative">
                <Image
                  src={brand.images[0]}
                  alt={brand.name}
                  layout="fill"
                  quality={100}
                  className="rounded-md object-fill object-center"
                />
              </div>
              <span className="mt-2 text-center text-sm md:text-md font-semibold">
                {brand.name}
              </span>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BrandList;
