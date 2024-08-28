import Container from "@/components/ui/container";
import { AddProductModel } from "./_components/Add-product";
import { getBrands } from "@/actions/get-brands";
import { getCategories } from "@/actions/get-categories";

const StockInPage = async () => {
  const brands = await getBrands();
  const categories = await getCategories();

  return (
    <div className="bg-white min-h-[80vh]  py-14">
      <Container>
        <AddProductModel brands={brands} categories={categories} />
      </Container>
    </div>
  );
};

export default StockInPage;
