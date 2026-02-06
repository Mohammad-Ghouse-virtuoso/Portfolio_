import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, Star, GitFork, Code, TrendingUp, UserPlus } from 'lucide-react';
import { fetchGitHubData, calculateStreaks } from '../services/githubService';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface GitHubStats {
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
  thisMonth: number;
  followers: number;
  repositories: number;
  stars: number;
}

interface Trophy {
  emoji: string;
  title: string;
  description: string;
  color: string;
}

const GitHubProfileSection = () => {
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 0,
    longestStreak: 0,
    currentStreak: 0,
    thisMonth: 0,
    followers: 0,
    repositories: 0,
    stars: 0,
  });
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<ContributionDay | null>(null);

  // GitHub credentials from environment variables
  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Mohammad-Ghouse-virtuoso';
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  // Fetch real GitHub data
  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        if (!GITHUB_TOKEN || GITHUB_TOKEN === 'your_github_token_here') {
          throw new Error('GitHub token not configured');
        }

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const data = await fetchGitHubData(GITHUB_USERNAME, GITHUB_TOKEN, sixMonthsAgo);
        
        // Process contribution data
        const processedWeeks: ContributionWeek[] = data.contributions.weeks.map(week => ({
          days: week.contributionDays.map(day => {
            const count = day.contributionCount;
            let level: 0 | 1 | 2 | 3 | 4 = 0;
            
            if (count > 10) level = 4;
            else if (count > 6) level = 3;
            else if (count > 3) level = 2;
            else if (count > 0) level = 1;
            
            return {
              date: day.date,
              count,
              level,
            };
          }),
        }));
        
        setWeeks(processedWeeks);
        
        // Calculate streaks
        const { currentStreak, longestStreak } = calculateStreaks(data.contributions.weeks);
        
        // Calculate this month contributions
        const today = new Date();
        const thisMonthContributions = data.contributions.weeks
          .flatMap(week => week.contributionDays)
          .filter(day => {
            const date = new Date(day.date);
            return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
          })
          .reduce((sum, day) => sum + day.contributionCount, 0);
        
        setStats({
          totalContributions: data.contributions.totalContributions,
          longestStreak,
          currentStreak,
          thisMonth: thisMonthContributions,
          followers: data.user.followers,
          repositories: data.user.repositories,
          stars: data.user.starredRepositories,
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
        setLoading(false);
      }
    };

    loadGitHubData();
  }, [GITHUB_USERNAME, GITHUB_TOKEN]);

  // Generate trophies based on real stats
  const trophies: Trophy[] = useMemo(() => [
    {
      emoji: '🏆',
      title: 'Commits',
      description: `${stats.totalContributions}+ this year`,
      color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    },
    {
      emoji: '⭐',
      title: 'Stars',
      description: `${stats.stars}+ earned`,
      color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    },
    {
      emoji: '🔥',
      title: 'Streak',
      description: `${stats.longestStreak} day record`,
      color: 'from-orange-500/20 to-red-600/20 border-orange-500/30',
    },
    {
      emoji: '🚀',
      title: 'Projects',
      description: `${stats.repositories}+ repositories`,
      color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    },
  ], [stats]);

  const getGitHubColor = (level: number) => {
    const colors = [
      '#161B22',
      '#0E4429',
      '#006D32',
      '#26A641',
      '#39D353',
    ];
    return colors[level];
  };

  const monthLabels = useMemo(() => {
    const labels: { month: string; offset: number }[] = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      labels.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        offset: (5 - i) * 13, // Approximate week offset
      });
    }
    
    return labels;
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-surface/30 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-2 border-[#39D353]/30 border-t-[#39D353] rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-surface/30 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="mb-6 text-6xl">⚠️</div>
            <h3 className="text-xl font-bold text-text-primary mb-2">GitHub Data Unavailable</h3>
            <p className="text-text-muted max-w-md mb-4">{error}</p>
            <p className="text-sm text-[#7D8590] font-mono">
              Please configure your GitHub Personal Access Token in .env file
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-surface/30 to-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #39D353 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#39D353] to-[#26A641] rounded-lg flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-mono text-sm text-[#39D353] uppercase tracking-wider">
                ◆ Open Source Activity
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-text-primary">
                GitHub Contributions
              </h3>
            </div>
          </div>
          <p className="text-text-muted text-lg max-w-3xl">
            Building in public, one commit at a time. Tracking my open-source journey from July to January.
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#39D353]/5 to-[#26A641]/5 rounded-2xl blur-2xl" />
          
          <div className="relative bg-surface/80 backdrop-blur-xl border border-[#30363D] rounded-2xl p-8 md:p-10 shadow-2xl">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-5 rounded-xl bg-gradient-to-br from-[#39D353]/10 to-[#26A641]/10 border border-[#39D353]/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#39D353]" />
                  <p className="text-xs font-mono text-[#7D8590] uppercase tracking-wider">Total</p>
                </div>
                <p className="text-3xl font-bold text-[#39D353]">
                  {stats.totalContributions.toLocaleString()}
                </p>
                <p className="text-xs text-text-muted mt-1">contributions</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-5 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔥</span>
                  <p className="text-xs font-mono text-[#7D8590] uppercase tracking-wider">Streak</p>
                </div>
                <p className="text-3xl font-bold text-orange-400">
                  {stats.longestStreak}
                </p>
                <p className="text-xs text-text-muted mt-1">day record</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-blue-400" />
                  <p className="text-xs font-mono text-[#7D8590] uppercase tracking-wider">Stars</p>
                </div>
                <p className="text-3xl font-bold text-blue-400">
                  {stats.stars}
                </p>
                <p className="text-xs text-text-muted mt-1">earned</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  <p className="text-xs font-mono text-[#7D8590] uppercase tracking-wider">This Month</p>
                </div>
                <p className="text-3xl font-bold text-purple-400">
                  {stats.thisMonth}
                </p>
                <p className="text-xs text-text-muted mt-1">commits</p>
              </motion.div>
            </div>

            {/* Contribution Graph */}
            <div className="mb-10 -mx-8 md:-mx-10">
              <div className="px-8 md:px-10 mb-4">
                <h4 className="font-mono text-sm text-[#7D8590] uppercase tracking-wider">
                  Contribution Graph (Last 6 Months)
                </h4>
              </div>

              {/* Graph Container with Overflow Visible for Tooltips */}
              <div className="px-8 md:px-10 relative">
                <div className="w-full">
                  {/* Month labels */}
                  <div className="flex mb-2 pl-12">
                    {monthLabels.map((label, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-[#7D8590] font-mono flex-1"
                        style={{ paddingLeft: idx === 0 ? 0 : '28px' }}
                      >
                        {label.month}
                      </div>
                    ))}
                  </div>

                  {/* Graph */}
                  <div className="flex gap-1 pb-4">
                    {/* Day labels */}
                    <div className="flex flex-col gap-1 pr-2 flex-shrink-0">
                      {['', 'Mon', 'Wed', 'Fri', ''].map((day, idx) => (
                        <div
                          key={`${day}-${idx}`}
                          className="h-4 text-[10px] text-[#7D8590] font-mono flex items-center whitespace-nowrap"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Contribution grid */}
                    <div className="flex gap-1 flex-1">
                      {weeks.map((week, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-1">
                          {week.days.map((day, dayIdx) => (
                            <motion.div
                              key={`${weekIdx}-${dayIdx}`}
                              onMouseEnter={() => day.date && setHoveredCell(day)}
                              onMouseLeave={() => setHoveredCell(null)}
                              whileHover={day.date ? { scale: 1.4 } : {}}
                              className="w-4 h-4 rounded-[3px] cursor-pointer relative group"
                              style={{
                                backgroundColor: day.date ? getGitHubColor(day.level) : 'transparent',
                                border: day.date ? '1px solid rgba(48, 54, 61, 0.5)' : 'none',
                              }}
                            >
                              {hoveredCell === day && day.date && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute left-1/2 -translate-x-1/2 px-3 py-2 bg-[#161B22] border border-[#30363D] rounded-lg shadow-xl whitespace-nowrap z-[100] pointer-events-none"
                                  style={{
                                    bottom: dayIdx < 2 ? '-70px' : 'auto',
                                    top: dayIdx >= 2 ? '-70px' : 'auto',
                                  }}
                                >
                                  <p className="text-xs font-mono text-white">
                                    <span className="font-bold text-[#39D353]">{day.count}</span> contributions
                                  </p>
                                  <p className="text-[10px] text-[#7D8590] mt-1">
                                    {new Date(day.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </p>
                                  <div
                                    className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
                                    style={{
                                      borderLeft: '4px solid transparent',
                                      borderRight: '4px solid transparent',
                                      borderTop: dayIdx < 2 ? '4px solid #161B22' : 'none',
                                      borderBottom: dayIdx >= 2 ? '4px solid #161B22' : 'none',
                                      bottom: dayIdx < 2 ? '-4px' : 'auto',
                                      top: dayIdx >= 2 ? '-4px' : 'auto',
                                    }}
                                  />
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex items-center gap-3 text-[10px] text-[#7D8590]">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="w-3 h-3 rounded-[2px]"
                        style={{ backgroundColor: getGitHubColor(level) }}
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trophies Grid */}
            <div className="mb-8">
              <h4 className="font-mono text-sm text-[#7D8590] uppercase tracking-wider mb-6">
                GitHub Trophies
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trophies.map((trophy, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className={`p-5 rounded-xl bg-gradient-to-br ${trophy.color} border backdrop-blur-sm`}
                  >
                    <div className="text-3xl mb-3">{trophy.emoji}</div>
                    <p className="font-mono text-sm font-bold text-text-primary mb-1">
                      {trophy.title}
                    </p>
                    <p className="text-xs text-text-muted">{trophy.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Follow Button */}
            <div className="flex items-center justify-between pt-6 border-t border-[#30363D]">
              <div className="flex items-center gap-4 text-sm text-[#7D8590]">
                <div className="flex items-center gap-2">
                  <GitFork className="w-4 h-4" />
                  <span>{stats.repositories} repos</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  <span>{stats.followers} followers</span>
                </div>
              </div>

              <motion.a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsFollowing(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  isFollowing
                    ? 'bg-[#30363D] text-[#7D8590] border-2 border-[#30363D]'
                    : 'bg-[#39D353] text-black border-2 border-[#39D353] hover:bg-[#26A641]'
                }`}
              >
                {isFollowing ? (
                  <>
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Follow on GitHub</span>
                  </>
                )}
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubProfileSection;
