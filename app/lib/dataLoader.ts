import mediaData from '../../public/data/mediaData.json';
import projectsData from '../../public/data/projectsData.json';
import timelineData from '../../public/data/timelineData.json';

export function getStructuredPromptData() {
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
    timeline: timelineData.map(t => ({
      role: t.title.role,
      company: t.title.company,
      duration: t.time,
      highlights: t.body.split('.').slice(0, 2).join('.'), // First 2 sentences
    })),
  };
}
