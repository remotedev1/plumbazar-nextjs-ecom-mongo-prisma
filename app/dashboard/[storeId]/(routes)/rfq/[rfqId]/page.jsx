import Container from "@/components/ui/container";
import { db } from "@/lib/db";
import InvoiceMain from "./_components/invoice/InvoiceMain";

const RfqInvoice = async ({ params }) => {
  const rfq = await db.rfq.findUnique({
    where: {
      id: params.rfqId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          address: true,
          id: true,
        },
      },
    },
  });


  if (rfq.draftId) {
    var draftInvoiceData = await db.draftInvoice.findFirst({
      where: {
        id: rfq.draftId,
      },
    });
  } else {
    draftInvoiceData = null;
  }
  return (
    <div className="bg-white min-h-[80vh] py-14">
      <Container>
        <div className="flex flex-col space-y-5">
          <InvoiceMain rfq={rfq} draftInvoiceData={{...draftInvoiceData}}/>
        </div>
      </Container>
    </div>
  );
};

export default RfqInvoice;
