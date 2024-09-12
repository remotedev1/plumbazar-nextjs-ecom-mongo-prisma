"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const MainNav = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `${route.href}`,
    label: route.label,
    active: pathname === `${route.href}`,
  }));

  return (
    <>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "transition-colors hover:text-[#007bff] text-[15px] block font-semibold",
            route.active ? "text-[#007bff]" : " text-black"
          )}
        >
          {route.label}
        </Link>
      ))}
    </>
  );
};

export default MainNav;
