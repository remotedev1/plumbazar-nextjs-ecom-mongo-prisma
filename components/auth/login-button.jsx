"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogoutButton } from "./logout-button";
import { Button } from "../ui/button";

export const LoginButton = ({ mode = "redirect", asChild }) => {
  const user = useSession();
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "model") {
    return (
      <span className="cursor-pointer hover:underline" onClick={onClick}>
        {/* //TODO */}
        Do this later
      </span>
    );
  }
  return (
    <>
      {user.status === "authenticated" ? (
        <LogoutButton />
      ) : (
        <Button
          className="cursor-pointer hover:bg-[#007bff8e] bg-[#007bff]  px-5 text-white rounded-sm "
          onClick={onClick}
        >
          sign-in
        </Button>
      )}
    </>
  );
};
