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
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface HighlightCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  linkHref: string;
  altText: string;
  index: number;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  subtitle,
  imageSrc,
  linkHref,
  altText,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
  >
    <Link href={linkHref} className="block h-full group">
      <Card className="h-full transform transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="p-6">
          <div className="flex gap-4">
            <div className="relative w-20 h-full aspect-square rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 flex-shrink-0">
              <Image
                src={imageSrc}
                alt={altText}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="80px"
              />
            </div>
            <div className="flex flex-col justify-center flex-grow">
              <CardTitle className="text-lg font-semibold tracking-tight line-clamp-1 mb-2">
                {title}
              </CardTitle>
              <CardDescription className="text-sm leading-snug line-clamp-2">
                {subtitle}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  </motion.div>
);

const HighlightSkeleton = () => (
  <Card className="h-full">
    <CardHeader className="p-6">
      <div className="flex gap-4">
        <Skeleton className="w-20 aspect-square rounded-full flex-shrink-0" />
        <div className="flex flex-col justify-center flex-grow">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </CardHeader>
  </Card>
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
      <div className="mt-8 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <HighlightSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const { journey, media, project } = highlights;

  if (!journey || !media || !project) {
    return null;
  }

  const highlightCards = [
    {
      title: "Current Role",
      subtitle: `${journey.title.company} - ${journey.title.role}`,
      imageSrc: `/${journey.logo}`,
      linkHref: `/journey?#${journey.title.company}`,
      altText: journey.title.company,
    },
    {
      title: "Latest Update",
      subtitle: media.title,
      imageSrc: `/${media.image}`,
      linkHref: `/media?#${media.title}`,
      altText: media.title,
    },
    {
      title: "Active Project",
      subtitle: project.title,
      imageSrc: `/${project.image}`,
      linkHref: `/projects?#${project.title}`,
      altText: project.title,
    },
  ];

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlightCards.map((card, index) => (
          <HighlightCard key={card.title} {...card} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Highlights;
