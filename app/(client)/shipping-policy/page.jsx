const ShippingPolicy = () => {
  const policyData = {
    ShippingMethod: [
      "Orders for the user are shipped through registered domestic courier companies and/or speed post only.",
      "Orders are shipped within 3 days from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation and delivery of the shipment, subject to courier company/post office norms.",
    ],
    Liability: [
      "The Platform Owner shall not be liable for any delay in delivery by the courier company/postal authority.",
    ],
    DeliveryAddress: [
      "Delivery of all orders will be made to the address provided by the buyer at the time of purchase.",
    ],
    Confirmation: [
      "Delivery of our services will be confirmed on your email ID as specified at the time of registration.",
    ],
    ShippingCosts: [
      "If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case may be), the same is not refundable.",
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
      {Object.entries(policyData).map(([sectionTitle, content], index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            {sectionTitle.replace(/([A-Z])/g, " $1")}
          </h2>
          {Array.isArray(content) ? (
            <ul className="list-disc list-inside space-y-2">
              {content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShippingPolicy;
