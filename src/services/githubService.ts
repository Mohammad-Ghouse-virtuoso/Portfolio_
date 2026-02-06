/**
 * GitHub API Service - Fetches real GitHub data using GraphQL API
 */

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubData {
  contributions: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
  user: {
    followers: number;
    repositories: number;
    starredRepositories: number;
    createdAt: string;
  };
}

/**
 * Fetch GitHub data using GraphQL API
 * @param username - GitHub username
 * @param token - GitHub Personal Access Token
 * @param fromDate - Start date for contributions (default: 6 months ago)
 */
export async function fetchGitHubData(
  username: string,
  token: string,
  fromDate?: Date
): Promise<GitHubData> {
  const from = fromDate || (() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    return date;
  })();

  const query = `
    query($username: String!, $from: DateTime!) {
      user(login: $username) {
        createdAt
        followers {
          totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
        }
        starredRepositories {
          totalCount
        }
        contributionsCollection(from: $from) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: from.toISOString(),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  const userData = result.data.user;
  const contributions = userData.contributionsCollection.contributionCalendar;

  return {
    contributions: {
      totalContributions: contributions.totalContributions,
      weeks: contributions.weeks,
    },
    user: {
      followers: userData.followers.totalCount,
      repositories: userData.repositories.totalCount,
      starredRepositories: userData.starredRepositories.totalCount,
      createdAt: userData.createdAt,
    },
  };
}

/**
 * Calculate contribution streaks from GitHub data
 */
export function calculateStreaks(weeks: ContributionWeek[]): {
  currentStreak: number;
  longestStreak: number;
} {
  const allDays = weeks.flatMap((week) => week.contributionDays);
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Calculate from most recent day backwards for current streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = allDays.length - 1; i >= 0; i--) {
    const day = allDays[i];
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);
    
    if (day.contributionCount > 0) {
      tempStreak++;
      
      // Only count as current streak if it's today or yesterday
      const diffDays = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays <= 1 && currentStreak === 0) {
        currentStreak = tempStreak;
      }
      
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }
  
  return { currentStreak, longestStreak };
}

/**
 * Fallback: Fetch basic public data without authentication (limited)
 */
export async function fetchPublicGitHubData(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  return {
    followers: data.followers,
    publicRepos: data.public_repos,
    createdAt: data.created_at,
    avatarUrl: data.avatar_url,
    bio: data.bio,
  };
}
