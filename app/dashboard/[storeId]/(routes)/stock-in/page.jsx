import { AddProductModel } from "./_components/Add-product";
import { getBrands } from "@/actions/get-brands";
import { getCategories } from "@/actions/get-categories";
import { AddStock } from "./_components/AddStock";

//components
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/container";
import Unauthorized from "@/components/auth/un-authorized";
import { auth } from "@/auth";

const StockInPage = async () => {
  const { user } = await auth();
  if (user.role !== "SUPERADMIN" && user.role !== "ADMIN") {
    return <Unauthorized />;
  }
  const brands = await getBrands();
  const categories = await getCategories();

  const title = "Add Stock";
  const description = "Handle stock and inventory";

  return (
    <div className="bg-white min-h-[80vh]  py-14 px-4">
      <Container>
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
          <AddProductModel brands={brands} categories={categories} />
        </div>
        <Separator className="my-6" />
        <AddStock />
      </Container>
    </div>
  );
};

export default StockInPage;
