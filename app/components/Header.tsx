"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "flowbite-react";

const Header: React.FC = () => {
  return (
    <Navbar
      fluid
      rounded
      className="bg-gray-900 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-gray-600"
    >
      <div className="container mx-auto flex items-center justify-between w-full px-4">
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
            href="/media"
            className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
          >
            Media
          </Navbar.Link>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
