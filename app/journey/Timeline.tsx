"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import { Button, Timeline, Spinner } from "flowbite-react";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import type { TimelineItem } from "@/app/types";
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
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 mt-4 text-gray-200">
        How did I get here?
      </h1>
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Traversin' through some dark journey!" />
        </div>
      ) : (
        <Timeline>
          {timelineData.map((item, index) => (
            <Timeline.Item key={index} id={item.title.company}>
              <Timeline.Point
                icon={item.type === "education" ? FaGraduationCap : FaBriefcase}
              />
              <Timeline.Content className="w-full">
                <div
                  className="bg-gray-800 text-gray-300 p-4 rounded-lg border border-gray-700"
                  title={item.body}
                >
                  <div className="flex items-center">
                    <Image
                      src={`/${item.logo}`}
                      alt={item.title.company}
                      loading="lazy"
                      className="rounded-lg mr-4"
                      width={69}
                      height={69}
                    />
                    <div>
                      <Timeline.Time className="text-gray-400">
                        {item.time}
                      </Timeline.Time>
                      <Timeline.Title className="tracking-tight text-gray-200">
                        {item.title.company}
                      </Timeline.Title>
                      <Timeline.Body className="text-gray-300">
                        {item.title.role}
                      </Timeline.Body>
                    </div>
                  </div>
                  <br />
                  {item.link && (
                    <Button
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
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
