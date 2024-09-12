"use client";

import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

export const LogoutButton = ({ children }) => {
  const signOut = async () => {
    await logout();
    window.location.reload();
  };
  return (
    <Button
      onClick={signOut}
      className="cursor-pointer hover:bg-[#ff29588e] bg-[#ff2958] px-5 text-white rounded-sm "
    >
      sign-out
    </Button>
  );
};
