"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Billboard = ({ data }) => {
  const billboardData = data.map((billboard) => ({
    id: billboard.id,
    action: billboard.action,
    images: billboard.images,
  }));

  // Define responsive behavior for the carousel
  const responsive = {
    mobile: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

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
      <div className="carousel-button-group absolute -bottom-[1.69rem] md:-bottom-2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-x-1 ">
        <Button
          className={cn(
            "hover:bg-slate-100 bg-transparent rounded-full text-black",
            currentSlide === 0 ? "disable" : ""
          )}
          onClick={() => previous()}
        >
          <ChevronsLeft className="w-8 h-8 md:w-10 md:h-10"/>
        </Button>
        <Button
          className={cn("hover:bg-slate-100 bg-transparent rounded-full text-black", "")}
          onClick={() => next()}
        >
          <ChevronsRight  className="w-8 h-8 md:w-10 md:h-10"/>
        </Button>
      </div>
    );
  };

  return (
    <div className="relative w-full ">
      <Carousel
        responsive={responsive}
        showDots={false}
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
        itemClass=""
        centerMode={false}
      >
        {billboardData.map((item, index) => (
          <div
            key={index}
            className="relative h-[22vh] md:h-[35vh] lg:h-[60vh] w-full pb-3"
          >
            {/* Wrapper div to maintain aspect ratio */}
            <Link href={item.action} className="w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={item.images[0]} // Use the first image from the array
                  alt={`Banner ${index + 1}`}
                  fill
                  priority={true} // Priority loading for the first images
                  className="object-contain object-center"
                />
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Billboard;
