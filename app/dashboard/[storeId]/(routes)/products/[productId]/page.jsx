import { db } from "@/lib/db";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({ params }) => {
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

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm brands={brands} initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
