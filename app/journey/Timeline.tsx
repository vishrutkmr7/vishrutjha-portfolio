"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import type { TimelineItem as TimelineItemType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { socialIconMap, type SocialIconType } from "@/app/lib/icons";
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineTitle,
  TimelineTime,
  TimelineBody,
} from "@/components/ui/timeline";

const JourneyTimeline: React.FC = () => {
  const [timelineData, setTimelineData] = useState<TimelineItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/timelineData.json")
      .then((response) => response.json())
      .then((data) => {
        setTimelineData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2 mt-4">My Journey</h1>
      <p className="text-muted-foreground mb-8">The path that led me here</p>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Timeline>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              id={item.title.company}
              icon={
                item.type === "education" ? (
                  <socialIconMap.Education className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <socialIconMap.Work className="h-5 w-5 text-muted-foreground" />
                )
              }
            >
              <TimelineContent>
                <div
                  className="bg-card p-4 rounded-lg border group hover:shadow-lg hover:bg-muted/50 transition-all duration-200"
                  title={item.body}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
                    <div className="flex-grow">
                      <TimelineTime className="text-sm text-muted-foreground flex items-center gap-2">
                        <socialIconMap.Calendar className="h-4 w-4" />
                        {item.time}
                      </TimelineTime>
                      <TimelineTitle className="text-lg sm:text-xl">{item.title.company}</TimelineTitle>
                      <TimelineBody className="text-muted-foreground">{item.title.role}</TimelineBody>
                    </div>
                  </div>
                  {item.link && (
                    <div className="mt-4">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      >
                        <a
                          href={item.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <span>{item.link.text}</span>
                          <socialIconMap.External className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </div>
  );
};

export default JourneyTimeline;
