"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/dashboard/${params.storeId}`,
      label: "Overview",
      active: pathname === `/dashboard/${params.storeId}`,
    },
    {
      href: `/dashboard/${params.storeId}/users`,
      label: "Users",
      active: pathname === `/dashboard/${params.storeId}/users`,
    },
    {
      href: `/dashboard/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/dashboard/${params.storeId}/billboards`,
    },
    {
      href: `/dashboard/${params.storeId}/brands`,
      label: "Brands",
      active: pathname === `/dashboard/${params.storeId}/brands`,
    },
    {
      href: `/dashboard/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/dashboard/${params.storeId}/categories`,
    },
    {
      href: `/dashboard/${params.storeId}/stock-in`,
      label: "Stock-in",
      active: pathname === `/dashboard/${params.storeId}/stock-in`,
    },
    {
      href: `/dashboard/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/dashboard/${params.storeId}/products`,
    },
    {
      href: `/dashboard/${params.storeId}/products/mass-edit`,
      label: "mass edit",
      active: pathname === `/dashboard/${params.storeId}/products/mass-edit`,
    },
    {
      href: `/dashboard/${params.storeId}/offers`,
      label: "Offers",
      active: pathname === `/dashboard/${params.storeId}/offers`,
    },
    {
      href: `/dashboard/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/dashboard/${params.storeId}/orders`,
    },
    {
      href: `/dashboard/${params.storeId}/rfq`,
      label: "RFQ",
      active: pathname === `/dashboard/${params.storeId}/rfq`,
    },
    {
      href: `/dashboard/${params.storeId}/testimonials`,
      label: "Testimonials",
      active: pathname === `/dashboard/${params.storeId}/testimonials`,
    },
    // {
    //   href: `/dashboard/${params.storeId}/settings`,
    //   label: "Settings",
    //   active: pathname === `/dashboard/${params.storeId}/settings`,
    // },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 ml-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",

            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
