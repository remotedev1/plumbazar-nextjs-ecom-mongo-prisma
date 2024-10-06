import { auth } from "@/auth";
import { ClienteleForm } from "./components/clientele-form";
import { db } from "@/lib/db";
import Unauthorized from "@/components/auth/un-authorized";

const ClientelePage = async ({ params }) => {
  const { user } = await auth();
  if (user.role !== "SUPERADMIN" && user.role !== "ADMIN") {
    return <Unauthorized />;
  }
  if (params.clienteleId !== "new") {
    var clientele = await db.clientele.findFirst({
      where: {
        id: params.clienteleId,
      },
    });
  }

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClienteleForm initialData={clientele} />
      </div>
    </div>
  );
};

export default ClientelePage;
