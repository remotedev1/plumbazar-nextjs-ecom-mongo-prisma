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
        arrows={false}
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
            className="relative h-[30vh] sm:h-[50vh] lg:h-[90vh] w-full"
          >
            {/* Wrapper div to maintain aspect ratio */}
            <Link href={item.action} className="w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={item.images[0]} // Use the first image from the array
                  alt={`Banner ${index + 1}`}
                  fill
                  priority={true} // Priority loading for the first images
                  quality={100}
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizing for better image loading
                />
              </div>
            </Link>
          </div>
        ))}
      </Carousel>

      {/* SVG wave effect */}
      <div className="absolute -bottom-8 left-0 right-0">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L80,170.7C160,181,320,203,480,208C640,213,800,203,960,181.3C1120,160,1280,128,1360,112L1440,96V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Billboard;
