"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function MachineDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [machine, setMachine] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/machines/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMachine(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Fallback for UI building
        setMachine({
          id,
          name: "CNC Lathe",
          manufacturer: "Siemens",
          age: 18,
          operating_hours: 54000,
          utilization: 81,
          energy_consumption: 120.5,
          health: "Medium"
        });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Loading machine details...</div>;
  if (!machine) return <div className="p-6 text-red-500">Machine not found.</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Machine Details: {machine.name}</h1>
        <button 
          onClick={() => router.push(`/analysis?machineId=${machine.id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 font-medium"
        >
          Run AI Analysis
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded border">
          <p className="text-xs text-gray-500">Manufacturer</p>
          <p className="font-semibold text-lg">{machine.manufacturer || 'N/A'}</p>
        </div>
        <div className="bg-white p-4 rounded border">
          <p className="text-xs text-gray-500">Age</p>
          <p className="font-semibold text-lg">{machine.age} Years</p>
        </div>
        <div className="bg-white p-4 rounded border">
          <p className="text-xs text-gray-500">Operating Hours</p>
          <p className="font-semibold text-lg">{machine.operating_hours || machine.operatingHours} hrs</p>
        </div>
        <div className="bg-white p-4 rounded border">
          <p className="text-xs text-gray-500">Health Status</p>
          <p className="font-semibold text-lg text-yellow-600">{machine.health}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded border">
        <h2 className="text-lg font-semibold mb-4">Maintenance History (Mock)</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between border-b pb-2">
            <span>2026-05-10: Replaced spindle belt</span>
            <span className="text-gray-500">$450.00</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>2025-11-22: Annual lubrication and calibration</span>
            <span className="text-gray-500">$200.00</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
