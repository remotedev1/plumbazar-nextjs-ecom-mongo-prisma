import { format } from "date-fns";

import SizesClient from "./components/Client";
import { db } from "@/lib/db";

const SizesPage = async ({ params }) => {
  const sizes = await db.size.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(new Date(item.createdAt), "MMMM do ,yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
