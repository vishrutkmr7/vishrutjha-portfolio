"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LeetCodeStats } from "@/app/types";
import { DraggableCard, dragVariants } from "@/app/components/MotionList";
import { socialIconMap } from "@/app/lib/icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Badge } from "@/components/ui/badge";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LeetCodeCardProps {
    stats: LeetCodeStats | null;
}

const getLeetCodeChartData = (stats: LeetCodeStats) => ({
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
});

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
                label: (context: any) => {
                    const label = context.label || '';
                    const value = context.parsed || 0;
                    const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${label}: ${value} (${percentage}%)`;
                },
            },
        },
    },
};

export default function LeetCodeCard({ stats }: LeetCodeCardProps) {
    if (!stats) return null;

    return (
        <DraggableCard
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            whileDrag="drag"
            whileHover="hover"
            variants={dragVariants}
            className="h-full"
        >
            <Card className="flex flex-col h-full group hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex-none pb-2">
                    <div className="space-y-1.5">
                        <CardTitle className="line-clamp-1 flex items-center gap-2 min-h-[2rem]">
                            <socialIconMap.Code className="h-5 w-5 flex-shrink-0" />
                            LeetCode Stats
                        </CardTitle>
                        <CardDescription className="flex flex-col gap-1">
                            <span>Because apparently this matters...</span>
                            <span className="text-xs text-muted-foreground">(Spoiler: It doesn&apos;t)</span>
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow pb-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="space-y-3 flex-grow">
                            <div className="flex items-center gap-2">
                                <Badge variant="default" className="text-sm">
                                    Total: {stats.totalSolved}/{stats.totalQuestions}
                                </Badge>
                                <Badge variant="secondary" className="text-sm">
                                    Rank: {stats.ranking.toLocaleString()}
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
                            <p className="text-sm text-muted-foreground">
                                Acceptance Rate: {stats.acceptanceRate.toFixed(2)}%
                            </p>
                        </div>
                        <div className="w-28 h-28 flex-shrink-0">
                            <Doughnut data={getLeetCodeChartData(stats)} options={chartOptions} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-none mt-auto pt-0 pb-6">
                    <Button asChild variant="default" className="w-full">
                        <a
                            href="https://leetcode.com/vishrutkmr7"
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