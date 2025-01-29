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
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [leetCodeLoading, setLeetCodeLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load achievements
    fetch('/data/mediaData.json')
      .then(response => response.json())
      .then(achievementsData => {
        setAchievements(achievementsData);
        setAchievementsLoading(false);
      })
      .catch(() => setAchievementsLoading(false));

    // Load LeetCode stats separately
    fetch('/api/leetcode')
      .then(response => response.json())
      .then(leetCodeData => {
        setLeetCodeStats(leetCodeData.error ? null : leetCodeData);
        setLeetCodeLoading(false);
      })
      .catch(() => setLeetCodeLoading(false));
  }, []);

  // Return null on server-side
  if (!mounted) {
    return null;
  }

  return (
    <PageTransition>
      <div className="container mx-auto p-4 pt-6 md:pt-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Media Presence
          </h1>
          <p className="text-muted-foreground">Featured articles, interviews, and achievements</p>
        </div>
        <div className="space-y-6">
          <ScrollAnimation>
            <MotionList>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievementsLoading
                  ? // Show loading spinner for achievements
                    Array.from({ length: 3 }).map((_, index) => (
                      <MotionItem key={`achievement-loading-${index}`} variants={scaleInVariants}>
                        <div className="h-[400px] rounded-lg bg-muted animate-pulse" />
                      </MotionItem>
                    ))
                  : // Show achievements as they load
                    achievements.map(achievement => (
                      <MotionItem key={achievement.title} variants={scaleInVariants}>
                        <AchievementCard {...achievement} />
                      </MotionItem>
                    ))}
                <MotionItem variants={scaleInVariants}>
                  {leetCodeLoading ? (
                    // Show loading spinner for LeetCode card
                    <div className="h-[400px] rounded-lg bg-muted animate-pulse" />
                  ) : (
                    <LeetCodeCard stats={leetCodeStats} />
                  )}
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
      </div>
    </PageTransition>
  );
}
