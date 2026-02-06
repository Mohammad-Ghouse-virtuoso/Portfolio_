import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { Code2 } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const GitHubActivityGraph = () => {
  // Generate realistic contribution data for the last year
  const contributionData = useMemo(() => {
    const data: ContributionDay[] = [];
    const today = new Date();
    
    // Go back 365 days
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Realistic contribution patterns
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let count = 0;
      if (!isWeekend) {
        // Weekdays more likely to have contributions
        count = Math.floor(Math.random() * 12);
      } else {
        count = Math.random() > 0.7 ? Math.floor(Math.random() * 8) : 0;
      }
      
      // Higher contribution probability in certain months (e.g., working on projects)
      const month = date.getMonth();
      if ([2, 5, 8, 11].includes(month)) {
        count = Math.min(count + Math.floor(Math.random() * 6), 15);
      }
      
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count > 10) level = 4;
      else if (count > 7) level = 3;
      else if (count > 3) level = 2;
      else if (count > 0) level = 1;
      
      data.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });
    }
    return data;
  }, []);

  // Group by weeks
  const weeks = useMemo(() => {
    const weeksList: ContributionDay[][] = [];
    let week: ContributionDay[] = [];
    
    contributionData.forEach((day) => {
      week.push(day);
      if (week.length === 7) {
        weeksList.push(week);
        week = [];
      }
    });
    if (week.length > 0) weeksList.push(week);
    
    return weeksList;
  }, [contributionData]);

  const totalContributions = contributionData.reduce((sum, day) => sum + day.count, 0);
  const longestStreak = 47; // Hardcoded for demo, would calculate real value
  const thisMonth = contributionData.filter(d => {
    const date = new Date(d.date);
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }).reduce((sum, day) => sum + day.count, 0);

  const getColor = (level: number) => {
    const colors = {
      0: 'bg-border/30',
      1: 'bg-accent-teal/30',
      2: 'bg-accent-teal/50',
      3: 'bg-accent-teal/70',
      4: 'bg-accent-teal',
    };
    return colors[level as 0 | 1 | 2 | 3 | 4];
  };

  return (
    <SpotlightCard className="h-full">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-glow to-accent-teal rounded-full flex items-center justify-center">
            <Code2 className="w-4 h-4 text-black" />
          </div>
          <div>
            <h3 className="font-mono text-sm text-accent-glow">GitHub Contributions</h3>
            <p className="text-[10px] text-text-muted">Last 365 Days</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            className="p-3 bg-surface border border-border/50 rounded text-center"
            whileHover={{ borderColor: 'rgba(20, 184, 166, 0.5)' }}
          >
            <p className="text-xl font-bold text-accent-teal">{totalContributions.toLocaleString()}</p>
            <p className="text-[10px] text-text-muted">Total</p>
          </motion.div>
          
          <motion.div
            className="p-3 bg-surface border border-border/50 rounded text-center"
            whileHover={{ borderColor: 'rgba(124, 58, 237, 0.5)' }}
          >
            <p className="text-xl font-bold text-accent-glow">{longestStreak}</p>
            <p className="text-[10px] text-text-muted">Streak</p>
          </motion.div>
          
          <motion.div
            className="p-3 bg-surface border border-border/50 rounded text-center"
            whileHover={{ borderColor: 'rgba(20, 184, 166, 0.5)' }}
          >
            <p className="text-xl font-bold text-accent-teal">{thisMonth}</p>
            <p className="text-[10px] text-text-muted">This Month</p>
          </motion.div>
        </div>

        {/* Heatmap */}
        <div className="mb-4">
          <p className="font-mono text-[10px] text-text-muted/60 uppercase tracking-wider mb-3">
            Contribution Heatmap
          </p>
          <div className="overflow-x-auto pb-2">
            <div className="inline-block">
              {/* Month labels */}
              <div className="flex gap-1 mb-2 ml-8">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                  <div key={month} className="w-12 text-center">
                    <span className="text-[9px] text-text-muted/50">{month}</span>
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="flex gap-1">
                {/* Day labels */}
                <div className="flex flex-col gap-1">
                  {['Mon', 'Wed', 'Fri'].map(day => (
                    <div key={day} className="w-6 h-3 text-[9px] text-text-muted/50 leading-tight">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Contribution grid */}
                <div className="flex gap-1">
                  {weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-1">
                      {week.map((day) => (
                        <motion.div
                          key={day.date}
                          className={`w-3 h-3 rounded-sm border border-border/20 ${getColor(day.level)} transition-all cursor-help`}
                          whileHover={{
                            scale: 1.3,
                            borderColor: 'rgba(20, 184, 166, 0.8)',
                            zIndex: 10
                          }}
                          title={`${day.date}: ${day.count} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-2 mt-4 text-[9px] text-text-muted/50">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`w-2 h-2 rounded-sm border border-border/20 ${getColor(level)}`}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 py-2 text-center text-xs font-mono bg-accent-glow/10 border border-accent-glow/30 rounded hover:bg-accent-glow/20 transition-colors text-accent-glow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Full Profile →
        </motion.a>
      </div>
    </SpotlightCard>
  );
};

export default GitHubActivityGraph;
