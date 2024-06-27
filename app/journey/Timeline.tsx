"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Timeline, Spinner } from "flowbite-react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/timelineData.json")
      .then((response) => response.json())
      .then((data) => {
        setTimelineData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Ensure loading is stopped even if there is an error
  }, []);

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 mt-4">
        How did I get here?
      </h1>
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Traversin' through some dark journey!" />
        </div>
      ) : (
        <Timeline>
          {timelineData.map((item, index) => (
            <Timeline.Item key={index}>
              <Timeline.Point
                icon={item.type === "education" ? FaGraduationCap : FaBriefcase}
              />
              <Timeline.Content className="w-full">
                <div
                  className={`bg-${item.color} dark:bg-${item.color} text-gray-300 p-4 rounded-lg border border-gray-600`}
                >
                  <div className="flex items-center">
                    <Image
                      src={`/${item.logo}`}
                      alt={item.title}
                      loading="lazy"
                      className="rounded-lg mr-4"
                      width={64}
                      height={64}
                    />
                    <div>
                      <Timeline.Time>{item.time}</Timeline.Time>
                      <Timeline.Title className="tracking-tight text-gray-300 dark:text-white">
                        {item.title}
                      </Timeline.Title>
                    </div>
                  </div>
                  <br />
                  <Timeline.Body>{item.body}</Timeline.Body>
                  {item.link && (
                    <Button
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link.text}
                    </Button>
                  )}
                </div>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      )}
    </div>
  );
};

export default JourneyTimeline;
