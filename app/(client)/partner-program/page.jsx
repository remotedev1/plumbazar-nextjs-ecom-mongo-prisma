import FeatureCard from "@/components/frontend/features-card";

const PartnerProgram = () => {
  const data = [
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
      description:
        "Earn commissions through a structured revenue-sharing model.",
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
  return (
    <div className="container mx-auto p-6  my-16">
      <h1 className="text-2xl md:text-5xl font-bold mb-8 text-gray-600 text-center">
        Plumbazar Partner Program
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.map((program, index) => (
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
        By offering a holistic suite of services, Plumbazar simplifies the
        construction material procurement process, enhances vendor management,
        and provides value-added services like logistics and professional
        support. This integrated approach positions Plumbazar as a one-s
      </p>
    </div>
  );
};

export default PartnerProgram;
