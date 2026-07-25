export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Factory Dashboard</h1>
      
      {/* Dummy Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Machines', value: '42', color: 'bg-blue-100 text-blue-800' },
          { label: 'Healthy', value: '28', color: 'bg-green-100 text-green-800' },
          { label: 'Retrofit', value: '8', color: 'bg-yellow-100 text-yellow-800' },
          { label: 'Upgrade', value: '4', color: 'bg-orange-100 text-orange-800' },
          { label: 'Replace', value: '2', color: 'bg-red-100 text-red-800' },
        ].map((stat) => (
          <div key={stat.label} className={`p-4 rounded-lg shadow-sm border ${stat.color}`}>
            <p className="text-sm font-medium opacity-80">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Dummy Charts Area */}
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