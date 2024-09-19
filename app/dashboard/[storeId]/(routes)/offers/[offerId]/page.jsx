import { db } from "@/lib/db";
import { OfferForm } from "./components/offer-form";
import { auth } from "@/auth";
import Unauthorized from "@/components/auth/un-authorized";

const OfferPage = async ({ params }) => {
  const { user } = await auth();
  if (user.role !== "SUPERADMIN" && user.role !== "ADMIN") {
    return <Unauthorized />;
  }
  if (params.offerId !== "new") {
    var offer = await db.offer.findFirst({
      where: {
        id: params.offerId,
      },
    });
  }

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OfferForm initialData={offer} />
      </div>
    </div>
  );
};

export default OfferPage;
