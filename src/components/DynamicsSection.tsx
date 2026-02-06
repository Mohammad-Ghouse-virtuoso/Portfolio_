import { motion } from 'framer-motion';
import SpotifyPlaylistCard from './SpotifyPlaylistCard';
import GitHubActivityGraph from './GitHubActivityGraph';
import XProfileCard from './XProfileCard';
import TechStackWithLogos from './TechStackWithLogos';
import ThumbsUpCard from './ThumbsUpCard';

const DynamicsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-mono text-sm text-accent-teal mb-3 uppercase tracking-wider">
            ◆ Interactive Dynamics
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            More Than Code
          </h3>
          <p className="text-text-muted max-w-2xl">
            A collection of interactive cards that tell the story of my work, interests, and 
            the journey so far. From contributions to appreciations, each piece is crafted with intention.
          </p>
        </motion.div>

        {/* Dynamic Grid - Cards with varied heights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[400px] md:auto-rows-[350px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Spotify Playlist - 1x1 */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <SpotifyPlaylistCard />
          </motion.div>

          {/* GitHub Activity - 2x1 on md+, 1x1 on mobile */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
            <GitHubActivityGraph />
          </motion.div>

          {/* X Profile - 1x1 */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <XProfileCard />
          </motion.div>

          {/* Tech Stack - 2x1 on lg, 1x1 on smaller */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
            <TechStackWithLogos />
          </motion.div>

          {/* Thumbs Up - 2x1 on lg, full width fallback */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
            <ThumbsUpCard />
          </motion.div>
        </motion.div>

        {/* Footer Caption */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-xs text-text-muted/50">
            Each card tells a story. Each interaction matters.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DynamicsSection;
