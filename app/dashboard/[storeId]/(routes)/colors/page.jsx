import { format } from "date-fns";

import ColorsClient from "./components/Client";
import { db } from "@/lib/db";

const ColorsPage = async ({
  params,
}) => {
  const colors = await db.color.findMany({

    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors= colors.map(item => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(new Date(item.createdAt), "MMMM do ,yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
