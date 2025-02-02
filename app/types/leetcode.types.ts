interface LeetCodeLanguage {
  name: string;
  solved: number;
}

interface LeetCodeBadge {
  name: string;
  icon: string;
}

interface LeetCodeProfile {
  realName: string;
  company: string;
  school: string;
  countryName: string;
  skillTags: string[];
  avatar: string;
}

interface LeetCodeSocialLinks {
  github: string;
  twitter: string;
  linkedin: string;
}

interface LeetCodePerformance {
  easy: number;
  medium: number;
  hard: number;
}

export interface LeetCodeStats {
  // Solving statistics
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;

  // Performance metrics
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  streak: number;
  totalActiveDays: number;
  reputation: number;
  solutionCount: number;

  // Detailed information
  languages: LeetCodeLanguage[];
  beatsPercentage: LeetCodePerformance;
  profile: LeetCodeProfile;
  socialLinks: LeetCodeSocialLinks;
  badges: LeetCodeBadge[];
}
