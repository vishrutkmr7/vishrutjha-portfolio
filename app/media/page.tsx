import AchievementList from "./List";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & Achievements | Vishrut Jha",
  description:
    "Explore the media appearances, publications, and achievements of Vishrut Jha in the field of software development.",
  openGraph: {
    title: "Media & Achievements | Vishrut Jha",
    description:
      "Explore the media appearances, publications, and achievements of Vishrut Jha in the field of software development.",
    url: "https://vishrutjha.com/media",
    images: [
      {
        url: "https://vishrutjha.com/yudi.png",
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
    images: ["https://vishrutjha.com/yudi.png"],
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
