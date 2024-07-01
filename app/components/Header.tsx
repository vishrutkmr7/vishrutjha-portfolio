"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "flowbite-react";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const baseClass =
      "block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0";
    return pathname === href ? `${baseClass} text-blue-500` : baseClass;
  };

  return (
    <Navbar
      fluid
      rounded
      className="bg-gray-900 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-gray-600"
    >
      <div className="container mx-auto flex items-center justify-between w-full px-4">
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link as={Link} href="/" className={getLinkClass("/")}>
            Home
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href="/journey"
            className={getLinkClass("/journey")}
          >
            Journey
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href="/projects"
            className={getLinkClass("/projects")}
          >
            Projects
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href="/media"
            className={getLinkClass("/media")}
          >
            Media
          </Navbar.Link>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
