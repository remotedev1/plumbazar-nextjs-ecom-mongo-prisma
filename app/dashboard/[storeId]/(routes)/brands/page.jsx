import { format } from "date-fns";

import { db } from "@/lib/db";
import BrandClient from "./components/Client";

const BrandsPage = async ({ params }) => {
  const brand = await db.brand.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBrands = brand.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(new Date(item.createdAt), "MMMM do ,yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandClient data={formattedBrands} />
      </div>
    </div>
  );
};

export default BrandsPage;
