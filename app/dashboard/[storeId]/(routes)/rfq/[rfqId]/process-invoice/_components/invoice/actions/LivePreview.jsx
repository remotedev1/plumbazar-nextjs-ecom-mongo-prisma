// Components
// import { DynamicInvoiceTemplate, Subheading } from "@/app/components";

import Subheading from "../../Subheading";




export default function LivePreview({ data }) {
    return (
        <>
            <Subheading>Live Preview:</Subheading>
            <div className="border dark:border-gray-600 rounded-xl my-1">
                {/* <DynamicInvoiceTemplate {...data} /> */}
            </div>
        </>
    );
}
