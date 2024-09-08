"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useParams, useRouter } from "next/navigation";

// RHF
import { useFormContext } from "react-hook-form";

// Hooks

// Services
import { exportInvoice } from "@/services/invoice/client/exportInvoice";

// // Variables
import {
  FORM_DEFAULT_VALUES,
  GENERATE_PDF_API,
  SEND_PDF_API,
} from "@/lib/variables";

import useToasts from "@/hooks/useToasts";
import toast from "react-hot-toast";
import axios from "axios";

const defaultInvoiceContext = {
  invoicePdf: new Blob(),
  invoicePdfLoading: false,
  savedInvoices: [],
  pdfUrl: null,
  onFormSubmit: (values) => {},
  newInvoice: () => {},
  // generatePdf: async (data) => {},
  removeFinalPdf: () => {},
  downloadPdf: () => {},
  printPdf: () => {},
  previewPdfInTab: () => {},
  saveInvoice: () => {},
  deleteInvoice: (index) => {},
  sendPdfToMail: (email) => Promise.resolve(),
  exportInvoiceAs: (exportAs) => {},
};

export const InvoiceContext = createContext(defaultInvoiceContext);

export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};

export const InvoiceContextProvider = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  // Toasts
  const {
    newInvoiceSuccess,
    pdfGenerationSuccess,
    saveInvoiceSuccess,
    modifiedInvoiceSuccess,
    sendPdfSuccess,
    sendPdfError,
  } = useToasts();

  // Get form values and methods from form context
  const {
    getValues,
    reset,
    formState: { errors },
  } = useFormContext();

  // Variables
  const [invoicePdf, setInvoicePdf] = useState(new Blob());
  const [invoicePdfLoading, setInvoicePdfLoading] = useState(false);

  // Saved invoices
  const [savedInvoices, setSavedInvoices] = useState([]);

  useEffect(() => {
    let savedInvoicesDefault;
    if (typeof window !== undefined) {
      // Saved invoices variables
      const savedInvoicesJSON = window.localStorage.getItem("savedInvoices");
      savedInvoicesDefault = savedInvoicesJSON
        ? JSON.parse(savedInvoicesJSON)
        : [];
      setSavedInvoices(savedInvoicesDefault);
    }
  }, []);

  // Get pdf url from blob
  const pdfUrl = useMemo(() => {
    if (invoicePdf.size > 0) {
      return window.URL.createObjectURL(invoicePdf);
    }
    return null;
  }, [invoicePdf]);

  /**
   * Handles form submission.
   *
   * @param {InvoiceType} data - The form values used to generate the PDF.
   */
  const onFormSubmit = (data) => {
    if (data?.details?.draftId) {
      updateInvoice(data, data?.details?.draftId);
    } else {
      saveInvoice();
    }
  };

  /**
   * Generates a new invoice.
   */
  const newInvoice = () => {
    reset(FORM_DEFAULT_VALUES);
    setInvoicePdf(new Blob());

    router.refresh();

    // Toast
    newInvoiceSuccess();
  };

  /**
   * Generate a PDF document based on the provided data.
   *
   * @param {InvoiceType} data - The data used to generate the PDF.
   * @returns {Promise<void>} - A promise that resolves when the PDF is successfully generated.
   * @throws {Error} - If an error occurs during the PDF generation process.
   */
  const generatePdf = useCallback(async (data) => {
    setInvoicePdfLoading(true);

    try {
      const response = await fetch(GENERATE_PDF_API, {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.blob();
      setInvoicePdf(result);

      if (result.size > 0) {
        // Toast
        pdfGenerationSuccess();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setInvoicePdfLoading(false);
    }
  }, []);

  /**
   * Removes the final PDF file and switches to Live Preview
   */
  const removeFinalPdf = () => {
    setInvoicePdf(new Blob());
  };

  /**
   * Generates a preview of a PDF file and opens it in a new browser tab.
   */
  const previewPdfInTab = () => {
    if (invoicePdf) {
      const url = window.URL.createObjectURL(invoicePdf);
      window.open(url, "_blank");
    }
  };

  /**
   * Downloads a PDF file.
   */
  const downloadPdf = () => {
    // Only download if there is an invoice
    if (invoicePdf instanceof Blob && invoicePdf.size > 0) {
      // Create a blob URL to trigger the download
      const url = window.URL.createObjectURL(invoicePdf);

      // Create an anchor element to initiate the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);

      // Trigger the download
      a.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    }
  };

  const printPdf = () => {
    if (invoicePdf) {
      const pdfUrl = URL.createObjectURL(invoicePdf);
      const printWindow = window.open(pdfUrl, "_blank");
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    }
  };

  const saveInvoice = async () => {
    const data = getValues();
    try {
      const response = await axios.post(
        `/api/rfq/${data.details.rfqId}/save`,
        data
      );
      toast.success("Invoice saved successfully");
      router.refresh();
      return;
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("Error saving invoice");
      // throw new Error(error.response?.data?.error || "Failed to save invoice");
    }
  };

  const updateInvoice = async (data) => {
    try {
      const response = await axios.patch(
        `/api/rfq/${data.details.rfqId}/save`,
        {
          ...data,
        }
      );
      toast.success("invoice updated successfully");

      return response.data;
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error("Error updating invoice");
      // throw new Error(error.response?.data?.error || "Failed to save invoice");
    }
  };

  const getApproval = async (draftId) => {
    const data = getValues();
    try {
      const response = await axios.patch(
        `/api/rfq/${data.details.rfqId}/get-approval`,
        {
          draftId: draftId,
        }
      );
      toast.success("approval request sent successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error("Error updating invoice");
    }
  };

  const commitOrder = async (draftId) => {
    const data = getValues();
    //TODO - update the invoice and commit order
    try {
      const response = await axios.post(
        `/api/${params.storeId}/orders/order-process`,
        {
          draftId: draftId,
          data,
        }
      );
      toast.success("invoice updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error("Error updating invoice");
      // throw new Error(error.response?.data?.error || "Failed to save invoice");
    }
  };

  // TODO: Change function name. (deleteInvoiceData maybe?)
  /**
   * Delete an invoice from local storage based on the given index.
   *
   * @param {number} index - The index of the invoice to be deleted.
   */
  const deleteInvoice = (index) => {
    if (index >= 0 && index < savedInvoices.length) {
      const updatedInvoices = [...savedInvoices];
      updatedInvoices.splice(index, 1);
      setSavedInvoices(updatedInvoices);

      const updatedInvoicesJSON = JSON.stringify(updatedInvoices);

      localStorage.setItem("savedInvoices", updatedInvoicesJSON);
    }
  };

  /**
   * Send the invoice PDF to the specified email address.
   *
   * @param {string} email - The email address to which the Invoice PDF will be sent.
   * @returns {Promise<void>} A promise that resolves once the email is successfully sent.
   */
  const sendPdfToMail = (email) => {
    const fd = new FormData();
    fd.append("email", email);
    fd.append("invoicePdf", invoicePdf, "invoice.pdf");
    fd.append("invoiceNumber", getValues().details.invoiceNumber);

    return fetch(SEND_PDF_API, {
      method: "POST",
      body: fd,
    })
      .then((res) => {
        if (res.ok) {
          // Successful toast msg
          sendPdfSuccess();
        } else {
          // Error toast msg
          sendPdfError({ email, sendPdfToMail });
        }
      })
      .catch((error) => {
        console.log(error);

        // Error toast msg
        sendPdfError({ email, sendPdfToMail });
      });
  };

  /**
   * Export an invoice in the specified format using the provided form values.
   *
   * This function initiates the export process with the chosen export format and the form data.
   *
   * @param {ExportTypes} exportAs - The format in which to export the invoice.
   */
  const exportInvoiceAs = (exportAs) => {
    const formValues = getValues();

    // Service to export invoice with given parameters
    exportInvoice(exportAs, formValues);
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoicePdf,
        invoicePdfLoading,
        savedInvoices,
        pdfUrl,
        onFormSubmit,
        newInvoice,
        generatePdf,
        removeFinalPdf,
        downloadPdf,
        printPdf,
        previewPdfInTab,
        updateInvoice,
        commitOrder,
        saveInvoice,
        getApproval,
        deleteInvoice,
        sendPdfToMail,
        exportInvoiceAs,
        formValues: getValues(),
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
