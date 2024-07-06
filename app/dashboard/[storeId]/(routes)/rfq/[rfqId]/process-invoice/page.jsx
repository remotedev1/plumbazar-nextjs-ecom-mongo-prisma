import Container from "@/components/ui/container";
import { db } from "@/lib/db";
import RfqDetails from "./_components/Details";
import InvoiceForm from "./_components/invoice/InvoiceForm";

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
          <RfqDetails data={rfq} />
          <InvoiceForm />
        </div>
      </Container>
    </div>
  );
};

export default RfqInvoice;
