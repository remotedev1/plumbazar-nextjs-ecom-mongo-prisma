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

  //fetch categories -> pass categories to form
  const categories = await db.category.findMany();

  //Load sizes -> pass sizes to form
  const sizes = await db.size.findMany();

  //Load colors -> pass colors to form
  const colors = await db.color.findMany();

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
