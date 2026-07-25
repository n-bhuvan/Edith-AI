"use client";

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <div className="bg-red-50 text-red-600 p-4 rounded-full mb-4">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis temporarily unavailable.</h2>
      <p className="text-gray-600 mb-6 max-w-md">We encountered an issue communicating with the AI Orchestrator or the backend servers. Please check your connection and try again.</p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm font-medium"
      >
        Try Again
      </button>
    </div>
  );
}
