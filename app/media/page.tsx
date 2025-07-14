import { Suspense } from 'react';

import { MotionItem, MotionList, scaleInVariants } from '@/app/components/MotionList';
import PageTransition from '@/app/components/PageTransition';
import { ScrollAnimation } from '@/app/components/ScrollAnimation';
import { fetchLeetCodeStats, fetchMediaData } from '@/app/lib/data-fetcher';

import AchievementCard from './AchievementCard';
import ContactCard from './ContactCard';
import LeetCodeCard from './LeetCodeCard';

// Loading skeleton component
function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: Using index for skeleton loading placeholders is acceptable
          key={`loading-skeleton-${index}`}
          className="h-[400px] animate-pulse rounded-lg bg-muted"
        />
      ))}
    </div>
  );
}

// Content component with server-side data
async function MediaContent() {
  const [achievements, leetCodeStats] = await Promise.all([fetchMediaData(), fetchLeetCodeStats()]);

  return (
    <div className="space-y-6">
      <ScrollAnimation>
        <MotionList>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {achievements.map(achievement => (
              <MotionItem key={achievement.title} variants={scaleInVariants}>
                <AchievementCard {...achievement} />
              </MotionItem>
            ))}
            <MotionItem variants={scaleInVariants}>
              <Suspense fallback={<div className="h-[400px] animate-pulse rounded-lg bg-muted" />}>
                <LeetCodeCard stats={leetCodeStats} />
              </Suspense>
            </MotionItem>
          </div>
        </MotionList>
      </ScrollAnimation>
      <ScrollAnimation>
        <MotionList>
          <MotionItem variants={scaleInVariants}>
            <ContactCard />
          </MotionItem>
        </MotionList>
      </ScrollAnimation>
    </div>
  );
}

export default function MediaPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4 pt-6 md:pt-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-bold text-3xl leading-tight tracking-tighter md:text-4xl">
            Media Presence
          </h1>
          <p className="text-muted-foreground">Featured articles, interviews, and achievements</p>
        </div>
        <Suspense fallback={<LoadingSkeleton count={4} />}>
          <MediaContent />
        </Suspense>
      </div>
    </PageTransition>
  );
}
