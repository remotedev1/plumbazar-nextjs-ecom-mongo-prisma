"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveCategoriesCarousel } from "@/lib/variables";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useData } from "@/providers/data-provider";
import Link from "next/link";

const CategoryList = () => {
  const { categories, loading, error } = useData();

  return (
    <div className="relative px-6 py-2 md:py-8">
      <div className="flex flex-col items-start space-y-4 mb-4 md:mb-8">
        <h2 className="text-md md:text-3xl font-bold text-left ">
          Shop by Categories
        </h2>
      </div>
      <div className="w-[90vw] mx-auto">
        <Carousel
          showDots={false}
          responsive={responsiveCategoriesCarousel}
          swipeable
          minimumTouchDrag={80}
          arrows={false}
          renderButtonGroupOutside={true}
          autoPlay
          autoPlaySpeed={4000}
          shouldResetAutoplay
          pauseOnHover
          infinite
          additionalTransform={0}
          itemClass="p-1"
          centerMode={false}
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              passHref
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-28 md:h-28 rounded-md overflow-hidden relative">
                  <Image
                    // TODO
                    src={category.images[0]}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="rounded-md"
                  />
                </div>
                <span className="mt-2 text-sm md:text-lg text-center font-semibold">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryList;
