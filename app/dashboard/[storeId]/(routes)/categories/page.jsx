import { format } from "date-fns";

import CategoryClient from "./components/Client";
import { db } from "@/lib/db";

const CategoriesPage = async ({ params }) => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(new Date(item.createdAt), "MMMM do ,yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
