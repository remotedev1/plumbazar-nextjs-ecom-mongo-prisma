import { getBrands } from "@/actions/get-brands";
import ProductsList from "./productsList";
import { getCategories } from "@/actions/get-categories";

const page = async ({ searchParams }) => {
  return (
    <ProductsList
      searchParams={searchParams}
   
    />
  );
};

export default page;
