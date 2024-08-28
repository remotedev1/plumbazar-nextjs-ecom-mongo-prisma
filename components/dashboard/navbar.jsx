"use client";

import { redirect } from "next/navigation";
import { Fragment } from "react";
import { ThemeToggle } from "./theme-toggle";
import { LogoutButton } from "../auth/logout-button";
import { Popover, Transition } from "@headlessui/react";
import Container from "../ui/container";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MainNav } from "./main-nav";

const Navbar = () => {
  const user = useSession();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <Popover className="fixed  top-0 inset-x-0  mx-auto w-full px-2 sm:px-20 border-b  shadow-md  bg-white/80 backdrop-blur-md z-20">
      <Container>
        <header className="mx-2 px-2 md:mx-10">
          <div className="flex items-center justify-between py-4 md:justify-start md:space-x-10s">
            <div className="flex flex-1 justify-start lg:w-0">
              <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                <Image
                  alt="plumbazar"
                  src="/light-logo.png"
                  width={55}
                  height={55}
                />
                {/* <p className="font-light text-xs mt-4 hidden md:block">
                Buy with ease store
              </p> */}
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-neutral-100 hover:text-neutral-200 focus:outline-none   ">
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </Popover.Button>
            </div>
            <div className="hidden md:flex space-x-2 items-center ">
                <span className="relative flex space-x-2 items-center justify-center">
                  <MainNav  />
                </span>
                <ThemeToggle />
                <LogoutButton>Logout</LogoutButton>
              
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
              className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
            >
              <div className="divide-y-2 divide-neutral-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        {/* <Image className="w-36"/> */}
                        <p className="font-bold text-xl">TBI</p>
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
                  <MainNav className={"flex-col space-y-1 ml-0 items-start"} />

                    <ThemeToggle />
                    <LogoutButton>Logout</LogoutButton>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </header>
      </Container>
    </Popover>
  );
};

export default Navbar;
