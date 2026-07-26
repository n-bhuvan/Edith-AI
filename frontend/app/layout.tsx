"use client";

import Sidebar from '@/components/Sidebar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Hackathon Superpower: This guarantees Tailwind styles work perfectly even if local compilers fail! */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`body { font-family: 'Inter', sans-serif; }`}</style>
      </head>
      <body suppressHydrationWarning className="bg-[#f4f7f9] flex h-screen overflow-hidden text-slate-800">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
