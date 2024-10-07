const RefundAndCancellationPolicy = () => {
  const policyData = {
    Introduction: [
      "This refund and cancellation policy outlines how you can cancel or seek a refund for a product/service that you have purchased through the Platform."
    ],
    CancellationPolicy: [
      "Cancellations will only be considered if the request is made 3 days after placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers/merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.",
      "BALAJI SANITARY does not accept cancellation requests for items mentioned in the product page. However, the refund/replacement can be made if the user establishes that the quality of the product delivered is not good.",
      "In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/merchant listed on the Platform has checked and determined the same at its own end. This should be reported within 3 days of receipt of products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 3 days of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.",
      "In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.",
      "In case of any refunds approved by BALAJI SANITARY, it will take 7 days for the refund to be processed to you."
    ]
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Refund and Cancellation Policy</h1>
      {Object.entries(policyData).map(([sectionTitle, content], index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{sectionTitle.replace(/([A-Z])/g, ' $1')}</h2>
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

export default RefundAndCancellationPolicy;
