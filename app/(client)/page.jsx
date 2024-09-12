import { getBillboard } from "@/actions/get-billboard";
import { getBrands } from "@/actions/get-brands";
import { getStore } from "@/actions/get-store";
import { Testimonials } from "@/components/frontend/Testimonials";
import Billboard from "@/components/frontend/billboard";
import BrandList from "@/components/frontend/brands";
import CategoryList from "@/components/frontend/categories";
import ProductCarousel from "@/components/frontend/product-carousel";

export const revalidate = 0;

export default async function Home() {
  const billboard = await getBillboard();
  const brands = await getBrands();
const store = await getStore();


  return (
    <main className="flex  w-full overflow-hidden min-h-dvh flex-col items-center justify-between  text-black">
      <Billboard data={billboard} />
      {/* <ProductList title="Featured Products" items={products} /> */}
      {/* <ProductCarousel productData={products} title={"Featured Products"} />
       */}
      <BrandList data={brands} />
      <ProductCarousel
        title={"Jaquar Products"}
        filter={{ brand: "jaquar" }}
        storeId={store.id}
      />
      <CategoryList />
      <ProductCarousel
        title={"Bathroom Products"}
        filter={{ category: "tap" }}
        storeId={store.id}

      />
      <Testimonials />
    </main>
  );
}
