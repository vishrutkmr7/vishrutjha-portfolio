"use client";

import React, { useEffect, useState } from "react";
import { Button, Timeline, Card, Badge } from "flowbite-react";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

interface TimelineItem {
  time: string;
  title: string;
  body: string;
  link?: {
    text: string;
    url: string;
  };
  type: "education" | "work";
  logo: string;
  color: string;
}

const JourneyTimeline: React.FC = () => {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);

  useEffect(() => {
    fetch("/data/timelineData.json")
      .then((response) => response.json())
      .then((data) => setTimelineData(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Timeline>
        {timelineData.map((item, index) => (
          <Timeline.Item key={index}>
            <Timeline.Point
              icon={item.type === "education" ? FaGraduationCap : FaBriefcase}
              className="ring-offset-0"
            />
            <Timeline.Content className="w-full">
              <Card
                className={`bg-${item.color} dark:bg-${item.color} text-gray-300`}
                horizontal
                imgSrc={item.logo}
                imgAlt={item.title}
              >
                <Timeline.Time>{item.time}</Timeline.Time>
                <Timeline.Title className="text-gray-300 dark:text-white">
                  {item.title}
                </Timeline.Title>
                <Timeline.Body>{item.body}</Timeline.Body>
                {item.link && (
                  <Button
                    color="gray"
                    href={item.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.link.text}
                  </Button>
                )}
              </Card>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default JourneyTimeline;
