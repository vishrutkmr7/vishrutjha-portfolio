"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Bio = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="relative w-full h-64 md:h-full">
        <Image
          src="/your-image.jpg"
          alt="Vishrut Jha"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Vishrut Jha</h1>
        <p className="mb-4">
          Your short bio goes here. Describe yourself, your expertise, and what
          youre passionate about.
        </p>
        <div className="flex space-x-4">
          {/* <Link href="https://github.com/vishrutkmr7" passHref>
            <a className="text-gray-300 hover:text-white">
              <FaGithub size={24} />
            </a>
          </Link>
          <Link href="https://linkedin.com/in/vishrutkmr7" passHref>
            <a className="text-gray-300 hover:text-white">
              <FaLinkedin size={24} />
            </a>
          </Link>
          <Link href="https://x.com/vishrutkmr7" passHref>
            <a className="text-gray-300 hover:text-white">
              <FaTwitter size={24} />
            </a>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Bio;
