import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "flowbite/dist/flowbite.min.css";
import "flowbite";

import ClientComponents from "@/app/components/ClientComponents";

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true });

export const metadata: Metadata = {
  title: "Vishrut Jha",
  description: "iOS, Full-Stack Developer and Software Engineer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vishrutjha.com",
    siteName: "Vishrut Jha",
    title: "Vishrut Jha - iOS & Full-Stack Developer",
    description:
      "Portfolio of Vishrut Jha, an experienced iOS and Full-Stack Developer based in Phoenix, AZ.",
    images: [
      {
        url: "https://vishrutjha.com/favicon.png",
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
    images: ["https://vishrutjha.com/favicon.png"],
    creator: "@vishrutkmr7",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientComponents />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
