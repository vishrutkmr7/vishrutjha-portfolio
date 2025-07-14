'use client';

import { ExternalLink, Wifi } from 'lucide-react';
import { lazy, Suspense } from 'react';

import { DraggableCard, dragVariants, mobileDragVariants } from '@/app/components/MotionList';
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
import { useIsMobile } from '@/app/lib/hooks';
import { Icons, techIconMap } from '@/app/lib/icons';
import type { LeetCodeStats } from '@/app/types/leetcode.types';

// Lazy load Chart.js components
const LazyChart = lazy(() =>
  import('react-chartjs-2').then(module => ({
    default: module.Doughnut,
  }))
);

// Lazy load Chart.js registration
const ChartRegistration = lazy(() =>
  import('chart.js').then(module => {
    const { ArcElement, Chart, Legend, Tooltip } = module;
    Chart.register(ArcElement, Tooltip, Legend);
    return { default: () => null };
  })
);

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

// Chart loading skeleton
function ChartSkeleton() {
  return (
    <div className="flex h-32 w-32 animate-pulse items-center justify-center rounded-full bg-muted">
      <div className="h-20 w-20 rounded-full bg-muted-foreground/20" />
    </div>
  );
}

// Chart component with lazy loading
function LeetCodeChart({ stats }: { stats: LeetCodeStats }) {
  const chartData = getLeetCodeChartData(stats);
  const isMobile = useIsMobile();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: !isMobile, // Disable tooltips on mobile for better performance
        callbacks: {
          label: (context: { label?: string; parsed?: number }) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
    // Reduce animation on mobile
    animation: {
      duration: isMobile ? 0 : 1000,
    },
    // Optimize for mobile performance
    elements: {
      arc: {
        borderWidth: isMobile ? 1 : 2,
      },
    },
  };

  return (
    <div className="relative h-32 w-32">
      <Suspense fallback={<ChartSkeleton />}>
        <ChartRegistration />
        <LazyChart data={chartData} options={options} />
      </Suspense>
    </div>
  );
}

const getLanguageInfo = (lang: { name: string; solved: number }) => {
  const iconKey = lang.name.toLowerCase();
  const IconComponent = techIconMap[iconKey as keyof typeof techIconMap] || Icons.code;
  return { IconComponent, name: lang.name, solved: lang.solved };
};

export default function LeetCodeCard({ stats }: LeetCodeCardProps) {
  const isMobile = useIsMobile();
  const dragVars = isMobile ? mobileDragVariants : dragVariants;

  if (!stats) {
    return (
      <DraggableCard
        variants={dragVars}
        whileHover="hover"
        whileTap="drag"
        className="h-full cursor-pointer"
      >
        <Card className="h-full border-2 border-muted-foreground/25 border-dashed bg-muted/30">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FFA500]">
                <Icons.code className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">LeetCode Stats</CardTitle>
                <CardDescription>Problem-solving progress</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="text-center text-muted-foreground">
              <Wifi className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p className="text-sm">Unable to load stats</p>
              <p className="mt-1 text-xs">Check connection and try again</p>
            </div>
          </CardContent>
        </Card>
      </DraggableCard>
    );
  }

  const totalProblems =
    (stats.easySolved || 0) + (stats.mediumSolved || 0) + (stats.hardSolved || 0);
  const acceptanceRate = stats.acceptanceRate || 0;
  const ranking = stats.ranking || 0;

  return (
    <DraggableCard
      variants={dragVars}
      whileHover="hover"
      whileTap="drag"
      className="h-full cursor-pointer"
    >
      <Card className="h-full border-l-4 border-l-[#FFA500] bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FFA500]">
              <Icons.code className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">LeetCode Stats</CardTitle>
              <CardDescription>Problem-solving progress</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <LeetCodeChart stats={stats} />
            </div>
            <div className="flex-1 space-y-2 pl-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Easy</span>
                <Badge variant="secondary" className="bg-[#00b8a3]/10 text-[#00b8a3]">
                  {stats.easySolved || 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Medium</span>
                <Badge variant="secondary" className="bg-[#ffc01e]/10 text-[#ffc01e]">
                  {stats.mediumSolved || 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Hard</span>
                <Badge variant="secondary" className="bg-[#ff375f]/10 text-[#ff375f]">
                  {stats.hardSolved || 0}
                </Badge>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="font-semibold text-2xl text-primary">{totalProblems}</div>
              <div className="text-muted-foreground text-xs">Problems Solved</div>
            </div>
            <div>
              <div className="font-semibold text-2xl text-primary">
                {acceptanceRate.toFixed(1)}%
              </div>
              <div className="text-muted-foreground text-xs">Acceptance Rate</div>
            </div>
          </div>
          {ranking > 0 && (
            <>
              <Separator />
              <div className="text-center">
                <div className="font-semibold text-lg text-primary">
                  #{ranking.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-xs">Global Ranking</div>
              </div>
            </>
          )}
          {stats.languages && stats.languages.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="mb-2 font-medium text-sm">Languages Used</h4>
                <div className="flex flex-wrap gap-1">
                  {stats.languages.slice(0, 6).map(lang => {
                    const { IconComponent, name, solved } = getLanguageInfo(lang);
                    return (
                      <Badge key={name} variant="outline" className="text-xs">
                        <IconComponent className="mr-1 h-3 w-3" />
                        {name} ({solved})
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="https://leetcode.com/u/vishrutjha/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Profile
            </a>
          </Button>
        </CardFooter>
      </Card>
    </DraggableCard>
  );
}
