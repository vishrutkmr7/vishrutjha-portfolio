"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "flowbite-react";

const Header: React.FC = () => {
  return (
    <Navbar
      fluid
      rounded
      className="bg-gray-900 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-600"
    >
      <Navbar.Brand as={Link} href="/">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/halo.png"
            alt="Vishrut Jha"
            width={40}
            height={40}
            className="rounded-full mr-3 h-6 sm:h-9"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Vishrut Jha
          </span>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          href="/"
          className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/journey"
          className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
        >
          Journey
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/projects"
          className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
        >
          Projects
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/achievements"
          className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
        >
          Achievements
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
