import NoResults from "./no-results";
import ProductCard from "../ui/product-card";
import Container from "../ui/container";
import { SkeletonCard } from "../common/card-skeleton";

const ProductList = ({ title, items }) => {
  return (
    <div className="space-y-4   mx-auto">
      <Container>
        {title && (
          <div className="text-center mx-auto">
            <h1 className="text-4xl md:text-7xl font-bold mb-5    text-gray-600">
              {title}
            </h1>
            <div className="text-center mb-10">
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1" />
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1" />
              <span className="inline-block w-40 h-1 rounded-full bg-indigo-500" />
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1" />
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1" />
            </div>
          </div>
        )}
        {items.length === 0 && <NoResults />}
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-auto">
          {items.length > !0
            ? [1, 2, 3, 4, 5].map((item) => <SkeletonCard key={item} />)
            : items.map((item) => (
            
                  <ProductCard key={item.id} data={item} />
              ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductList;
