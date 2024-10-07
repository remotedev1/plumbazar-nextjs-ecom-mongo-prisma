const FeatureCard = ({ title, description, points, benefits }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 hover:shadow-primary/30  transition duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-primary">{title}</h2>
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

export default FeatureCard;
