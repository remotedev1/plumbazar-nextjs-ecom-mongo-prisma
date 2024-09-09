import { db } from "@/lib/db";
import { ProductForm } from "./components/product-form";
import { auth } from "@/auth";
import Unauthorized from "@/components/auth/un-authorized";

const ProductPage = async ({ params }) => {
  const { user } = await auth();
  if (user.role !== "SUPERADMIN" && user.role !== "ADMIN") {
    return <Unauthorized />;
  }
  let product = null;
  if (params.productId !== "new") {
    product = await db.product.findFirst({
      where: {
        id: params.productId,
      },
    });
  }

  //fetch brands -> pass brands to form
  const brands = await db.brand.findMany();
  //fetch categories -> pass categories to form
  const categories = await db.category.findMany();

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm brands={brands} categories={categories} initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
