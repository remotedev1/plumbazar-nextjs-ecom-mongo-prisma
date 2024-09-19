import ProductsClient from "./components/Client";

const ProductsPage = async ({ params }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient />
      </div>
    </div>
  );
};

export default ProductsPage;
