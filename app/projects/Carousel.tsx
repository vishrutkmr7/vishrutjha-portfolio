"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Badge, Spinner } from "flowbite-react";
import {
  FaCode,
  FaPython,
  FaSwift,
  FaGitAlt,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
} from "react-icons/fa";

interface projectItem {
  title: string;
  description: string;
  date: string;
  image: string;
  link?: {
    text: string;
    url: string;
  };
  tech: string[];
}

const techIconMap: { [key: string]: any } = {
  Python: FaPython,
  Swift: FaSwift,
  iOS: FaSwift,
  Git: FaGitAlt,
  Database: FaDatabase,
  SQL: FaDatabase,
  Redis: FaDatabase,
  Code: FaCode,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  TypeScript: FaJs,
  React: FaReact,
};

const ProjectsCarousel: React.FC = () => {
  const [projects, setProjects] = useState<projectItem[]>([]);
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
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 mt-4">
        What did I build...
      </h1>
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Cookin' up some projects!" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <Card
              key={index}
              imgSrc={project.image}
              className={`bg-grey-600 dark:bg-grey-900 text-gray-300 p-4 rounded-lg border border-gray-600`}
            >
              <h2 className="text-xl font-bold tracking-tight text-gray-300 dark:text-white">
                {project.title}
              </h2>
              <p>{project.description}</p>
              <p className="text-gray-500">{project.date}</p>
              {project.link && (
                <Button
                  href={project.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.link.text}
                </Button>
              )}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => {
                  const Icon = techIconMap[tech] || FaCode;
                  return (
                    <Badge key={techIndex} icon={Icon}>
                      {tech}
                    </Badge>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsCarousel;
