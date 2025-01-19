import "./globals.css";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { DOMAIN } from "@/app/constants";
import { ThemeProvider } from "@/components/theme-provider";

import ClientComponents from "@/app/components/ClientComponents";

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true });

export const metadata: Metadata = {
  title: "Vishrut Jha",
  description: "iOS, Full-Stack Developer and Software Engineer",
  alternates: {
    canonical: `${DOMAIN}/`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: DOMAIN,
    siteName: "Vishrut Jha",
    title: "Vishrut Jha - iOS & Full-Stack Developer",
    description:
      "Portfolio of Vishrut Jha, an experienced iOS and Full-Stack Developer based in Phoenix, AZ.",
    images: [
      {
        url: `${DOMAIN}/favicon.png`,
        width: 1080,
        height: 1080,
        alt: "Vishrut Jha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishrut Jha - iOS & Full-Stack Developer",
    description:
      "Portfolio of Vishrut Jha, an experienced iOS and Full-Stack Developer based in Phoenix, AZ.",
    images: [`${DOMAIN}/favicon.png`],
    creator: "@vishrutkmr7",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-screen flex-col antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PVC7X77Z"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
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
      </body>
    </html>
  );
}
