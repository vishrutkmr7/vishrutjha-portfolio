import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DOMAIN } from '@/app/constants';

export const metadata: Metadata = {
  title: 'Résumé | Vishrut Jha',
  description: 'Professional Résumé of Vishrut Jha - Full Stack and iOS Developer',
  openGraph: {
    title: 'Résumé | Vishrut Jha',
    description: 'Professional Résumé of Vishrut Jha - Full Stack and iOS Developer',
    url: `${DOMAIN}/resume`,
    siteName: 'Vishrut Jha Portfolio',
    images: [
      {
        url: `${DOMAIN}/resume-preview.png`,
        width: 1336,
        height: 1732,
        alt: 'Vishrut Jha Résumé Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Résumé | Vishrut Jha',
    description: 'Professional Résumé of Vishrut Jha - Full Stack and iOS Developer',
    creator: '@vishrutkmr7',
    images: {
      url: `${DOMAIN}/resume-preview.png`,
      alt: 'Vishrut Jha Résumé Preview',
      width: 1336,
      height: 1732,
    },
  },
};

export default function ResumePage() {
  redirect('resume.pdf');
}
