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
      className="cursor-pointer hover:bg-[#e62a2a8e] bg-[#e62a2a] px-5 text-white rounded-sm "
    >
      sign-out
    </Button>
  );
};
