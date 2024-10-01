"use client";

// Components
import DatePickerFormField from "../../../form-fields/DatePickerFormField";
import FormInput from "../../../form-fields/FormInput";
import Subheading from "../../../Subheading";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"; // Adjust import path
import { FormMessage } from "@/components/ui/form";
import { convertTimestampToFormattedDate } from "@/lib/utils";

const InvoiceDetails = () => {
  const { setValue, formState, getValues } = useFormContext(); // Watch form values and set value
  const invoiceDate = useWatch({ name: "details.invoiceDate" }); // Get the selected invoiceDate

  // Function to add days to a given date
  const addDaysToDate = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Handle day selection and calculate due date
  const handleSelectChange = (days) => {
    if (invoiceDate) {
      const dueDate = addDaysToDate(new Date(invoiceDate), parseInt(days, 10));
      setValue("details.dueDate", dueDate); // Update dueDate in the form
    }
  };

  return (
    <section className="flex flex-col flex-wrap gap-5">
      <Subheading>Invoice Details:</Subheading>

      <div className="flex flex-row flex-wrap gap-5">
        <div className="flex flex-col gap-2">
          <FormInput
            name="details.invoiceNumber"
            label="Invoice Number"
            placeholder="Invoice number"
          />

          <DatePickerFormField name="details.invoiceDate" label="Issued Date" />

          {/*  Select for due date */}
          <div className="flex  gap-2">
            <label htmlFor="dueDate">Due Date (in days)</label>
            <div>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="border border-gray-300 p-2 rounded">
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50, 60].map((days) => (
                    <SelectItem key={days} value={String(days)}>
                      {days} days
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {convertTimestampToFormattedDate(getValues("details.dueDate"))}
            </div>
            {formState.errors?.details?.dueDate && (
              <FormMessage>
                {formState.errors?.details?.dueDate.message}
              </FormMessage>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetails;
