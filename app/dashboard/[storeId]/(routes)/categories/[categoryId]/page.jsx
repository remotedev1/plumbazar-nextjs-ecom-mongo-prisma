import { auth } from "@/auth";
import { CategoryForm } from "./components/category-form";
import { db } from "@/lib/db";
import Unauthorized from "@/components/auth/un-authorized";

const CategoryPage = async ({ params }) => {
  const { user } = await auth();
  if (user.role !== "SUPERADMIN" && user.role !== "ADMIN") {
    return <Unauthorized />;
  }
  if (params.categoryId !== "new") {
    var category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });
  }

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
