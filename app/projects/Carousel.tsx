"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Badge } from "flowbite-react";

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

const ProjectsCarousel: React.FC = () => {
  const [projects, setProjects] = useState<projectItem[]>([]);

  useEffect(() => {
    fetch("/data/projectsData.json")
      .then((response) => response.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 mt-4">
        What did I build...
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <Card key={index} imgSrc={project.image}>
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p>{project.description}</p>
            <p className="text-gray-500">{project.date}</p>
            {project.link && (
              <Button href={project.link.url}>{project.link.text}</Button>
            )}
            <div className="flex flex-wrap mt-2">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsCarousel;
