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
            <div className="absolute left-0 top-0 h-full border-l-4 border-blue-400"></div>
            {data.map((d, i) => (
              <li key={i} className="pl-6 text-gray-700">
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* "Know more" section at the bottom */}
        <div className="flex justify-center mt-8">
          <div className="relative group">
            <Link href="/why-us">
              <span className="text-gray-400 cursor-pointer">Learn more</span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-black text-white text-xs py-2 px-3 rounded-md shadow-lg">
                Click to learn more 
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
