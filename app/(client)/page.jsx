import { getBillboard } from "@/actions/get-billboard";
import { getProducts } from "@/actions/get-products";
import { Testimonials } from "@/components/frontend/Testimonials";
import Billboard from "@/components/frontend/billboard";
import ProductCarousel from "@/components/frontend/product-carousel";
import ProductList from "@/components/frontend/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

export default async function Home() {
  const billboard = await getBillboard();
  const products = await getProducts();
  return (
    <main className="flex min-h-dvh flex-col items-center justify-between py-4 text-black">
      <Container>
        <div className="space-y-10 pb-10">
          <Billboard data={billboard} />
          <div className="flex flex-col  px-4 sm:px-6 lg:px-8">
            {/* <ProductList title="Featured Products" items={products} /> */}
          </div>
          <ProductCarousel productData={products}  title={"Featured Products"}/>
          <ProductCarousel productData={products}  title={"Bathroom Products"}/>
          <div>
            <Testimonials />
          </div>
        </div>
      </Container>
    </main>
  );
}
