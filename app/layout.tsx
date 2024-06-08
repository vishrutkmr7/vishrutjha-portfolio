import type { Metadata } from "next";
import Head from 'next/head';
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../app/components/header';
import Footer from '../app/components/footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vishrut Jha",
  description: "iOS, Full-Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <Head>
          <title>Vishrut Jha</title>
          <link rel="icon" href="/halo.png" />
        </Head>
      </head>
      <body>
        <Header />
        <main className="container mx-auto py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
