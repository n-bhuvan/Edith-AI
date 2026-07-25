"use client";

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [machines, setMachines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, use an env variable like process.env.NEXT_PUBLIC_API_URL
    fetch('http://localhost:8000/machines')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch machines');
        return res.json();
      })
      .then((data) => {
        setMachines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Fallback dummy data if backend is not running yet
        setMachines([
          { id: 1, health: 'High', age: 5 },
          { id: 2, health: 'Medium', age: 12 },
          { id: 3, health: 'Low', age: 20 },
        ]);
        setError('Backend not connected. Showing mock data.');
        setLoading(false);
      });
  }, []);

  // Simple logic to categorize machines for the dashboard
  const total = machines.length;
  const healthy = machines.filter((m) => m.health === 'High' || m.health === 'Good').length;
  const retrofit = machines.filter((m) => m.health === 'Medium' && m.age > 10).length;
  const upgrade = machines.filter((m) => m.health === 'Medium' && m.age <= 10).length;
  const replace = machines.filter((m) => m.health === 'Low' || m.health === 'Poor').length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Factory Dashboard</h1>
      {error && <div className="p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Machines', value: loading ? '...' : total, color: 'bg-blue-100 text-blue-800' },
          { label: 'Healthy', value: loading ? '...' : healthy, color: 'bg-green-100 text-green-800' },
          { label: 'Retrofit', value: loading ? '...' : retrofit, color: 'bg-yellow-100 text-yellow-800' },
          { label: 'Upgrade', value: loading ? '...' : upgrade, color: 'bg-orange-100 text-orange-800' },
          { label: 'Replace', value: loading ? '...' : replace, color: 'bg-red-100 text-red-800' },
        ].map((stat) => (
          <div key={stat.label} className={`p-4 rounded-lg shadow-sm border ${stat.color}`}>
            <p className="text-sm font-medium opacity-80">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border h-64 flex items-center justify-center text-gray-400">
          [ Machine Health Distribution Chart Placeholder ]
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border h-64 flex items-center justify-center text-gray-400">
          [ ROI Projection Chart Placeholder ]
        </div>
      </div>
    </div>
  );
}
