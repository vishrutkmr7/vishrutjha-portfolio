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
