import { SizeForm } from "./components/size-form";
import { db } from "@/lib/db";

const SizePage = async ({ params }) => {
  if (params.sizeId !== "new") {
    var size = await db.size.findFirst({
      where: {
        id: params.sizeId,
      },
    });
  }
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
