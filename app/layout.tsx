import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';

import ClientComponents from '@/app/components/ClientComponents';
import ClientRouteJsonLd from '@/app/components/ClientRouteJsonLd';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import JsonLd from '@/app/components/JsonLd';
import { ScrollProgressBar } from '@/app/components/ScrollAnimation';
import { ThemeProvider } from '@/app/components/theme-provider';
import { DOMAIN } from '@/app/constants';

import Chat from './components/Chat';

const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5, // iOS 26 compatibility
  userScalable: true,
  viewportFit: 'cover', // iOS 26 Safari - support for liquid glass address bar
  interactiveWidget: 'resizes-content', // iOS 26 Safari - handle dynamic viewport changes
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vishrutjha.com'),
  title: {
    default: 'Vishrut Jha',
    template: '%s | Vishrut Jha',
  },
  description: 'iOS, Full-Stack Developer and Software Engineer based in Phoenix, AZ.',
  keywords: [
    'Vishrut Jha',
    'iOS Developer',
    'Full-Stack Developer',
    'Software Engineer',
    'Phoenix',
    'AZ',
    'React',
    'Next.js',
    'TypeScript',
    'Swift',
    'SwiftUI',
    'Python',
    'Founding Engineer',
  ],
  authors: [{ name: 'Vishrut Jha', url: 'https://vishrutjha.com' }],
  creator: 'Vishrut Jha',
  publisher: 'Vishrut Jha',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  applicationName: 'Vishrut Jha | Portfolio',
  appleWebApp: {
    capable: true,
    title: 'Vishrut Jha',
    statusBarStyle: 'default',
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
      { url: '/favicon.ico', sizes: 'any', rel: 'icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }],
  },
  verification: {
    google: 'YOUR-GOOGLE-SITE-VERIFICATION',
    yandex: 'YOUR-YANDEX-VERIFICATION',
    other: {
      me: ['mailto:i+website@vishrut.co', 'https://github.com/vishrutkmr7'],
      'msapplication-TileColor': '#da532c',
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
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for theme initialization
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('vishrutjha-theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var appliedTheme = theme === 'system' || !theme ? systemTheme : theme;
                  
                  if (appliedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  // Set meta theme-color immediately
                  var metaThemeColor = document.querySelector('meta[name="theme-color"]');
                  if (metaThemeColor) {
                    metaThemeColor.content = appliedTheme === 'dark' ? '#0A0A0A' : '#ffffff';
                  }
                } catch (e) {
                  // Fallback to light theme if there's an error
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        <JsonLd />
        <ClientRouteJsonLd />
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
            {/* Animated background layer */}
            <div className="site-background" aria-hidden="true" />

            <ScrollProgressBar />
            {/* Google Tag Manager (noscript) */}
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-PVC7X77Z"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="Google Tag Manager"
              ></iframe>
            </noscript>
            {/* End Google Tag Manager (noscript) */}
            {/* Google tag (gtag.js) */}
            <Script
              strategy="afterInteractive"
              src={'https://www.googletagmanager.com/gtag/js?id=G-EM96FL2J50'}
            />
            <Script
              // biome-ignore lint/correctness/useUniqueElementIds: Google Analytics requires static ID
              id="google-analytics"
              strategy="afterInteractive"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Google Analytics tracking
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
            {/* Foreground content, guaranteed above background */}
            <div className="relative z-10">
              <div className="flex min-h-[100dvh] flex-col">
                <Header />
                <main className="container mt-14 flex-grow py-4 md:py-6">{children}</main>
                <Footer />
                <Chat />
              </div>
            </div>
            <SpeedInsights />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
