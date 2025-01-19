"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { LEETCODE_API_ENDPOINT } from "@/app/constants";
import { socialIconMap } from "@/app/lib/icons";
import type { Achievement, LeetCodeStats } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

ChartJS.register(ArcElement, Tooltip, Legend);

// Helper Functions
const getLeetCodeChartData = (stats: LeetCodeStats | null) => ({
  labels: ["Easy", "Medium", "Hard"],
  datasets: [
    {
      data: [
        stats?.easySolved || 0,
        stats?.mediumSolved || 0,
        stats?.hardSolved || 0,
      ],
      backgroundColor: ["#00b8a3", "#ffc01e", "#ff375f"],
      borderColor: ["#000000", "#000000", "#000000"],
      borderWidth: 2,
      hoverBorderColor: ["#00b8a3", "#ffc01e", "#ff375f"],
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || "";
          const value = context.parsed || 0;
          const total = context.dataset.data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
  },
};

// Components
const LeetCodeCard: React.FC<{ stats: LeetCodeStats | null }> = ({ stats }) => (
  <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
    <CardHeader className="flex-none">
      <div className="space-y-1.5">
        <CardTitle className="line-clamp-1 flex items-center gap-2">
          <socialIconMap.Code className="h-5 w-5" />
          LeetCode Stats
        </CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <span>Because apparently this matters...</span>
          <span className="text-xs text-muted-foreground">(Spoiler: It doesn't)</span>
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-3 flex-grow">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-sm">
              Total: {stats?.totalSolved}/{stats?.totalQuestions}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Rank: {stats?.ranking.toLocaleString()}
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Badge variant="outline" className="text-sm">
              Easy: {stats?.easySolved}/{stats?.totalEasy}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Medium: {stats?.mediumSolved}/{stats?.totalMedium}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Hard: {stats?.hardSolved}/{stats?.totalHard}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Acceptance Rate: {stats?.acceptanceRate.toFixed(2)}%
          </p>
        </div>
        <div className="w-28 h-28 flex-shrink-0">
          <Doughnut data={getLeetCodeChartData(stats)} options={chartOptions} />
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex-none pt-6">
      <Button asChild variant="default" className="w-full">
        <a
          href="https://leetcode.com/vishrutjha/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <socialIconMap.External className="h-4 w-4" />
          View Profile
        </a>
      </Button>
    </CardFooter>
  </Card>
);

const AchievementCard: React.FC<{ achievement: Achievement }> = ({
  achievement,
}) => (
  <Card className="flex flex-col h-full group hover:shadow-lg transition-shadow duration-200" id={achievement.title}>
    <CardHeader className="flex-none p-0">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={`/${achievement.image}`}
          alt={achievement.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-6 space-y-1.5">
        <CardTitle className="line-clamp-2">{achievement.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          {achievement.date}
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground line-clamp-3">{achievement.description}</p>
    </CardContent>
    {achievement.link && (
      <CardFooter className="flex-none pt-6">
        <Button asChild variant="default" className="w-full">
          <a
            href={achievement.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            {achievement.link.text === "Source Code" && (
              <socialIconMap.GitHub className="h-4 w-4" />
            )}
            {achievement.link.text === "App Store" && (
              <socialIconMap.AppStore className="h-4 w-4" />
            )}
            {achievement.link.text === "Listen on Apple Podcasts" && (
              <socialIconMap.Apple className="h-4 w-4" />
            )}
            {achievement.link.text === "Watch on YouTube" && (
              <socialIconMap.YouTube className="h-4 w-4" />
            )}
            {achievement.link.text === "Read Article" && (
              <socialIconMap.External className="h-4 w-4" />
            )}
            {achievement.link.text}
          </a>
        </Button>
      </CardFooter>
    )}
  </Card>
);

const ContactCard: React.FC = () => (
  <Card className="col-span-full hover:shadow-lg transition-shadow duration-200">
    <CardHeader className="flex-none">
      <CardTitle className="line-clamp-1 flex items-center gap-2">
        <socialIconMap.Email className="h-5 w-5" />
        Let's Connect
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          variant="default"
          onClick={() => {
            window.location.href = "mailto:" + "me" + "@" + "vishrutjha" + "." + "com";
          }}
          className="flex items-center gap-2 min-w-[120px]"
        >
          <socialIconMap.Email className="h-4 w-4" />
          Email
        </Button>

        <Button asChild variant="secondary" className="min-w-[120px]">
          <a
            href="https://www.x.com/vishrutkmr7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <socialIconMap.Twitter className="h-4 w-4" />
            Twitter
          </a>
        </Button>

        <Button asChild variant="outline" className="min-w-[120px]">
          <a
            href="https://www.github.com/vishrutkmr7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <socialIconMap.GitHub className="h-4 w-4" />
            GitHub
          </a>
        </Button>

        <Button asChild variant="secondary" className="min-w-[120px]">
          <a
            href="https://www.linkedin.com/in/vishrutkmr7/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <socialIconMap.LinkedIn className="h-4 w-4" />
            LinkedIn
          </a>
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Main Component
const AchievementList: React.FC = () => {
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
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2 mt-4">Media Presence</h1>
      <p className="text-muted-foreground mb-8">Featured articles, interviews, and achievements</p>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
          <LeetCodeCard stats={leetCodeStats} />
          <ContactCard />
        </div>
      )}
    </div>
  );
};

export default AchievementList;
