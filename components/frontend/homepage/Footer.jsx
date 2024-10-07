"use client";
import { useState } from "react";
import Link from "next/link";

const Footer = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [subscribeEmail, setSubscribeEmail] = useState("");

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleSubscribeChange = (e) => {
    setSubscribeEmail(e.target.value);
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    // Handle contact form submission
    console.log(contactForm);
    // Reset form after submission
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription submission
    console.log(subscribeEmail);
    // Reset email after subscription
    setSubscribeEmail("");
  };

  return (
    <div className="bg-gray-900 ">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-4">
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            {/* Resources Links */}
            <div>
              <p className="font-medium tracking-wide text-gray-300">
                Resources
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Reports
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    News & updates
                  </Link>
                </li>
              </ul>
            </div>
            {/* Agency Links */}
            <div>
              <p className="font-medium tracking-wide text-gray-300">Agency</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/why-us"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Why plumbazar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-services"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partner-program"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Partner program
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund-and-cancel"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Refund and cancel
                  </Link>
                </li>
                <li>
                  <Link
                    href="/return-policy"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Return policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping-policy"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Shipping policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Terms and conditions
                  </Link>
                </li>
              </ul>
            </div>
            {/* Contact Form */}
            <div>
              <p className="font-medium tracking-wide text-gray-300">Contact Us</p>
              <form onSubmit={handleSubmitContact} className="mt-4 space-y-2">
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200"
                />
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200"
                />
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="Your Message"
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200"
                />
                <button
                  type="submit"
                  className="w-full p-2 text-white bg-primary rounded hover:bg-primary/60 transition-colors duration-300"
                >
                  Send
                </button>
              </form>
            </div>
            {/* Subscribe to Newsletter */}
            <div>
              <p className="font-medium tracking-wide text-gray-300">Subscribe to Newsletter</p>
              <form onSubmit={handleSubscribe} className="mt-4">
                <input
                  type="email"
                  value={subscribeEmail}
                  onChange={handleSubscribeChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200"
                />
                <button
                  type="submit"
                  className="w-full p-2 mt-2 text-white bg-primary rounded hover:bg-primary/60 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
          <p className="text-sm text-gray-500">
            © Copyright 2024 Plumbazar. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <Link
              href="/"
              className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.1-0.1C1.7,22,3.6,23,5.7,23c6.8,0,10.5-5.6,10.5-10.5c0-0.2,0-0.3,0-0.5C22.4,6.7,23.3,5.8,24,4.6z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
