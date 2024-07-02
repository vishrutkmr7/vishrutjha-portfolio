import JourneyTimeline from "./Timeline";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Journey | Vishrut Jha",
  description:
    "Explore the professional journey of Vishrut Jha, from education to career milestones in iOS and full-stack development.",
  alternates: {
    canonical: "https://vishrutjha.com/journey",
  },
  openGraph: {
    title: "My Journey | Vishrut Jha",
    description:
      "Explore the professional journey of Vishrut Jha, from education to career milestones in iOS and full-stack development.",
    url: "https://vishrutjha.com/journey",
    images: [
      {
        url: "https://vishrutjha.com/pphealth.jpeg",
        width: 200,
        height: 200,
        alt: "Vishrut Jha Journey",
      },
    ],
  },
  twitter: {
    title: "My Journey | Vishrut Jha",
    description:
      "Explore the professional journey of Vishrut Jha, from education to career milestones in iOS and full-stack development.",
    images: ["https://vishrutjha.com/pphealth.jpeg"],
  },
};

const JourneyPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <JourneyTimeline />
    </div>
  );
};

export default JourneyPage;
