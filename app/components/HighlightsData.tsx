import { Suspense } from 'react';

import { fetchHighlightsData } from '@/app/lib/data-fetcher';

import Highlights from './Highlights';
import { Card, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

const HighlightSkeleton = () => (
  <Card className="h-full">
    <CardHeader className="p-6">
      <div className="flex gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </CardHeader>
  </Card>
);

// Server component for data fetching
export default async function HighlightsData() {
  const highlightData = await fetchHighlightsData();

  return (
    <Suspense
      fallback={
        <div className="mx-auto mt-8 w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Using index for skeleton loading placeholders is acceptable
              <HighlightSkeleton key={`highlight-skeleton-${i}`} />
            ))}
          </div>
        </div>
      }
    >
      <Highlights highlightData={highlightData} />
    </Suspense>
  );
}
