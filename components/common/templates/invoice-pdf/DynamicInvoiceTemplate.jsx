import React, { useMemo } from "react";

import dynamic from "next/dynamic";

// ShadCn
import { Skeleton } from "@/components/ui/skeleton";



const DynamicInvoiceTemplateSkeleton = () => {
    return <Skeleton className="min-h-[60rem]" />;
};

const DynamicInvoiceTemplate = (props) => {
    // Dynamic template component name
    // const templateName = `InvoiceTemplate${props.details.pdfTemplate}`;
    const templateName = `InvoiceTemplate1`;

    const DynamicInvoice = useMemo(
        () =>
            dynamic(
                () =>
                    import(
                        `@/components/common/templates/invoice-pdf/${templateName}`
                    ),
                {
                    loading: () => <DynamicInvoiceTemplateSkeleton />,
                    ssr: false,
                }
            ),
        [templateName]
    );

    return <DynamicInvoice {...props} />;
};

export default DynamicInvoiceTemplate;
