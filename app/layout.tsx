import { Metadata } from "next";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vishrut Jha",
  description: "iOS, Full-Stack Developer and Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Vishrut Jha</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>

        <Analytics />
        <SpeedInsights />
      </Head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <script async src="/node_modules/flowbite/dist/flowbite.min.js" />
      </body>
    </html>
  );
}
