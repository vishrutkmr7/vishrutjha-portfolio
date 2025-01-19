import { NextResponse } from 'next/server';

const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';
const LEETCODE_USERNAME = 'vishrutjha';

const query = `query userProblemsSolved($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    username
    githubUrl
    twitterUrl
    linkedinUrl
    profile {
      ranking
      userAvatar
      realName
      aboutMe
      school
      countryName
      company
      jobTitle
      skillTags
      reputation
      solutionCount
    }
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
      totalSubmissionNum {
        difficulty
        count
      }
    }
    problemsSolvedBeatsStats {
      difficulty
      percentage
    }
    userCalendar {
      streak
      totalActiveDays
    }
    languageProblemCount {
      languageName
      problemsSolved
    }
    badges {
      displayName
      icon
    }
  }
}`;

export async function GET() {
  try {
    const response = await fetch(LEETCODE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode stats');
    }

    const data = await response.json();

    if (!data.data?.matchedUser || !data.data?.allQuestionsCount) {
      throw new Error('Invalid response from LeetCode API');
    }

    const { matchedUser, allQuestionsCount } = data.data;

    // Helper function to safely get counts
    const getCount = (arr: any[], difficulty: string) =>
      arr.find((item: any) => item.difficulty.toUpperCase() === difficulty)?.count || 0;

    // Get individual difficulty counts
    const easySolved = getCount(matchedUser.submitStats.acSubmissionNum, 'EASY');
    const mediumSolved = getCount(matchedUser.submitStats.acSubmissionNum, 'MEDIUM');
    const hardSolved = getCount(matchedUser.submitStats.acSubmissionNum, 'HARD');
    const totalEasy = getCount(allQuestionsCount, 'EASY');
    const totalMedium = getCount(allQuestionsCount, 'MEDIUM');
    const totalHard = getCount(allQuestionsCount, 'HARD');

    // Calculate totals from individual counts
    const totalSolved = easySolved + mediumSolved + hardSolved;
    const totalQuestions = totalEasy + totalMedium + totalHard;

    // Calculate total submissions and accepted submissions
    const totalSubmissions = matchedUser.submitStats.totalSubmissionNum.reduce(
      (acc: number, curr: { count: number }) => acc + (curr.count || 0),
      0
    );
    const acceptedSubmissions = matchedUser.submitStats.acSubmissionNum.reduce(
      (acc: number, curr: { count: number }) => acc + (curr.count || 0),
      0
    );

    // Get beats percentage for each difficulty
    const getBeatsPercentage = (difficulty: string) =>
      matchedUser.problemsSolvedBeatsStats?.find(
        (item: any) => item.difficulty.toUpperCase() === difficulty
      )?.percentage || 0;

    const stats = {
      totalSolved,
      totalQuestions,
      easySolved,
      totalEasy,
      mediumSolved,
      totalMedium,
      hardSolved,
      totalHard,
      ranking: matchedUser.profile.ranking || 0,
      acceptanceRate: totalSubmissions > 0 ? (acceptedSubmissions / totalSubmissions) * 100 : 0,
      // Additional stats
      streak: matchedUser.userCalendar?.streak || 0,
      totalActiveDays: matchedUser.userCalendar?.totalActiveDays || 0,
      reputation: matchedUser.profile.reputation || 0,
      solutionCount: matchedUser.profile.solutionCount || 0,
      languages:
        matchedUser.languageProblemCount?.map((lang: any) => ({
          name: lang.languageName,
          solved: lang.problemsSolved,
        })) || [],
      beatsPercentage: {
        easy: getBeatsPercentage('EASY'),
        medium: getBeatsPercentage('MEDIUM'),
        hard: getBeatsPercentage('HARD'),
      },
      profile: {
        realName: matchedUser.profile.realName || '',
        company: matchedUser.profile.company || '',
        school: matchedUser.profile.school || '',
        countryName: matchedUser.profile.countryName || '',
        skillTags: matchedUser.profile.skillTags || [],
        avatar: matchedUser.profile.userAvatar || '',
      },
      socialLinks: {
        github: matchedUser.githubUrl || '',
        twitter: matchedUser.twitterUrl || '',
        linkedin: matchedUser.linkedinUrl || '',
      },
      badges:
        matchedUser.badges?.map((badge: any) => ({
          name: badge.displayName,
          icon: badge.icon,
        })) || [],
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return NextResponse.json({ error: 'Failed to fetch LeetCode stats' }, { status: 500 });
  }
}
