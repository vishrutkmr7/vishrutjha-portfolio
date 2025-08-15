import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RelevanceCheckResult {
  isRelevant: boolean;
  confidence?: number;
  reason?: string;
}

interface RelevanceTermCategory {
  weight: number;
  terms: string[];
}

interface RelevanceTerms {
  [key: string]: RelevanceTermCategory;
}

const relevanceTerms: RelevanceTerms = {
  professional: {
    weight: 1.0,
    terms: [
      'project',
      'experience',
      'skill',
      'education',
      'work',
      'role',
      'job',
      'position',
      'career',
      'achievement',
      'volunteer',
      'volunteering',
      'volunteered',
      'contributed',
      'contribution',
      'do',
      'did',
      'does',
      'working',
      'worked',
      'know',
      'use',
      'using',
      'used',
      'authorization',
      'authorized',
      'visa',
      'status',
      'sponsorship',
      'opt',
      'stem',
      'eligible',
      'permit',
    ],
  },
  technical: {
    weight: 1.0,
    terms: [
      'code',
      'programming',
      'development',
      'software',
      'tech',
      'stack',
      'framework',
      'language',
      'tool',
      'platform',
      'python',
      'javascript',
      'typescript',
      'java',
      'c\\+\\+',
      'swift',
      'react',
      'node',
      'aws',
      'oci',
      'cloud',
      'database',
      'api',
    ],
  },
  portfolio: {
    weight: 1.0,
    terms: [
      'portfolio',
      'github',
      'repository',
      'demo',
      'showcase',
      'implementation',
      'solution',
      'architecture',
      'project',
      'system',
      'application',
    ],
  },
  vishrutSpecific: {
    weight: 1.5,
    terms: [
      'vishrut',
      'jha',
      'ios',
      'mobile',
      'full-stack',
      'web',
      'fdalytics',
      'ziply',
      'fiber',
      'compliance',
      'group',
      'applifly',
      'pnyx',
      'pnyx.xyz',
      'nyx',
      'music platform',
      'gamified platform',
      'prickly pear',
      'prickly pear health',
      'dhan',
      'dhan ai',
      'authbase',
      'nuclear fuel complex',
      'hcl',
      'university',
      'arizona',
      'arizona state',
      'arizona state university',
      'arizona state university at tempe',
      'arizona state university at tempe, arizona',
      'arizona state university at tempe, arizona, united states',
      'panjab university',
      'panjab university chandigarh',
      'uiet chandigarh',
    ],
  },
  quantitative: {
    weight: 1.0,
    terms: [
      'how many',
      'how much',
      'when',
      'what year',
      'which companies',
      'where',
      'list',
      'count',
      'number of',
      'what',
      'who',
      'why',
      'how',
    ],
  },
  metadata: {
    weight: 1.0,
    terms: [
      'company',
      'companies',
      'technologies',
      'tools',
      'frameworks',
      'languages',
      'skills',
      'timeline',
      'duration',
      'date',
      'about',
      'tell',
      'explain',
      'describe',
    ],
  },
  personalInterests: {
    weight: 1.0,
    terms: [
      'favorite',
      'like',
      'enjoy',
      'hobby',
      'hobbies',
      'interest',
      'interests',
      'passion',
      'fan',
      'support',
      'soccer',
      'football',
      'barca',
      'barcelona',
      'team',
      'sport',
      'sports',
      'music',
      'movie',
      'movies',
      'book',
      'books',
      'game',
      'games',
      'travel',
      'food',
      'coffee',
      'preference',
      'prefer',
    ],
  },
  conversational: {
    weight: 1.0,
    terms: [
      'hello',
      'hi',
      'hey',
      'how are you',
      'what is',
      'what are',
      'do you',
      'are you',
      'can you',
      'will you',
      'would you',
      'tell me',
      'show me',
      'help',
      'question',
      'ask',
      'wondering',
      'curious',
      'know more',
    ],
  },
};

export async function checkQueryRelevance(query: string): Promise<RelevanceCheckResult> {
  // Normalize query
  const normalizedQuery = query.toLowerCase().trim();

  // Special handling for work authorization questions
  const workAuthMatch =
    /\b(work|employment|visa|status|authorization|permit|opt|stem|sponsorship)\b.*\b(status|need|require|eligible|authorized|allowed|legal|valid)\b/i.test(
      normalizedQuery
    );
  if (workAuthMatch) {
    return {
      isRelevant: true,
      confidence: 1,
      reason: undefined,
    };
  }

  // Only block truly sensitive information requests
  const _offTopicPatterns = [
    /\b(salary|income|wage|bank account|social security|password|credit card)\b/i,
    /\b(exact address|home address|phone number|personal email)\b/i,
  ];

  // Special handling for company-related questions
  const companyRelatedMatch =
    /\b(what|who|how|when|where|why|tell|about)\b.*\b(fdalytics|ziply|fiber|compliance|group|applifly|university|washington)\b/i.test(
      normalizedQuery
    );
  if (companyRelatedMatch) {
    return {
      isRelevant: true,
      confidence: 1,
      reason: undefined,
    };
  }

  // Special handling for skill-related questions
  const skillRelatedMatch =
    /\b(know|use|work|code|program|develop|experience)\b.*\b(python|javascript|typescript|java|c\+\+|swift|react|node|aws|cloud|database|api)\b/i.test(
      normalizedQuery
    );
  if (skillRelatedMatch) {
    return {
      isRelevant: true,
      confidence: 1,
      reason: undefined,
    };
  }

  // Special handling for quantitative questions about professional topics
  const quantitativeMatch =
    /\b(how many|how much|when|what|which|where)\b.*\b(project|work|job|company|skill|technology|experience)\w*\b/i.test(
      normalizedQuery
    );
  if (quantitativeMatch) {
    return {
      isRelevant: true,
      confidence: 1,
      reason: undefined,
    };
  }

  // Calculate relevance score
  let totalScore = 0;
  let matchedTerms = 0;

  for (const [_category, data] of Object.entries(relevanceTerms)) {
    const matches = data.terms.filter(term => {
      // Use word boundary for exact matches and handle multi-word terms
      const pattern = term.includes(' ')
        ? new RegExp(term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i')
        : new RegExp(`\\b${term}\\b`, 'i');
      return pattern.test(normalizedQuery);
    });
    totalScore += matches.length * data.weight;
    matchedTerms += matches.length;
  }

  // Very lenient threshold for relevance - allow most conversational questions
  const isRelevant = totalScore >= 0.2 || matchedTerms >= 1;

  return {
    isRelevant,
    confidence: Math.min(totalScore / 3, 1),
    reason: isRelevant
      ? undefined
      : "I'd prefer to chat about topics I can help with - feel free to ask about work, interests, or experiences!",
  };
}

export function parseDateString(dateStr: string): Date {
  // Handle "Present" case
  if (dateStr.includes('Present')) {
    return new Date();
  }

  // Handle date ranges (take the start date)
  const startDate = dateStr.split('-')[0].trim();

  // Parse MM/DD/YYYY format
  if (startDate.includes('/')) {
    const [month, day, year] = startDate.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  // Parse "Month YYYY" format
  const [month, year] = startDate.split(' ');
  const monthIndex = new Date(Date.parse(`${month} 1, 2000`)).getMonth();
  return new Date(parseInt(year), monthIndex);
}
