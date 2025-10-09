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
    'investing',
    'transportation',
    'food delivery',
    'payments',
    'student loans',
    'finance',
    'budgeting',
    'crypto',
    'cryptocurrency',
    'discounts',
    'exclusive offers',
    'Perplexity',
    'Sora',
    'Sora 2',
    'OpenAI',
    'AI video',
    'Warp',
    'Discover',
    'Chase Sapphire',
    'American Express',
    'AmEx',
    'Bilt',
    'Apple Card',
    'Robinhood',
    'Uber',
    'Lyft',
    'Waymo',
    'DoorDash',
    'Venmo',
    'Privacy',
    'Copilot',
    'Coinbase',
    'Worldcoin',
    'SoFi',
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
    site: '@vishrutkmr7',
    creator: '@vishrutkmr7',
    title: 'Referrals | Vishrut Jha',
    description:
      'Discover and share my favorite products, services, and tools. Get exclusive referral links for software, credit cards, and more.',
    images: [
      {
        url: `${DOMAIN}/favicon.png`,
        alt: 'Vishrut Jha Referrals - Get exclusive benefits on software, credit cards, crypto, and more',
        width: 1080,
        height: 1080,
      },
    ],
  },
  alternates: {
    canonical: `${DOMAIN}/referrals`,
  },
};

export default function ReferralsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
