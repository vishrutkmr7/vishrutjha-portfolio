"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "flowbite-react";
import { TypeAnimation } from "react-type-animation";
import Highlights from "./Highlights";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFileDownload,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";

const Bio = () => {
  return (
    <div className="flex flex-col items-center text-center container mx-auto p-4 my-8">
      <div className="relative w-64 h-64 mb-8">
        <Image
          src="/pfp.png"
          alt="Vishrut Jha"
          width={256}
          height={256}
          className="rounded-full"
          priority
        />
      </div>

      <div className="flex items-center mb-4 gap-2">
        <Image
          src="/hi.png"
          alt="Hi"
          width={40}
          height={40}
          loading="lazy"
          title="Huge Culer and Messi fan! Hit me up anytime if you want to discuss soccer"
        />
        <TypeAnimation
          sequence={["Hi, I'm Vishrut Jha", 1000]}
          wrapper="h1"
          cursor={true}
          repeat={1}
          className="text-4xl font-bold mr-2"
        />
      </div>

      <p className="text-xl mb-4 flex items-center justify-center">
        I’m from Phoenix, AZ{" "}
        <span className="ml-2 text-2xl" role="img" aria-label="cactus">
          🌵
        </span>
        <span className="ml-1 text-2xl" role="img" aria-label="US flag">
          🇺🇸
        </span>
      </p>

      <p className="mb-6 max-w-2xl">
        Full Stack, iOS Developer | Founding Engineer at{" "}
        <Link
          href={"https://www.pricklypear.io/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prickly Pear
        </Link>{" "}
        | Building in Public! 🚀
      </p>

      <div className="flex space-x-4 mb-6">
        <Button
          href="/journey"
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
        >
          <FaBriefcase className="mr-2 h-5 w-5" />
          Work Experience
        </Button>
        <Button
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
        >
          <FaFileDownload className="mr-2 h-5 w-5" />
          Résumé
        </Button>
      </div>

      <div className="flex space-x-6">
        <Link
          href="#"
          onClick={(e) => {
            window.location.href = "mailto:me@vishrutjha.com";
            e.preventDefault();
          }}
          target="_blank"
          rel="noopener noreferrer"
          title="me [at] vishrutjha [dot] com"
          className="text-gray-300 hover:text-white"
        >
          <FaEnvelope size={24} />
        </Link>

        <Link
          href="https://twitter.com/vishrutkmr7"
          target="_blank"
          rel="noopener noreferrer"
          title="@vishrutkmr7"
          className="text-gray-300 hover:text-white"
        >
          <FaTwitter size={24} />
        </Link>
        <Link
          href="https://github.com/vishrutkmr7"
          target="_blank"
          rel="noopener noreferrer"
          title="@vishrutkmr7"
          className="text-gray-300 hover:text-white"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="https://instagram.com/vishrutkmr7"
          target="_blank"
          rel="noopener noreferrer"
          title="@vishrutkmr7"
          className="text-gray-300 hover:text-white"
        >
          <FaInstagram size={24} />
        </Link>
        <Link
          href="https://linkedin.com/in/vishrutkmr7"
          target="_blank"
          rel="noopener noreferrer"
          title="Vishrut Jha"
          className="text-gray-300 hover:text-white"
        >
          <FaLinkedin size={24} />
        </Link>
      </div>

      <Highlights />
    </div>
  );
};

export default Bio;
