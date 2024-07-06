import React from "react";

const Heading = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold trackin-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
