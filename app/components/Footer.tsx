"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Made using Vercel and Next.js
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="https://github.com/vishrutkmr7"
            passHref
            legacyBehavior={true}
          >
            <a
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </a>
          </Link>
          <Link
            href="https://linkedin.com/in/vishrutkmr7"
            passHref
            legacyBehavior={true}
          >
            <a
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
          </Link>
          <Link href="https://x.com/vishrutkmr7" passHref legacyBehavior={true}>
            <a
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </a>
          </Link>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-4">
          {"© "}
          {new Date().getFullYear()} Vishrut Jha. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
