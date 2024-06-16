"use client";

import React, { useEffect, useState } from "react";
import { Button, Timeline, Card, Badge } from "flowbite-react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaPython,
  FaSwift,
  FaDatabase,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaDocker,
  FaCss3,
  FaHtml5,
  FaCode,
} from "react-icons/fa";

const techIconMap: { [key: string]: any } = {
  Python: FaPython,
  Swift: FaSwift,
  SwiftUI: FaSwift,
  SwiftData: FaSwift,
  CoreML: FaSwift,
  JavaScript: FaJs,
  SQL: FaDatabase,
  DB: FaDatabase,
  React: FaReact,
  NodeJS: FaNodeJs,
  GitHub: FaGithub,
  Git: FaGithub,
  Docker: FaDocker,
  CSS: FaCss3,
  HTML: FaHtml5,
};

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
  technologies: string[];
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
                  <Button color="gray" href={item.link.url}>
                    {item.link.text}
                  </Button>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.technologies.map((tech, techIndex) => {
                    const Icon = techIconMap[tech] || FaCode;
                    return (
                      <Badge key={techIndex} icon={Icon}>
                        {tech}
                      </Badge>
                    );
                  })}
                </div>
              </Card>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default JourneyTimeline;
