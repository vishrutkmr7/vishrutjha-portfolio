'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';

import {
  DraggableCard,
  dragVariants,
  fadeInVariants,
  MotionItem,
  MotionList,
} from '@/app/components/MotionList';
import PageTransition from '@/app/components/PageTransition';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import {
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from '@/app/components/ui/timeline';
import { TooltipSimple } from '@/app/components/ui/tooltip';
import { socialIconMap } from '@/app/lib/icons';
import { parseDateString } from '@/app/lib/utils';
import type { TimelineItem as TimelineItemType } from '@/app/types/portfolio.types';

const JourneyTimeline: React.FC = () => {
  const [timelineData, setTimelineData] = useState<TimelineItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'work' | 'education' | 'volunteer'>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/timelineData.json')
      .then(response => response.json())
      .then(data => {
        // Sort timeline data by date (most recent first)
        const sortedData = [...data].sort((a, b) => {
          const dateA = parseDateString(a.time);
          const dateB = parseDateString(b.time);
          return dateB.getTime() - dateA.getTime();
        });
        setTimelineData(sortedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredData = timelineData.filter(item =>
    filter === 'all' ? true : item.type === filter
  );

  return (
    <PageTransition>
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col items-start gap-4">
          <div className="flex w-full flex-col gap-2">
            <h1 className="font-bold text-2xl leading-tight tracking-tighter sm:text-3xl md:text-4xl">
              My Journey
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">The path that led me here</p>
          </div>

          <div className="flex w-full flex-col flex-wrap gap-2 sm:flex-row">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="w-full justify-center gap-1.5 text-xs sm:w-auto sm:flex-none sm:gap-2 sm:text-sm"
            >
              <socialIconMap.calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              All
            </Button>
            <div className="flex w-full flex-row gap-2 sm:w-auto">
              <Button
                variant={filter === 'work' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('work')}
                className="flex-1 justify-center gap-1.5 text-xs sm:flex-none sm:gap-2 sm:text-sm"
              >
                <socialIconMap.work className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Work
              </Button>
              <Button
                variant={filter === 'education' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('education')}
                className="flex-1 justify-center gap-1.5 text-xs sm:flex-none sm:gap-2 sm:text-sm"
              >
                <socialIconMap.education className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Education
              </Button>
              <Button
                variant={filter === 'volunteer' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('volunteer')}
                className="flex-1 justify-center gap-1.5 text-xs sm:flex-none sm:gap-2 sm:text-sm"
              >
                <socialIconMap.heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Volunteering
              </Button>
            </div>
          </div>
          <Separator className="w-full" />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-primary border-b-2"></div>
          </div>
        ) : (
          <MotionList className="relative mt-8">
            <div className="absolute top-0 bottom-0 left-5 w-px bg-muted sm:left-6" />
            {filteredData.map((item, index) => (
              <MotionItem
                key={`${item.title.company}-${index}`}
                variants={fadeInVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
                className="relative mb-8"
                custom={index}
                transition={{
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 50,
                  damping: 20,
                }}
              >
                <TimelineItem
                  id={item.title.company}
                  className="relative pl-10 sm:pl-12"
                  icon={
                    <div className="-translate-y-1/2 absolute top-1/2 left-0">
                      <TooltipSimple
                        content={
                          item.type === 'education'
                            ? item.title.company.includes('Arizona State')
                              ? 'Grad School'
                              : 'College'
                            : item.type === 'volunteer'
                              ? 'Volunteer Experience'
                              : item.title.role.toLowerCase().includes('intern')
                                ? 'Internship'
                                : 'Work Experience'
                        }
                        side="right"
                      >
                        <div className="relative h-10 w-10 rounded-full border bg-background sm:h-12 sm:w-12">
                          {/* Centered icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {item.type === 'education' ? (
                              <socialIconMap.education className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                            ) : item.type === 'volunteer' ? (
                              <socialIconMap.heart className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                            ) : (
                              <socialIconMap.work className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                            )}
                          </div>
                        </div>
                      </TooltipSimple>
                    </div>
                  }
                >
                  <TimelineContent>
                    <DraggableCard
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.1}
                      whileDrag="drag"
                      whileHover="hover"
                      variants={dragVariants}
                      onClick={() =>
                        setSelectedItem(
                          selectedItem === item.title.company ? null : item.title.company
                        )
                      }
                      className="w-full cursor-pointer"
                    >
                      <div
                        className={`group rounded-2xl border bg-card p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-lg sm:p-4 ${selectedItem === item.title.company ? 'ring-2 ring-primary' : ''}`}
                      >
                        <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-2xl bg-background/50 p-2 sm:h-16 sm:w-16">
                            <Image
                              src={`/${item.logo}`}
                              alt={item.title.company}
                              fill
                              loading="lazy"
                              className="object-contain transition-transform duration-200 group-hover:scale-105"
                              sizes="(max-width: 768px) 48px, 64px"
                            />
                          </div>
                          <div className="w-full min-w-0 flex-grow">
                            <TimelineTime className="flex flex-col-reverse flex-wrap items-start gap-2 text-muted-foreground text-xs sm:flex-row sm:items-center sm:text-sm">
                              <span className="flex items-center gap-1.5 sm:gap-2">
                                <socialIconMap.calendar className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                                {item.time}
                              </span>
                              <Badge
                                variant="outline"
                                className="self-end px-1.5 py-0 text-[10px] sm:ml-auto sm:px-2 sm:text-xs"
                              >
                                {item.type === 'work'
                                  ? 'Work'
                                  : item.type === 'volunteer'
                                    ? 'Volunteering'
                                    : 'Education'}
                              </Badge>
                            </TimelineTime>
                            <div>
                              <TimelineTitle className="mt-1.5 break-words text-base sm:mt-2 sm:truncate sm:text-lg md:text-xl">
                                {item.title.company}
                              </TimelineTitle>
                              <TimelineBody className="break-words text-muted-foreground text-sm sm:truncate">
                                {item.title.role}
                              </TimelineBody>
                            </div>
                          </div>
                        </div>

                        <motion.div
                          initial={false}
                          animate={{ height: selectedItem === item.title.company ? 'auto' : 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 border-t pt-3 sm:mt-4 sm:pt-4">
                            <p className="whitespace-pre-wrap text-muted-foreground text-xs sm:text-sm">
                              {item.body}
                            </p>
                            {item.link && (
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="mt-3 h-auto min-h-[2rem] w-full whitespace-normal py-1.5 text-xs sm:mt-4 sm:w-auto sm:text-sm"
                              >
                                <a
                                  href={item.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-auto min-h-[2rem] items-center gap-1.5 sm:gap-2"
                                >
                                  <span className="line-clamp-2 break-words">{item.link.text}</span>
                                  <socialIconMap.External className="h-3 w-3 flex-shrink-0" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </DraggableCard>
                  </TimelineContent>
                </TimelineItem>
              </MotionItem>
            ))}
          </MotionList>
        )}
      </div>
    </PageTransition>
  );
};

export default JourneyTimeline;
