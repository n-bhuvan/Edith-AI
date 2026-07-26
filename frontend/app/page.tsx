"use client";

export default function Dashboard() {
  return (
    <div className="flex-1 w-full p-8 pb-12 overflow-y-auto max-w-[1600px] mx-auto">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Factory Overview</h1>
          <p className="text-gray-500 mt-1 text-[15px]">Real-time insights and analytics</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-[#1e293b] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-[#f4f7f9]">3</span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-blue-600 text-white font-semibold w-9 h-9 rounded-full flex items-center justify-center text-sm">AU</div>
            <span className="font-semibold text-gray-700 text-[15px]">Admin User</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {/* Date Dropdown */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm cursor-pointer">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          May 29, 2026
          <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-6">
        
        {/* Total */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-5">
          <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center text-blue-500 shrink-0">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 mb-0.5 tracking-wide">Total Machines</p>
            <p className="text-3xl font-bold text-gray-900">3</p>
            <p className="text-[12px] text-gray-500 font-medium mt-1">All Systems</p>
          </div>
        </div>

        {/* Healthy */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-5">
          <div className="bg-green-50 w-14 h-14 rounded-lg flex items-center justify-center text-green-500 shrink-0">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 mb-0.5 tracking-wide">Healthy</p>
            <p className="text-3xl font-bold text-gray-900">1</p>
            <p className="text-[12px] text-green-500 font-bold mt-1">33.3% of total</p>
          </div>
        </div>

        {/* Retrofit */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-5">
          <div className="bg-orange-50 w-14 h-14 rounded-lg flex items-center justify-center text-orange-400 shrink-0">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 mb-0.5 tracking-wide">Retrofit</p>
            <p className="text-3xl font-bold text-gray-900">1</p>
            <p className="text-[12px] text-orange-400 font-bold mt-1">33.3% of total</p>
          </div>
        </div>

        {/* Upgrade */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-5">
          <div className="bg-purple-50 w-14 h-14 rounded-lg flex items-center justify-center text-purple-500 shrink-0">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" /></svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 mb-0.5 tracking-wide">Upgrade</p>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-[12px] text-purple-500 font-bold mt-1">0% of total</p>
          </div>
        </div>

        {/* Replace */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-5">
          <div className="bg-red-50 w-14 h-14 rounded-lg flex items-center justify-center text-red-500 shrink-0">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 mb-0.5 tracking-wide">Replace</p>
            <p className="text-3xl font-bold text-gray-900">1</p>
            <p className="text-[12px] text-red-500 font-bold mt-1">33.3% of total</p>
          </div>
        </div>

      </div>

      {/* --- INFO BANNER --- */}
      <div className="bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-100 flex items-center gap-3 mb-6 shadow-sm">
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        <p className="font-semibold text-[15px]">Backend not connected. <span className="font-normal">Showing mock data for demonstration.</span></p>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Donut Chart Card */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <h2 className="text-[17px] font-bold text-gray-900 mb-8">Machine Health Distribution</h2>
          <div className="flex items-center justify-center gap-12">
            
            {/* SVG Donut Chart exactly matching image */}
            <div className="relative w-64 h-64">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-md">
                <circle cx="50" cy="50" r="32" fill="none" stroke="#ef4444" strokeWidth="32" strokeDasharray="63 200" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#f97316" strokeWidth="32" strokeDasharray="63 200" strokeDashoffset="-66.5" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#4ade80" strokeWidth="32" strokeDasharray="63 200" strokeDashoffset="-133" />
              </svg>
              {/* Inner White Circle to make it a donut */}
              <div className="absolute inset-0 m-auto w-[42%] h-[42%] bg-white rounded-full shadow-inner"></div>
              {/* Text overlays on slices */}
              <span className="absolute top-[30%] left-[15%] text-white text-[11px] font-bold">33.3%</span>
              <span className="absolute bottom-[20%] left-[45%] text-white text-[11px] font-bold">33.3%</span>
              <span className="absolute top-[30%] right-[15%] text-white text-[11px] font-bold">33.3%</span>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-[#4ade80]"></span><span className="text-[14px] text-gray-600 font-medium">Healthy (1)</span></div>
              <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-[#f97316]"></span><span className="text-[14px] text-gray-600 font-medium">Retrofit (1)</span></div>
              <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-[#ef4444]"></span><span className="text-[14px] text-gray-600 font-medium">Replace (1)</span></div>
              <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-[#a855f7]"></span><span className="text-[14px] text-gray-600 font-medium">Upgrade (0)</span></div>
            </div>
          </div>
        </div>

        {/* Line Chart Card */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] relative">
          <h2 className="text-[17px] font-bold text-gray-900 mb-6">ROI Projection (Next 12 Months)</h2>
          
          {/* Tooltip matching image */}
          <div className="absolute top-12 right-6 bg-white border border-gray-200 shadow-md p-2 rounded-md z-10">
            <p className="text-[11px] text-gray-500 mb-1">May '27</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-[13px] font-bold text-gray-800">ROI: $95,000</span>
            </div>
          </div>

          <div className="relative h-[250px] w-full mt-4 flex">
            {/* Y Axis */}
            <div className="flex flex-col justify-between text-[11px] text-gray-400 font-medium h-[220px] pr-4 text-right shrink-0">
              <span>100K</span><span>80K</span><span>60K</span><span>40K</span><span>20K</span><span>0</span>
            </div>
            
            <div className="relative flex-1 h-[220px]">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="border-t border-gray-100 w-full"></div>
                <div className="border-t border-gray-100 w-full"></div>
                <div className="border-t border-gray-100 w-full"></div>
                <div className="border-t border-gray-100 w-full"></div>
                <div className="border-t border-gray-100 w-full"></div>
                <div className="border-t border-gray-200 w-full"></div>
              </div>
              
              {/* Chart Line & Fill */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points="0,95 9,90 18,85 27,80 36,75 45,68 54,60 63,50 72,40 81,30 90,20 100,10 100,100 0,100" fill="url(#blueGradient)" />
                <polyline points="0,95 9,90 18,85 27,80 36,75 45,68 54,60 63,50 72,40 81,30 90,20 100,10" fill="none" stroke="#3b82f6" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                
                {/* Dots */}
                {[95, 90, 85, 80, 75, 68, 60, 50, 40, 30, 20, 10].map((y, i) => (
                  <circle key={i} cx={i * 9.09} cy={y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
            </div>
          </div>
          
          {/* X Axis */}
          <div className="flex justify-between pl-10 pr-2 text-[11px] text-gray-400 font-medium mt-2">
            <span>Jun '26</span><span>Jul '26</span><span>Aug '26</span><span>Sep '26</span><span>Oct '26</span><span>Nov '26</span>
            <span>Dec '26</span><span>Jan '27</span><span>Feb '27</span><span>Mar '27</span><span>Apr '27</span><span>May '27</span>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-[17px] font-bold text-gray-900">Machine Status Overview</h2>
          <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            View All Machines
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide">Machine ID</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide">Status</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide">Health Score</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide">Last Updated</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-800 uppercase tracking-wide">Recommendation</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            
            {/* Row 1 */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-5 text-[14px] font-medium text-gray-700">MCH-001</td>
              <td className="px-6 py-5">
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-md text-[13px] font-bold">Healthy</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#4ade80] h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-[14px] font-bold text-gray-600">85%</span>
                </div>
              </td>
              <td className="px-6 py-5 text-[14px] text-gray-500 font-medium">May 29, 2026 10:30 AM</td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-[14px] font-bold text-gray-700">
                  <svg className="w-5 h-5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Keep monitoring
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <button className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg></button>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-5 text-[14px] font-medium text-gray-700">MCH-002</td>
              <td className="px-6 py-5">
                <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-md text-[13px] font-bold">Retrofit</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#f97316] h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  <span className="text-[14px] font-bold text-gray-600">55%</span>
                </div>
              </td>
              <td className="px-6 py-5 text-[14px] text-gray-500 font-medium">May 29, 2026 10:28 AM</td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-[14px] font-bold text-gray-900">
                  <svg className="w-5 h-5 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Consider retrofit
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <button className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg></button>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-5 text-[14px] font-medium text-gray-700">MCH-003</td>
              <td className="px-6 py-5">
                <span className="px-3 py-1 bg-red-50 text-red-500 rounded-md text-[13px] font-bold">Replace</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#ef4444] h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-[14px] font-bold text-gray-600">30%</span>
                </div>
              </td>
              <td className="px-6 py-5 text-[14px] text-gray-500 font-medium">May 29, 2026 10:25 AM</td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-[14px] font-bold text-gray-900">
                  <svg className="w-5 h-5 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Plan replacement
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <button className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg></button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
