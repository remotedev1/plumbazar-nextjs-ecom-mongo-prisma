import { format } from "date-fns";

import ClienteleClient from "./components/Client";
import { db } from "@/lib/db";

const ClientelePage = async ({ params }) => {
  const clienteles = await db.clientele.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedClienteles = clienteles.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.images[0],
    createdAt: format(new Date(item.createdAt), "MMMM do ,yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClienteleClient data={formattedClienteles} />
      </div>
    </div>
  );
};

export default ClientelePage;
