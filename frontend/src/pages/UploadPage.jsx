import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast'; // This should be global, but keeping import for clarity
import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import { uploadImageApi } from '../api/mockApiService';
import { useAppStore } from '../store/appStore'; // For global toast

export default function UploadPage() {
  const toast = useAppStore((state) => state.toastRef); // Use global toast
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Waiting for upload...');
  const [imagePreview, setImagePreview] = useState(null);
  const [activeStage, setActiveStage] = useState('');
  
  const initialStages = [
    { name: 'Image Preprocessing', status: 'pending' },
    { name: 'OCR Extraction', status: 'pending' },
    { name: 'Trust & Datasheet Lookup', status: 'pending' },
    { name: 'Generating Verdict', status: 'pending' },
  ];
  const [stages, setStages] = useState(initialStages);

  const handleUpload = async (event) => {
    const file = event.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
    
    setIsProcessing(true);

    try {
      const response = await uploadImageApi(file, (p, stage) => {
        setProgress(p);
        setStatusText(stage.status);
        setActiveStage(stage.name);
        setStages(currentStages => {
            const stageIndex = currentStages.findIndex(s => s.name === stage.name);
            return currentStages.map((s, i) => i < stageIndex ? { ...s, status: 'completed' } : s);
        });
      });

      if (response.success) {
        setStages(currentStages => currentStages.map(s => ({ ...s, status: 'completed' })));
        setStatusText('Analysis Complete!');
        toast.current.show({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Redirecting to results...' 
        });
        setTimeout(() => navigate(`/result/${response.resultId}`), 2000);
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Upload failed.' });
      setIsProcessing(false);
      // ... reset other states
    }
  };

  const statusMarker = (item) => {
    const markerContainerClass = "flex items-center justify-center w-8 h-8 rounded-full";
    // FIX 2: Using a robust span-wrapper for icons
    if (item.status === 'completed') {
      return (
        <span className={`${markerContainerClass} bg-green-500`}>
          <i className="pi pi-check text-white"></i>
        </span>
      );
    }
    if (item.name === activeStage) {
      return (
        <span className={`${markerContainerClass} bg-primary`}>
          <i className="pi pi-spin pi-spinner text-white"></i>
        </span>
      );
    }
    return (
      <span className={`${markerContainerClass} bg-gray-200 dark:bg-gray-700`}>
        <i className="pi pi-circle-on text-gray-500 dark:text-gray-400"></i>
      </span>
    );
  };

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto">
        <Card>
          <AnimatePresence mode="wait">
            {!isProcessing ? (
              <motion.div key="uploader" /* ... */>
                <div className="text-center p-4">
                  <i className="pi pi-cloud-upload text-5xl text-primary mb-4"></i>
                  <h1 className="text-3xl font-bold mb-2">Check IC Authenticity</h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Upload an image to begin.</p>
                </div>
                {/* FIX 3: Simplified FileUpload */}
                <FileUpload
                  name="ic-image"
                  customUpload
                  uploadHandler={handleUpload}
                  accept="image/*"
                  maxFileSize={5000000}
                  auto={true} 
                  chooseLabel="Select Image"
                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50"
                  emptyTemplate={<p className="m-0 p-8 text-gray-500">Drag & Drop Image Here</p>}
                />
              </motion.div>
            ) : (
              <motion.div key="progress" /* ... */ className="p-4 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Analyzing...</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="text-center">
                    {imagePreview && <img src={imagePreview} alt="Uploaded IC" className="rounded-lg shadow-md max-h-60 mx-auto" />}
                  </div>
                  <div>
                    {/* FIX 1: Robust ProgressBar styling */}
                    <ProgressBar 
                      value={progress} 
                      className="h-4 mb-4"
                      pt={{
                          root: { className: 'bg-gray-200 dark:bg-gray-700 border-0' },
                          value: { className: 'bg-primary' }
                      }}
                    />
                    <p className="text-lg font-semibold text-primary mb-6 text-center md:text-left">{statusText}</p>
                    <Timeline value={stages} align="left" content={(item) => (<span>{item.name}</span>)} marker={statusMarker} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </PageWrapper>
  );
}