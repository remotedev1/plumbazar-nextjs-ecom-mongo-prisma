import { getBillboard } from "@/actions/get-billboard";
import { getBrands } from "@/actions/get-brands";
import { Testimonials } from "@/components/frontend/Testimonials";
import Billboard from "@/components/frontend/homepage/billboard";
import BrandList from "@/components/frontend/homepage/brands";
import CategoryList from "@/components/frontend/homepage/categories";
import ClienteleList from "@/components/frontend/homepage/clientele";
import OurServices from "@/components/frontend/homepage/our-services";
import { PartnerProgram } from "@/components/frontend/homepage/partner-program";
import { WhyChooseUs } from "@/components/frontend/homepage/why-choose-us";
import ProductCarousel from "@/components/frontend/product-carousel";

export const revalidate = 0;

export default async function Home() {
  const billboard = await getBillboard();
  const brands = await getBrands();

  return (
    <main className="flex   overflow-hidden min-h-dvh flex-col items-center justify-between  text-black">
      <div className="flex w-full flex-col">
        <Billboard data={billboard} />
        <span className="w-full bg-gray-50 py-5">
          <CategoryList />
        </span>
        <BrandList data={brands} />

        <OurServices />
        <WhyChooseUs />

        {/* <ProductCarousel
          title={"Jaquar Products"}
          filter={{ brand: "jaquar" }}
        /> */}
        <ClienteleList />
        <PartnerProgram />
        <Testimonials />
      </div>
    </main>
  );
}
