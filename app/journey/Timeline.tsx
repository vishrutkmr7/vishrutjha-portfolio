'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Calendar, GraduationCap, Grid3x3, Heart } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import { useMemo, useState } from 'react';

import {
  DraggableCard,
  dragVariants,
  fadeInVariants,
  MotionItem,
  MotionList,
} from '@/app/components/MotionList';
import PageTransition from '@/app/components/PageTransition';

import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import {
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from '@/app/components/ui/timeline';
import type { TimelineItem as TimelineItemType } from '@/app/types/portfolio.types';

interface JourneyTimelineProps {
  timelineData: TimelineItemType[];
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ timelineData }) => {
  const [filter, setFilter] = useState<'all' | 'work' | 'education' | 'volunteer'>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="h-5 w-5" />;
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      case 'volunteer':
        return <Heart className="h-5 w-5" />;
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };

  const getFilterIcon = (type: string) => {
    switch (type) {
      case 'all':
        return <Grid3x3 className="h-4 w-4" />;
      case 'work':
        return <Briefcase className="h-4 w-4" />;
      case 'education':
        return <GraduationCap className="h-4 w-4" />;
      case 'volunteer':
        return <Heart className="h-4 w-4" />;
      default:
        return <Grid3x3 className="h-4 w-4" />;
    }
  };

  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    return timelineData.filter(item => filter === 'all' || item.type === filter);
  }, [timelineData, filter]);

  // Memoize filter buttons to prevent recreation
  const filterButtons = useMemo(
    () => [
      { key: 'all', label: 'All', count: timelineData.length },
      {
        key: 'work',
        label: 'Work',
        count: timelineData.filter(item => item.type === 'work').length,
      },
      {
        key: 'education',
        label: 'Education',
        count: timelineData.filter(item => item.type === 'education').length,
      },
      {
        key: 'volunteer',
        label: 'Volunteer',
        count: timelineData.filter(item => item.type === 'volunteer').length,
      },
    ],
    [timelineData]
  );

  return (
    <PageTransition>
      <div className="container mx-auto space-y-6 p-4 pt-6 md:pt-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-bold text-3xl leading-tight tracking-tighter md:text-4xl">
            My Journey
          </h1>
          <p className="text-muted-foreground">
            My professional and educational journey through the years
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {filterButtons.map(({ key, label, count }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(key as typeof filter)}
              className="flex items-center gap-2 text-sm"
            >
              {getFilterIcon(key)}
              {label} ({count})
            </Button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <MotionList className="space-y-6">
            {filteredData.map((item, index) => (
              <MotionItem
                key={`${item.title.company}-${item.title.role}`}
                variants={fadeInVariants}
                initial="hidden"
                animate="show"
                layout
                transition={{ delay: index * 0.1 }}
              >
                <TimelineItem icon={getTypeIcon(item.type)}>
                  <TimelineContent>
                    <DraggableCard
                      variants={dragVariants}
                      whileHover="hover"
                      whileTap="drag"
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedItem(
                          selectedItem === item.title.company ? null : item.title.company
                        )
                      }
                    >
                      <div className="rounded-2xl border bg-card shadow-sm transition-all duration-200 hover:bg-accent/50 hover:shadow-md">
                        {/* Mobile-optimized card content */}
                        <div className="p-4 md:p-6">
                          {/* Header section with logo and title */}
                          <div className="flex items-start gap-3 md:gap-4">
                            {/* Logo - responsive sizing */}
                            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-2xl ring-2 ring-border md:h-14 md:w-14">
                              <Image
                                src={`/${item.logo}`}
                                alt={`${item.title.company} logo`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 40px, 56px"
                              />
                            </div>

                            {/* Content section */}
                            <div className="min-w-0 flex-1">
                              {/* Title and company */}
                              <div className="space-y-1">
                                <TimelineTitle className="font-semibold text-base leading-tight md:text-lg">
                                  {item.title.role}
                                </TimelineTitle>
                                <p className="font-medium text-muted-foreground text-sm">
                                  {item.title.company}
                                </p>
                              </div>

                              {/* Date - positioned better for mobile */}
                              <TimelineTime className="mt-2 flex items-center gap-1 font-medium text-muted-foreground text-xs">
                                <Calendar className="h-3 w-3 flex-shrink-0" />
                                <span className="line-clamp-1">{item.time}</span>
                              </TimelineTime>
                            </div>
                          </div>
                        </div>

                        {/* Expandable content */}
                        <AnimatePresence mode="wait">
                          {selectedItem === item.title.company && (
                            <motion.div
                              key={`expand-${item.title.company}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: 'easeInOut',
                              }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 md:px-6 md:pb-6">
                                <Separator className="mb-4" />
                                <TimelineBody className="text-sm leading-relaxed">
                                  {item.body}
                                </TimelineBody>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </DraggableCard>
                  </TimelineContent>
                </TimelineItem>
              </MotionItem>
            ))}
          </MotionList>
        </div>
      </div>
    </PageTransition>
  );
};

export default JourneyTimeline;
