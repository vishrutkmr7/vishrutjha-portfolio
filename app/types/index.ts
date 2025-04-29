export * from './common.types';
export * from './portfolio.types';
export * from './chat.types';
export * from './leetcode.types';

export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  date: string;
  link: { text: string; url: string };
  tech: string[];
}

export interface TimelineItem {
  title: {
    company: string;
    role: string;
  };
  logo: string;
  date: string;
  description: string[];
  tech: string[];
}

export interface Achievement {
  title: string;
  image: string;
  date: string;
  description: string;
  link?: { text: string; url: string };
}
