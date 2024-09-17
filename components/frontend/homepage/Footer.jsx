import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const whyUsFeatures = [
  {
    title: "Material Sourcing and Estimation",
    description:
      "Plumbazar provides an extensive catalog of construction materials, from cement to electrical fixtures.",
    points: [
      "Browse products from multiple brands and suppliers",
      "Built-in estimation tool for accurate project planning",
    ],
    benefits:
      "Eliminates guesswork, helping customers plan their budget efficiently.",
  },
  {
    title: "AR Based Product Showcase",
    description:
      "Use AR to visualize products like tiles, paint colors, and fixtures in your space before purchase.",
    points: [
      "See 3D renderings overlaid on your environment",
      "Reduce returns and dissatisfaction",
    ],
    benefits:
      "Helps customers make more informed decisions with interactive experiences.",
  },
  {
    title: "Transparent Cost Comparison",
    description:
      "Compare products and prices from various brands side by side.",
    points: [
      "Filter and sort products based on price, quality, and reputation",
      "Detailed product specifications and reviews",
    ],
    benefits: "Ensures the best value for money and fosters trust.",
  },
  {
    title: "RFPs for Material Estimations",
    description:
      "Submit RFPs for personalized estimates or bulk purchasing options.",
    points: [
      "Connect with suppliers for customized quotes",
      "Competitive pricing tailored to project needs",
    ],
    benefits: "Ideal for larger construction projects or bulk purchases.",
  },
  {
    title: "No Minimum Order Quantity",
    description:
      "Order exactly what you need, whether it’s a single item or a bulk order.",
    points: [
      "No minimum order requirements",
      "Beneficial for small-scale or last-minute projects",
    ],
    benefits: "Reduces wastage and costs for efficient project management.",
  },
  {
    title: "Construction Project Management",
    description:
      "A comprehensive project management tool to streamline the construction process.",
    points: [
      "Create timelines, assign tasks, track progress, and manage budgets",
      "Integrated material sourcing and estimation",
    ],
    benefits:
      "Enhances efficiency and ensures projects are completed on time and within budget.",
  },
  {
    title: "Credit Request on Purchases",
    description:
      "Apply for credit through the platform and purchase on payment plans.",
    points: ["Flexible financing options", "Ease cash flow for large projects"],
    benefits: "Allows projects to proceed without full upfront payment.",
  },
  {
    title: "Renovation Assistance",
    description:
      "Expert consultation for renovation projects, from material selection to budget planning.",
    points: [
      "Get advice on the latest trends and efficient material usage",
      "Comprehensive support for successful outcomes",
    ],
    benefits: "Ensures expertise and satisfaction in renovation projects.",
  },
  {
    title: "Construction Consulting and Contract Services",
    description:
      "Access a network of professionals for consulting and contracting services.",
    points: [
      "Hire architects, engineers, contractors, and consultants",
      "Facilitates project execution from design to completion",
    ],
    benefits:
      "End-to-end service ensures projects are executed to the highest standards.",
  },
  {
    title: "Home Delivery",
    description: "Schedule convenient home deliveries with real-time updates.",
    points: [
      "Collaborates with logistics partners",
      "Deliver materials to construction sites or doorsteps",
    ],
    benefits:
      "Eliminates transportation hassle, saving time and reducing challenges.",
  },
];

const partnerProgram = [
  {
    title: "Cashback and Vouchers",
    description:
      "Partners can earn cashback and vouchers on every purchase made through Plumbazar.",
    points: [
      "Earn cashback rewards or vouchers on every purchase",
      "Higher cashback percentage or voucher value for larger purchases",
    ],
    benefits:
      "Helps partners reduce expenses on materials and increases profit margins.",
  },
  {
    title: "Special Discounts",
    description:
      "Exclusive discounts for partners, enabling them to access high-quality materials at lower prices.",
    points: [
      "Volume-based pricing and special promotions on frequently purchased items",
      "Discounts tailored to partners’ specific needs",
    ],
    benefits:
      "Allows partners to offer competitive pricing to clients, enhancing marketability.",
  },
  {
    title: "Priority Checkout and Deliveries",
    description:
      "Partners enjoy priority services, including faster checkout and expedited deliveries.",
    points: [
      "Quicker checkout experience and priority processing",
      "Faster delivery to meet tight project deadlines",
    ],
    benefits:
      "Ensures smoother project execution without delays caused by material shortages.",
  },
  {
    title: "Free Market Access",
    description:
      "Partners gain free access to a larger market through Plumbazar’s platform.",
    points: [
      "Showcase services to a broader audience, including builders and developers",
      "Profiles for partners highlighting expertise and completed projects",
    ],
    benefits:
      "Expands customer base and brand presence without additional marketing costs.",
  },
  {
    title: "Revenue Generation Programs",
    description:
      "Various programs for partners to generate additional revenue.",
    points: [
      "Referral bonuses, loyalty rewards, and volume purchase incentives",
      "Earn commissions by referring new customers or meeting volume targets",
    ],
    benefits:
      "Creates additional income streams and incentivize engagement with the platform.",
  },
  {
    title: "Commission-Based Revenue Model",
    description: "Earn commissions through a structured revenue-sharing model.",
    points: [
      "Earn a percentage of sales generated through referrals",
      "Tailored to each partner’s level of engagement and sales volume",
    ],
    benefits:
      "Encourages active promotion of Plumbazar’s offerings while benefiting partners.",
  },
  {
    title: "Boosting Sales of Vendors and Service Providers",
    description:
      "The program helps vendors and service providers increase sales through strategic partnerships.",
    points: [
      "Connect with a curated network of vendors and service providers",
      "Marketing support and promotional tools for partners",
    ],
    benefits:
      "Boosts sales for vendors and enhances the service portfolio of partners.",
  },
  {
    title: "Vendor Management & Retention",
    description:
      "Tools and support for efficient vendor management and retention.",
    points: [
      "Order tracking, performance analytics, and relationship management tools",
      "Monitor order statuses and receive updates on new products and promotions",
    ],
    benefits:
      "Maintains strong supplier relationships and ensures a consistent supply of quality materials.",
  },
  {
    title: "Market Development by Driving Progress for All Stakeholders",
    description:
      "Aims to drive market development by fostering growth and progress for all stakeholders.",
    points: [
      "Collaborative knowledge sharing, skill development, and market insights",
      "Industry trends, best practices, and training opportunities",
    ],
    benefits:
      "Promotes progress and ensures a thriving market where all stakeholders can prosper.",
  },
];

const Footer = () => {
  const FeatureCard = ({ title, description, points, benefits }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="mb-2">{description}</p>
        <ul className="list-disc ml-5 mb-2">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <p className="font-bold">Benefits:</p>
        <p>{benefits}</p>
      </div>
    );
  };

  return (
    <>
      <footer className=" rounded-t-2xl   bg-stone-200 pb-20 md:pb-2 border-t-4 border-white">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              {/* <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="Flowbite Logo"
        /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                TBI
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-white sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://x.com/" className="hover:underline">
              TBI™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
      {/* additional data */}
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
        <Accordion type="single" collapsible className="w-full mt-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl font-bold">
              About Us
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-center">
                <div className="w-full md:w-10/12 lg:w-8/12">
                  <div className="text-left">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">
                      About Us
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Welcome to Plumbazar, your premier online marketplace
                      dedicated to revolutionizing the procurement of
                      construction materials and local services. Our platform
                      seamlessly connects skilled service providers with service
                      seekers, aiming to transform the way local professionals
                      work and are compensated.
                    </p>
                    <p className="text-gray-600 mb-4">
                      In the realm of home services, traditional approaches have
                      seen limited innovation. Plumbazar disrupts this norm by
                      directly linking users with top-tier professionals who
                      excel in their respective fields. We work hand in hand
                      with individual service providers, empowering them to
                      become micro-entrepreneurs through a comprehensive package
                      of benefits. This includes market access, training,
                      insurance, and a plethora of other invaluable services. At
                      Plumbazar, we provide jobseekers with leads by
                      standardizing the end-user experience, pricing, and
                      delivering services under the reputable Plumbazar brand.
                    </p>
                    <p className="text-gray-600 mb-4">
                      Our cutting-edge app-based platform expands exposure for
                      service providers, enabling them to attract a broader
                      customer base than they would through traditional methods
                      alone. From wholesale plumbing and electrical goods to
                      sanitary materials, our unique procurement platform offers
                      a wide array of hardware products online. This not only
                      streamlines the service material procurement process for
                      buyers but also empowers retail vendors to efficiently
                      manage their inventory by sourcing hardware goods from
                      reputable wholesale vendors through our app and web-based
                      platform. We facilitate essential procurement processes
                      such as price discovery, quote generation, instant
                      purchase, approval management, and order handling,
                      providing a comprehensive solution.
                    </p>
                    <p className="text-gray-600">
                      At Plumbazar, we drive significant cost and time savings
                      in the material procurement process, marking a monumental
                      disruption in the real estate, home services, and
                      construction industry. We&apos;re breaking free from the
                      paper-based and offline processes that have traditionally
                      dominated this industry.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-2xl font-bold">
              Why choose us?
            </AccordionTrigger>
            <AccordionContent>
              <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-12">
                  Why choose Plumbazar
                </h1>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {whyUsFeatures.map((feature, index) => (
                    <FeatureCard
                      key={index}
                      title={feature.title}
                      description={feature.description}
                      points={feature.points}
                      benefits={feature.benefits}
                    />
                  ))}
                </div>
                <p className="mt-8">
                  The Plumbazar Partner Program is designed to empower
                  contractors, architects, electricians, plumbers, and other
                  influencer in the construction industry by providing them with
                  a robust platform for growth, revenue generation, and enhanced
                  operational efficiency. Through a combination of financial
                  incentives, strategic support, and market access, the program
                  creates a mutually beneficial environment that drives success
                  for both the partners and Plumbazar.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-2xl font-bold">
              Plumbazar Partner Program
            </AccordionTrigger>
            <AccordionContent>
              <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-12">
                  Plumbazar Partner Program
                </h1>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {partnerProgram.map((program, index) => (
                    <FeatureCard
                      key={index}
                      title={program.title}
                      description={program.description}
                      points={program.points}
                      benefits={program.benefits}
                    />
                  ))}
                </div>
                <p className="mt-8">
                  By offering a holistic suite of services, Plumbazar simplifies
                  the construction material procurement process, enhances vendor
                  management, and provides value-added services like logistics
                  and professional support. This integrated approach positions
                  Plumbazar as a one-s
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Footer;
