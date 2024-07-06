import { isPrismaIdValid } from "@/lib/utils";
import { BillboardForm } from "./components/billboard-form";
import { db } from "@/lib/db";

const BillboardPage = async ({ params }) => {
  if (params.billboardId !== "new") {
    var billboard = await db.billboard.findFirst({
      where: { id: params.billboardId },
      
    });
  }
  const categories = await db.category.findMany({});

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} categories={categories} />
      </div>
    </div>
  );
};

export default BillboardPage;
