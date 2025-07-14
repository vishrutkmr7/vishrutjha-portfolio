import type { Metadata } from 'next';
import type React from 'react';

import { DOMAIN } from '@/app/constants';
import { fetchTimelineData, sortTimelineByDate } from '@/app/lib/data-fetcher';

import JourneyTimeline from './Timeline';

export const metadata: Metadata = {
  title: 'Journey | Vishrut Jha',
  description: 'My professional journey and career milestones',
  openGraph: {
    title: 'Journey | Vishrut Jha',
    description: 'My professional journey and career milestones',
    url: `${DOMAIN}/journey`,
    siteName: 'Vishrut Jha Portfolio',
    images: [
      {
        url: `${DOMAIN}/pphealth.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Vishrut Jha Journey',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journey | Vishrut Jha',
    description: 'My professional journey and career milestones',
    creator: '@vishrutkmr7',
    images: {
      url: `${DOMAIN}/pphealth.jpeg`,
      alt: 'Vishrut Jha Journey',
      width: 1200,
      height: 630,
    },
  },
};

const JourneyPage: React.FC = async () => {
  // Fetch and sort timeline data at build time
  const timelineData = await fetchTimelineData();
  const sortedTimelineData = sortTimelineByDate(timelineData);

  return <JourneyTimeline timelineData={sortedTimelineData} />;
};

export default JourneyPage;
