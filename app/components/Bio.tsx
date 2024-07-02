"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import { TimelineItem, Achievement, ProjectItem } from "@/app/types";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFileDownload,
  FaBriefcase,
} from "react-icons/fa";

const Bio = () => {
  const [journeyHighlight, setJourneyHighlight] = useState<TimelineItem | null>(
    null
  );
  const [mediaHighlight, setMediaHighlight] = useState<Achievement | null>(
    null
  );
  const [projectHighlight, setProjectHighlight] = useState<ProjectItem | null>(
    null
  );

  useEffect(() => {
    const fetchHighlights = async () => {
      const [journeyData, mediaData, projectsData] = await Promise.all([
        fetch("/data/timelineData.json").then((res) => res.json()),
        fetch("/data/mediaData.json").then((res) => res.json()),
        fetch("/data/projectsData.json").then((res) => res.json()),
      ]);

      setJourneyHighlight(journeyData[0]);
      setMediaHighlight(mediaData[0]);
      setProjectHighlight(projectsData[0]);
    };

    fetchHighlights();
  }, []);

  return (
    <div className="flex flex-col items-center text-center container mx-auto p-4 my-8">
      <div className="relative w-64 h-64 mb-8">
        <Image
          src="/pfp.png"
          alt="Vishrut Jha"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>

      <div className="flex items-center mb-4 gap-2">
        <Image src="/hi.png" alt="Hi" width={40} height={40} />
        <TypeAnimation
          sequence={["Hi, I'm Vishrut Jha", 1000]}
          wrapper="h1"
          cursor={true}
          repeat={1}
          className="text-4xl font-bold mr-2"
        />
      </div>

      <p className="text-xl mb-4 flex items-center justify-center">
        I&rsquo;m from Phoenix, AZ{" "}
        <span className="ml-2 text-2xl" role="img" aria-label="cactus">
          🌵
        </span>
        <span className="ml-1 text-2xl" role="img" aria-label="US flag">
          🇺🇸
        </span>
      </p>

      <p className="mb-6 max-w-2xl">
        I&rsquo;m a passionate software engineer with expertise in iOS
        development and full-stack technologies. I love creating innovative
        solutions and exploring new technologies to solve real-world problems.
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
          href="/vishrut_jha_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
        >
          <FaFileDownload className="mr-2 h-5 w-5" />
          Download Resume
        </Button>
      </div>

      <div className="flex space-x-6">
        <Link
          href="https://twitter.com/vishrutkmr7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white"
        >
          <FaTwitter size={24} />
        </Link>
        <Link
          href="https://github.com/vishrutkmr7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="https://instagram.com/vishrutkmr7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white"
        >
          <FaInstagram size={24} />
        </Link>
        <Link
          href="https://linkedin.com/in/vishrutkmr7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white"
        >
          <FaLinkedin size={24} />
        </Link>
      </div>

      {journeyHighlight && mediaHighlight && projectHighlight && (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/journey" className="block h-full">
              <Card className="bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 h-full">
                <div className="flex flex-col items-center justify-between h-full">
                  <Image
                    src={`/${journeyHighlight.logo}`}
                    alt={journeyHighlight.title.company}
                    width={64}
                    height={64}
                    className="rounded-full mb-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">My current role</h3>
                    <p className="text-sm mb-1">
                      {journeyHighlight.title.company}
                    </p>
                    <p className="text-xs text-gray-400">
                      {journeyHighlight.title.role}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/media" className="block h-full">
              <Card className="bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 h-full">
                <div className="flex flex-col items-center justify-between h-full">
                  <Image
                    src={`/${mediaHighlight.image}`}
                    alt={mediaHighlight.title}
                    width={64}
                    height={64}
                    className="rounded-full mb-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Latest from me</h3>
                    <p className="text-sm">{mediaHighlight.title}</p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/projects" className="block h-full">
              <Card className="bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 h-full">
                <div className="flex flex-col items-center justify-between h-full">
                  <Image
                    src={`/${projectHighlight.image}`}
                    alt={projectHighlight.title}
                    width={64}
                    height={64}
                    className="rounded-full mb-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Currently working on
                    </h3>
                    <p className="text-sm">{projectHighlight.title}</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
