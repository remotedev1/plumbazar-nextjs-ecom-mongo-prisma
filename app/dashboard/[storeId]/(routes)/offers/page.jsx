import { format } from "date-fns";
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
    title: item.title,
    description: item.description,
    discountPercentage: item.discountPercentage,
    products: item.products,
    validFrom: item.validFrom,
    validUntil: item.validUntil,
    deletedAt: item.deletedAt,
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
