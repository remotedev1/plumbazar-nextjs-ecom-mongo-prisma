import { getProduct } from "@/actions/get-product";
import { getReview } from "@/actions/get-reviews";
import Gallery from "@/components/frontend/gallery";
import ProductAdditionalInfo from "@/components/frontend/product-additional-info";
import Info from "@/components/frontend/product-info";
import ProductRating from "@/components/frontend/product-rating";
// import { getProducts } from "@/actions/get-products";
// import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

// Individual Product page

const ProductPage = async ({ params }) => {
  const product = await getProduct(params.productId);
  const reviews = await getReview(params.productId);

  // const suggestedProducts = await getProducts({
  //   categoryId: product?.category?.id,
  // });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            <Gallery images={product.images} />

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              <Info data={product} />
            </div>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <hr className="my-10" />

              {/* additional Info */}
              <ProductAdditionalInfo data={product} />
            </div>
          </div>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <hr className="my-10" />

            {/* additional Info */}
            <ProductRating data={product} reviews={reviews} />
          </div>

          <hr className="my-10" />
          {/* <ProductList title="Related Items" items={suggestedProducts} /> */}
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
