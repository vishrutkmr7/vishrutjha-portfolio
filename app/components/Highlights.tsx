'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { Achievement, ProjectItem, TimelineItem } from '@/app/types/portfolio.types';

import { Card, CardDescription, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

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
    <Link href={linkHref} className="group block h-full">
      <Card className="h-full transform transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="p-6">
          <div className="flex gap-4">
            <div className="relative aspect-square h-full w-20 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
              <Image
                src={imageSrc}
                alt={altText}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="80px"
              />
            </div>
            <div className="flex flex-grow flex-col justify-center">
              <h2 className="mb-2 line-clamp-1 font-semibold text-lg tracking-tight">{title}</h2>
              <CardDescription className="line-clamp-2 text-sm leading-snug">
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
        <Skeleton className="aspect-square w-20 flex-shrink-0 rounded-full" />
        <div className="flex flex-grow flex-col justify-center">
          <Skeleton className="mb-2 h-4 w-3/4" />
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
          fetch('/data/timelineData.json').then(res => res.json()),
          fetch('/data/mediaData.json').then(res => res.json()),
          fetch('/data/projectsData.json').then(res => res.json()),
        ]);

        setHighlights({
          journey: journeyData[0],
          media: mediaData[0],
          project: projectsData[0],
        });
      } catch (error) {
        console.error('Error fetching highlights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto mt-8 w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Using index for skeleton loading placeholders is acceptable
            <HighlightSkeleton key={`highlight-skeleton-${i}`} />
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
      title: 'Current Role',
      subtitle: `${journey.title.company} - ${journey.title.role}`,
      imageSrc: `/${journey.logo}`,
      linkHref: `/journey?#${journey.title.company}`,
      altText: journey.title.company,
    },
    {
      title: 'Active Project',
      subtitle: project.title,
      imageSrc: `/${project.image}`,
      linkHref: `/projects?#${project.title}`,
      altText: project.title,
    },
    {
      title: 'Latest Update',
      subtitle: media.title,
      imageSrc: `/${media.image}`,
      linkHref: `/media?#${media.title}`,
      altText: media.title,
    },
  ];

  return (
    <div className="mx-auto mt-8 w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {highlightCards.map((card, index) => (
          <HighlightCard key={card.title} {...card} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Highlights;
