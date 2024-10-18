import React from "react";

// Components

// Helpers
// import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";
import { formatNumberWithCommas } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";
import InvoiceLayout from "./InvoiceLayout";

const InvoiceTemplate = (data) => {
  const { receiver, details } = data;

  const discount = details.subTotal * (details.discountAmount / 100);

  const tax = details.subTotal * (details.taxAmount / 100);

  return (
    <InvoiceLayout data={data}>
      <div className="flex flex-col items-center">
        <img alt="plumbazar" src="/light-logo.png" className="w-24 " />
        <hr className="my-2 bg-gray-400" />
        <div className="flex flex-col w-full justify-start">
          <h2 className="text-xl md:text-1xl font-semibold text-blue-800 text-uppercase">
            ESTIMATE
          </h2>
          <span className="mt-1 block text-gray-500">
            Order No:{" "}
            <span className="font-semibold">{details.invoiceNumber}</span>
          </span>
        </div>
        <hr className="my-2 bg-gray-400" />
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        <div className="border p-2">
          <div className="flex">
            <h3 className="flex-1 text-gray-800">Bill to:</h3>
            <h3 className="flex-1 font-semibold  text-gray-800">
              {receiver.name}
            </h3>
          </div>
          <div className="flex">
            <h3 className="flex-1 text-gray-800">Email:</h3>
            <h3 className="flex-1  font-semibold text-gray-800">
              {receiver.email}
            </h3>
          </div>
          <div className="flex">
            <h3 className="flex-1 text-gray-800">Phone:</h3>
            <h3 className="flex-1  font-semibold text-gray-800">
              {receiver.phone}
            </h3>
          </div>
          <div className="flex">
            <h3 className="flex-1 text-gray-800">GSTIN:</h3>
            <h3 className="flex-1 font-semibold  text-gray-800">
              {receiver.gstin}
            </h3>
          </div>
          <div className="flex">
            <h3 className="flex-1   text-gray-800">PAN:</h3>
            <h3 className="flex-1 font-semibold  text-gray-800">
              {receiver.pan}
            </h3>
          </div>
        </div>
        <div className="">
          <h3 className="font-semibold mb-3">Plumbazar .....</h3>

          <div className="border p-2">
            <div className="flex">
              <h3 className="flex-1 text-gray-800">Estimated date:</h3>
              <h3 className="flex-1 font-semibold  text-gray-800">
                {new Date(details.invoiceDate).toLocaleDateString(
                  "en-US",
                  DATE_OPTIONS
                )}
              </h3>
            </div>
            <div className="flex">
              <h3 className="flex-1 text-gray-800">Due date:</h3>
              <h3 className="flex-1 font-semibold  text-gray-800">
                {new Date(details.dueDate).toLocaleDateString(
                  "en-US",
                  DATE_OPTIONS
                )}
              </h3>
            </div>
            <div className="flex">
              <h3 className="flex-1 text-gray-800">Email:</h3>
              <h3 className="flex-1  font-semibold text-gray-800">
                {receiver.email}
              </h3>
            </div>
            {/* <div className="flex">
              <h3 className="flex-1 text-gray-800">TIN:</h3>
              <h3 className="flex-1  font-semibold text-gray-800">xyz</h3>
            </div> */}
            <div className="flex">
              <h3 className="flex-1   text-gray-800">PAN:</h3>
              <h3 className="flex-1 font-semibold  text-gray-800">
                AAGFB3445C
              </h3>
            </div>
            <div className="flex">
              <h3 className="flex-1 text-gray-800">GSTIN:</h3>
              <h3 className="flex-1 font-semibold  text-gray-800">
                29AAGFB3445C1ZQ
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        <div>
          <h3 className="font-semibold mb-3">Company Address</h3>
          <span>
            Balaji Sanitary unit, West Coast Complex,
            <br /> Nellikai Rd, near State Bank, Bunder, Mangaluru,
            <br />
            Karnataka 575001
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="border border-gray-200 p-3 space-y-1">
          <div className="hidden sm:grid grid-cols-6 text-blue-500">
            <div className="col-span-2 text-xs font-medium  uppercase">
              Item
            </div>
            <div className="text-left text-xs font-medium  uppercase">
              Cost/Unit
            </div>
            <div className="text-left text-xs font-medium  uppercase">Qty</div>
            <div className="text-left text-xs font-medium  uppercase">
              Incl. GST
            </div>
            <div className="text-right text-xs font-medium  uppercase">
              Amount
            </div>
          </div>
          <div className="hidden sm:block border-b border-gray-200"></div>
          <div className="grid grid-cols-6 gap-2">
            {details.items?.map((item, index) => (
              <React.Fragment key={index}>
                <div className=" col-span-2 border-b border-gray-300">
                  <p className="font-medium text-gray-800">{item.name}</p>
                </div>

                <div className="border-b border-gray-300">
                  <p className="text-gray-800">
                    {item.msp && item.msp + " " + details.currency}
                  </p>
                </div>

                <div className="border-b border-gray-300">
                  <p className="text-gray-800">{item.quantity}</p>
                </div>
                <div className="border-b border-gray-300">
                  <p className="text-gray-800">
                    {/* Calculate the GST and display it */}
                    {item.msp + (item.msp * item.gst) / 100}
                  </p>
                </div>
                <div className="border-b border-gray-300">
                  <p className="sm:text-right text-gray-800">
                    {formatNumberWithCommas(
                      (item.msp + (item.msp * item.gst) / 100) * item.quantity
                    )}
                    {details.currency}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="sm:hidden border-b border-gray-200"></div>
        </div>
      </div>

      <div className="mt-2 flex sm:justify-end">
        <div className="sm:text-right space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
            <dl className="grid sm:grid-cols-5 gap-x-3">
              <dt className="col-span-3 font-semibold text-gray-800">
                Subtotal:
              </dt>
              <dd className="col-span-2 text-gray-500">
                {formatNumberWithCommas(Number(details.subTotal))}{" "}
                {details.currency}
              </dd>
            </dl>
            {details.discountAmount >= 0 && (
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">
                  Discount:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {discount} {details.currency}
                </dd>
              </dl>
            )}
            {details.taxAmount >= 0 && (
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">Tax:</dt>
                <dd className="col-span-2 text-gray-500">
                  {tax}
                  {details.currency}
                </dd>
              </dl>
            )}
            {details.shippingAmount >= 0 && (
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">
                  Shipping:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {details.shippingAmount} {details.currency}
                </dd>
              </dl>
            )}
            <dl className="grid sm:grid-cols-5 gap-x-3">
              <dt className="col-span-3 font-semibold text-gray-800">Total:</dt>
              <dd className="col-span-2 text-gray-500">
                {formatNumberWithCommas(Number(details.totalAmount))}{" "}
                {details.currency}
              </dd>
            </dl>
            {details.totalAmountInWords && (
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">
                  Total in words:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  <em>
                    {details.totalAmountInWords} {details.currency}
                  </em>
                </dd>
              </dl>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="my-4">
          <div className="my-2">
            <p className="font-semibold text-blue-600">Additional notes:</p>
            <p className="font-regular text-gray-800">
              {details.additionalNotes}
            </p>
          </div>
          <div className="my-2">
            <p className="font-semibold text-blue-600">Payment terms:</p>
            <p className="font-regular text-gray-800">{details.pc}</p>
          </div>
          {/* <div className="my-2">
            <span className="font-semibold text-md text-gray-800">
              Please send the payment to this address
              <p className="text-sm">
                Bank: {details.paymentInformation?.bankName}
              </p>
              <p className="text-sm">
                Account name: {details.paymentInformation?.accountName}
              </p>
              <p className="text-sm">
                Account no: {details.paymentInformation?.accountNumber}
              </p>
            </span>
          </div> */}
        </div>
        <p className="text-gray-500 text-sm">
          If you have any questions concerning this invoice, use the following
          contact information:
        </p>
        <div>
          <p className="block text-sm font-medium text-gray-800">
            enquiry@plumbazar.com
          </p>
          <p className="block text-sm font-medium text-gray-800">6366019800</p>
        </div>
      </div>

      {/* Signature */}
      {details?.signature?.data && isDataUrl(details?.signature?.data) ? (
        <div className="mt-6">
          <p className="font-semibold text-gray-800">Signature:</p>
          <img
            src={details.signature.data}
            width={120}
            height={60}
            alt={`Signature of ${sender.name}`}
          />
        </div>
      ) : details.signature?.data ? (
        <div className="mt-6">
          <p className="text-gray-800">Signature:</p>
          <p
            style={{
              fontSize: 30,
              fontWeight: 400,
              fontFamily: `${details.signature.fontFamily}, cursive`,
              color: "black",
            }}
          >
            {details.signature.data}
          </p>
        </div>
      ) : null}
    </InvoiceLayout>
  );
};

export default InvoiceTemplate;
