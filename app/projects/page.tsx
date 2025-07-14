import type { Metadata } from 'next';

import { MotionItem, MotionList, scaleInVariants } from '@/app/components/MotionList';
import PageTransition from '@/app/components/PageTransition';
import { ScrollAnimation } from '@/app/components/ScrollAnimation';
import { DOMAIN } from '@/app/constants';
import { fetchProjectsData, sortProjectsByDate } from '@/app/lib/data-fetcher';
import type { ProjectItem as ProjectItemData } from '@/app/types/portfolio.types';

import { ProjectCard } from './ProjectCard';

// Pre-fetch data at build time
const projects = await fetchProjectsData();
const sortedProjects = sortProjectsByDate(projects);

export const metadata: Metadata = {
  title: 'Projects | Vishrut Jha',
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
      <div className="container mx-auto space-y-6 p-4 pt-6 md:pt-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-bold text-3xl leading-tight tracking-tighter md:text-4xl">
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
