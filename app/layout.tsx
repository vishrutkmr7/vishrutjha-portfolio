import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navigation from "./components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vishrut Jha",
  description: "iOS, Full-Stack Developer and Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Head>
          <title>Vishrut Jha</title>
          <link rel="icon" href="/public/favicon.ico" sizes="any" />
        </Head>
      </head>
      <Analytics />
      <SpeedInsights />
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
