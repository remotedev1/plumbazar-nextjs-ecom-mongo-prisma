"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// Helpers
import { formatPriceToString } from "@/lib/helpers";

const defaultChargesContext = {
  discountSwitch: false,
  setDiscountSwitch: (newValue) => {},
  taxSwitch: false,
  setTaxSwitch: (newValue) => {},
  shippingSwitch: false,
  setShippingSwitch: (newValue) => {},
  totalInWordsSwitch: true,
  setTotalInWordsSwitch: (newValue) => {},
  currency: "USD",
  subTotal: 0,
  totalAmount: 0,
  calculateTotal: () => {},
};

export const ChargesContext = createContext(defaultChargesContext);

export const useChargesContext = () => {
  return useContext(ChargesContext);
};

export const ChargesContextProvider = ({ children }) => {
  const { control, setValue } = useFormContext();

  // Form Fields
  const itemsArray = useWatch({
    name: `details.items`,
    control,
  });

  const currency = useWatch({
    name: `details.currency`,
    control,
  });

  // Charges
  const charges = {
    discount: useWatch({ name: `details.discountAmount`, control }) || 0,
    tax: useWatch({ name: `details.taxAmount`, control }) || 0,
    shipping: useWatch({ name: `details.shippingAmount`, control }) || 0,
  };

  const { discount, tax, shipping } = charges;

  // Switch states. On/Off
  const [discountSwitch, setDiscountSwitch] = useState(
    discount?.amount ? true : false
  );
  const [taxSwitch, setTaxSwitch] = useState(tax?.amount ? true : false);
  const [shippingSwitch, setShippingSwitch] = useState(
    shipping?.cost ? true : false
  );

  // ? Old approach of using totalInWords variable
  // totalInWords ? true : false
  const [totalInWordsSwitch, setTotalInWordsSwitch] = useState(true);

  // Initial subtotal and total
  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // When loading invoice, if received values, turn on the switches
  useEffect(() => {
    if (discount) {
      setDiscountSwitch(true);
    }

    if (tax) {
      setTaxSwitch(true);
    }

    if (shipping) {
      setShippingSwitch(true);
    }
  }, [discount, tax, shipping]);

  // Check switches, if off set values to zero
  useEffect(() => {
    if (!discountSwitch) {
      setValue("details.discountAmount", 0);
    }

    if (!taxSwitch) {
      setValue("details.taxAmount", 0);
    }

    if (!shippingSwitch) {
      setValue("details.shippingAmount", 0);
    }
  }, [discountSwitch, taxSwitch, shippingSwitch]);

  // Calculate total when values change
  useEffect(() => {
    calculateTotal();
  }, [itemsArray, totalInWordsSwitch, discount, tax, shipping]);

  /**
   * Calculates the subtotal, total, and the total amount in words on the invoice.
   */
  const calculateTotal = () => {
    // Here Number(item.total) fixes a bug where an extra zero appears
    // at the beginning of subTotal caused by toFixed(2) in item.total in single item
    // Reason: toFixed(2) returns string, not a number instance
    const totalSum = itemsArray?.reduce(
      (sum, item) => sum + Number(item.quantity * item.price),
      0
    );

    setValue("details.subTotal", totalSum);
    setSubTotal(totalSum);

    let discountAmount = parseFloat(discount && discount.toString()) || 0;
    let taxAmount = parseFloat(tax && tax.toString()) || 0;
    let shippingCost = parseFloat(shipping && shipping.toString()) || 0;

    let total = totalSum;

    if (!isNaN(discountAmount)) {
      total -= discountAmount;

      setValue("details.discountAmount", discountAmount);
    }

    if (!isNaN(taxAmount)) {
      total += taxAmount;

      setValue("details.taxAmount", taxAmount);
    }

    if (!isNaN(shippingCost)) {
      total += shippingCost;

      setValue("details.shippingAmount", shippingCost);
    }

    setTotalAmount(total);

    setValue("details.totalAmount", total);

    if (totalInWordsSwitch) {
      setValue("details.totalAmountInWords", formatPriceToString(total));
    } else {
      setValue("details.totalAmountInWords", "");
    }
  };

  return (
    <ChargesContext.Provider
      value={{
        discountSwitch,
        setDiscountSwitch,
        taxSwitch,
        setTaxSwitch,
        shippingSwitch,
        setShippingSwitch,

        totalInWordsSwitch,
        setTotalInWordsSwitch,
        currency,
        subTotal,
        totalAmount,
        calculateTotal,
      }}
    >
      {children}
    </ChargesContext.Provider>
  );
};
