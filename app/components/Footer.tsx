"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Footer as FlowbiteFooter } from "flowbite-react";

const Footer = () => {
  return (
    <FlowbiteFooter
      container
      className="bg-gray-900 dark:bg-gray-900 text-gray-300 py-6 mt-auto"
    >
      <FlowbiteFooter.Copyright
        href="#"
        by="Vishrut Jha™ | Made with ❤️ using Vercel and Next.js"
        year={new Date().getFullYear()}
      />
      <FlowbiteFooter.LinkGroup>
        <FlowbiteFooter.Link as={Link} href="https://github.com/vishrutkmr7">
          <FlowbiteFooter.Icon
            href="https://github.com/vishrutkmr7"
            icon={FaGithub}
          />
        </FlowbiteFooter.Link>
        <FlowbiteFooter.Link
          as={Link}
          href="https://linkedin.com/in/vishrutkmr7"
        >
          <FlowbiteFooter.Icon
            href="https://linkedin.com/in/vishrutkmr7"
            icon={FaLinkedin}
          />
        </FlowbiteFooter.Link>
        <FlowbiteFooter.Link as={Link} href="https://x.com/vishrutkmr7">
          <FlowbiteFooter.Icon
            href="https://x.com/vishrutkmr7"
            icon={FaTwitter}
          />
        </FlowbiteFooter.Link>
      </FlowbiteFooter.LinkGroup>
    </FlowbiteFooter>
  );
};

export default Footer;
