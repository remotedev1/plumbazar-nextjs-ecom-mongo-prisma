import { redirect } from "next/navigation";

import React from "react";
import { SettingsForm } from "./components/settings-form";
import { db } from "@/lib/db";
import { auth } from "@/auth";

const SettingsPage = async ({ params }) => {
  const { user } = await auth();

  if (!user) {
    redirect("/auth/login");
  }

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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
