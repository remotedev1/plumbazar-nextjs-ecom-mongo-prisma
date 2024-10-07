"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductAdditionalInfo = ({ data }) => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {/* <AccordionItem value="item-1">
          <AccordionTrigger className="hover:text-[#007bff] !no-underline">
            CORE FEATURES
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-md">
              <ul className="max-w-md space-y-1 text-black font-semibold list-disc list-inside dark:text-gray-400">
                <li>relaxed fit, true to size</li>
                <li>fabric: PV Lycra</li>
                <li>color: black</li>
                <li>half sleeves</li>
                <li>button-down collar</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem> */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="hover:text-[#007bff] !no-underline">
            DESCRIPTION
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-md">
              <p className="font-semibold text-md leading-6">
                {data?.description}
                <br />
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="item-3">
          <AccordionTrigger className="hover:text-[#007bff] !no-underline">
            SHIPPING & RETURNS
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-md">
              <p className="font-bold text-lg">
                <strong>Shipping</strong>
              </p>
              <p className="font-semibold">
                <strong>
                  Free shipping available for orders above 500/- within India.
                </strong>
              </p>
              <div className="grid gap-2 mt-2">
                <p>
                  Orders dispatched every day at 4 pm except on public holidays.
                </p>
                <p>After dispatch, it takes about</p>
                <ul>
                  <li>2 to 5 working days for metro cities</li>
                  <li>4 to 7 working days for the rest of India.</li>
                </ul>
                <p>We ship your order from Mangalore, Karnataka.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
};

export default ProductAdditionalInfo;
