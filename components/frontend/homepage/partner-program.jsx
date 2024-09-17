import React from "react";

const data = [
  "Cashbacks and vouchers",
  "Special discounts",
  "Priority checkout and deliveries",
  "Free Market Access",
  "Revenue Generation programs",
  "Commission-Based Revenue Model",
  "Boosting Sales of Vendors and service providers",
  "Vendor Management & Retention",
  "Market Development by driving progress for all stakeholders",
];

export const PartnerProgram = () => {
  return (
    <section  className="bg-gray-50 py-10">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-5xl font-bold mb-5 text-gray-600">Plumbazar Partner Program</h2>
          <p className="text-lg text-gray-500">
            Plumbazar Partner Program for Contractors, Architects, Electricians & Plumbers
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
