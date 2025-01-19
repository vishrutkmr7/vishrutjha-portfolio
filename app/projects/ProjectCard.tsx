'use client';

import Image from 'next/image';
import Link from 'next/link';

import { DraggableCard, dragVariants } from '@/app/components/MotionList';
import { techIconMap, socialIconMap } from '@/app/lib/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  link?: {
    text: string;
    url: string;
  };
  tech: string[];
}

export function ProjectCard({ title, description, image, date, link, tech }: ProjectCardProps) {
  return (
    <DraggableCard
      drag={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag="drag"
      whileHover="hover"
      variants={dragVariants}
      className="h-full"
    >
      <Card className="flex flex-col h-full group hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex-none p-0">
          {image && (
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src={`/${image}`}
                alt={title}
                fill
                className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={image.endsWith('.gif')}
              />
            </div>
          )}
          <div className="p-6 pb-2 space-y-1.5">
            <CardTitle className="line-clamp-2 min-h-[3.5rem]">{title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <socialIconMap.calendar className="h-4 w-4 flex-shrink-0" />
              {date}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pb-6">
          <p className="mb-4 text-muted-foreground line-clamp-3 min-h-[4.5rem]">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tech.map((tech, techIndex) => {
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
        {link && (
          <CardFooter className="flex-none mt-auto pt-0 pb-6 px-6">
            <Button asChild variant="default" className="w-full">
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                {link.text === 'Source Code' && (
                  <socialIconMap.github className="h-4 w-4 flex-shrink-0" />
                )}
                {link.text === 'App Store' && (
                  <socialIconMap.AppStore className="h-4 w-4 flex-shrink-0" />
                )}
                {link.text === 'TestFlight' && (
                  <socialIconMap.TestFlight className="h-4 w-4 flex-shrink-0" />
                )}
                {link.text === 'Website' && (
                  <socialIconMap.website className="h-4 w-4 flex-shrink-0" />
                )}
                {link.text}
                <socialIconMap.External className="h-4 w-4 flex-shrink-0" />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </DraggableCard>
  );
}
