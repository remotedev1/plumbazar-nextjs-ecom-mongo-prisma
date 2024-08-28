import Container from "@/components/ui/container";
import { AddProductModel } from "./_components/Add-product";
import { getBrands } from "@/actions/get-brands";
import { getCategories } from "@/actions/get-categories";
import { AddStock } from "./_components/AddStock";
import { getProducts } from "@/actions/get-products";

const StockInPage = async () => {
  const brands = await getBrands();
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <div className="bg-white min-h-[80vh]  py-14">
      <Container>
        <AddProductModel brands={brands} categories={categories} />
        <AddStock products={products} />
      </Container>
    </div>
  );
};

export default StockInPage;
