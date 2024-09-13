"use client";
import { ChevronDown, ChevronUp, Clock, Mail, Phone } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Container from "../ui/container";

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full  bg-secondary lg:bg-primary ">
      <Container>
        {/* Content */}
        <div
          className={`${
            isOpen ? "block max-h-fit" : "hidden"
          } lg:flex lg:items-center lg:justify-between  transition-all duration-300 ease-in-out text-sm overflow-hidden lg:opacity-100 lg:max-h-full px-3 py-5 lg:p-0`}
          >
          {/* Contact Information */}
          <div className="space-y-4 lg:flex lg:space-y-0 lg:space-x-8 text-primary lg:text-secondary">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>123456789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>support@plumbit.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Mon-Fri 8am - 5pm</span>
            </div>
          </div>

          {/* Quote Button */}
          <div className="mt-4 lg:mt-0">
            <Link href="/rfq/new">
              <span
                className="w-fit lg:block lg:bg-secondary bg-primary lg:text-primary text-secondary p-5 py-3  hover:bg-secondary/90"
              >
                Request a Quote
              </span>
            </Link>
          </div>
        </div>
        {/* Accordion trigger for mobile and tablet */}
        <button
          className="lg:hidden w-full flex items-center justify-center bg-primary text-secondary py-0.5"
          onClick={toggleAccordion}
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </Container>
    </div>
  );
};

export default TopNavbar;
