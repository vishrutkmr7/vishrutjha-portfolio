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
import { TooltipSimple } from '@/components/ui/tooltip';

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
        <div className="flex-none">
          {image && (
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
              <Image
                src={`/${image}`}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={image.endsWith('.gif')}
              />
            </div>
          )}
        </div>
        <CardHeader className="flex-none space-y-1.5 p-6 pb-2">
          <TooltipSimple content={<p className="max-w-xs">{title}</p>} side="top" align="start">
            <CardTitle
              className="line-clamp-2 min-h-[3.5rem] flex items-start hover:cursor-help"
              aria-label={title}
            >
              {title}
            </CardTitle>
          </TooltipSimple>
          <CardDescription className="flex items-center gap-2 h-6">
            <socialIconMap.calendar className="h-4 w-4 flex-shrink-0" />
            {date}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4 p-6 pt-2">
          <p className="text-muted-foreground line-clamp-3 min-h-[4.5rem]">{description}</p>
          <div className="relative">
            <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar mask-fade-right">
              {tech.map((tech, techIndex) => {
                const TechIcon = techIconMap[tech as keyof typeof techIconMap];
                return (
                  <TooltipSimple key={techIndex} content={tech} side="bottom" delayDuration={0}>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1.5 hover:bg-primary/10 transition-colors duration-200 flex-shrink-0"
                    >
                      {TechIcon && <TechIcon className="h-3.5 w-3.5 flex-shrink-0" />}
                      {tech}
                    </Badge>
                  </TooltipSimple>
                );
              })}
            </div>
          </div>
        </CardContent>
        {link && (
          <CardFooter className="flex-none p-6 pt-0">
            <Button asChild variant="default" className="w-full h-10">
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
