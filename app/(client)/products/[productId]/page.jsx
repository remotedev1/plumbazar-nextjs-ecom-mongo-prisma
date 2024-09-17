import { getProduct } from "@/actions/get-product";
import { getReview } from "@/actions/get-reviews";
import Gallery from "@/components/frontend/gallery";
import ProductAdditionalInfo from "@/components/ui/product-additional-info";
import Info from "@/components/frontend/product-info";
import ProductRating from "@/components/frontend/product-rating";

import Container from "@/components/ui/container";
import { FaSpinner } from "react-icons/fa";

// Individual Product page

const ProductPage = async ({ params }) => {
  const product = await getProduct(params.productId);
  const reviews = await getReview(params.productId);
  // const suggestedProducts = await getProducts({
  //   categoryId: product?.category?.id,
  // });



  if (!product) {
    return (
      <section className="py-14 relative overflow-x-hidden min-h-[80vh]">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <FaSpinner className="w-10 h-10 mx-auto text-black animate-spin" />
        </div>
      </section>
    );
  }
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="relative lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            <Gallery images={product.images} />
            <div className="z-10 absolute uppercase left-2.5 right-2.5 md:left-4 top-4 text-white items-center font-semibold text-center rounded-full back bg-red-600  flex justify-center  w-12 h-12 text-sm">
              71% OFF
            </div>
            
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              <Info data={product} />

              {/* additional Info */}
              <ProductAdditionalInfo data={product} />
            </div>
          </div>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <hr className="my-10" />

            {/* additional Info */}
            <ProductRating data={product} reviews={reviews} />
          </div>

          {/* <ProductList title="Related Items" items={suggestedProducts} /> */}
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
