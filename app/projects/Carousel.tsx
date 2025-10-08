import { FlexibleCard } from '@/app/components/ui/shared-card';
import { fetchProjectsData, sortProjectsByDate } from '@/app/lib/data-fetcher';
import { socialIconMap, techIconMap } from '@/app/lib/icons';

// Server component for improved performance
const ProjectsCarousel = async () => {
  const projects = await fetchProjectsData();
  const sortedProjects = sortProjectsByDate(projects);

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="mt-4 mb-2 font-bold text-4xl sm:text-5xl">My Projects</h1>
      <p className="mb-8 text-muted-foreground">Things I&apos;ve built that I&apos;m proud of</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedProjects.map(project => {
          // Get project link icon
          const getLinkIcon = () => {
            if (!project.link) {
              return null;
            }

            switch (project.link.text) {
              case 'Source Code':
                return <socialIconMap.github className="h-4 w-4 flex-shrink-0" />;
              case 'App Store':
                return <socialIconMap.AppStore className="h-4 w-4 flex-shrink-0" />;
              case 'TestFlight':
                return <socialIconMap.TestFlight className="h-4 w-4 flex-shrink-0" />;
              case 'Website':
                return <socialIconMap.website className="h-4 w-4 flex-shrink-0" />;
              default:
                return null;
            }
          };

          return (
            <FlexibleCard
              key={project.title}
              isDraggable={false}
              image={
                project.image
                  ? {
                      src: `/${project.image}`,
                      alt: project.title,
                      aspectRatio: 'video' as const,
                      unoptimized: project.image.endsWith('.gif'),
                    }
                  : undefined
              }
              header={{
                title: project.title,
                description: project.date,
                icon: <socialIconMap.calendar className="h-4 w-4 flex-shrink-0" />,
              }}
              content={
                <p className="line-clamp-3 min-h-[4.5rem] text-muted-foreground">
                  {project.description}
                </p>
              }
              tech={project.tech}
              techIconMap={techIconMap}
              actions={
                project.link
                  ? [
                      {
                        text: project.link.text,
                        url: project.link.url,
                        icon: getLinkIcon(),
                        variant: 'default' as const,
                      },
                    ]
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsCarousel;
