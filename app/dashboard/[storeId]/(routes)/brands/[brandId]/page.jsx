import { db } from "@/lib/db";
import { BrandForm } from "./components/brand-form";

const BrandPage = async ({ params }) => {
  if (params.brandId !== "new") {
    var brand = await db.brand.findFirst({
      where: {
        id: params.brandId,
      },
    });
  }

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandForm initialData={brand} />
      </div>
    </div>
  );
};

export default BrandPage;
