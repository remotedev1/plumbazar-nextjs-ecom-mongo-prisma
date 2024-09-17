import FeatureCard from "@/components/frontend/features-card";

const WhyUs = () => {
  const data = [
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
      points: [
        "Flexible financing options",
        "Ease cash flow for large projects",
      ],
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
      description:
        "Schedule convenient home deliveries with real-time updates.",
      points: [
        "Collaborates with logistics partners",
        "Deliver materials to construction sites or doorsteps",
      ],
      benefits:
        "Eliminates transportation hassle, saving time and reducing challenges.",
    },
  ];

  return (
    <div className="container mx-auto p-6 my-16">
      <h1 className="text-2xl md:text-5xl font-bold mb-8 text-gray-600 text-center">
        Why choose Plumbazar?
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.map((feature, index) => (
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
        The Plumbazar Partner Program is designed to empower contractors,
        architects, electricians, plumbers, and other influencer in the
        construction industry by providing them with a robust platform for
        growth, revenue generation, and enhanced operational efficiency. Through
        a combination of financial incentives, strategic support, and market
        access, the program creates a mutually beneficial environment that
        drives success for both the partners and Plumbazar.
      </p>
    </div>
  );
};

export default WhyUs;
