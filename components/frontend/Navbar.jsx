"use client";

import Link from "next/link";

import Container from "@/components/ui/container";
import MainNav from "./main-nav";
import NavbarCart from "./navbar-cart";
import { LoginButton } from "../auth/login-button";
import NavbarWishlist from "./navbar-wishlist";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

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
    {
      href: "/profile",
      label: "profile",
    },
  ];
  return (
    <Popover className=" justify-between  h-[5.5rem] top-0 inset-x-0  w-full  px-6 border-b  shadow-md  bg-white/80 backdrop-blur-md z-20">
      <Container>
        <header >
          <div className="flex items-center justify-between md:justify-start md:space-x-10s">
            <div className="flex flex-1 justify-start lg:w-0">
              <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                <Image
                  alt="plumbazar"
                  src="/light-logo.png"
                  width={90}
                  height={90}
                />
                {/* <p className="font-light text-xs mt-4 hidden md:block">
                  Buy with ease store
                </p> */}
              </Link>
            </div>
            <div className="flex -my-2 -mr-2 xl:hidden">
              <div className="relative flex">
              {user.status === "authenticated" && <NavbarWishlist />}
              <NavbarCart />
              </div>
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
              {/* <div className=" border-2 focus-within:border-gray-400 rounded-full px-6 py-3 overflow-hidden max-w-52 hidden md:flex">
                <input
                  type="text"
                  placeholder="Search something..."
                  className="w-full text-sm bg-transparent outline-none pr-2"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="16px"
                  className="cursor-pointer fill-gray-600"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                </svg>
              </div> */}
              <div className="hidden xl:flex">
                <span className="relative flex space-x-2 items-center justify-center">
                  <MainNav data={data} />
                </span>
                <span className="relative">
                  {user.status === "authenticated" && <NavbarWishlist />}
                </span>
                <span className="relative">
                  <NavbarCart />
                </span>
                <LoginButton>Sign In</LoginButton>
              </div>
              {/* <button className="px-5 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]">
                  Sign In
                </button> */}
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
              className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition xl:hidden"
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
                    <MainNav data={data} />

                    <LoginButton>Sign In</LoginButton>
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
