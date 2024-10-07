"use client";
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

  return (
    <div className="relative w-full ">
      <Carousel
        responsive={responsive}
        showDots={false}
        swipeable
        minimumTouchDrag={80}
        arrows={true}
        autoPlay
        autoPlaySpeed={5000}
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
            className="relative h-[20vh] md:h-[40vh] lg:h-[80vh] w-full"
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
