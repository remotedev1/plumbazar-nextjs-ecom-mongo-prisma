import { redirect } from "next/navigation";


import { db } from "@/lib/db";
import { auth } from "@/auth";
import Navbar from "@/components/dashboard/navbar";
import InvoiceProvidersComponent from "./providers";

export default async function DashboardLayout({ children, params }) {
  const { user } = await auth();

  if (!user) {
    redirect("/auth/login");
  }

  // Checking if the store exists and belongs to the user before rendering the page
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: user.id,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div className="min-h-[80vh]">
        <Navbar />
        <div className="mt-[4rem]">
        <InvoiceProvidersComponent>
        {children}
        </InvoiceProvidersComponent>
        </div>
      </div>
      <div className="hidden flex-col md:flex"></div>
    </>
  );
}
