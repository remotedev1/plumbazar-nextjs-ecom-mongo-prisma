import Container from "@/components/ui/container";
import { db } from "@/lib/db";
import InvoiceMain from "./_components/invoice/InvoiceMain";

const RfqInvoice = async ({ params }) => {
  const rfq = await db.rfq.findUnique({
    where: {
      id: params.rfqId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="bg-white min-h-[80vh] py-14">
      <Container>
        <div className="flex flex-col space-y-5">
          <InvoiceMain rfq={rfq} />
        </div>
      </Container>
    </div>
  );
};

export default RfqInvoice;
