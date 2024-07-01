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
    type: "education" | "work";
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
