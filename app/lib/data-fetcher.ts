// Shared data fetching utility following DRY principles
// Single Responsibility: Handle all data fetching with consistent caching and error handling

import fs from 'node:fs';
import path from 'node:path';
// Direct API function imports to avoid HTTP requests during SSR
import { GET as getLeetCodeStats } from '@/app/api/leetcode/route';
import type { LeetCodeStats } from '@/app/types';
import type {
  Achievement,
  ProjectItem,
  ReferralItem,
  TimelineItem,
} from '@/app/types/portfolio.types';

// Base fetch configuration for API calls only
const BASE_CONFIG = {
  cache: 'force-cache' as const,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Generic fetch function with error handling and caching (for API calls only)
async function fetchWithCache<T>(
  url: string,
  revalidateSeconds: number = 3600,
  errorMessage: string = 'Failed to fetch data'
): Promise<T | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}${url}`, {
      ...BASE_CONFIG,
      next: { revalidate: revalidateSeconds },
    });

    if (!response.ok) {
      throw new Error(`${errorMessage}: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    return null;
  }
}

// Helper function to read JSON files from the filesystem
function readJsonFile<T>(filePath: string): T | null {
  try {
    const fullPath = path.join(process.cwd(), 'public', 'data', filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error(`Failed to read ${filePath}:`, error);
    return null;
  }
}

// Direct JSON data access functions - no HTTP requests needed
export async function fetchMediaData(): Promise<Achievement[]> {
  try {
    const data = readJsonFile<Achievement[]>('mediaData.json');
    return data || [];
  } catch (error) {
    console.error('Failed to fetch media data:', error);
    return [];
  }
}

export async function fetchProjectsData(): Promise<ProjectItem[]> {
  try {
    const data = readJsonFile<ProjectItem[]>('projectsData.json');
    return data || [];
  } catch (error) {
    console.error('Failed to fetch projects data:', error);
    return [];
  }
}

export async function fetchTimelineData(): Promise<TimelineItem[]> {
  try {
    const data = readJsonFile<TimelineItem[]>('timelineData.json');
    return data || [];
  } catch (error) {
    console.error('Failed to fetch timeline data:', error);
    return [];
  }
}

// In-memory cache for referral metadata to avoid repeated fetches
const _metadataCache = new Map<string, { data: ReferralItem; timestamp: number }>();
const _CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchReferralsData(): Promise<ReferralItem[]> {
  try {
    const data = readJsonFile<ReferralItem[]>('referrals.json');
    if (!data) {
      return [];
    }

    // Import metadata fetcher dynamically
    const { fetchReferralMetadata } = await import('./metadata-fetcher');

    // Fetch metadata with concurrency limit
    const batchSize = 5; // Process 5 URLs at a time (increased from 3)
    const results: ReferralItem[] = [];

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      // Use allSettled to handle failures gracefully without blocking other fetches
      const batchResults = await Promise.allSettled(
        batch.map(async referral => {
          const metadata = await fetchReferralMetadata(referral.url);
          return {
            ...referral,
            image: metadata.favicon,
            description: metadata.description,
          };
        })
      );

      // Process settled promises
      for (let j = 0; j < batchResults.length; j++) {
        const result = batchResults[j];
        const referral = batch[j];

        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          // Only log error once here
          console.error(`Failed to fetch metadata for ${referral.url}:`, result.reason);
          results.push({
            ...referral,
            image: '/favicon.png',
            description: `Check out ${referral.title}`,
          });
        }
      }
    }

    return results;
  } catch (error) {
    console.error('Failed to fetch referrals data:', error);
    return [];
  }
}

// Improved LeetCode stats fetching with SSR support
export async function fetchLeetCodeStats(): Promise<LeetCodeStats | null> {
  try {
    // During SSR, call the API function directly to avoid HTTP requests
    if (typeof window === 'undefined') {
      const response = await getLeetCodeStats();

      if (!response.ok) {
        throw new Error(`Failed to fetch LeetCode stats: ${response.status}`);
      }

      return await response.json();
    }

    // On the client side, use the regular fetch
    return await fetchWithCache<LeetCodeStats>(
      '/api/leetcode',
      1800, // 30 minutes cache
      'Failed to fetch LeetCode stats'
    );
  } catch (error) {
    console.error('Failed to fetch LeetCode stats:', error);
    return null;
  }
}

// Combined data fetching for highlights (follows DRY principle)
export async function fetchHighlightsData(): Promise<{
  journey: TimelineItem | null;
  media: Achievement | null;
  project: ProjectItem | null;
}> {
  try {
    const [timelineData, mediaData, projectsData] = await Promise.all([
      fetchTimelineData(),
      fetchMediaData(),
      fetchProjectsData(),
    ]);

    return {
      journey: timelineData[0] || null,
      media: mediaData[0] || null,
      project: projectsData[0] || null,
    };
  } catch (error) {
    console.error('Error fetching highlights data:', error);
    return {
      journey: null,
      media: null,
      project: null,
    };
  }
}

// Data sorting utilities following Single Responsibility Principle
export function sortProjectsByDate(projects: ProjectItem[]): ProjectItem[] {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function sortTimelineByDate(timeline: TimelineItem[]): TimelineItem[] {
  return [...timeline].sort((a, b) => {
    const parseDateString = (dateStr: string) => {
      const [start] = dateStr.split(' - ');
      const [month, year] = start.split(' ');
      const monthMap: Record<string, number> = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };
      return new Date(parseInt(year, 10), monthMap[month] || 0);
    };

    const dateA = parseDateString(a.time);
    const dateB = parseDateString(b.time);
    return dateB.getTime() - dateA.getTime();
  });
}

// Type-safe data validators following Liskov Substitution Principle
export function validateProjectData(data: unknown): data is ProjectItem {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as Record<string, unknown>).title === 'string' &&
    typeof (data as Record<string, unknown>).description === 'string' &&
    typeof (data as Record<string, unknown>).date === 'string' &&
    Array.isArray((data as Record<string, unknown>).tech)
  );
}

export function validateAchievementData(data: unknown): data is Achievement {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as Record<string, unknown>).title === 'string' &&
    typeof (data as Record<string, unknown>).description === 'string' &&
    typeof (data as Record<string, unknown>).date === 'string'
  );
}

export function validateTimelineData(data: unknown): data is TimelineItem {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as Record<string, unknown>).time === 'string' &&
    typeof (data as Record<string, unknown>).title === 'object' &&
    typeof ((data as Record<string, unknown>).title as Record<string, unknown>)?.company ===
      'string' &&
    typeof ((data as Record<string, unknown>).title as Record<string, unknown>)?.role === 'string'
  );
}

// Batch data fetching with error resilience
export async function fetchAllData(): Promise<{
  projects: ProjectItem[];
  media: Achievement[];
  timeline: TimelineItem[];
  leetcode: LeetCodeStats | null;
}> {
  const [projects, media, timeline, leetcode] = await Promise.all([
    fetchProjectsData(),
    fetchMediaData(),
    fetchTimelineData(),
    fetchLeetCodeStats(),
  ]);

  return {
    projects,
    media,
    timeline,
    leetcode,
  };
}
