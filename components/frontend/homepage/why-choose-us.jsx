import Link from "next/link";
import React from "react";

const data = [
  "Material Sourcing and Estimation",
  "Augmented Reality based Product Showcase with Mobile Devices",
  "Transparent Cost Comparison of brands",
  "RFPs for Personalized Material Estimations and Bulk Inquiries",
  "No Minimum Order Quantity",
  "Construction Project Management feature to cater end to end solutions",
  "Credit Request on Purchases",
  "Renovation Assistance",
  "Construction Consulting and Contract Services",
];

export const WhyChooseUs = () => {
  return (
    <section className="pb-5">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-5 text-center">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-600">
            Why choose us?
          </h2>
          <p className="text-lg text-gray-500 mt-2">
            Introducing Plumbazar&apos;s Comprehensive Online Platform Features
          </p>
        </div>

        {/* List of Program Benefits */}
        <div className="flex justify-center">
          <ul className="list-none space-y-4 text-left w-full max-w-lg relative">
            <div className="absolute left-0 top-0 h-full"></div>
            {data.map((item, i) => (
              <li
                key={i}
                className="pl-6 text-gray-700 flex items-center relative group"
              >
                <svg
                  className="w-2 h-2 me-2 text-primary flex-shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="4" />
                </svg>
                <Link href="/why-us">
                  <span className="text-gray-700 cursor-pointer hover:bg-primary hover:text-white hover:p-1 transition-all duration-300">
                    {item}
                  </span>
                </Link>
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-black text-white text-xs py-2 px-3 rounded-md shadow-lg">
                  Click to know more
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
