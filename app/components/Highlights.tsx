"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, Spinner } from "flowbite-react";
import type { TimelineItem, Achievement, ProjectItem } from "@/app/types";

interface HighlightCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  linkHref: string;
  altText: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  subtitle,
  imageSrc,
  linkHref,
  altText,
}) => (
  <Link href={linkHref} className="block h-full">
    <Card className="bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 h-full">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="relative w-16 h-16 mb-4">
          <Image
            src={imageSrc}
            alt={altText}
            fill
            loading="lazy"
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm">{subtitle}</p>
        </div>
      </div>
    </Card>
  </Link>
);

interface HighlightData {
  journey: TimelineItem | null;
  media: Achievement | null;
  project: ProjectItem | null;
}

const Highlights: React.FC = () => {
  const [highlights, setHighlights] = useState<HighlightData>({
    journey: null,
    media: null,
    project: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const [journeyData, mediaData, projectsData] = await Promise.all([
          fetch("/data/timelineData.json").then((res) => res.json()),
          fetch("/data/mediaData.json").then((res) => res.json()),
          fetch("/data/projectsData.json").then((res) => res.json()),
        ]);

        setHighlights({
          journey: journeyData[0],
          media: mediaData[0],
          project: projectsData[0],
        });
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

  const { journey, media, project } = highlights;

  if (!journey || !media || !project) {
    return null;
  }

  return (
    <div className="mt-8 w-full max-w-4xl">
      {/* <h2 className="text-2xl font-bold mb-4">Highlights</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HighlightCard
          title="My current role"
          subtitle={`${journey.title.company} - ${journey.title.role}`}
          imageSrc={`/${journey.logo}`}
          linkHref={`/journey?#${journey.title.company}`}
          altText={journey.title.company}
        />
        <HighlightCard
          title="Latest from me"
          subtitle={media.title}
          imageSrc={`/${media.image}`}
          linkHref={`/media?#${media.title}`}
          altText={media.title}
        />
        <HighlightCard
          title="Currently working on"
          subtitle={project.title}
          imageSrc={`/${project.image}`}
          linkHref={`/projects?#${project.title}`}
          altText={project.title}
        />
      </div>
    </div>
  );
};

export default Highlights;
