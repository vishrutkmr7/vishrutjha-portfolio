"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Card, Button, Badge, Spinner } from "flowbite-react";
import { ProjectItem } from "@/app/types";
import {
  FaCode,
  FaPython,
  FaSwift,
  FaGithub,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaAngular,
  FaAppStoreIos,
  FaMobile,
  FaLaptop,
  FaTablet,
} from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const techIconMap: { [key: string]: any } = {
  Python: FaPython,
  Swift: FaSwift,
  SwiftUI: FaSwift,
  iOS: FaMobile,
  macOS: FaLaptop,
  iPadOS: FaTablet,
  Git: FaGithub,
  Database: FaDatabase,
  SQL: FaDatabase,
  Redis: FaDatabase,
  Code: FaCode,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  NextJS: FaJs,
  TypeScript: FaJs,
  React: FaReact,
  Angular: FaAngular,
};

const ProjectsCarousel: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/projectsData.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Ensure loading is stopped even if there is an error
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < projects.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

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
        <div
          {...handlers}
          ref={carouselRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto flex overflow-x-auto snap-x snap-mandatory touch-pan-x"
        >
          {projects.map((project, index) => (
            <div key={index} className="w-full flex-shrink-0 snap-center">
              <Card
                // key={index}
                className="bg-gray-800 text-gray-300 p-4 rounded-lg border border-gray-700 flex flex-col h-full"
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={`/${project.image}`}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
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
