import { redirect } from "next/navigation";

import { auth } from "@/auth";
import Link from "next/link";
import Container from "../ui/container";

export const AdminDashLink = async () => {
  const { user } = await auth();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <Container>
      <div className="border-b bg-white">
        <div className="flex  items-center px-4 py-2">
          <div className="ml-auto flex items-center space-x-4">
            <Link
              className="font-medium bg-black text-white p-1 rounded"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};
