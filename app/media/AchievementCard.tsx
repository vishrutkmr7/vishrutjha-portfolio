'use client';

import Image from 'next/image';

import { DraggableCard, dragVariants } from '@/app/components/MotionList';
import { socialIconMap } from '@/app/lib/icons';
import type { Achievement } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface AchievementCardProps {
  achievement: Achievement;
  isFirst: boolean;
}

export default function AchievementCard({ achievement, isFirst }: AchievementCardProps) {
  const { title, description, image, link, date } = achievement;

  return (
    <DraggableCard
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag="drag"
      whileHover="hover"
      variants={dragVariants}
      className="h-full"
    >
      <Card
        className="flex flex-col h-full group hover:shadow-lg transition-all duration-300"
        id={title}
      >
        <CardHeader className="flex-none p-0">
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={`/${image}`}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={isFirst}
              loading={isFirst ? undefined : 'lazy'}
              className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="p-6 pb-2 space-y-1.5">
            <CardTitle className="line-clamp-2 min-h-[3.5rem]">{title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <socialIconMap.calendar className="h-4 w-4 flex-shrink-0" />
              {date}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pb-6">
          <p className="text-muted-foreground line-clamp-3 min-h-[4.5rem]">{description}</p>
        </CardContent>
        {link && (
          <CardFooter className="flex-none mt-auto pt-0 pb-6 px-6">
            <Button asChild variant="default" className="w-full">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                {link.text === 'Source Code' && <socialIconMap.github className="h-4 w-4" />}
                {link.text === 'App Store' && <socialIconMap.AppStore className="h-4 w-4" />}
                {link.text === 'Listen on Apple Podcasts' && (
                  <socialIconMap.Apple className="h-4 w-4" />
                )}
                {link.text === 'Watch on YouTube' && <socialIconMap.YouTube className="h-4 w-4" />}
                {link.text === 'Read Article' && <socialIconMap.External className="h-4 w-4" />}
                {link.text}
              </a>
            </Button>
          </CardFooter>
        )}
      </Card>
    </DraggableCard>
  );
}
