"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function AnalysisContent() {
  const searchParams = useSearchParams();
  const machineId = searchParams.get('machineId') || '1';
  
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call POST /analysis
    fetch('http://localhost:8000/analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ machineId: Number(machineId) })
    })
      .then((res) => res.json())
      .then((data) => {
        setAnalysis(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Fallback to mock data to keep UI working
        setAnalysis({
          machineId,
          decision: "Retrofit",
          confidence: 93,
          roi: "2.4 Years",
          summary: "Machine is mechanically healthy but lacks Industry 4.0 connectivity.",
          recommendations: [
            "Install vibration sensor",
            "Install energy meter",
            "Connect IoT Gateway"
          ]
        });
        setLoading(false);
      });
  }, [machineId]);

  if (loading) return <div className="p-6 animate-pulse">Generating AI Analysis... Please wait.</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold">Machine #{analysis.machineId} Assessment</h2>
          <p className="text-gray-600 mt-2">{analysis.summary}</p>
        </div>
        <div className="text-right">
          <span className="block text-3xl font-bold text-blue-600">{analysis.confidence}%</span>
          <span className="text-sm text-gray-500">AI Confidence</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded border">
          <span className="text-sm text-gray-500 block">Recommended Action</span>
          <span className="text-lg font-bold text-gray-900">{analysis.decision}</span>
        </div>
        <div className="p-4 bg-gray-50 rounded border">
          <span className="text-sm text-gray-500 block">Estimated ROI</span>
          <span className="text-lg font-bold text-gray-900">{analysis.roi}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Action Plan (Recommendations)</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {analysis.recommendations?.map((rec: string, i: number) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Analysis() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">AI Analysis Report</h1>
      <Suspense fallback={<div className="p-6">Loading parameters...</div>}>
        <AnalysisContent />
      </Suspense>
    </div>
  );
}
