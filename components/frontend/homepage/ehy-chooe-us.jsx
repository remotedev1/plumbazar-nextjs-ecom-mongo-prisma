import React from "react";

const data = [
  "Material Sourcing and Estimation",
      "Augmented Reality based Product Showcase with Mobile Devices",
      "Transparent Cost Comparison of brands",
      "RFPs for Personalized Material Estimations and Bulk Inquiries",
      "No Minimum Order Quantity"
];

export const WhyChooseUs = () => {
  return (
    <section  className=" pb-10">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-5xl font-bold mb-5 text-gray-600">Why choose us?</h2>
          <p className="text-lg text-gray-500">
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
      </div>
    </section>
  );
};
