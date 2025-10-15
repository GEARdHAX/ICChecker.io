import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import GlassCard from '../components/shared/GlassCard';

const uniqueFeatures = [
  "🧠 Dual-layer AI Pipeline – Image defect analysis + OCR text verification",
  "📚 Hybrid Datasheet Search – Local-first lookup, online fallback",
  "🤝 Trusted Trade Mechanism – Real-time trust scores for suppliers",
  "📊 Smart Analytics Dashboard – Insightful visualization of authenticity trends",
  "🔔 Trust Notify System – Instant feedback on IC authenticity"
];

const futureImplementations = [
  "Integration with Blockchain for tamper-proof supplier validation",
  "AI-based Datasheet Summarization and Similar-IC Recommendations",
  "Cloud-based Sync for global trust score registry",
  "Mobile Companion App (Flutter) for tracking IC verification history"
];

export default function AboutPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <PageWrapper>
      <div className="space-y-16 py-12">
        
        {/* --- Main Description --- */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
            About ICChecker.io
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            ICChecker.io is an AI-driven verification platform designed to revolutionize electronic component authentication and trade trust. It automates visual inspection, datasheet validation, and supplier credibility — building a transparent and secure electronics ecosystem.
          </p>
        </motion.section>

        {/* --- Unique Features --- */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible">
          <h2 className="text-3xl font-bold text-center mb-8">Unique Features</h2>
          <GlassCard className="p-8">
            <ul className="space-y-4">
              {uniqueFeatures.map((feature, index) => (
                <li key={index} className="flex items-start text-lg">
                  <span className="mr-3 text-primary">{feature.split(' ')[0]}</span>
                  <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.section>

        {/* --- Innovation Section --- */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible">
          <h2 className="text-3xl font-bold text-center mb-8">Core Innovation</h2>
          <GlassCard className="p-8">
            <blockquote className="border-l-4 border-primary pl-6 text-lg italic text-slate-300">
              ICChecker.io introduces a ‘Trust Notify System’ — an innovation that strengthens trade reliability. It integrates AI verification with supplier history to categorize trustworthiness dynamically as Good, Review, or Bad. This feature directly contributes to conflict reduction and transparent trade in defense and manufacturing ecosystems.
            </blockquote>
          </GlassCard>
        </motion.section>

        {/* --- Future Implementations --- */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible">
          <h2 className="text-3xl font-bold text-center mb-8">Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureImplementations.map((item, index) => (
              <GlassCard key={index} className="p-6">
                <p className="font-semibold">{item}</p>
              </GlassCard>
            ))}
          </div>
        </motion.section>

      </div>
    </PageWrapper>
  );
}