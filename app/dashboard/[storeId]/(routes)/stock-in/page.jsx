import { AddProductModel } from "./_components/Add-product";
import { getBrands } from "@/actions/get-brands";
import { getCategories } from "@/actions/get-categories";
import { AddStock } from "./_components/AddStock";
import { getProducts } from "@/actions/get-products";

//components
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/container";

const StockInPage = async () => {
  const brands = await getBrands();
  const categories = await getCategories();
  const products = await getProducts();

  const title = "Add Stock";
  const description = "Handle stock and inventory";

  return (
    <div className="bg-white min-h-[80vh]  py-14">
      <Container>
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
        </div>
        <Separator className="my-6" />
        <AddProductModel brands={brands} categories={categories} />
        <AddStock products={products} />
      </Container>
    </div>
  );
};

export default StockInPage;
