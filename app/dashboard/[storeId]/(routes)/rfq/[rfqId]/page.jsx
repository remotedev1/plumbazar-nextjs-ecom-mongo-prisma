import { isPrismaIdValid } from "@/lib/utils";
import { ColorForm } from "./components/color-form";
import { db } from "@/lib/db";

const ColorPage = async ({ params }) => {
  if (params.colorId !== "new") {
    var color = await db.color.findFirst({
      where: {
        id: params.colorId,
      },
    });
  }
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
