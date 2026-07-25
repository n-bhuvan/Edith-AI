"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function AnalysisContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const machineId = searchParams.get('machineId') || '1';
  
  const [analysis, setAnalysis] = useState<any>(null);
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
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 800);

    fetch('http://localhost:8000/analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ machineId: Number(machineId) })
    })
      .then((res) => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then((data) => {
        setAnalysis(data);
        setTimeout(() => setLoading(false), loadingSteps.length * 800);
      })
      .catch((err) => {
        console.error(err);
        setAnalysis({
          machineId,
          decision: "Retrofit",
          confidence: 94,
          roi: "2.3 Years",
          savings: "$18,000",
          summary: "Machine is mechanically healthy but lacks Industry 4.0 connectivity. High maintenance costs justify an immediate retrofit.",
          recommendations: [
            "Install vibration sensor",
            "Install current sensor",
            "Connect IoT Gateway",
            "Schedule quarterly maintenance"
          ],
          businessImpact: [
            "Lower CAPEX",
            "Minimal downtime",
            "Fast implementation",
            "Industry 4.0 ready"
          ],
          explainability: {
            age: "18 Years (Mechanically healthy)",
            maintenance: "Acceptable but increasing",
            downtime: "High energy consumption detected",
            financials: "Retrofit ROI is higher than replacement"
          }
        });
        setTimeout(() => setLoading(false), loadingSteps.length * 800);
      });

    return () => clearInterval(stepInterval);
  }, [machineId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow-sm border p-8 no-print">
        <h2 className="text-xl font-bold text-center mb-8 text-gray-900">Analyzing Machine Data...</h2>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {loadingSteps.map((step, index) => (
            <div key={index} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active transition-opacity duration-500 ${index <= loadingStep ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${index < loadingStep ? 'bg-green-500' : index === loadingStep ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'}`}>
                {index < loadingStep && (
                  <span className="text-white font-bold text-sm">✓</span>
                )}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border bg-white shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-gray-900">{step.agent}</div>
                </div>
                <div className="text-gray-500 text-sm">{step.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 print-area">
      {/* Hidden Print Header */}
      <div className="hidden print:block border-b-2 border-gray-900 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">FactoryWise AI</h1>
        <p className="text-gray-500">Official Machine Analysis Report — ID #{analysis.machineId}</p>
        <p className="text-gray-500">Date: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Top Header Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Final Decision</p>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            {analysis.decision === 'Retrofit' && <span className="h-4 w-4 rounded-full bg-yellow-400"></span>}
            {analysis.decision === 'Replace' && <span className="h-4 w-4 rounded-full bg-red-500"></span>}
            {analysis.decision === 'Upgrade' && <span className="h-4 w-4 rounded-full bg-orange-500"></span>}
            {analysis.decision === 'Continue' && <span className="h-4 w-4 rounded-full bg-green-500"></span>}
            {analysis.decision}
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl">{analysis.summary}</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex-1 md:flex-none text-center min-w-[120px]">
            <span className="text-sm text-blue-600 font-semibold block mb-1">Confidence</span>
            <span className="text-3xl font-bold text-blue-700">{analysis.confidence}%</span>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-100 flex-1 md:flex-none text-center min-w-[120px]">
            <span className="text-sm text-green-600 font-semibold block mb-1">Savings</span>
            <span className="text-3xl font-bold text-green-700">{analysis.savings || '$18,000'}</span>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 flex-1 md:flex-none text-center min-w-[120px]">
            <span className="text-sm text-purple-600 font-semibold block mb-1">Payback</span>
            <span className="text-3xl font-bold text-purple-700">{analysis.roi}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6 lg:p-8">
            <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">Business Reasoning</h3>
            <ul className="space-y-3">
              {analysis.businessImpact?.map((impact: string, i: number) => (
                <li key={i} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {impact}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 lg:p-8">
            <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">Suggested Next Steps</h3>
            <ul className="space-y-3">
              {analysis.recommendations?.map((rec: string, i: number) => (
                <li key={i} className="flex items-start text-gray-700">
                  <span className="bg-gray-100 text-gray-600 font-bold text-xs px-2 py-1 rounded mr-3 mt-0.5">{i + 1}</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Explainability */}
        <div className="bg-white rounded-xl shadow-sm border p-6 lg:p-8">
          <h3 className="font-bold text-lg mb-6 text-gray-900 border-b pb-2">Orchestrator Evidence Log</h3>
          
          <div className="border-l-2 border-gray-100 ml-4 space-y-8 mt-2">
            <div className="relative pl-8">
              <div className="absolute -left-[11px] top-1 bg-white border-4 border-gray-300 h-5 w-5 rounded-full"></div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Machine Agent</p>
              <p className="text-gray-900 font-medium mt-1">✓ {analysis.explainability?.age}</p>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute -left-[11px] top-1 bg-white border-4 border-gray-300 h-5 w-5 rounded-full"></div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Maintenance Agent</p>
              <p className="text-gray-900 font-medium mt-1">✓ {analysis.explainability?.maintenance}</p>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[11px] top-1 bg-white border-4 border-gray-300 h-5 w-5 rounded-full"></div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">ROI Agent</p>
              <p className="text-gray-900 font-medium mt-1">✓ {analysis.explainability?.downtime}</p>
              <p className="text-gray-900 font-medium mt-1">✓ {analysis.explainability?.financials}</p>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[11px] top-1 bg-blue-500 ring-4 ring-blue-50 h-5 w-5 rounded-full"></div>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-wide">Decision Agent</p>
              <p className="text-gray-900 font-bold text-xl mt-1">{analysis.decision} Recommended</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center no-print mt-8">
         <button onClick={() => router.push('/machines')} className="text-gray-500 hover:text-gray-900 font-medium px-4 py-2">
           ← Back to Fleet
         </button>
         <button 
           onClick={() => window.print()} 
           className="bg-gray-900 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-gray-800 transition font-medium flex items-center gap-2"
         >
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
           </svg>
           Download PDF Report
         </button>
      </div>
    </div>
  );
}

export default function Analysis() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8 no-print">
        <h1 className="text-2xl font-bold text-gray-900">Machine Intelligence Report</h1>
      </div>
      <Suspense fallback={<div className="p-6 text-center text-gray-500 font-medium">Initializing AI Orchestrator...</div>}>
        <AnalysisContent />
      </Suspense>
    </div>
  );
}
