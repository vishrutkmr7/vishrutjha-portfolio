export interface Achievement {
  title: string;
  description: string;
  date: string;
  image: string;
  link?: {
    text: string;
    url: string;
  };
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
  contributionPoints: number;
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

export interface TimelineItem {
  time: string;
  title: {
    company: string;
    role: string;
  };
  body: string;
  link?: {
    text: string;
    url: string;
  };
  type: 'education' | 'work';
  logo: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  date: string;
  image: string;
  link?: {
    text: string;
    url: string;
  };
  tech: string[];
}
