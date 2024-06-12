"use client";

import React, { useEffect, useState } from "react";
import { Button, Timeline } from "flowbite-react";
import { FaCalendar } from "react-icons/fa";

interface TimelineItem {
  time: string;
  title: string;
  body: string;
  link?: {
    text: string;
    url: string;
  };
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
          <Timeline.Point icon={FaCalendar} />
          <Timeline.Content>
            <Timeline.Time>{item.time}</Timeline.Time>
            <Timeline.Title>{item.title}</Timeline.Title>
            <Timeline.Body>{item.body}</Timeline.Body>
            {item.link && (
              <Button color="gray" href={item.link.url}>
                {item.link.text}
                {/* <HiArrowNarrowRight className="ml-2 h-3 w-3" /> */}
              </Button>
            )}
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default JourneyTimeline;
