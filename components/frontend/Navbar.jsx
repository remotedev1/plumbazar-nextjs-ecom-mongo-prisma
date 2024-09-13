"use client";
import { Fragment } from "react";
import Link from "next/link";

import Container from "@/components/ui/container";
import MainNav from "./main-nav";
import NavbarCart from "./navbar-cart";
import { LoginButton } from "../auth/login-button";
import NavbarWishlist from "./navbar-wishlist";
import { Popover, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CustomDropdownMenu } from "../common/custom-dropdown";
import AdminDashLink from "./AdminNavLink";
import { cn } from "@/lib/utils";
import { SearchProducts } from "./search-products";

export const Navbar = () => {
  const user = useSession();

  const data = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/products",
      label: "shop",
    },
  ];

  const dropdownOptions = [
    // { label: "Activity Bar", checked: showActivityBar, setChecked: setShowActivityBar, disabled: true },
    { label: "Profile", href: "/profile" },
    { label: "cart", href: "/cart" },
    { label: "wishlist", href: "/wishlist" },
  ];

  return (
    <Popover
      className={cn(
        "bg-white mx-auto w-full px-8 sm:px-20 z-20 transition-all duration-75 ease-in bg-white/50 backdrop-blur-sm",
        "sticky top-0  bg-white shadow-md"
      )}
    >
      {({ open }) => (
        <Container>
          {open && (
            <div className="fixed w-full h-screen inset-0 bg-black bg-opacity-50 z-20" />
          )}
          <header>
            <div className="flex items-center justify-between md:justify-start md:space-x-10s">
              <div className="flex flex-1 justify-start lg:w-0 overflow-hidden">
                <Link href="/" className="flex gap-x-2">
                  <div className="-ml-4 lg:-ml-1 relative aspect-[1/1] w-16 md:w-24">
                    <Image
                      alt="plumbazar"
                      src="/light-logo.png"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </Link>
              </div>
              <div className="flex -my-2 -mr-2 xl:hidden justify-center items-center">
                <div className="relative  hidden lg:flex">
                  {user.status === "authenticated" && <NavbarWishlist />}
                  <NavbarCart />
                </div>
                <SearchProducts />

                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-neutral-100 hover:text-neutral-200 focus:outline-none   ">
                  <span className="sr-only">Open menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="black"
                    className="h-10 w-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Popover.Button>
              </div>

              {/* <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            </Popover.Group> */}

              <div className="flex items-center space-x-5  ml-auto">
                <div className="hidden xl:flex ">
                  <SearchProducts />

                  <span className="relative flex space-x-2 items-center justify-center">
                    <MainNav data={data} />
                  </span>
                  <span className="relative">
                    {user.status === "authenticated" && <NavbarWishlist />}
                  </span>
                  <span className="relative">
                    <NavbarCart />
                  </span>
                  <CustomDropdownMenu
                    options={dropdownOptions}
                    label="Account settings"
                    title={"Accounts"}
                    buttonContent={[, <LoginButton key="login" />]}
                  />
                </div>
              </div>
            </div>
            {/* //mobile */}
            <Transition
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition xl:hidden z-30"
              >
                <div className="divide-y-2 divide-neutral-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-5 pt-5 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 justify-start lg:w-0">
                        <Link href="/" className="flex  gap-x-2">
                          <div className="relative aspect-[1/1] w-24">
                            <Image
                              alt="plumbazar"
                              src="/light-logo.png"
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 py-6 px-5">
                    <div className="grid grid-cols-1 gap-y-4 gap-x-8">
                      <MainNav data={[...data, ...dropdownOptions]} />

                      <LoginButton>Sign In</LoginButton>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </header>
        </Container>
      )}
    </Popover>
  );
};
