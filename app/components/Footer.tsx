"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Footer as FlowbiteFooter } from "flowbite-react";

const Footer = () => {
  return (
    <FlowbiteFooter
      container
      className="bg-gray-900 dark:bg-gray-900 text-gray-300 py-6 mt-auto"
    >
      <div className="w-full flex flex-col sm:flex-row justify-between items-center">
        <FlowbiteFooter.Copyright
          href="#"
          by="Vishrut Jha™"
          title="Made with ❤️ using Next.js, Flowbite and Vercel"
          year={new Date().getFullYear()}
        />
        <FlowbiteFooter.LinkGroup className="mt-3 sm:mt-0">
          <FlowbiteFooter.Link href="https://github.com/vishrutkmr7">
            <FaGithub />
          </FlowbiteFooter.Link>
          <FlowbiteFooter.Link href="https://linkedin.com/in/vishrutkmr7">
            <FaLinkedin />
          </FlowbiteFooter.Link>
          <FlowbiteFooter.Link href="https://x.com/vishrutkmr7">
            <FaTwitter />
          </FlowbiteFooter.Link>
        </FlowbiteFooter.LinkGroup>
      </div>
    </FlowbiteFooter>
  );
};

export default Footer;
