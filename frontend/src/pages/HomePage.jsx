import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import GlassCard from '../components/shared/GlassCard';
import GlowingButton from '../components/shared/GlowingButton';

const features = [
  { icon: "pi pi-search", title: "Smart Image Detection", desc: "Analyze IC surfaces, broken legs, and misaligned text instantly with AI." },
  { icon: "pi pi-database", title: "Datasheet Sync", desc: "Checks your local DB first, then auto-fetches missing datasheets from the web." },
  { icon: "pi pi-shield", title: "Trusted Trade System", desc: "View supplier trust scores and confidence levels – Good, Review, or Bad." },
  { icon: "pi pi-chart-line", title: "Visual Reports", desc: "Interactive dashboards for result tracking and supplier performance trends." },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="text-center pt-24 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary"
        >
          AI-Powered IC Verification
        </motion.h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Upload, Verify, and Trust your Integrated Circuits in one smart pipeline.
        </p>
        <div className="flex justify-center gap-4">
          <GlowingButton label="Get Started" onClick={() => navigate('/upload')} icon="pi pi-arrow-right" />
          <GlowingButton label="Learn More" onClick={() => navigate('/about')} type="outline" />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
        {features.map((feature, index) => (
          <GlassCard key={index} className="p-8 text-center">
            <i className={`${feature.icon} text-4xl text-primary mb-4`}></i>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-slate-300">{feature.desc}</p>
          </GlassCard>
        ))}
      </div>
    </PageWrapper>
  );
}

// NOTE: PageWrapper is a simple Framer Motion component used in previous examples.
// You can create it in src/components/layout/PageWrapper.jsx