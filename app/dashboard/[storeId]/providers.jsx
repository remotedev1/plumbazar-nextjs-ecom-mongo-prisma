"use client";
import { FORM_DEFAULT_VALUES } from "@/lib/variables";
import { InvoiceContextProvider } from "@/providers/invoice-provider";
import { InvoiceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
// RHF
import { FormProvider, useForm } from "react-hook-form";

export default function InvoiceProvidersComponent({ children, params }) {
  const form = useForm({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: FORM_DEFAULT_VALUES,
  });

  return (
      <FormProvider {...form}>
        <InvoiceContextProvider>{children}</InvoiceContextProvider>
      </FormProvider>
  );
}
