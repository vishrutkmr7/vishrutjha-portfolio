'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';

import {
  MotionList,
  MotionItem,
  fadeInVariants,
  DraggableCard,
  dragVariants,
} from '@/app/components/MotionList';
import PageTransition from '@/app/components/PageTransition';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineTitle,
  TimelineTime,
  TimelineBody,
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
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              My Journey
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">The path that led me here</p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="gap-1.5 text-xs sm:text-sm sm:gap-2 w-full sm:w-auto sm:flex-none justify-center"
            >
              <socialIconMap.calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              All
            </Button>
            <div className="flex flex-row gap-2 w-full sm:w-auto">
              <Button
                variant={filter === 'work' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('work')}
                className="gap-1.5 text-xs sm:text-sm sm:gap-2 flex-1 sm:flex-none justify-center"
              >
                <socialIconMap.work className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Work
              </Button>
              <Button
                variant={filter === 'education' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('education')}
                className="gap-1.5 text-xs sm:text-sm sm:gap-2 flex-1 sm:flex-none justify-center"
              >
                <socialIconMap.education className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Education
              </Button>
              <Button
                variant={filter === 'volunteer' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('volunteer')}
                className="gap-1.5 text-xs sm:text-sm sm:gap-2 flex-1 sm:flex-none justify-center"
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <MotionList className="relative mt-8">
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-muted" />
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
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
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
                        <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full border bg-background">
                          {/* Centered icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {item.type === 'education' ? (
                              <socialIconMap.education className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            ) : item.type === 'volunteer' ? (
                              <socialIconMap.heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            ) : (
                              <socialIconMap.work className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
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
                      className="cursor-pointer w-full"
                    >
                      <div
                        className={`bg-card p-3 sm:p-4 rounded-lg border group hover:shadow-lg hover:bg-muted/50 transition-all duration-200 ${selectedItem === item.title.company ? 'ring-2 ring-primary' : ''}`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full">
                          <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-lg bg-background/50 p-2">
                            <Image
                              src={`/${item.logo}`}
                              alt={item.title.company}
                              fill
                              loading="lazy"
                              className="object-contain group-hover:scale-105 transition-transform duration-200"
                              sizes="(max-width: 768px) 48px, 64px"
                            />
                          </div>
                          <div className="flex-grow w-full min-w-0">
                            <TimelineTime className="text-xs sm:text-sm text-muted-foreground flex flex-col-reverse sm:flex-row items-start sm:items-center gap-2 flex-wrap">
                              <span className="flex items-center gap-1.5 sm:gap-2">
                                <socialIconMap.calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                                {item.time}
                              </span>
                              <Badge
                                variant="outline"
                                className="self-end sm:ml-auto text-[10px] sm:text-xs py-0 px-1.5 sm:px-2"
                              >
                                {item.type === 'work'
                                  ? 'Work'
                                  : item.type === 'volunteer'
                                    ? 'Volunteering'
                                    : 'Education'}
                              </Badge>
                            </TimelineTime>
                            <div>
                              <TimelineTitle className="text-base sm:text-lg md:text-xl break-words mt-1.5 sm:mt-2 sm:truncate">
                                {item.title.company}
                              </TimelineTitle>
                              <TimelineBody className="text-sm text-muted-foreground break-words sm:truncate">
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
                          <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t">
                            <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap">
                              {item.body}
                            </p>
                            {item.link && (
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="mt-3 sm:mt-4 w-full sm:w-auto text-xs sm:text-sm min-h-[2rem] h-auto whitespace-normal py-1.5"
                              >
                                <a
                                  href={item.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 sm:gap-2 min-h-[2rem] h-auto"
                                >
                                  <span className="break-words line-clamp-2">{item.link.text}</span>
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
