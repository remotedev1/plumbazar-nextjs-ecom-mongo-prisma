import Container from "@/components/ui/container";
import Link from "next/link";
import React from "react";

const data = [
  { title: "Cashbacks and vouchers" },
  { title: "Special discounts" },
  { title: "Priority checkout and deliveries" },
  { title: "Free Market Access" },
  { title: "Revenue Generation programs" },
  {
    title: "Commission-Based Revenue Model",
  },
  { title: "Boosting Sales of Vendors and service providers" },
  { title: "Vendor Management & Retention" },
  { title: "Market Development by driving progress for all stakeholders" },
];

export const PartnerProgram = () => {
  return (
    <div className="bg-gray-50  py-8 md:py-16">
      <Container>
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-5xl font-bold mb-5 text-gray-600">
            Plumbazar Partner Program
          </h2>
          <p className="text-lg text-gray-500">
            Plumbazar Partner Program for Contractors, Architects, Electricians
            & Plumbers
          </p>
        </div>

        {/* List of Program Benefits */}
        <div className="flex justify-center">
          <ul className="list-none space-y-4 text-left w-full max-w-lg relative">
            <div className="absolute left-0 top-0 h-full "></div>
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
                <Link href="/partner-program">
                  <span className="text-gray-700 cursor-pointer hover:bg-primary hover:text-white hover:p-1 transition-all duration-300">
                    {item.title}
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
      </Container>
    </div>
  );
};
