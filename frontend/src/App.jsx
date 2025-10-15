import { useRef, useEffect } from 'react'; // Import useRef and useEffect
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toast } from 'primereact/toast'; // Import Toast
import { useAppStore } from './store/appStore'; // Import the store

// PrimeReact CSS
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// Layout & Pages...
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ResultPage from './pages/ResultPage';
import DashboardPage from './pages/DashboardPage';
import AdminPanel from './pages/AdminPanel';
import { useTheme } from './hooks/useTheme';
import AboutPage from './pages/AboutPage';

const AnimatedRoutes = () => {
  // ... (this component remains the same)
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useTheme();
  const toast = useRef(null);
  const setToastRef = useAppStore((state) => state.setToastRef);

  // On initial app load, save the toast ref to the global store
  useEffect(() => {
    setToastRef(toast);
  }, [setToastRef]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Render the Toast component here, at the top level */}
      <Toast ref={toast} position="bottom-center" />
      
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;