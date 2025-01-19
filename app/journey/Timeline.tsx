'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
  MotionList,
  MotionItem,
  fadeInVariants,
  DraggableCard,
  dragVariants,
} from '@/app/components/MotionList';
import PageTransition from '@/app/components/PageTransition';
import { ScrollAnimation } from '@/app/components/ScrollAnimation';
import { socialIconMap } from '@/app/lib/icons';
import type { TimelineItem as TimelineItemType } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  TimelineItem,
  TimelineContent,
  TimelineTitle,
  TimelineTime,
  TimelineBody,
} from '@/components/ui/timeline';

const JourneyTimeline: React.FC = () => {
  const [timelineData, setTimelineData] = useState<TimelineItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/timelineData.json')
      .then(response => response.json())
      .then(data => {
        setTimelineData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            My Journey
          </h1>
          <p className="text-muted-foreground">The path that led me here</p>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <MotionList className="relative border-l-2 border-muted">
            {timelineData.map((item, index) => (
              <ScrollAnimation key={`${item.title.company}-${index}`}>
                <MotionItem
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                  className="relative mb-8"
                  custom={index}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  }}
                >
                  <TimelineItem
                    id={item.title.company}
                    className="relative"
                    icon={
                      item.type === 'education' ? (
                        <socialIconMap.education className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <socialIconMap.work className="h-5 w-5 text-muted-foreground" />
                      )
                    }
                  >
                    <TimelineContent>
                      <DraggableCard
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.1}
                        whileDrag="drag"
                        whileHover="hover"
                        variants={dragVariants}
                      >
                        <div
                          className="bg-card p-4 rounded-lg border group hover:shadow-lg hover:bg-muted/50 transition-all duration-200 w-full sm:w-auto"
                          title={item.body}
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                            <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={`/${item.logo}`}
                                alt={item.title.company}
                                fill
                                loading="lazy"
                                className="object-contain group-hover:scale-105 transition-transform duration-200"
                                sizes="(max-width: 768px) 64px, 64px"
                              />
                            </div>
                            <div className="flex-grow w-full">
                              <TimelineTime className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                                <socialIconMap.calendar className="h-4 w-4 flex-shrink-0" />
                                {item.time}{' '}
                                {item.type === 'work'
                                  ? '💼'
                                  : item.type === 'education'
                                    ? '🎓'
                                    : '🏆'}
                              </TimelineTime>
                              <TimelineTitle className="text-lg sm:text-xl break-words">
                                {item.title.company}{' '}
                                {item.title.company.toLowerCase().includes('microsoft')
                                  ? '🪟'
                                  : item.title.company.toLowerCase().includes('amazon')
                                    ? '📦'
                                    : item.title.company.toLowerCase().includes('google')
                                      ? '🔍'
                                      : item.title.company.toLowerCase().includes('apple')
                                        ? '🍎'
                                        : ''}
                              </TimelineTitle>
                              <TimelineBody className="text-muted-foreground break-words">
                                {item.title.role}{' '}
                                {item.title.role.toLowerCase().includes('senior')
                                  ? '👨‍💻'
                                  : item.title.role.toLowerCase().includes('lead')
                                    ? '👨‍💼'
                                    : item.title.role.toLowerCase().includes('engineer')
                                      ? '⚡'
                                      : ''}
                              </TimelineBody>
                            </div>
                          </div>
                          {item.link && (
                            <div className="mt-4 w-full">
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="w-full min-h-[32px] h-auto whitespace-normal text-left hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                              >
                                <a
                                  href={item.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 break-words py-1.5 px-2"
                                >
                                  <span className="flex-grow">{item.link.text}</span>
                                  <socialIconMap.External className="h-3 w-3 flex-shrink-0" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </DraggableCard>
                    </TimelineContent>
                  </TimelineItem>
                </MotionItem>
              </ScrollAnimation>
            ))}
          </MotionList>
        )}
      </div>
    </PageTransition>
  );
};

export default JourneyTimeline;
