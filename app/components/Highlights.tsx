"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { TimelineItem, Achievement, ProjectItem } from "@/app/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    <Card className="h-full hover:bg-muted/50 transition-colors duration-200">
      <CardHeader className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          <Image
            src={imageSrc}
            alt={altText}
            fill
            loading="lazy"
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-1 text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>
      </CardHeader>
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
      <div className="mt-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
