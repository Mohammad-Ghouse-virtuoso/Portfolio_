import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface XProfileCardProps {
  name?: string;
  handle?: string;
  bio?: string;
  followerCount?: number;
  followingCount?: number;
}

const XProfileCard = ({
  name = "Mohammad Ghouse",
  handle = "virtuoso_builder",
  bio = "Building beautiful experiences with code. Coffee addict ☕ | Open source enthusiast 🚀",
  followerCount = 2847,
  followingCount = 891
}: XProfileCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(234);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <SpotlightCard className="h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Header/Banner */}
        <div className="mb-4 pb-4 border-b border-border/30">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-teal to-accent-glow flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-black">M</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-mono text-sm font-bold text-text-primary">{name}</h3>
                <p className="text-xs text-text-muted">@{handle}</p>
              </div>
            </div>
            
            {/* Follow Button */}
            <motion.button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full border-2 transition-colors ${
                isFollowing
                  ? 'border-accent-teal/50 text-accent-teal hover:bg-accent-teal/10'
                  : 'border-accent-glow bg-accent-glow/20 text-accent-glow hover:bg-accent-glow/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </motion.button>
          </div>

          {/* Bio */}
          <p className="text-xs text-text-primary leading-relaxed">{bio}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6 py-3 border-b border-border/30">
          <motion.div
            className="flex gap-1 cursor-pointer hover:text-accent-teal transition-colors group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-bold text-text-primary group-hover:text-accent-teal">
              {followerCount.toLocaleString()}
            </span>
            <span className="text-text-muted text-xs">Followers</span>
          </motion.div>
          
          <motion.div
            className="flex gap-1 cursor-pointer hover:text-accent-teal transition-colors group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-bold text-text-primary group-hover:text-accent-teal">
              {followingCount.toLocaleString()}
            </span>
            <span className="text-text-muted text-xs">Following</span>
          </motion.div>
        </div>

        {/* Sample Tweet/Post */}
        <div className="flex-1 flex flex-col mb-4">
          <p className="text-sm text-text-primary leading-relaxed mb-3">
            Just shipped a new portfolio feature with GitHub integration. The activity graph is beautiful. 🎨
          </p>

          {/* Timestamp */}
          <p className="text-xs text-text-muted mb-4">2h ago</p>

          {/* Engagement Stats */}
          <div className="grid grid-cols-4 gap-2 mb-4 px-2 py-2 bg-surface/50 border border-border/30 rounded">
            <div className="text-center">
              <p className="text-xs font-bold text-text-primary">1.2K</p>
              <p className="text-[10px] text-text-muted">Views</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-text-primary">42</p>
              <p className="text-[10px] text-text-muted">Replies</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-text-primary">89</p>
              <p className="text-[10px] text-text-muted">Retweets</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-accent-teal">{likeCount}</p>
              <p className="text-[10px] text-text-muted">Likes</p>
            </div>
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="flex justify-between text-text-muted border-t border-border/30 pt-3">
          <motion.button
            className="flex items-center gap-2 text-xs hover:text-accent-teal transition-colors group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-4 h-4 group-hover:bg-accent-teal/20 rounded-full p-1 group-hover:text-accent-teal transition-colors" />
          </motion.button>

          <motion.button
            className="flex items-center gap-2 text-xs hover:text-accent-teal transition-colors group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Repeat2 className="w-4 h-4 group-hover:bg-accent-teal/20 rounded-full p-1 group-hover:text-accent-teal transition-colors" />
          </motion.button>

          <motion.button
            onClick={handleLike}
            className={`flex items-center gap-2 text-xs transition-colors group ${
              liked ? 'text-red-500' : 'text-text-muted hover:text-red-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          >
            <Heart
              className={`w-4 h-4 group-hover:bg-red-500/20 rounded-full p-1 transition-colors ${
                liked ? 'fill-current' : ''
              }`}
            />
          </motion.button>

          <motion.button
            className="flex items-center gap-2 text-xs hover:text-accent-teal transition-colors group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share className="w-4 h-4 group-hover:bg-accent-teal/20 rounded-full p-1 group-hover:text-accent-teal transition-colors" />
          </motion.button>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default XProfileCard;
