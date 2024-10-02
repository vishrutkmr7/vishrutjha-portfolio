import AchievementList from "./List";
import type React from "react";
import type { Metadata } from "next";
import { DOMAIN, LEETCODE_API_ENDPOINT } from "@/app/constants";

export const metadata: Metadata = {
  title: "Media & Achievements | Vishrut Jha",
  description:
    "Explore the media appearances, publications, and achievements of Vishrut Jha in the field of software development.",
  alternates: {
    canonical: `${DOMAIN}/media`,
  },
  openGraph: {
    title: "Media & Achievements | Vishrut Jha",
    description:
      "Explore the media appearances, publications, and achievements of Vishrut Jha in the field of software development.",
    url: `${DOMAIN}/media`,
    images: [
      {
        url: `${DOMAIN}/yudi.png`,
        width: 2960,
        height: 1479,
        alt: "Vishrut Jha Media & Achievements",
      },
    ],
  },
  twitter: {
    title: "Media & Achievements | Vishrut Jha",
    description:
      "Explore the media appearances, publications, and achievements of Vishrut Jha in the field of software development.",
    images: [`${DOMAIN}/yudi.png`],
  },
};
const AchievementsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <AchievementList />
    </div>
  );
};

export default AchievementsPage;
