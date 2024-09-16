import { getBrands } from "@/actions/get-brands";
import ProductsList from "./productsList";
import { getCategories } from "@/actions/get-categories";

const page = async ({ searchParams }) => {
  const brands = await getBrands();
  const categories = await getCategories();
  return (
    <ProductsList
      searchParams={searchParams}
      brands={brands}
      categories={categories}
    />
  );
};

export default page;
