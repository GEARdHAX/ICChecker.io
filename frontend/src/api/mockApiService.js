// Simulates API responses for frontend development
const MOCK_DELAY = 1500; // 1.5 seconds

export const uploadImageApi = (file, onProgress) => {
    return new Promise((resolve) => {
        const stages = [
            { name: 'Image Preprocessing', progress: 25, status: 'Preprocessing image...' },
            { name: 'OCR Extraction', progress: 50, status: 'Extracting text with AI...' },
            { name: 'Trust & Datasheet Lookup', progress: 75, status: 'Verifying supplier trust...' },
            { name: 'Generating Verdict', progress: 100, status: 'Finalizing verdict...' },
        ];

        let currentStageIndex = 0;

        const processNextStage = () => {
            if (currentStageIndex < stages.length) {
                const stage = stages[currentStageIndex];
                onProgress(stage.progress, stage);
                currentStageIndex++;
                setTimeout(processNextStage, 800); // Simulate time for each stage
            } else {
                // All stages complete
                setTimeout(() => {
                    resolve({
                        success: true,
                        resultId: `res_${new Date().getTime()}`,
                        message: 'Processing complete!',
                    });
                }, 500);
            }
        };

        // Start the process
        processNextStage();
    });
};

export const getResultApi = (resultId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: resultId,
                verdict: 'PASS',
                confidence: 98.5,
                trustScore: 92,
                supplier: {
                    name: 'Trusted Components Inc.',
                    status: 'Certified',
                    country: 'USA'
                },
                ocrOutput: {
                    partNumber: 'SN74LS00N',
                    dateCode: '8324',
                    lotCode: 'G4A8810'
                },
                datasheet: {
                    expectedPartNumber: 'SN74LS00N',
                    matchStatus: 'Perfect Match'
                },
                images: {
                    uploaded: 'https://i.imgur.com/2X20k7a.jpeg',
                    reference: 'https://i.imgur.com/m4a3YxR.png'
                }
            });
        }, MOCK_DELAY);
    });
};

export const getHistoryApi = () => {
    // ... Returns a mock array of past verification records for the dashboard
    return new Promise(resolve => resolve([]));
}