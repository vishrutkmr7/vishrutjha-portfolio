import type { Metadata } from 'next';

import { DOMAIN } from '@/app/constants';

export const metadata: Metadata = {
  title: 'Referrals | Vishrut Jha',
  description:
    'Discover and share my favorite products, services, and tools. Get exclusive referral links for software, credit cards, and more.',
  keywords: [
    'referrals',
    'recommendations',
    'software',
    'tools',
    'credit cards',
    'discounts',
    'exclusive offers',
    'Perplexity',
    'Warp',
    'Discover',
    'Chase Sapphire',
    'American Express',
    'AmEx',
  ],
  openGraph: {
    title: 'Referrals | Vishrut Jha',
    description:
      'Discover and share my favorite products, services, and tools. Get exclusive referral links for software, credit cards, and more.',
    url: `${DOMAIN}/referrals`,
    siteName: 'Vishrut Jha Portfolio',
    images: [
      {
        url: `${DOMAIN}/favicon.png`,
        width: 1080,
        height: 1080,
        alt: 'Vishrut Jha Referrals',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Referrals | Vishrut Jha',
    description:
      'Discover and share my favorite products, services, and tools. Get exclusive referral links for software, credit cards, and more.',
    creator: '@vishrutkmr7',
    images: {
      url: `${DOMAIN}/favicon.png`,
      alt: 'Vishrut Jha Referrals',
      width: 1080,
      height: 1080,
    },
  },
  alternates: {
    canonical: `${DOMAIN}/referrals`,
  },
};

export default function ReferralsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
