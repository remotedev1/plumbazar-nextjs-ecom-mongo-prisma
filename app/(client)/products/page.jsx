import ProductsList from "./productsList";

const page = async ({ searchParams }) => {
  return <ProductsList searchParams={searchParams} />;
};

export default page;
