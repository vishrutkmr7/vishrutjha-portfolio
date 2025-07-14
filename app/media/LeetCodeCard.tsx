'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip, type TooltipItem } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { DraggableCard, dragVariants } from '@/app/components/MotionList';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { Icons, socialIconMap, techIconMap } from '@/app/lib/icons';
import type { LeetCodeStats } from '@/app/types/leetcode.types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LeetCodeCardProps {
  stats: LeetCodeStats | null;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    hoverBorderColor: string[];
  }[];
}

const getLeetCodeChartData = (stats: LeetCodeStats) =>
  ({
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [stats.easySolved || 0, stats.mediumSolved || 0, stats.hardSolved || 0],
        backgroundColor: ['#00b8a3', '#ffc01e', '#ff375f'],
        borderColor: ['#000000', '#000000', '#000000'],
        borderWidth: 2,
        hoverBorderColor: ['#00b8a3', '#ffc01e', '#ff375f'],
      },
    ],
  }) as ChartData;

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'doughnut'>) => {
          const label = context.label || '';
          const value = context.parsed || 0;
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
  },
};

const { code: CodeIcon, calendar: CalendarIcon } = Icons;

// Helper function to get the correct language name and icon
const getLanguageInfo = (lang: { name: string; solved: number }) => {
  const name = lang.name.toLowerCase();
  const displayName =
    name === 'python3'
      ? 'Python 3'
      : name === 'python'
        ? 'Python'
        : name.charAt(0).toUpperCase() + name.slice(1);
  const iconKey = name === 'python3' || name === 'python' ? 'Python' : displayName;
  const Icon = techIconMap[iconKey as keyof typeof techIconMap] || techIconMap.code;
  return { displayName, Icon };
};

export default function LeetCodeCard({ stats }: LeetCodeCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !stats) return null;

  // Get top 3 most used languages
  const topLanguages = [...(stats.languages || [])].sort((a, b) => b.solved - a.solved).slice(0, 3);

  return (
    <DraggableCard
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag="drag"
      whileHover="hover"
      variants={dragVariants}
      className="h-full"
    >
      <Card className="group flex h-full flex-col transition-all duration-300 hover:shadow-lg">
        <CardHeader className="flex-none pb-2">
          <div className="space-y-1.5">
            <CardTitle className="line-clamp-1 flex min-h-[2rem] items-center gap-2">
              <CodeIcon className="h-5 w-5 flex-shrink-0" />
              LeetCode Stats
            </CardTitle>
            <CardDescription className="flex flex-col gap-1">
              <span>Because apparently this matters...</span>
              <span className="text-muted-foreground text-xs">(Spoiler: It doesn&apos;t)</span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex-grow space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-sm">
                    Total: {stats.totalSolved}/{stats.totalQuestions}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Rank: {(stats.ranking || 0).toLocaleString()}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Badge variant="outline" className="text-sm">
                    Easy: {stats.easySolved}/{stats.totalEasy}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Medium: {stats.mediumSolved}/{stats.totalMedium}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Hard: {stats.hardSolved}/{stats.totalHard}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Acceptance Rate: {(stats.acceptanceRate || 0).toFixed(1)}%
                </p>
              </div>
              <div className="h-28 w-28 flex-shrink-0">
                <Doughnut data={getLeetCodeChartData(stats)} options={chartOptions} />
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">
                  {stats.streak} day streak · {stats.totalActiveDays} total active days
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Badge variant="secondary" className="text-xs">
                  Beats {(stats.beatsPercentage.easy || 0).toFixed(1)}% in Easy
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Beats {(stats.beatsPercentage.medium || 0).toFixed(1)}% in Medium
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Beats {(stats.beatsPercentage.hard || 0).toFixed(1)}% in Hard
                </Badge>
              </div>
              {topLanguages.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                  <span>Top languages:</span>
                  {topLanguages.map(lang => {
                    const { displayName, Icon } = getLanguageInfo(lang);
                    return (
                      <Badge key={lang.name} variant="outline" className="text-xs">
                        <Icon className="mr-1 h-3 w-3" />
                        {displayName} ({lang.solved})
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-auto flex-none pt-0 pb-6">
          <Button asChild variant="default" className="w-full">
            <a
              href="https://leetcode.com/vishrutjha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <socialIconMap.External className="h-4 w-4 flex-shrink-0" />
              View Profile
            </a>
          </Button>
        </CardFooter>
      </Card>
    </DraggableCard>
  );
}
