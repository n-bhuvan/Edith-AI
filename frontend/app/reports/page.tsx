"use client";

import Link from 'next/link';

export default function Reports() {
  const mockReports = [
    { id: "REP-2042", machineId: "MCH-001", date: "May 29, 2026", type: "Comprehensive Health", decision: "Monitor", color: "bg-green-50 text-green-600" },
    { id: "REP-2041", machineId: "MCH-002", date: "May 28, 2026", type: "ROI & Retrofit Analysis", decision: "Retrofit", color: "bg-orange-50 text-orange-500" },
    { id: "REP-2040", machineId: "MCH-003", date: "May 25, 2026", type: "End-of-Life Assessment", decision: "Replace", color: "bg-red-50 text-red-500" },
  ];

  return (
    <div className="flex-1 w-full p-8 pb-12 overflow-y-auto max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Reports Archive</h1>
          <p className="text-gray-500 mt-1 text-[15px]">Historical analysis and PDF documentation</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-100 flex items-center gap-3 mb-6 shadow-sm">
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        <p className="font-semibold text-[15px]">Backend not connected. <span className="font-normal">Showing locally stored report history for demonstration.</span></p>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-[17px] font-bold text-gray-900">Generated Machine Reports</h2>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/30">
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide">Report ID</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide">Machine</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide">Analysis Type</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide">Date Generated</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide">AI Decision</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {mockReports.map((report, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-5 text-[14px] font-bold text-gray-900">{report.id}</td>
                <td className="px-6 py-5 text-[14px] font-medium text-gray-700">{report.machineId}</td>
                <td className="px-6 py-5 text-[14px] text-gray-600">{report.type}</td>
                <td className="px-6 py-5 text-[14px] text-gray-500 font-medium">{report.date}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-md text-[13px] font-bold ${report.color}`}>
                    {report.decision}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <Link href={`/analysis?machineId=${i+1}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    View Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
