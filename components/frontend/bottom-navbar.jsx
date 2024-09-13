"use client";
import { cn } from "@/lib/utils";
import { Home, ShoppingCart, Store, UserCog, icons } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavbar = () => {
  const pathname = usePathname();

  const data = [
    {
      href: "/",
      label: "Home",
      icons: <Home />,
    },
    {
      href: "/products",
      label: "store",
      icons: <Store />,
    },
    {
      href: "/cart",
      label: "cart",
      icons: <ShoppingCart />,
    },
    {
      href: "/profile",
      label: "profile",
      icons: <UserCog />,
    },
  ];

  const routes = data.map((route) => ({
    href: `${route.href}`,
    label: route.label,
    active: pathname === `${route.href}`,
    icon: route.icons,
  }));

  return (
    <div className="md:hidden  fixed bottom-0 left-0 z-[9999] w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium ">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className={cn(
              "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group",
              route.active ? "text-[#007bff]" : " text-black"
            )}
          >
            {route.icon}
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              {route.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
