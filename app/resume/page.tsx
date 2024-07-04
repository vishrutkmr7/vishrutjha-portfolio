import { Metadata } from "next";
import { DOMAIN } from "@/app/constants";

export const metadata: Metadata = {
  title: "Vishrut Jha - Resume",
  description:
    "Professional resume of Vishrut Jha - Full Stack and iOS Developer",
  openGraph: {
    title: "Vishrut Jha - Resume",
    description:
      "Professional resume of Vishrut Jha - Full Stack and iOS Developer",
    url: `${DOMAIN}/resume`,
    siteName: "Vishrut Jha Portfolio",
    images: [
      {
        url: `${DOMAIN}/resume-preview.png`,
        width: 1336,
        height: 1732,
        alt: "Vishrut Jha Resume Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishrut Jha - Resume",
    description:
      "Professional resume of Vishrut Jha - Full Stack and iOS Developer",
    creator: "@vishrutkmr7",
    images: [`${DOMAIN}/resume-preview.png`],
  },
};

export default function ResumePage() {
  return null; // This component doesn't render anything visible
}
