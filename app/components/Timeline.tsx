"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Timeline, Card } from "flowbite-react";
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
    <Timeline>
      {timelineData.map((item, index) => (
        <Timeline.Item key={index}>
          <Timeline.Point
            icon={item.type === "education" ? FaGraduationCap : FaBriefcase}
            className="ring-offset-0"
          />
          <Timeline.Content className="w-full">
            <Card
              className={`max-w-sm rounded-lg shadow-lg bg-${item.color}`}
              horizontal
              imgSrc={item.logo}
              imgAlt={item.title}
            >
              <Timeline.Time>{item.time}</Timeline.Time>
              <Timeline.Title className="text-white dark:text-white">
                {item.title}
              </Timeline.Title>
              <Timeline.Body>{item.body}</Timeline.Body>
              {item.link && (
                <Button color="gray" href={item.link.url}>
                  {item.link.text}
                </Button>
              )}
            </Card>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default JourneyTimeline;
