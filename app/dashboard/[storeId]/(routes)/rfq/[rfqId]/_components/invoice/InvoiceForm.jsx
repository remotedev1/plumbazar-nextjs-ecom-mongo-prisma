"use client";

import { useEffect } from "react";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// React Wizard
import { Wizard } from "react-use-wizard";
import WizardStep from "./form/wizard/WizardStep";

//components
import BillToSection from "./form/sections/BillToSection";
import InvoiceDetails from "./form/sections/InvoiceDetails";
import InvoiceSummary from "./form/sections/InvoiceSummary";
import Items from "./form/sections/Items";
import { generateInvoiceNumber } from "@/lib/helpers";

const InvoiceForm = () => {
  const { setValue, getValues, formState } = useFormContext();
  // Set the default value for invoiceNumber when the component mounts
  useEffect(() => {
    const invoiceNumber = generateInvoiceNumber();
    setValue("details.invoiceNumber", invoiceNumber);
    setValue("details.invoiceDate", new Date());
  }, []);

  // Get invoice number variable
  const invoiceNumber = getValues("details.invoiceNumber");

  return (
    <div className="w-[85%]">
      <Card>
        <CardHeader>
          <div className="flex gap-3">
            <CardTitle className="flex items-center gap-3">
              <span className="uppercase">ESTIMATE</span>
            </CardTitle>
            <Badge variant="secondary" className="w-fit">
              <p style={{ fontSize: "14px" }}>{invoiceNumber}</p>
            </Badge>
          </div>
          <CardDescription>Create RFQ response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Wizard>
              <WizardStep>
                <div className="flex flex-wrap gap-x-20 gap-y-10">
                  <BillToSection />
                </div>
              </WizardStep>
              <WizardStep>
                <div className="flex flex-wrap gap-y-10">
                  <InvoiceDetails />
                </div>
              </WizardStep>

              <WizardStep>
                <Items />
              </WizardStep>

              <WizardStep>
                <InvoiceSummary />
              </WizardStep>
            </Wizard>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;
