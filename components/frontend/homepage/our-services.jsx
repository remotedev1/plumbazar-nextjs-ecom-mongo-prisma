import Link from "next/link";
import React from "react";

const services = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8V3m0 5l2 2m-4 0l2-2m-6 5h2m2-2h4m2 2h2M4 13h16"
        />
      </svg>
    ),
    title: "Construction Material Procurement",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
    title: "Vendor Management",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 3.75l6.5 6.5m-6.5 0L3.25 17.75m6.5 0l6.5-6.5"
        />
      </svg>
    ),
    title: "Logistics",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 6h18M3 10h18M10 14h12M3 18h6"
        />
      </svg>
    ),
    title: "Same Day Delivery (Local Orders)",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 12h12m-6-6v12"
        />
      </svg>
    ),
    title: "Plumbing & Electrical Services",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v-2m0 8v2m0-8l-2 2m2-2l2 2"
        />
      </svg>
    ),
    title: "Ease of Access (App & Web Platform)",
  },
];

const OurServices = () => {
  return (
    <div className="pt-[2rem] pb-8 ">
      <div className="relative flex flex-col justify-center items-center mb-5">
        <h2 className="text-2xl md:text-5xl font-bold text-gray-600 text-center">
          Our Services
        </h2>
        <div className="ml-2 relative group">
          <Link href="/our-services">
            <span className="text-gray-400 cursor-pointer">Know more</span>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-black text-white text-xs py-2 px-3 rounded-md shadow-lg">
              Click to learn more
            </div>
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 px-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-2 md:p-6 text-center bg-white shadow-lg"
          >
            {service.icon}
            <h3 className="mt-4 text-sm md:text-lg font-semibold">
              {service.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
