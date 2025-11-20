"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Billboard = ({ data }) => {
  // ✅ Safely handle null/undefined data
  if (!data || data.length === 0) {
    return (
      <div className="relative w-full h-[22vh] md:h-[35vh] lg:h-[60vh] flex items-center justify-center bg-gray-100 text-gray-500">
        No banners available
      </div>
    );
  }

  const billboardData = data.map((billboard) => ({
    id: billboard.id,
    action: billboard.action ?? "#",
    images: billboard.images ?? [],
  }));

  const responsive = {
    mobile: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  const CustomButtonGroupAsArrows = ({ next, previous, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="carousel-button-group absolute -bottom-[1.69rem] md:-bottom-2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-x-1">
        <Button
          className={cn(
            "hover:bg-slate-100 bg-transparent rounded-full text-black",
            currentSlide === 0 && "opacity-50 pointer-events-none"
          )}
          onClick={previous}
        >
          <ChevronsLeft className="w-8 h-8 md:w-10 md:h-10" />
        </Button>
        <Button
          className="hover:bg-slate-100 bg-transparent rounded-full text-black"
          onClick={next}
        >
          <ChevronsRight className="w-8 h-8 md:w-10 md:h-10" />
        </Button>
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <Carousel
        responsive={responsive}
        showDots={false}
        swipeable
        minimumTouchDrag={80}
        arrows={false}
        renderButtonGroupOutside
        customButtonGroup={<CustomButtonGroupAsArrows />}
        autoPlay
        autoPlaySpeed={3000}
        shouldResetAutoplay
        pauseOnHover
        infinite
        additionalTransfrom={0}
        centerMode={false}
      >
        {billboardData.map((item, index) => (
          <div
            key={item.id ?? index}
            className="relative h-[22vh] md:h-[35vh] lg:h-[60vh] w-full pb-3"
          >
            <Link href={item.action} className="w-full h-full block">
              <div className="relative w-full h-full">
                {item.images && item.images.length > 0 ? (
                  <Image
                    src={item.images[0]}
                    alt={`Banner ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-contain object-center"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Billboard;
