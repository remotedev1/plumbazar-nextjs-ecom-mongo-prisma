import Link from "next/link";
import { FaWarehouse } from "react-icons/fa";

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
          strokeWidth="2"
          d="M3 3h2l.5 2h15a1 1 0 0 1 .95 1.31l-1.28 4.68a2 2 0 0 1-1.95 1.5H7.12m5.88 5H9a2 2 0 1 1-4 0m8 0a2 2 0 1 1-4 0m2-12h2l3 3m-6 0h3m-3-3v3"
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
    <div className=" py-8 md:py-16">
      <div className="relative flex flex-col justify-center items-center mb-5">
        <h2 className="text-2xl md:text-5xl font-bold text-gray-600 text-center">
          Our Services
        </h2>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 px-4">
        {services.map((service, index) => (
          <Link key={index} href="/our-services">
            <div className="border border-gray-200 rounded-lg p-2 md:p-6 text-center bg-white shadow-lg  cursor-pointer hover:scale-105 hover:shadow-primary/20  transition-all duration-300">
              {service.icon}
              <h3 className="mt-4 text-sm md:text-lg font-semibold">
                {service.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
