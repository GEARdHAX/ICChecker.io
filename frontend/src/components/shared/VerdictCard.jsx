import { motion } from 'framer-motion';
import { Tag } from 'primereact/tag';

const VerdictCard = ({ verdict, confidence, trustScore }) => {
  const getVerdictStyles = () => {
    switch (verdict) {
      case 'PASS':
        return {
          bg: 'bg-green-500/10 dark:bg-green-400/20',
          text: 'text-green-500 dark:text-green-300',
          icon: 'pi pi-check-circle',
          severity: 'success'
        };
      case 'FAIL':
        return {
          bg: 'bg-red-500/10 dark:bg-red-400/20',
          text: 'text-red-500 dark:text-red-300',
          icon: 'pi pi-times-circle',
          severity: 'danger'
        };
      case 'REVIEW':
      default:
        return {
          bg: 'bg-yellow-500/10 dark:bg-yellow-400/20',
          text: 'text-yellow-500 dark:text-yellow-300',
          icon: 'pi pi-exclamation-triangle',
          severity: 'warning'
        };
    }
  };

  const styles = getVerdictStyles();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-lg ${styles.bg}`}
    >
      <div className="flex flex-col items-center text-center">
        <i className={`${styles.icon} ${styles.text} text-5xl mb-4`}></i>
        <Tag severity={styles.severity} value={verdict} className="text-2xl font-bold px-4 py-2 mb-4"></Tag>
        <div className="flex gap-6">
            <p><strong>Confidence:</strong> {confidence}%</p>
            <p><strong>Trust Score:</strong> {trustScore}%</p>
        </div>
      </div>
    </motion.div>
  );
};

export default VerdictCard;