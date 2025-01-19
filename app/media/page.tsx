'use client';

import { useEffect, useState } from 'react';

import { MotionList, MotionItem, scaleInVariants } from '@/app/components/MotionList';
import PageTransition from '@/app/components/PageTransition';
import { ScrollAnimation } from '@/app/components/ScrollAnimation';
import type { Achievement, LeetCodeStats } from '@/app/types';

import AchievementCard from './AchievementCard';
import ContactCard from './ContactCard';
import LeetCodeCard from './LeetCodeCard';

// Client-side only content wrapper
function ClientContent({
  achievements,
  leetCodeStats,
  loading,
}: {
  achievements: Achievement[];
  leetCodeStats: LeetCodeStats | null;
  loading: boolean;
}) {
  return (
    <div className="space-y-6">
      <ScrollAnimation>
        <MotionList>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map(achievement => (
              <MotionItem key={achievement.title} variants={scaleInVariants}>
                <AchievementCard {...achievement} />
              </MotionItem>
            ))}
            <MotionItem variants={scaleInVariants}>
              <LeetCodeCard stats={leetCodeStats} />
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
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leetCodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    Promise.all([
      fetch('/data/mediaData.json').then(response => response.json()),
      fetch('/api/leetcode').then(response => response.json()),
    ])
      .then(([achievementsData, leetCodeData]) => {
        setAchievements(achievementsData);
        setLeetCodeStats(leetCodeData.error ? null : leetCodeData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Return null on server-side
  if (!mounted) {
    return null;
  }

  return (
    <PageTransition>
      <div className="container mx-auto p-4 my-8" suppressHydrationWarning>
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 mt-4">Media Presence</h1>
        <p className="text-muted-foreground mb-8">
          Featured articles, interviews, and achievements
        </p>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ClientContent
            achievements={achievements}
            leetCodeStats={leetCodeStats}
            loading={loading}
          />
        )}
      </div>
    </PageTransition>
  );
}
