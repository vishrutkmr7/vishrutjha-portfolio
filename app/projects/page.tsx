import ProjectsCarousel from "./Carousel";
import React from "react";
import type { Metadata } from "next";
import { DOMAIN } from "@/app/constants";

export const metadata: Metadata = {
  title: "Projects | Vishrut Jha",
  description:
    "Explore the innovative projects developed by Vishrut Jha, showcasing expertise in iOS and full-stack development.",
  alternates: {
    canonical: `${DOMAIN}/projects`,
  },
  openGraph: {
    title: "Projects | Vishrut Jha",
    description:
      "Explore the innovative projects developed by Vishrut Jha, showcasing expertise in iOS and full-stack development.",
    url: `${DOMAIN}/projects`,
    images: [
      {
        url: `${DOMAIN}/fifawc22.png`,
        width: 1350,
        height: 730,
        alt: "Vishrut Jha Projects",
      },
    ],
  },
  twitter: {
    title: "Projects | Vishrut Jha",
    description:
      "Explore the innovative projects developed by Vishrut Jha, showcasing expertise in iOS and full-stack development.",
    images: [`${DOMAIN}/fifawc22.png`],
  },
};

const ProjectsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <ProjectsCarousel />
    </div>
  );
};

export default ProjectsPage;
