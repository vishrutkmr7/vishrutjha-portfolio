"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import { Card, Button, Badge, Spinner } from "flowbite-react";
import type { ProjectItem } from "@/app/types";
import {
  FaAngular,
  FaAppStoreIos,
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaGithub,
  FaHtml5,
  FaJs,
  FaLaptop,
  FaMobile,
  FaPython,
  FaReact,
  FaSwift,
  FaTablet,
} from "react-icons/fa";

const techIconMap: { [key: string]: any } = {
  Angular: FaAngular,
  CSS: FaCss3Alt,
  Code: FaCode,
  Database: FaDatabase,
  Git: FaGithub,
  HTML: FaHtml5,
  JavaScript: FaJs,
  NextJS: FaJs,
  Python: FaPython,
  React: FaReact,
  Redis: FaDatabase,
  SQL: FaDatabase,
  Swift: FaSwift,
  SwiftUI: FaSwift,
  TypeScript: FaJs,
  iOS: FaMobile,
  iPadOS: FaTablet,
  macOS: FaLaptop,
};

const ProjectsCarousel: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/projectsData.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Ensure loading is stopped even if there is an error
  }, []);

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 mt-4 text-gray-200">
        What did I build...
      </h1>
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Cookin' up some projects!" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto flex">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 snap-center"
              id={project.title}
            >
              <Card className="bg-gray-800 text-gray-300 p-4 rounded-lg border border-gray-700 flex flex-col h-full">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={`/${project.image}`}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                    }}
                    loading="lazy"
                    className="rounded-lg"
                    unoptimized={project.image.endsWith('.gif')}
                  />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-gray-200 mb-2">
                  {project.title}
                </h2>
                <p className="mb-2 flex-grow text-gray-300">
                  {project.description}
                </p>
                <p className="text-gray-400 mb-4">{project.date}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => {
                    const Icon = techIconMap[tech] || FaCode;
                    return (
                      <Badge
                        key={techIndex}
                        icon={Icon}
                        className="bg-gray-700 text-gray-300"
                      >
                        {tech}
                      </Badge>
                    );
                  })}
                </div>
                {project.link && (
                  <Button
                    href={project.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 w-full"
                  >
                    {project.link.text === "Source Code" && (
                      <FaGithub className="mr-2 h-5 w-5" />
                    )}
                    {project.link.text === "App Store" && (
                      <FaAppStoreIos className="mr-2 h-5 w-5" />
                    )}
                    {project.link.text}
                  </Button>
                )}
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsCarousel;
