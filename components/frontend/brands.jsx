"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveBrandsCarousel } from "@/lib/variables";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

const brands = [
  { title: "Tiles", imageUrl: "https://placehold.jp/150x150.png" },
  { title: "Electricals", imageUrl: "https://placehold.jp/150x150.png" },
  { title: "Power & Hand Tools", imageUrl: "https://placehold.jp/150x150.png" },
  {
    title: "Plywood & Laminates",
    imageUrl: "https://placehold.jp/150x150.png",
  },
  { title: "Hardware", imageUrl: "https://placehold.jp/150x150.png" },
  { title: "Paints", imageUrl: "https://placehold.jp/150x150.png" },
  { title: "Lighting & Fans", imageUrl: "https://placehold.jp/150x150.png" },
  { title: "Bathroom", imageUrl: "https://placehold.jp/150x150.png" },
  { title: "Plumbing", imageUrl: "https://placehold.jp/150x150.png" },
  { title: "Kitchen", imageUrl: "https://placehold.jp/150x150.png" },
  { title: "Appliances", imageUrl: "https://placehold.jp/150x150.png" },
];

const BrandList = () => {
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
    <div className="relative w-[90vw] mx-auto  my-8">
      <h2 className="text-xl md:text-3xl font-bold text-left mb-10">
        Shop by Brands
      </h2>
      <Carousel
        showDots={false}
        responsive={responsiveBrandsCarousel}
        swipeable
        minimumTouchDrag={80}
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<CustomButtonGroupAsArrows />}
        autoPlay
        autoPlaySpeed={2000}
        shouldResetAutoplay
        pauseOnHover
        infinite
        additionalTransfrom={0}
        itemClass="p-2"
        centerMode={false}
      >
        {brands.map((brand, index) => (
          <div className="flex flex-col items-center" key={index}>
            <div className="w-28 h-28 rounded-md overflow-hidden relative">
              <Image
                src={brand.imageUrl}
                alt={brand.title}
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-md"
              />
            </div>
            <span className="mt-2 text-center font-semibold">
              {brand.title}
            </span>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BrandList;
