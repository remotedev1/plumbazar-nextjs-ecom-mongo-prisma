import { redirect } from "next/navigation";

import { MainNav } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";
import { auth } from "@/auth";
import { LogoutButton } from "../auth/logout-button";

const Navbar = async () => {
  const { user } = await auth();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <LogoutButton>Logout</LogoutButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
