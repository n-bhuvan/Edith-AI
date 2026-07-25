export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 fixed inset-0 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">FactoryWise AI</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" placeholder="admin@factory.com" className="mt-1 w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" placeholder="••••••••" className="mt-1 w-full p-2 border rounded" />
          </div>
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}