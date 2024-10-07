"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveClienteleCarousel } from "@/lib/variables";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useData } from "@/providers/data-provider";

const ClienteleList = () => {
  const { clientele, loading, error } = useData();
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
      <div className="carousel-button-group absolute right-3 top-12 -translate-y-1/2 space-x-1">
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
    <div className="relative px-6 py-8">
      <h1 className="text-2xl md:text-5xl font-bold mb-8 text-gray-600 text-center ">
        Our clients
      </h1>
      <div className="w-[90vw] mx-auto">
        <Carousel
          showDots={false}
          responsive={responsiveClienteleCarousel}
          swipeable
          minimumTouchDrag={80}
          arrows={false}
          renderButtonGroupOutside={true}
          autoPlay
          autoPlaySpeed={3000}
          shouldResetAutoplay
          pauseOnHover
          infinite
          additionalTransform={0}
          itemClass="p-1"
          centerMode={false}
        >
          {clientele.map((client, index) => (
            <div className="flex flex-col items-center" key={index}>
              <div className="w-16 h-16 md:w-28 md:h-28 rounded-md overflow-hidden relative">
                <Image
                  src={client.images[0]}
                  alt={client.name}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="rounded-md"
                />
              </div>
              <span className="mt-2 text-center font-semibold">
                {client.name}
              </span>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ClienteleList;
