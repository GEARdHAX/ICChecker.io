import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Skeleton } from 'primereact/skeleton';
import { Card } from 'primereact/card';
import PageWrapper from '../components/layout/PageWrapper';
import TrustScoreMeter from '../components/shared/TrustScoreMeter';
import VerdictCard from '../components/shared/VerdictCard';
import { getResultApi } from '../api/mockApiService';

export default function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getResultApi(id).then(data => {
      setResult(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><Skeleton height="12rem" /></div>
            <div><Skeleton height="12rem" /></div>
            <div className="col-span-full"><Skeleton height="20rem" /></div>
        </div>
    );
  }

  return (
    <PageWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Verification Result</h1>
        <span className="text-gray-500 dark:text-gray-400">ID: #{result.id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <VerdictCard verdict={result.verdict} confidence={result.confidence} trustScore={result.trustScore} />
        </div>
        <Card className="flex items-center justify-center">
            <TrustScoreMeter value={result.trustScore} />
        </Card>
      </div>

      <Card title="Detailed Analysis" className="mt-8">
        <Accordion activeIndex={0}>
          <AccordionTab header="OCR & Datasheet Comparison">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                <div>
                    <h4 className="font-semibold text-lg mb-2">OCR Output</h4>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm">
                        {JSON.stringify(result.ocrOutput, null, 2)}
                    </pre>
                </div>
                 <div>
                    <h4 className="font-semibold text-lg mb-2">Datasheet Details</h4>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm">
                        {JSON.stringify(result.datasheet, null, 2)}
                    </pre>
                </div>
            </div>
          </AccordionTab>
          <AccordionTab header="Supplier Details">
             <div className="p-4 leading-relaxed">
                <p><strong>Name:</strong> {result.supplier.name}</p>
                <p><strong>Status:</strong> <span className="font-semibold text-primary">{result.supplier.status}</span></p>
                <p><strong>Country:</strong> {result.supplier.country}</p>
            </div>
          </AccordionTab>
        </Accordion>
      </Card>
    </PageWrapper>
  );
}