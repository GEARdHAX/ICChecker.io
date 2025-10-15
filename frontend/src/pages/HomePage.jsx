import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';

export default function HomePage() {
  const navigate = useNavigate();
  const pipelineEvents = [
    { status: 'Upload', icon: 'pi pi-upload' },
    { status: 'AI-Powered OCR', icon: 'pi pi-search' },
    { status: 'Trust Check', icon: 'pi pi-shield' },
    { status: 'Datasheet Match', icon: 'pi pi-file-check' },
    { status: 'Final Verdict', icon: 'pi pi-check-circle' },
  ];

  return (
    <PageWrapper>
      <div className="text-center py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold mb-4"
        >
          Verify IC Authenticity in Seconds
        </motion.h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Leveraging AI to combat counterfeit electronic components with confidence.
        </p>
        <Button
          className='gap-2 rounded-xl border border-primary hover:rounded-full p-3 transition-all'
          label="Start Verification"
          icon="pi pi-arrow-right"
          size="large"
          onClick={() => navigate('/upload')}
        />
      </div>

      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Verification Pipeline</h2>
        <Timeline 
          value={pipelineEvents} 
          align="alternate" 
          className="customized-timeline"
          content={(item) => item.status}
          marker={(item) => (
            <span className={`flex items-center justify-center w-9 h-9
              text-primary 
               dark:text-white`}
            >
              <i className={`${item.icon} text-lg`}></i>
            </span>
          )}
        />
      </div>
    </PageWrapper>
  );
}