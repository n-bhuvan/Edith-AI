export default function Navbar() {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-gray-800">Factory Overview</h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Admin User</span>
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
    </header>
  );
}