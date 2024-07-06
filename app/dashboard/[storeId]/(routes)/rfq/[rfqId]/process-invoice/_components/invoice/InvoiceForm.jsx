"use client";

import { useMemo } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

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
import BillFromSection from "./form/sections/BillFromSection";
import BillToSection from "./form/sections/BillToSection";
import InvoiceDetails from "./form/sections/InvoiceDetails";



// Contexts

const InvoiceForm = () => {
  const { control } = useFormContext();

  // Get invoice number variable
  const invoiceNumber = useWatch({
    name: "details.invoiceNumber",
    control,
  });

  const invoiceNumberLabel = useMemo(() => {
    if (invoiceNumber) {
      return `#${invoiceNumber}`;
    } else {
      return "form.newInvBadge";
    }
  }, [invoiceNumber]);

  return (
    <div className={`xl:w-[55%]`}>
      <Card>
        <CardHeader>
          <div className="flex gap-3">
            <CardTitle className="flex items-center gap-3">
              <span className="uppercase">{"form.title"}</span>
            </CardTitle>
            <Badge variant="secondary" className="w-fit">
              <p style={{ fontSize: "14px" }}>{invoiceNumberLabel}</p>
            </Badge>
          </div>
          <CardDescription>{"form.description"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Wizard>
              <WizardStep>
                <div className="flex flex-wrap gap-x-20 gap-y-10">
                  <BillFromSection />

                  <BillToSection />
                </div>
              </WizardStep>
              <WizardStep>
                <div className="flex flex-wrap gap-y-10">
                  <InvoiceDetails />
                </div>
              </WizardStep>

              {/* <WizardStep>
                <Items />
              </WizardStep>

              <WizardStep>
                <PaymentInformation />
              </WizardStep>

              <WizardStep>
                <InvoiceSummary />
              </WizardStep> */}
            </Wizard>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;
