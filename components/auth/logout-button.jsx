"use client";

import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

export const LogoutButton = ({ children}) => {

  const signOut = async () => {
    await logout();
    window.location.reload()
  }
  return <Button onClick={signOut}> {children}</Button>;
};
