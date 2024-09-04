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


  if (rfq.draftId !== null) {
    var draftInvoiceData = await db.draftInvoice.findUnique({
      where: {
        id: rfq.draftId,
      },
    });
  }


  return (
    <div className="bg-white min-h-[80vh] py-14">
      <Container>
        <div className="flex flex-col space-y-5">
          <InvoiceMain rfq={rfq} draftInvoiceData={draftInvoiceData}/>
        </div>
      </Container>
    </div>
  );
};

export default RfqInvoice;
