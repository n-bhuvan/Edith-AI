"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function AnalysisPage() {
  // --- Flow Steps: 0 = Directory/Input, 1 = Chatbot, 2 = Generating, 3 = Final Report ---
  const [step, setStep] = useState<number>(0);
  const [selectedMachine, setSelectedMachine] = useState<string>('');
  
  // Chatbot State
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  
  // Loading & Report State
  const [loadingStep, setLoadingStep] = useState<number>(0);

  // 1. Select Machine and Start Chatbot
  const startDiagnosis = (machineId: string) => {
    setSelectedMachine(machineId);
    setMessages([
      {
        sender: 'ai',
        text: `Hello! I am MECHΔNIQ Assistant. What specific symptoms, error codes, or unusual behavior are you observing on ${machineId}?`
      }
    ]);
    setStep(1);
  };

  // 2. Handle Sending Message in Chatbot
  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const updatedMessages = [...messages, { sender: 'user' as const, text: userInput }];
    setMessages(updatedMessages);
    setUserInput('');

    // Simulate AI understanding response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Got it. I've logged the reported issue. Click "Run Diagnostics" below to synthesize sensor telemetry with your observation.`
        }
      ]);
    }, 800);
  };

  // 3. Trigger Multi-Agent Generation
  const runDiagnostics = () => {
    setStep(2);
    setLoadingStep(0);

    setTimeout(() => setLoadingStep(1), 1200);
    setTimeout(() => setLoadingStep(2), 2600);
    setTimeout(() => setStep(3), 4200);
  };

  return (
    <div className="flex-1 w-full p-8 pb-12 overflow-y-auto max-w-[1600px] mx-auto">
      
      {/* --- STEP 0: MACHINE DIRECTORY / SELECTION --- */}
      {step === 0 && (
        <div>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Machine Diagnostic Portal</h1>
              <p className="text-gray-500 mt-1 text-[15px]">Select a machine to initiate an AI-assisted issue inspection</p>
            </div>
          </div>

          {/* Manual Input Box */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8 flex gap-4 items-center">
            <input 
              type="text" 
              placeholder="Enter Machine ID (e.g. MCH-004)" 
              value={selectedMachine}
              onChange={(e) => setSelectedMachine(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={() => selectedMachine && startDiagnosis(selectedMachine)}
              className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Diagnostic Chat
            </button>
          </div>

          {/* Stored Machines Directory */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 font-bold text-gray-800">Available Factory Machines</div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[12px] font-bold text-gray-600 uppercase">
                  <th className="px-6 py-4">Machine ID</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {['MCH-001', 'MCH-002', 'MCH-003'].map((id) => (
                  <tr key={id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-bold text-gray-800">{id}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold">Active</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => startDiagnosis(id)}
                        className="px-4 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 font-bold text-xs rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        Diagnose Issue
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- STEP 1: AI CHATBOT INTERFACE --- */}
      {step === 1 && (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Diagnostic Chatbot</h1>
              <p className="text-sm text-gray-500">Asset Target: <span className="font-bold text-blue-600">{selectedMachine}</span></p>
            </div>
            <button onClick={() => setStep(0)} className="text-sm font-semibold text-gray-400 hover:text-gray-600">Cancel</button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col h-[480px] overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-3">
              <input 
                type="text"
                placeholder="Describe machine noise, heat, vibration, or error codes..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <button 
                onClick={handleSendMessage}
                className="px-5 py-2.5 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800"
              >
                Send
              </button>
            </div>
          </div>

          {messages.length > 1 && (
            <div className="mt-6 text-center">
              <button 
                onClick={runDiagnostics}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-all text-sm"
              >
                Generate AI Analysis & Report →
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- STEP 2: MULTI-AGENT ORCHESTRATION LOADING --- */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-100 p-10 shadow-sm max-w-2xl mx-auto mt-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Processing Diagnostic Data for {selectedMachine}...</h3>
          <div className="space-y-4 max-w-sm mx-auto text-left">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm font-medium text-gray-800">Ingesting Chatbot Symptoms</span>
            </div>
            <div className="flex items-center gap-3">
              {loadingStep >= 1 ? (
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>}
              <span className="text-sm font-medium text-gray-800">Synthesizing Sensor Telemetry</span>
            </div>
            <div className="flex items-center gap-3">
              {loadingStep >= 2 ? (
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : <div className="w-5 h-5 rounded-full border-2 border-gray-200"></div>}
              <span className="text-sm font-medium text-gray-400">Building Decision & ROI Recommendation</span>
            </div>
          </div>
        </div>
      )}

      {/* --- STEP 3: GENERATED ANALYSIS REPORT --- */}
      {step === 3 && (
        <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
            <div>
              <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-md text-xs font-bold uppercase">Retrofit Recommended</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">Diagnostic Report: {selectedMachine}</h2>
            </div>
            <button onClick={() => setStep(0)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200">
              Back to Directory
            </button>
          </div>

          <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
            <div>
              <h4 className="font-bold text-gray-900 mb-1">User Reported Symptoms:</h4>
              <p className="p-3 bg-gray-50 rounded-lg border border-gray-100 italic">{messages[1]?.text || "Vibration and unusual heat detected"}</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-1">AI Root Cause Analysis:</h4>
              <p>Primary drive bearing friction is generating thermal leakage. Sensor telemetry corroborates the user observation, indicating a 14% efficiency drop during load peaks.</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-1">Financial Impact (12-Month ROI):</h4>
              <p className="text-green-600 font-bold text-lg">$24,500 Estimated Savings via Retrofit vs. $80,000 Total Replacement</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}