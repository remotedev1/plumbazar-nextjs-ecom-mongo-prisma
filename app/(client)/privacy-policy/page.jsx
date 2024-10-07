const PrivacyPolicy = () => {
  const policyData = {
    Introduction: [
      "This Privacy Policy describes how BALAJI SANITARY and its affiliates (collectively \"BALAJI SANITARY, we, our, us\") collect, use, share, protect or otherwise process your information/personal data through our website plumbazar.com (hereinafter referred to as Platform).",
      "Please note that you may be able to browse certain sections of the Platform without registering with us.",
      "We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India.",
      "By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy.",
      "If you do not agree please do not use or access our Platform."
    ],
    Collection: [
      "We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship.",
      "Some of the information that we may collect includes but is not limited to personal data/information provided to us during sign-up/registering or using our Platform such as name, date of birth, address, telephone/mobile number, email ID and/or any such information shared as proof of identity or address.",
      "Some of the sensitive personal data may be collected with your consent, such as your bank account or credit or debit card or other payment instrument information or biometric information such as your facial features or physiological information (in order to enable use of certain features when opted for, available on the Platform) etc all of the above being in accordance with applicable law(s).",
      "You always have the option to not provide information, by choosing not to use a particular service or feature on the Platform.",
      "We may track your behaviour, preferences, and other information that you choose to provide on our Platform. This information is compiled and analysed on an aggregated basis.",
      "We will also collect your information related to your transactions on the Platform and such third-party business partner platforms.",
      "When such a third-party business partner collects your personal data directly from you, you will be governed by their privacy policies.",
      "We shall not be responsible for the third-party business partner’s privacy practices or the content of their privacy policies, and we request you to read their privacy policies prior to disclosing any information.",
      "If you receive an email, a call from a person/association claiming to be BALAJI SANITARY seeking any personal data like debit/credit card PIN, net-banking or mobile banking password, we request you to never provide such information.",
      "If you have already revealed such information, report it immediately to an appropriate law enforcement agency."
    ],
    // Add other sections (Usage, Sharing, SecurityPrecautions, etc.) similarly
    YourRights: [
      "You may access, rectify, and update your personal data directly through the functionalities provided on the Platform."
    ],
    ChangesToPrivacyPolicy: [
      "Please check our Privacy Policy periodically for changes.",
      "We may update this Privacy Policy to reflect changes to our information practices.",
      "We may alert/notify you about the significant changes to the Privacy Policy, in the manner as may be required under applicable laws."
    ],
    GrievanceOfficer: {
      OfficeName: "Plumbazar",
      Designation: "Co - Founder",
      CompanyAddress: "Daivik Vishu, Plumbazar, SL Mathias Rd, Bejai, Gandhakuti, Mangaluru, Karnataka 5750",
      ContactNumber: "6366019800",
      PhoneTime: "Monday - Friday(9:00 - 19:00)"
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
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
            <div>
              <strong>Office Name:</strong> {policyData.GrievanceOfficer.OfficeName}<br />
              <strong>Designation:</strong> {policyData.GrievanceOfficer.Designation}<br />
              <strong>Company Address:</strong> {policyData.GrievanceOfficer.CompanyAddress}<br />
              <strong>Contact Number:</strong> {policyData.GrievanceOfficer.ContactNumber}<br />
              <strong>Phone Time:</strong> {policyData.GrievanceOfficer.PhoneTime}<br />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
