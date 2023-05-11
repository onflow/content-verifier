"use client";
import React from "react";
import Image from "next/image";
import * as verifier from "@/app/fcl-verifier";

export const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full fixed">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <Image
            src="/flow-logo.png"
            className="h-8 mr-3"
            alt="Flowbite Logo"
            width={40}
            height={40}
          />{" "}
          Content Verifier
        </a>
        <verifier.SignInButton />
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <a
              href="add"
              className="block m-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Add Content
            </a>
            <a
              href="yourContent"
              className="block m-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Your Content
            </a>
          </ul>
        </div>
      </div>
    </nav>
  );
};
