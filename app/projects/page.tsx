import type { Metadata } from 'next';

import { MotionList, MotionItem, scaleInVariants } from '@/app/components/MotionList';
import PageTransition from '@/app/components/PageTransition';
import { ScrollAnimation } from '@/app/components/ScrollAnimation';
import { DOMAIN } from '@/app/constants';
import { parseDateString } from '@/app/lib/utils';
import projectsData from '@/public/data/projectsData.json';

import { ProjectCard } from './ProjectCard';

// Update ProjectItem interface to match the actual data structure
interface ProjectItemData {
  title: string;
  description: string;
  image: string;
  date: string;
  link: { text: string; url: string };
  tech: string[];
}

// Sort projects by date (most recent first)
const sortedProjects = [...projectsData].sort((a, b) => {
  const dateA = parseDateString(a.date);
  const dateB = parseDateString(b.date);
  return dateB.getTime() - dateA.getTime();
});

export const metadata: Metadata = {
  title: 'Projects',
  description: "A collection of projects I've worked on, both personal and professional.",
  alternates: {
    canonical: `${DOMAIN}/projects`,
  },
  openGraph: {
    title: 'Projects - Vishrut Jha',
    description: "A collection of projects I've worked on, both personal and professional.",
    url: `${DOMAIN}/projects`,
    siteName: 'Vishrut Jha Portfolio',
    images: [
      {
        url: `${DOMAIN}/llama-stack-ios.png`,
        width: 1200,
        height: 630,
        alt: 'Vishrut Jha Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Vishrut Jha',
    description: "A collection of projects I've worked on, both personal and professional.",
    creator: '@vishrutkmr7',
    images: {
      url: `${DOMAIN}/llama-stack-ios.png`,
      alt: 'Vishrut Jha Projects',
      width: 1200,
      height: 630,
    },
  },
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="space-y-6 container mx-auto p-4 pt-6 md:pt-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Projects
          </h1>
          <p className="text-muted-foreground">
            A collection of projects I&apos;ve worked on, both personal and professional.
          </p>
        </div>
        <MotionList className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project: ProjectItemData, index: number) => (
            <ScrollAnimation key={project.title}>
              <MotionItem
                variants={scaleInVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
                custom={index}
                transition={{
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  date={project.date}
                  link={project.link}
                  tech={project.tech}
                />
              </MotionItem>
            </ScrollAnimation>
          ))}
        </MotionList>
      </div>
    </PageTransition>
  );
}
