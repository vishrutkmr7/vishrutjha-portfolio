import mediaData from '../../public/data/mediaData.json';
import projectsData from '../../public/data/projectsData.json';
import timelineData from '../../public/data/timelineData.json';

export function getStructuredPromptData() {
  // Categorize timeline data by type
  const workExperience = timelineData.filter(t => t.type === 'work');
  const volunteerExperience = timelineData.filter(t => t.type === 'volunteer');
  const education = timelineData.filter(t => t.type === 'education');

  return {
    projects: projectsData.map(p => ({
      title: p.title,
      description: p.description,
      tech: p.tech,
      date: p.date,
    })),
    media: mediaData.map(m => ({
      title: m.title,
      type: m.link.text.includes('Podcast') ? 'podcast' : 'article',
      date: m.date,
    })),
    workExperience: workExperience.map(t => ({
      role: t.title.role,
      company: t.title.company,
      duration: t.time,
      highlights: t.body,
      link: t.link,
    })),
    volunteerExperience: volunteerExperience.map(t => ({
      role: t.title.role,
      company: t.title.company,
      duration: t.time,
      highlights: t.body,
      link: t.link,
    })),
    education: education.map(t => ({
      role: t.title.role,
      company: t.title.company,
      duration: t.time,
      highlights: t.body,
      link: t.link,
    })),
    // Data source priorities and links
    dataSources: {
      primary: {
        timeline: '/data/timelineData.json',
        projects: '/data/projectsData.json',
        media: '/data/mediaData.json',
      },
      social: {
        twitter: 'https://twitter.com/vishrutkmr7',
        instagram: 'https://instagram.com/vishrutkmr7',
        linkedin: 'https://linkedin.com/in/vishrutjha',
        github: 'https://github.com/vishrutkmr7',
      },
      website: 'https://vishrutjha.com',
    },
  };
}
