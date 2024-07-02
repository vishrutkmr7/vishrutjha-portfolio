"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, Spinner } from "flowbite-react";
import { TimelineItem, Achievement, ProjectItem } from "@/app/types";

const Highlights = () => {
  const [journeyHighlight, setJourneyHighlight] = useState<TimelineItem | null>(
    null
  );
  const [mediaHighlight, setMediaHighlight] = useState<Achievement | null>(
    null
  );
  const [projectHighlight, setProjectHighlight] = useState<ProjectItem | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const [journeyData, mediaData, projectsData] = await Promise.all([
          fetch("/data/timelineData.json").then((res) => res.json()),
          fetch("/data/mediaData.json").then((res) => res.json()),
          fetch("/data/projectsData.json").then((res) => res.json()),
        ]);

        setJourneyHighlight(journeyData[0]);
        setMediaHighlight(mediaData[0]);
        setProjectHighlight(projectsData[0]);
      } catch (error) {
        console.error("Error fetching highlights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  if (loading) {
    return (
      <div className="mt-8">
        <Spinner aria-label="Loading highlights" />
      </div>
    );
  }

  if (!journeyHighlight || !mediaHighlight || !projectHighlight) {
    return null;
  }

  return (
    <div className="mt-8 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Journey Highlight */}
        <Link
          href={`/journey?#${journeyHighlight.title.company}`}
          className="block h-full"
        >
          <Card className="bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 h-full">
            <div className="flex flex-col items-center justify-between h-full">
              <Image
                src={`/${journeyHighlight.logo}`}
                alt={journeyHighlight.title.company}
                width={64}
                height={64}
                className="rounded-full mb-4"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">My current role</h3>
                <p className="text-sm mb-1">{journeyHighlight.title.company}</p>
                <p className="text-xs text-gray-400">
                  {journeyHighlight.title.role}
                </p>
              </div>
            </div>
          </Card>
        </Link>
        {/* Media Highlight */}
        <Link href={`/media?#${mediaHighlight.title}`} className="block h-full">
          <Card className="bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 h-full">
            <div className="flex flex-col items-center justify-between h-full">
              <Image
                src={`/${mediaHighlight.image}`}
                alt={mediaHighlight.title}
                width={64}
                height={64}
                className="rounded-full mb-4 object-cover"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">Latest from me</h3>
                <p className="text-sm">{mediaHighlight.title}</p>
              </div>
            </div>
          </Card>
        </Link>
        {/* Project Highlight */}
        <Link
          href={`/projects?#${projectHighlight.title}`}
          className="block h-full"
        >
          <Card className="bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 h-full">
            <div className="flex flex-col items-center justify-between h-full">
              <Image
                src={`/${projectHighlight.image}`}
                alt={projectHighlight.title}
                width={64}
                height={64}
                className="rounded-full mb-4 object-cover"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">Currently working on</h3>
                <p className="text-sm">{projectHighlight.title}</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Highlights;
