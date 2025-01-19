import type { Metadata } from 'next';

import { DOMAIN } from '@/app/constants';

export const metadata: Metadata = {
  title: 'Media | Vishrut Jha',
  description: 'Media presence, achievements, and contact information of Vishrut Jha',
  openGraph: {
    title: 'Media | Vishrut Jha',
    description: 'Media presence, achievements, and contact information of Vishrut Jha',
    url: `${DOMAIN}/media`,
    siteName: 'Vishrut Jha Portfolio',
    images: [
      {
        url: `${DOMAIN}/yudi.png`,
        width: 1200,
        height: 630,
        alt: 'Vishrut Jha Media',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media | Vishrut Jha',
    description: 'Media presence, achievements, and contact information of Vishrut Jha',
    creator: '@vishrutkmr7',
    images: {
      url: `${DOMAIN}/yudi.png`,
      alt: 'Vishrut Jha Media',
      width: 1200,
      height: 630,
    },
  },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
