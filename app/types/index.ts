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

export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  streak: number;
  totalActiveDays: number;
  reputation: number;
  solutionCount: number;
  languages: Array<{
    name: string;
    solved: number;
  }>;
  beatsPercentage: {
    easy: number;
    medium: number;
    hard: number;
  };
  profile: {
    realName: string;
    company: string;
    school: string;
    countryName: string;
    skillTags: string[];
    avatar: string;
  };
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
  };
  badges: Array<{
    name: string;
    icon: string;
  }>;
}
