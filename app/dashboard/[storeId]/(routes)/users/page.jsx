import { format } from "date-fns";

import { db } from "@/lib/db";
import UsersClient from "./components/Client";

const UsersPage = async () => {
  const users = await db.user.findMany();

  const formattedUsers = users.map((user) => ({
    id: user.id,
    user: user.name,
    email: user.email,
    phone: user?.phone,
    createdAt: format(new Date(user.createdAt), "MMMM do ,yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={formattedUsers} />
      </div>
    </div>
  );
};

export default UsersPage;
