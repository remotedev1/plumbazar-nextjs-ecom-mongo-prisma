const ReturnPolicy = () => {
  const policyData = {
    Introduction: [
      "We offer refund/exchange within the first 3 days from the date of your purchase. If 3 days have passed since your purchase, you will not be offered a return, exchange, or refund of any kind.",
      "In order to become eligible for a return or an exchange, (i) the purchased item should be unused and in the same condition as you received it, (ii) the item must have original packaging, (iii) if the item that you purchased was on sale, then the item may not be eligible for a return/exchange.",
      "Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged."
    ],
    Exemptions: [
      "You agree that there may be a certain category of products/items that are exempted from returns or refunds. Such categories of products would be identified to you at the time of purchase."
    ],
    Process: [
      "For exchange/return accepted requests (as applicable), once your returned product/item is received and inspected by us, we will send you an email to notify you about the receipt of the returned/exchanged product.",
      "If the request has been approved after the quality check at our end, your request (i.e., return/exchange) will be processed in accordance with our policies."
    ]
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Return Policy</h1>
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

export default ReturnPolicy;
