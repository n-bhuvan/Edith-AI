import Link from 'next/link';

export default function Sidebar() {
  const links = [
    { name: 'Dashboard', path: '/' },
    { name: 'Machines', path: '/machines' },
    { name: 'Analysis', path: '/analysis' },
    { name: 'Reports', path: '/reports' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-800">
        FactoryWise AI
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link 
            key={link.name} 
            href={link.path}
            className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}