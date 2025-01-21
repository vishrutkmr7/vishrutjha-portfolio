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
import { TooltipSimple } from '@/components/ui/tooltip';

export default function AchievementCard({ title, description, date, image, link }: Achievement) {
  return (
    <DraggableCard
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
                quality={85}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6NT47Pi0uRGhFS1NWW1xbMkFlbWRYbFBZW1f/2wBDARUXFx4aHR4eHVdRLy8vV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1f/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          )}
          <div className="p-6 pb-2 space-y-1.5">
            <CardTitle className="line-clamp-3 sm:line-clamp-2 min-h-[4.5rem] sm:min-h-[3.5rem]">
              {title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <TooltipSimple content="Date" side="right">
                <div className="flex items-center gap-2">
                  <socialIconMap.calendar className="h-4 w-4 flex-shrink-0" />
                  {date}
                </div>
              </TooltipSimple>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pb-6">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        {link && (
          <CardFooter className="flex-none mt-auto pt-0 pb-6">
            <TooltipSimple
              content={
                link.text === 'Read Article'
                  ? 'View on The State Press'
                  : `View on ${link.text.split(' ').pop()}`
              }
              side="bottom"
            >
              <Button asChild variant="default" className="w-full">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  {link.text === 'Read Article' && (
                    <socialIconMap.Newspaper className="h-4 w-4 flex-shrink-0" />
                  )}
                  {link.text === 'Listen on Apple Podcasts' && (
                    <socialIconMap.Podcasts className="h-4 w-4 flex-shrink-0" />
                  )}
                  {link.text === 'Watch on YouTube' && (
                    <socialIconMap.YouTube className="h-4 w-4 flex-shrink-0" />
                  )}
                  {link.text}
                  <socialIconMap.External className="h-4 w-4 flex-shrink-0" />
                </a>
              </Button>
            </TooltipSimple>
          </CardFooter>
        )}
      </Card>
    </DraggableCard>
  );
}
