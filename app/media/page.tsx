"use client";

import { useEffect, useState } from "react";
import { LEETCODE_API_ENDPOINT } from "@/app/constants";
import type { Achievement, LeetCodeStats } from "@/app/types";
import AchievementCard from "./AchievementCard";
import LeetCodeCard from "./LeetCodeCard";
import ContactCard from "./ContactCard";
import PageTransition from "@/app/components/PageTransition";
import { ScrollAnimation } from "@/app/components/ScrollAnimation";
import { MotionList, MotionItem, scaleInVariants } from "@/app/components/MotionList";

export default function MediaPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leetCodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/data/mediaData.json").then((response) => response.json()),
      fetch(LEETCODE_API_ENDPOINT).then((response) => response.json()),
    ])
      .then(([achievementsData, leetCodeData]) => {
        setAchievements(achievementsData);
        setLeetCodeStats(leetCodeData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <div className="container mx-auto p-4 my-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 mt-4">Media Presence</h1>
        <p className="text-muted-foreground mb-8">Featured articles, interviews, and achievements</p>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <MotionList className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <ScrollAnimation key={index}>
                  <MotionItem
                    variants={scaleInVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    layout
                    custom={index}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                  >
                    <AchievementCard achievement={achievement} isFirst={index === 0} />
                  </MotionItem>
                </ScrollAnimation>
              ))}
              <ScrollAnimation>
                <MotionItem
                  variants={scaleInVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                  transition={{
                    delay: achievements.length * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                >
                  <LeetCodeCard stats={leetCodeStats} />
                </MotionItem>
              </ScrollAnimation>
            </MotionList>
            <ScrollAnimation>
              <MotionItem
                variants={scaleInVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
                transition={{
                  delay: (achievements.length + 1) * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <ContactCard />
              </MotionItem>
            </ScrollAnimation>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
