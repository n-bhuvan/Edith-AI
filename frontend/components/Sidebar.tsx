"use client";

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-[260px] bg-[#1a1c23] text-gray-300 flex flex-col h-screen shrink-0">
      
      {/* Logo Area - Typography Match */}
      <div className="p-6 flex items-center cursor-pointer">
        <h1 className="text-white font-[800] text-[28px] tracking-[0.1em] flex items-center select-none">
          MECH
          {/* Custom SVG Delta to match the hollow outline in the image */}
          <svg className="w-[24px] h-[24px] mx-[2px] -mt-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M12 3L2.5 20h19L12 3z"/>
          </svg>
          NIQ
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1.5 mt-2">
        <Link href="/" className="bg-[#2c3444] text-white px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer shadow-sm mb-1.5">
          <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          <span className="font-medium text-[15px]">Dashboard</span>
        </Link>
        
        {/* We removed the Settings object from this array! */}
        {[
          { name: 'Machines', path: '/machines' },
          { name: 'Analysis', path: '/analysis' },
          { name: 'Reports', path: '/reports' }
        ].map((item, i) => (
          <Link key={item.name} href={item.path} className="px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
            <svg className="w-5 h-5 opacity-70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
              {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
              {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
            </svg>
            <span className="font-medium text-[15px]">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Alert */}
      <div className="p-4 mb-4 mx-4 bg-[#2a1f24] border border-[#4a1c22] rounded-lg flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2 text-red-500 font-semibold text-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          1 Issue
        </div>
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </div>
    </aside>
  );
}