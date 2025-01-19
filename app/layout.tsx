import './globals.css';
import { Suspense } from 'react';

import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import ClientComponents from '@/app/components/ClientComponents';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import JsonLd from '@/app/components/JsonLd';
import { ScrollProgressBar } from '@/app/components/ScrollAnimation';
import { DOMAIN } from '@/app/constants';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vishrutjha.com'),
  title: {
    default: 'Vishrut Jha',
    template: '%s | Vishrut Jha',
  },
  description: 'iOS, Full-Stack Developer and Software Engineer',
  keywords: [
    'iOS Developer',
    'Full-Stack Developer',
    'Software Engineer',
    'Phoenix',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Vishrut Jha', url: 'https://vishrutjha.com' }],
  creator: 'Vishrut Jha',
  publisher: 'Vishrut Jha',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: `${DOMAIN}/`,
    languages: {
      'en-US': '/en-US',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  verification: {
    google: 'YOUR-GOOGLE-SITE-VERIFICATION',
    yandex: 'YOUR-YANDEX-VERIFICATION',
    other: {
      me: ['mailto:your-email@vishrutjha.com', 'https://github.com/vishrutkmr7'],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: DOMAIN,
    siteName: 'Vishrut Jha',
    title: 'Vishrut Jha - iOS & Full-Stack Developer',
    description:
      'Portfolio of Vishrut Jha, an experienced iOS and Full-Stack Developer based in Phoenix, AZ.',
    images: [
      {
        url: `${DOMAIN}/favicon.png`,
        width: 1080,
        height: 1080,
        alt: 'Vishrut Jha',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishrut Jha - iOS & Full-Stack Developer',
    description:
      'Portfolio of Vishrut Jha, an experienced iOS and Full-Stack Developer based in Phoenix, AZ.',
    images: [`${DOMAIN}/favicon.png`],
    creator: '@vishrutkmr7',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <JsonLd />
      </head>
      <body
        className={`${inter.className} flex min-h-screen flex-col antialiased`}
        suppressHydrationWarning
      >
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="vishrutjha-theme"
          >
            <ScrollProgressBar />
            {/* Google Tag Manager (noscript) */}
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-PVC7X77Z"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              ></iframe>
            </noscript>
            {/* End Google Tag Manager (noscript) */}
            {/* Google tag (gtag.js) */}
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=G-EM96FL2J50`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-EM96FL2J50');
              `,
              }}
            />
            <ClientComponents />
            <Header />
            <main className="flex-1 container py-8 md:py-12">{children}</main>
            <Footer />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
