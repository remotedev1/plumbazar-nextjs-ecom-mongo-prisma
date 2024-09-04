"use client";

// RHF
import { useFieldArray, useFormContext } from "react-hook-form";

// Components
import Subheading from "../../../Subheading";
import FormInput from "../../../form-fields/FormInput";
import FormCustomInput from "../../../form-fields/FormCustomInput";
import BaseButton from "../../../BaseButton";

// Contexts

// Icons
import { Plus } from "lucide-react";


const BillFromSection = () => {
  const { control } = useFormContext();

  const CUSTOM_INPUT_NAME = "sender.customInputs";
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: CUSTOM_INPUT_NAME,
  });

  const addNewCustomInput = () => {
    append({
      key: "",
      value: "",
    });
  };

  const removeCustomInput = (index) => {
    remove(index);
  };

  return (
    <section className="flex flex-col gap-3">
      <Subheading>{"form.steps.fromAndTo.billFrom"}:</Subheading>

      <FormInput
        name="sender.name"
        label="Name"
        placeholder="Your name"
      />
      <FormCustomInput
        name="sender.address"
        label="address"
        placeholder="Your address"
      />
      <FormInput
        name="sender.zipCode"
        label="zipCode"
        placeholder="Your zip code"
      />
      <FormInput
        name="sender.city"
        label="city"
        placeholder="Your city"
      />
     
      <FormInput
        name="sender.email"
        label="email"
        placeholder="Your email"
      />
      <FormInput
        name="sender.phone"
        label="phone"
        placeholder="Your phone number"
      />

      {/* //? key = field.id fixes a bug where wrong field gets deleted  */}
      {fields?.map((field, index) => (
        <FormCustomInput
          key={field.id}
          index={index}
          location={CUSTOM_INPUT_NAME}
          removeField={removeCustomInput}
        />
      ))}

      <BaseButton 
        tooltipLabel="Add custom input to sender"
        size="sm"
        variant="link"
        className="w-fit"
        onClick={addNewCustomInput}
      >
        <Plus />
        Add CustomInput
      </BaseButton>
    </section>
  );
};

export default BillFromSection;
