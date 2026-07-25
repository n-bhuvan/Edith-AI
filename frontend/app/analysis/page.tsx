export default function Analysis() {
  // Dummy data matching the shared API contract
  const dummyAnalysis = {
    machineId: 1,
    decision: "Retrofit",
    confidence: 93,
    roi: "2.4 Years",
    summary: "Machine is mechanically healthy but lacks Industry 4.0 connectivity.",
    recommendations: [
      "Install vibration sensor",
      "Install energy meter",
      "Connect IoT Gateway"
    ]
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">AI Analysis Report</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold">Machine #{dummyAnalysis.machineId} Assessment</h2>
            <p className="text-gray-600 mt-2">{dummyAnalysis.summary}</p>
          </div>
          <div className="text-right">
            <span className="block text-3xl font-bold text-blue-600">{dummyAnalysis.confidence}%</span>
            <span className="text-sm text-gray-500">AI Confidence</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded border">
            <span className="text-sm text-gray-500 block">Recommended Action</span>
            <span className="text-lg font-bold text-gray-900">{dummyAnalysis.decision}</span>
          </div>
          <div className="p-4 bg-gray-50 rounded border">
            <span className="text-sm text-gray-500 block">Estimated ROI</span>
            <span className="text-lg font-bold text-gray-900">{dummyAnalysis.roi}</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Action Plan (Recommendations)</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {dummyAnalysis.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}