"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Container from "../ui/container";
import { responsiveTestimonialsCarousel } from "@/lib/variables";
import { useData } from "@/providers/data-provider";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Testimonials = () => {
  const { testimonials, loading, error } = useData();

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
      <div className="carousel-button-group w-full flex justify-between items-center absolute top-1/3 transform -translate-y-1/2 px-4 ">
        <Button
          className={cn(
            "bg-slate-100 text-white hover:text-black",
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

  // Define responsive behavior for the carousel
  const responsive = {
    mobile: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="min-w-screen flex items-center justify-center py-8 md:py-16">
      <Container>
        <div className="w-full px-5 text-gray-800">
          <div className="text-center mx-auto">
            <h1 className="text-2xl md:text-5xl font-bold mb-5 text-gray-600">
              What people <br />
              are saying.
            </h1>
          </div>
          <div className="max-w-[80vw] mx-auto overflow-hidden relative">
            <Carousel
              responsive={responsive}
              showDots={false}
              swipeable
              minimumTouchDrag={80}
              arrows={false}
              renderButtonGroupOutside={true}
              customButtonGroup={<CustomButtonGroupAsArrows />}
              shouldResetAutoplay
              pauseOnHover
              infinite
              additionalTransform={0}
              itemClass="p-1"
              centerMode={false}
            >
              <div className="relative pb-[56.25%] h-[5rem]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  src="https://www.youtube.com/embed/jU3bKjckvLs?rel=0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>

              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  src="https://www.youtube.com/embed/h9Dz2A5m4X4?rel=0"
                  title="Aadith Charan, Founder - A N Constructions"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </Carousel>
          </div>

          {loading ? (
            <div className="text-center text-gray-600">
              Loading testimonials...
            </div>
          ) : (
            <div className="max-w-[95vw]">
              <Carousel
                responsive={responsiveTestimonialsCarousel}
                swipeable
                arrows={false}
                autoPlay
                autoPlaySpeed={5000}
                pauseOnHover
                infinite
                itemClass="p-2"
              >
                {testimonials.map((d, i) => (
                  <div className="px-3" key={`${d.name}-${i}`}>
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                      <div className="w-full flex mb-4 items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg
                              className="absolute w-12 h-12 text-gray-400 -left-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="flex-grow pl-3">
                          <div className="mt-3 text-lg font-semibold">
                            {d.name}
                          </div>
                          <div>
                            {d.organization},{" "}
                            {d.designation !== "undefined" && d.designation}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="relative px-5">
                          <div className="overflow-hidden">
                            <p className="mb-0 font-italic text-[10px] sm:text-sm md:text-md select-none">
                              {d.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
