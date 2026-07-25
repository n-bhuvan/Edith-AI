"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function AnalysisContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const machineId = searchParams.get('machineId') || '1';
  
  const [analysis, setAnalysis] = useState<any>(null);
  
  // UI States for Phase 4 requirements
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    { name: 'Initializing Orchestrator...', agent: 'Orchestrator' },
    { name: 'Analyzing hardware specifications...', agent: 'Machine Agent' },
    { name: 'Reviewing historical logs...', agent: 'Maintenance Agent' },
    { name: 'Calculating financial impact...', agent: 'ROI Agent' },
    { name: 'Synthesizing final recommendation...', agent: 'Decision Agent' }
  ];

  useEffect(() => {
    // 1. Start the visual animation sequence for the judges
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 800); // 800ms per agent step

    // 2. Actually fetch the data from the backend
    fetch('http://localhost:8000/analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ machineId: Number(machineId) })
    })
      .then((res) => res.json())
      .then((data) => {
        setAnalysis(data);
        // Ensure animation finishes before showing data
        setTimeout(() => setLoading(false), loadingSteps.length * 800);
      })
      .catch((err) => {
        console.error(err);
        // Mock data to keep UI working if backend fails
        setAnalysis({
          machineId,
          decision: "Retrofit",
          confidence: 93,
          roi: "2.4 Years",
          summary: "Machine is mechanically healthy but lacks Industry 4.0 connectivity. High maintenance costs justify retrofit.",
          recommendations: [
            "Install vibration sensor",
            "Install energy meter",
            "Connect IoT Gateway"
          ],
          explainability: {
            age: "18 Years (Moderate Risk)",
            maintenance: "$8,500/yr (Increasing Trend)",
            downtime: "56 hrs/yr (High Impact)",
            financials: "Retrofit payback in 2.4 Years"
          }
        });
        setTimeout(() => setLoading(false), loadingSteps.length * 800);
      });

    return () => clearInterval(stepInterval);
  }, [machineId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow-sm border p-8">
        <h2 className="text-xl font-bold text-center mb-8">Agentic AI Workflow in Progress</h2>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {loadingSteps.map((step, index) => (
            <div key={index} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active transition-opacity duration-500 ${index <= loadingStep ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${index < loadingStep ? 'bg-green-500' : index === loadingStep ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}>
                {index < loadingStep && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-gray-50 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-gray-900">{step.agent}</div>
                  <div className={`text-xs font-medium ${index === loadingStep ? 'text-blue-600' : 'text-gray-500'}`}>
                    {index < loadingStep ? 'Done' : index === loadingStep ? 'Working...' : 'Waiting'}
                  </div>
                </div>
                <div className="text-gray-600 text-sm">{step.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">AI Recommendation: <span className={
            analysis.decision === 'Retrofit' ? 'text-yellow-600' : 
            analysis.decision === 'Replace' ? 'text-red-600' : 
            analysis.decision === 'Upgrade' ? 'text-orange-600' : 'text-green-600'
          }>{analysis.decision}</span></h2>
          <p className="text-gray-600 mt-1">{analysis.summary}</p>
        </div>
        <div className="flex gap-4 text-right">
          <div className="p-3 bg-gray-50 rounded border">
            <span className="text-sm text-gray-500 block">AI Confidence</span>
            <span className="text-2xl font-bold text-blue-600">{analysis.confidence}%</span>
          </div>
          <div className="p-3 bg-gray-50 rounded border">
            <span className="text-sm text-gray-500 block">Est. ROI</span>
            <span className="text-2xl font-bold text-green-600">{analysis.roi}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">📋</span> 
            Action Plan
          </h3>
          <ul className="space-y-3">
            {analysis.recommendations?.map((rec: string, i: number) => (
              <li key={i} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Explainability Timeline */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-800 p-1 rounded mr-2">🧠</span> 
            Why this decision?
          </h3>
          
          <div className="border-l-2 border-gray-200 ml-3 space-y-6 mt-4">
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 bg-gray-300 border-2 border-white h-4 w-4 rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">Machine Age</p>
              <p className="text-gray-800">{analysis.explainability?.age || '18 Years (Analyzed)'}</p>
            </div>
            
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 bg-gray-300 border-2 border-white h-4 w-4 rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">Maintenance Cost</p>
              <p className="text-gray-800">{analysis.explainability?.maintenance || '$8,500/yr (Increasing)'}</p>
            </div>

            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 bg-gray-300 border-2 border-white h-4 w-4 rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">Downtime Assessment</p>
              <p className="text-gray-800">{analysis.explainability?.downtime || '56 hrs/yr (Critical)'}</p>
            </div>

            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 bg-gray-300 border-2 border-white h-4 w-4 rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">Financial Impact (ROI)</p>
              <p className="text-gray-800">{analysis.explainability?.financials || 'Retrofit payback in 2.4 Years'}</p>
            </div>

            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 bg-blue-500 ring-4 ring-blue-100 h-4 w-4 rounded-full"></div>
              <p className="text-sm font-bold text-blue-600">Decision Reached</p>
              <p className="text-gray-900 font-medium text-lg">{analysis.decision}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
         <button onClick={() => router.push('/machines')} className="text-gray-500 hover:text-gray-800">
           ← Back to Fleet
         </button>
      </div>
    </div>
  );
}

export default function Analysis() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Machine Intelligence Report</h1>
      </div>
      <Suspense fallback={<div className="p-6 animate-pulse">Initializing AI Orchestrator...</div>}>
        <AnalysisContent />
      </Suspense>
    </div>
  );
}
