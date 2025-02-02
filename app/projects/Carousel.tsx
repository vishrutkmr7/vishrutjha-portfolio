'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/app/components/ui/card';
import { techIconMap, socialIconMap } from '@/app/lib/icons';
import type { ProjectItem } from '@/app/types/portfolio.types';

const ProjectsCarousel: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/projectsData.json')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2 mt-4">My Projects</h1>
      <p className="text-muted-foreground mb-8">Things I&apos;ve built that I&apos;m proud of</p>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="flex flex-col h-full group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="flex-none p-0">
                {project.image && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={`/${project.image}`}
                      alt={project.title}
                      fill
                      className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={project.image.endsWith('.gif')}
                    />
                  </div>
                )}
                <div className="p-6 pb-2 space-y-1.5">
                  <CardTitle className="line-clamp-2 min-h-[3.5rem]">{project.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <socialIconMap.calendar className="h-4 w-4 flex-shrink-0" />
                    {project.date}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pb-6">
                <p className="mb-4 text-muted-foreground line-clamp-3 min-h-[4.5rem]">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => {
                    const TechIcon = techIconMap[tech as keyof typeof techIconMap];
                    return (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="flex items-center gap-1.5 hover:bg-primary/10 transition-colors duration-200"
                      >
                        {TechIcon && <TechIcon className="h-3.5 w-3.5 flex-shrink-0" />}
                        {tech}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex-none mt-auto pt-0 pb-6 px-6">
                {project.link && (
                  <Button asChild variant="default" className="w-full">
                    <a
                      href={project.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      {project.link.text === 'Source Code' && (
                        <socialIconMap.github className="h-4 w-4 flex-shrink-0" />
                      )}
                      {project.link.text === 'App Store' && (
                        <socialIconMap.AppStore className="h-4 w-4 flex-shrink-0" />
                      )}
                      {project.link.text === 'TestFlight' && (
                        <socialIconMap.TestFlight className="h-4 w-4 flex-shrink-0" />
                      )}
                      {project.link.text === 'Website' && (
                        <socialIconMap.website className="h-4 w-4 flex-shrink-0" />
                      )}
                      {project.link.text}
                      <socialIconMap.External className="h-4 w-4 flex-shrink-0" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsCarousel;
