export default function Machines() {
  // Dummy data matching the shared API contract
  const dummyMachine = {
    id: 1,
    name: "CNC Lathe",
    age: 18,
    health: "Medium",
    status: "Running"
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Machine Fleet</h1>
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-3 pl-2">ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Age (Yrs)</th>
              <th className="pb-3">Health</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-0 hover:bg-gray-50">
              <td className="py-3 pl-2">#{dummyMachine.id}</td>
              <td className="py-3">{dummyMachine.name}</td>
              <td className="py-3">{dummyMachine.age}</td>
              <td className="py-3">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                  {dummyMachine.health}
                </span>
              </td>
              <td className="py-3">{dummyMachine.status}</td>
              <td className="py-3">
                <button className="text-blue-600 hover:underline text-sm">View Analysis</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}