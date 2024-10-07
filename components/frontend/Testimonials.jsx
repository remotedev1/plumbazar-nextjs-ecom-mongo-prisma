"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Container from "../ui/container";
import { responsiveTestimonialsCarousel } from "@/lib/variables";
import { useData } from "@/providers/data-provider";

export const Testimonials = () => {
  const { testimonials, loading, error } = useData();
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

          {loading ? (
            <div className="text-center text-gray-600">
              Loading testimonials...
            </div>
          ) : (
            <div className="max-w-[95vw]">
              <Carousel
                responsive={responsiveTestimonialsCarousel}
                swipeable
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
        <div className="flex justify-center">
          <video
            width="800"
            height="450"
            controls
            className="max-w-full rounded-md"
          >
            <source src="https://youtu.be/PmYocEA5gsU" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Container>
    </div>
  );
};
