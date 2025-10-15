import { motion } from 'framer-motion';

const GlassCard = ({ children, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-slate-800/40 backdrop-blur-md border border-cyan-400/20 rounded-lg shadow-lg hover:shadow-glow-cyan transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;