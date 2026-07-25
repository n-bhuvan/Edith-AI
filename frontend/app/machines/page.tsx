"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Machines() {
  const [machines, setMachines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/machines')
      .then((res) => res.json())
      .then((data) => {
        setMachines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMachines([{ id: 1, name: "CNC Lathe", age: 18, health: "Medium", status: "Running" }]); // Fallback
        setLoading(false);
      });
  }, []);

  const filteredMachines = machines.filter(m => 
    (m.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Machine Fleet</h1>
        <input 
          type="text" 
          placeholder="Search machines..." 
          className="border p-2 rounded text-sm w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4">
        {loading ? (
          <p className="p-4 text-gray-500">Loading inventory...</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-3 pl-2">ID</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Age (Yrs)</th>
                <th className="pb-3">Health</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMachines.map((machine) => (
                <tr key={machine.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 pl-2">#{machine.id}</td>
                  <td className="py-3 font-medium">{machine.name}</td>
                  <td className="py-3">{machine.age}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      machine.health === 'Good' || machine.health === 'High' ? 'bg-green-100 text-green-800' :
                      machine.health === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {machine.health}
                    </span>
                  </td>
                  <td className="py-3">{machine.status || 'Active'}</td>
                  <td className="py-3 space-x-3">
                    <Link href={`/machines/${machine.id}`} className="text-gray-600 hover:text-blue-600 underline">
                      Details
                    </Link>
                    <button 
                      onClick={() => router.push(`/analysis?machineId=${machine.id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
