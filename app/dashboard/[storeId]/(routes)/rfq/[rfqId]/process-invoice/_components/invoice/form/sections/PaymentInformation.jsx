"use client";

// Components
import FormInput from "../../../form-fields/FormInput";
import Subheading from "../../../Subheading";

const PaymentInformation = () => {
  return (
    <section>
      <Subheading>heading:</Subheading>
      <div className="flex flex-wrap gap-10 mt-5">
        <FormInput
          name="details.paymentInformation.bankName"
          label="bankName"
          placeholder="bankName"
          vertical
        />
        <FormInput
          name="details.paymentInformation.accountName"
          label="accountName"
          placeholder="accountName"
          vertical
        />
        <FormInput
          name="details.paymentInformation.accountNumber"
          label="accountNumber"
          placeholder="accountNumber"
          vertical
        />
      </div>
    </section>
  );
};

export default PaymentInformation;
