import { format } from "date-fns";

import BillboardClient from "./components/Client";
import { db } from "@/lib/db";

const BillboardsPage = async ({ params }) => {
  const billboards = await db.billboard.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards = billboards.map((billboard) => ({
    id: billboard.id,
    title: billboard.title,
    description: billboard.description,
    action: billboard.action,
    createdAt: format(new Date(billboard.createdAt), "MMMM do ,yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
