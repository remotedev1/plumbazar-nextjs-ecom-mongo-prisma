"use client";

// RHF
import { useFieldArray, useFormContext } from "react-hook-form";

//components
import Subheading from "../../../Subheading";
import FormInput from "../../../form-fields/FormInput";
import FormCustomInput from "../../../form-fields/FormCustomInput";
import BaseButton from "../../../BaseButton";

// Contexts

// Icons
import { Plus } from "lucide-react";


const BillToSection = () => {
    const { control } = useFormContext();


    const CUSTOM_INPUT_NAME = "receiver.customInputs";

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
            <Subheading>Bill To:</Subheading>

            <FormInput
                name="receiver.name"
                label="name"
                placeholder="Receiver name"
            />
            <FormInput
                name="receiver.address"
                label="address"
                placeholder="Receiver address"
            />
            <FormInput
                name="receiver.zipCode"
                label="zipCode"
                placeholder="Receiver zip code"
            />
            <FormInput
                name="receiver.city"
                label="city"
                placeholder="Receiver city"
            />
            <FormInput
                name="receiver.country"
                label="country"
                placeholder="Receiver country"
            />
            <FormInput
                name="receiver.email"
                label="email"
                placeholder="Receiver email"
            />
            <FormInput
                name="receiver.phone"
                label="phone"
                placeholder="Receiver phone number"
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
                tooltipLabel="Add custom input to receiver"
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

export default BillToSection;
