import { format } from "date-fns";

import { rupeeFormatter } from "@/lib/utils";

import ProductsClient from "./components/Client";
import { db } from "@/lib/db";

const ProductsPage = async ({ params }) => {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      brand: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // code transforms an array of products into a new array called formattedProducts, where each item in the new array has properties that are derived from the corresponding properties of the items in the original products array, with some additional formatting applied to certain properties.
  const formattedProducts = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: rupeeFormatter.format(item.price),
    purchasedPrice: rupeeFormatter.format(item.purchasedPrice),
    brand: item.brand.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
