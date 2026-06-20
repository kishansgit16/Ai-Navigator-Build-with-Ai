'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_MODELS, AIModel } from '@/lib/mockData';
import { 
  Search, 
  ArrowUpDown, 
  Calculator, 
  Flame, 
  Check, 
  Layers, 
  Clock, 
  BookOpen 
} from 'lucide-react';

export default function ModelAnalytics() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'performanceScore' | 'costInputPerM' | 'contextWindow' | 'speedTokensPerSec'>('performanceScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(MOCK_MODELS[0]);

  // Cost calculator state
  const [inputTokensMillions, setInputTokensMillions] = useState(1);
  const [outputTokensMillions, setOutputTokensMillions] = useState(1);

  // Sorting handlers
  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Filter & sort models
  const filteredModels = MOCK_MODELS.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
          AI Model Analytics
        </h1>
        <p className="text-gray-400 text-sm mt-1 max-w-2xl leading-relaxed">
          Deep comparison of performance scores, context windows, speed, and real-time API cost simulations.
        </p>
      </div>

      {/* Interactive API Cost Calculator */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8 rounded-2xl border border-blue-500/10 bg-gradient-to-b from-zinc-900/30 to-zinc-950/30 shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center gap-2.5 mb-6">
          <Calculator className="text-blue-400" size={18} />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Interactive API Cost Simulator</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center border-b border-white/[0.04] pb-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs text-gray-400 font-semibold block">Input Volume (Prompt)</label>
              <span className="text-xs font-bold text-blue-400">{inputTokensMillions.toFixed(1)}M Tokens</span>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0.1" 
                max="50" 
                step="0.1"
                value={inputTokensMillions} 
                onChange={(e) => setInputTokensMillions(parseFloat(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs text-gray-400 font-semibold block">Output Volume (Completion)</label>
              <span className="text-xs font-bold text-purple-400">{outputTokensMillions.toFixed(1)}M Tokens</span>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0.1" 
                max="50" 
                step="0.1"
                value={outputTokensMillions} 
                onChange={(e) => setOutputTokensMillions(parseFloat(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-2xl text-center">
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-widest block">Total Simulation Size</span>
            <span className="block text-xl font-black text-white mt-1">{(inputTokensMillions + outputTokensMillions).toFixed(1)} Million Tokens</span>
          </div>
        </div>

        {/* Mini simulated cost comparison table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/[0.04] text-gray-500 uppercase font-bold tracking-wider text-[10px]">
                <th className="py-3 font-semibold">Model</th>
                <th className="py-3 font-semibold">Input Cost</th>
                <th className="py-3 font-semibold">Output Cost</th>
                <th className="py-3 font-semibold text-right">Estimated Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.slice(0, 5).map((m) => {
                const inCost = m.costInputPerM * inputTokensMillions;
                const outCost = m.costOutputPerM * outputTokensMillions;
                const total = inCost + outCost;
                return (
                  <tr key={m.id} className="border-b border-white/[0.02] text-gray-300 hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 font-bold text-white">{m.name}</td>
                    <td className="py-3">${inCost.toFixed(2)}</td>
                    <td className="py-3">${outCost.toFixed(2)}</td>
                    <td className="py-3 font-extrabold text-right text-blue-400">${total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Control Bar: Search & Sort Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search models or providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-zinc-950 border border-white/5 rounded-xl focus:border-blue-500/60 focus:outline-none text-white placeholder-gray-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
          {[
            { label: 'Performance', field: 'performanceScore' as const },
            { label: 'API Price', field: 'costInputPerM' as const },
            { label: 'Context Window', field: 'contextWindow' as const },
            { label: 'Token Speed', field: 'speedTokensPerSec' as const }
          ].map((item) => (
            <button
              key={item.field}
              onClick={() => handleSort(item.field)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                sortBy === item.field
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                  : 'bg-transparent border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <span>{item.label}</span>
              <ArrowUpDown size={12} />
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid + Detail Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Models List Cards */}
        <div className="lg:col-span-7 space-y-4">
          {filteredModels.map((model) => (
            <motion.div
              layoutId={`card-${model.id}`}
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`glass-card p-5 rounded-2xl border cursor-pointer relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                selectedModel?.id === model.id
                  ? 'border-blue-500/40 bg-blue-950/10'
                  : 'border-white/5'
              }`}
            >
              {/* Basic spec summary */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center font-bold text-white text-sm">
                  {model.logo}
                </div>
                <div>
                  <h3 className="font-bold text-white text-xs">{model.name}</h3>
                  <span className="text-[10px] text-gray-500 font-semibold">{model.provider}</span>
                </div>
              </div>

              {/* Data points */}
              <div className="flex gap-6 text-xs w-full md:w-auto justify-between md:justify-end border-t border-white/[0.04] md:border-0 pt-4 md:pt-0">
                <div className="text-center">
                  <span className="text-gray-500 block text-[9px] uppercase font-bold tracking-wider">Score</span>
                  <span className="font-bold text-blue-400">{model.performanceScore}/100</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-500 block text-[9px] uppercase font-bold tracking-wider">Context</span>
                  <span className="font-bold text-gray-200">
                    {model.contextWindow >= 1000000 
                      ? `${(model.contextWindow / 1000000).toFixed(0)}M` 
                      : `${model.contextWindow / 1000}k`}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-gray-500 block text-[9px] uppercase font-bold tracking-wider">Price/1M</span>
                  <span className="font-mono text-emerald-400 font-bold">${model.costInputPerM.toFixed(2)}</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-500 block text-[9px] uppercase font-bold tracking-wider">Speed</span>
                  <span className="font-bold text-gray-200">{model.speedTokensPerSec} t/s</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Model Detail Viewer */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            {selectedModel ? (
              <motion.div
                key={selectedModel.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 sticky top-6 space-y-6 shadow-xl"
              >
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center font-bold text-white text-base">
                      {selectedModel.logo}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-tight">{selectedModel.name}</h2>
                      <p className="text-xs text-gray-500">Provided by {selectedModel.provider}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {selectedModel.releaseDate}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed">
                  {selectedModel.description}
                </p>

                {/* Capability Bars */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Capability Breakdown</h3>
                  {[
                    { label: 'Reasoning', val: selectedModel.reasoningScore, color: 'bg-blue-500' },
                    { label: 'Coding Performance', val: selectedModel.codingScore, color: 'bg-purple-500' },
                    { label: 'Vision Capabilities', val: selectedModel.visionScore, color: 'bg-cyan-500' },
                    { label: 'Mathematics', val: selectedModel.mathScore, color: 'bg-indigo-500' }
                  ].map((cap) => (
                    <div key={cap.label} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-400">{cap.label}</span>
                        <span className="text-white font-extrabold">{cap.val}/100</span>
                      </div>
                      <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-white/[0.02]">
                        <div className={`h-full ${cap.color} rounded-full`} style={{ width: `${cap.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Multimodal Support Chips */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Multimodal Input Support</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedModel.multimodalSupport.map((mod) => (
                      <span key={mod} className="text-[9px] font-bold uppercase tracking-wider bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-lg text-gray-300">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Release History timeline */}
                <div className="space-y-4 border-t border-white/[0.05] pt-5">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Release Changelog</h3>
                  <div className="space-y-4">
                    {selectedModel.releaseHistory.map((hist, idx) => (
                      <div key={idx} className="relative pl-5 border-l border-blue-500/20 text-xs">
                        <div className="absolute left-0 top-1.5 -translate-x-[4px] w-2 h-2 rounded-full bg-blue-500" />
                        <div className="flex justify-between text-gray-400 font-bold text-[10px] uppercase tracking-wider">
                          <span>{hist.version}</span>
                          <span>{hist.date}</span>
                        </div>
                        <p className="text-gray-500 mt-1 leading-relaxed">{hist.changes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-8 rounded-2xl border border-white/5 text-center text-gray-500 py-24 shadow-md">
                Select a model from the list to see granular details, capability breakdowns, and release logs.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
