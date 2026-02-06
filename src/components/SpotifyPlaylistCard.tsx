import { useState, useEffect } from 'react';
import { Music, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

interface Track {
  title: string;
  artist: string;
  duration: string;
  plays: number;
}

const SpotifyPlaylistCard = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const recentTracks: Track[] = [
    { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", plays: 2 },
    { title: "As It Was", artist: "Harry Styles", duration: "2:45", plays: 1 },
    { title: "Anti-Hero", artist: "Taylor Swift", duration: "3:34", plays: 3 },
    { title: "Running Up That Hill", artist: "Kate Bush", duration: "5:02", plays: 1 },
    { title: "Heat Waves", artist: "Glass Animals", duration: "3:58", plays: 2 },
  ];

  useEffect(() => {
    // Simulate "currently playing"
    setCurrentTrack(recentTracks[0]);
  }, []);

  return (
    <SpotlightCard className="h-full">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-teal to-accent-glow rounded-full flex items-center justify-center">
            <Music className="w-4 h-4 text-black" />
          </div>
          <div>
            <h3 className="font-mono text-sm text-accent-teal">Now Playing</h3>
            <p className="text-[10px] text-text-muted">Spotify Connected</p>
          </div>
        </div>

        {/* Current Track */}
        {currentTrack && (
          <motion.div
            layoutId="current-track"
            className="mb-6 p-4 bg-surface border border-border/50 rounded-lg"
            whileHover={{ borderColor: 'rgba(20, 184, 166, 0.5)' }}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-glow to-accent-teal rounded flex-shrink-0 flex items-center justify-center">
                <Music className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-text-primary truncate">{currentTrack.title}</p>
                <p className="text-xs text-text-muted truncate">{currentTrack.artist}</p>
                <div className="flex items-center gap-2 mt-2">
                  <motion.button
                    onClick={() => setIsPlaying(!isPlaying)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 bg-accent-teal/20 border border-accent-teal/30 rounded hover:border-accent-teal/50 transition-colors"
                  >
                    <Play className="w-3 h-3 text-accent-teal fill-accent-teal" />
                  </motion.button>
                  <span className="text-[10px] text-text-muted">{currentTrack.duration}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Tracks */}
        <div>
          <p className="font-mono text-[10px] text-text-muted/60 uppercase tracking-wider mb-3">
            Recent Tracks
          </p>
          <div className="space-y-2">
            {recentTracks.slice(1, 4).map((track, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-2 rounded border border-border/30 hover:border-accent-teal/30 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-text-primary truncate group-hover:text-accent-teal transition-colors">
                      {track.title}
                    </p>
                    <p className="text-[10px] text-text-muted truncate">{track.artist}</p>
                  </div>
                  <span className="text-[10px] text-text-muted/50 flex-shrink-0">
                    {track.plays}x
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.a
          href="https://open.spotify.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block px-3 py-2 text-center text-xs font-mono bg-accent-teal/10 border border-accent-teal/30 rounded hover:bg-accent-teal/20 transition-colors text-accent-teal"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Open on Spotify →
        </motion.a>
      </div>
    </SpotlightCard>
  );
};

export default SpotifyPlaylistCard;
