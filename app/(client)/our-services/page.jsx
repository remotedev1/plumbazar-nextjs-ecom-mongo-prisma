import FeatureCard from "@/components/frontend/features-card";

const WhyUs = () => {
  const data = [
    {
      title: "Construction Material Procurement",
      description:
        "Plumbazar offers a comprehensive platform for sourcing high-quality construction materials.",
      points: [
        "Partnering with a wide network of suppliers",
        "Access to a diverse range of materials including cement, steel, plumbing supplies, and electrical equipment",
        "Ensures competitive pricing, transparent cost comparisons, and hassle-free ordering",
      ],
      benefits:
        "Streamlines the procurement process for builders, contractors, and homeowners, saving time and ensuring quality products at the best prices.",
    },
    {
      title: "Vendor Management",
      description:
        "Efficiently manage your supplier relationships through Plumbazar's vendor management system.",
      points: [
        "Interact with a curated list of vendors",
        "Track orders and receive updates on new products and offers",
        "Tools for monitoring vendor performance, timely deliveries, and maintaining quality standards",
      ],
      benefits:
        "Simplifies the supply chain, reduces risk of delays, and ensures consistent material supply.",
    },
    {
      title: "Logistics",
      description:
        "Plumbazar handles logistics to ensure that materials are delivered promptly and safely.",
      points: [
        "Robust logistics network managing end-to-end delivery",
        "Real-time tracking and optimized routing for quick deliveries",
        "Safety measures to protect materials during transit",
      ],
      benefits:
        "Eliminates the stress of managing transportation, reduces delays, and ensures projects stay on schedule.",
    },
    {
      title: "Same-Day Delivery on Local Orders",
      description:
        "Plumbazar offers same-day delivery for local orders, ensuring immediate access to materials.",
      points: [
        "Expedited delivery service for local orders within specific areas",
        "Orders placed within the cutoff time are prioritized",
        "Dedicated fleet ensures same-day delivery",
      ],
      benefits:
        "Beneficial for urgent requirements, reducing project downtime and meeting tight deadlines.",
    },
    {
      title: "Plumbing & Electrical Services",
      description:
        "Plumbazar extends its services to include professional plumbing and electrical solutions.",
      points: [
        "Connect customers with certified plumbers and electricians",
        "Installation, maintenance, and repair services",
        "Vetted professionals ensure quality workmanship and safety compliance",
      ],
      benefits:
        "Offers convenience to customers requiring both materials and skilled labor under one roof.",
    },
    {
      title: "Ease of Access Through Application and Web-Based Platform",
      description:
        "Plumbazar provides a user-friendly digital platform for seamless access to its services.",
      points: [
        "Available on both web and mobile applications",
        "Intuitive interface for browsing products, placing orders, and managing deliveries",
        "Secure payment options, personalized dashboards, and customer support",
      ],
      benefits:
        "Allows customers to manage their construction needs on the go, making procurement more convenient and efficient.",
    },
  ];
  

  return (
    <div className="container mx-auto p-6 my-16">
      <h1 className="text-2xl md:text-5xl font-bold mb-8 text-gray-600 text-center">
        Our services?
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
      By offering a holistic suite of services, Plumbazar simplifies the construction material
procurement process, enhances vendor management, and provides value-added services like
logistics and professional support. This integrated approach positions Plumbazar as a one-stop
solution for all construction-related needs, catering to professionals and end-users alike.
      </p>
    </div>
  );
};

export default WhyUs;
