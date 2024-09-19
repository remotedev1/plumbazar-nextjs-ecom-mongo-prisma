import { format } from "date-fns";

import { rupeeFormatter } from "@/lib/utils";

import { db } from "@/lib/db";
import OffersClient from "./components/Client";

const OffersPage = async ({ params }) => {
  const offers = await db.offer.findMany({
    include: {
      products: true,
    },
  });


  // // code transforms an array of products into a new array called formattedProducts, where each item in the new array has properties that are derived from the corresponding properties of the items in the original products array, with some additional formatting applied to certain properties.
  const formattedOffers = offers.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    msp: rupeeFormatter.format(item.msp),
    mrp: rupeeFormatter.format(item.mrp),
    purchasedPrice: rupeeFormatter.format(item.purchasedPrice),
    brand: item.brand.name,
    category: item.category.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OffersClient data={formattedOffers} />
      </div>
    </div>
  );
};

export default OffersPage;
