import { RfqForm } from "@/app/(client)/rfq/[rfqid]/components/rfq-form";

const RfqPage = async ({ params }) => {

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RfqForm initialData={color} />
      </div>
    </div>
  );
};

export default RfqPage;
