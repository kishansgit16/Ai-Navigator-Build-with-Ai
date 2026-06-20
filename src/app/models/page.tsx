'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_MODELS, AIModel } from '@/lib/mockData';
import { 
  Search, 
  ArrowUpDown, 
  Calculator, 
  HelpCircle, 
  Flame, 
  Check, 
  Layers, 
  DollarSign, 
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
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
          AI Model Analytics
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Deep comparison of performance scores, context windows, speed, and real-time API cost simulations.
        </p>
      </div>

      {/* Interactive API Cost Calculator */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl border border-indigo-500/10 bg-gradient-to-r from-slate-950 via-slate-900/60 to-slate-950"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="text-indigo-400" size={20} />
          <h2 className="text-base font-bold text-white">Interactive API Cost Simulator</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-semibold block">Input Volume (Millions of Tokens)</label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="0.1" 
                max="50" 
                step="0.1"
                value={inputTokensMillions} 
                onChange={(e) => setInputTokensMillions(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-sm font-mono text-white bg-white/5 border border-white/10 px-2 py-1 rounded w-16 text-center">
                {inputTokensMillions.toFixed(1)}M
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-semibold block">Output Volume (Millions of Tokens)</label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="0.1" 
                max="50" 
                step="0.1"
                value={outputTokensMillions} 
                onChange={(e) => setOutputTokensMillions(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <span className="text-sm font-mono text-white bg-white/5 border border-white/10 px-2 py-1 rounded w-16 text-center">
                {outputTokensMillions.toFixed(1)}M
              </span>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Simulation Size</span>
            <span className="block text-lg font-bold text-white mt-0.5">{(inputTokensMillions + outputTokensMillions).toFixed(1)} Million Tokens</span>
          </div>
        </div>

        {/* Mini simulated cost comparison table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-800/40 text-gray-400">
                <th className="py-2 font-medium">Model</th>
                <th className="py-2 font-medium">Input Cost</th>
                <th className="py-2 font-medium">Output Cost</th>
                <th className="py-2 font-medium text-right">Estimated Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.slice(0, 5).map((m) => {
                const inCost = m.costInputPerM * inputTokensMillions;
                const outCost = m.costOutputPerM * outputTokensMillions;
                const total = inCost + outCost;
                return (
                  <tr key={m.id} className="border-b border-gray-900/30 text-gray-300">
                    <td className="py-2 font-semibold text-white">{m.name}</td>
                    <td className="py-2">${inCost.toFixed(2)}</td>
                    <td className="py-2">${outCost.toFixed(2)}</td>
                    <td className="py-2 font-bold text-right text-indigo-400">${total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Control Bar: Search & Sort Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 p-4 rounded-xl">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search models or providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-950 border border-white/10 rounded-xl focus:border-indigo-500/60 focus:outline-none text-white placeholder-gray-500"
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                sortBy === item.field
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-transparent border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              <ArrowUpDown size={12} />
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid + Detail Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Models List Cards */}
        <div className="lg:col-span-7 space-y-3">
          {filteredModels.map((model) => (
            <motion.div
              layoutId={`card-${model.id}`}
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`glass-card p-4 rounded-2xl border cursor-pointer relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                selectedModel?.id === model.id
                  ? 'border-indigo-500 bg-indigo-950/20'
                  : 'border-white/5'
              }`}
            >
              {/* Basic spec summary */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-base">
                  {model.logo}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{model.name}</h3>
                  <span className="text-xs text-gray-500">{model.provider}</span>
                </div>
              </div>

              {/* Data points */}
              <div className="flex gap-6 text-xs w-full md:w-auto justify-between md:justify-end border-t border-gray-900/60 pt-3 md:pt-0 md:border-0">
                <div className="text-center">
                  <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">Score</span>
                  <span className="font-bold text-indigo-400">{model.performanceScore}/100</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">Context</span>
                  <span className="font-semibold text-gray-200">
                    {model.contextWindow >= 1000000 
                      ? `${(model.contextWindow / 1000000).toFixed(0)}M` 
                      : `${model.contextWindow / 1000}k`}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">Price/1M</span>
                  <span className="font-mono text-emerald-400 font-semibold">${model.costInputPerM.toFixed(2)}</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">Speed</span>
                  <span className="font-semibold text-gray-200">{model.speedTokensPerSec} t/s</span>
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-6 rounded-2xl border border-white/10 sticky top-6 space-y-6"
              >
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-lg">
                      {selectedModel.logo}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">{selectedModel.name}</h2>
                      <p className="text-xs text-gray-500">Provided by {selectedModel.provider}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Release: {selectedModel.releaseDate}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed">
                  {selectedModel.description}
                </p>

                {/* Capability Bars */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider text-gray-500">Capability Breakdown</h3>
                  {[
                    { label: 'Reasoning', val: selectedModel.reasoningScore, color: 'bg-indigo-500' },
                    { label: 'Coding Performance', val: selectedModel.codingScore, color: 'bg-cyan-500' },
                    { label: 'Vision Capabilities', val: selectedModel.visionScore, color: 'bg-purple-500' },
                    { label: 'Mathematics', val: selectedModel.mathScore, color: 'bg-pink-500' }
                  ].map((cap) => (
                    <div key={cap.label} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-gray-400">{cap.label}</span>
                        <span className="text-white font-bold">{cap.val}/100</span>
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden border border-white/5">
                        <div className={`h-full ${cap.color}`} style={{ width: `${cap.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Multimodal Support Chips */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider text-gray-500">Multimodal Input Support</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedModel.multimodalSupport.map((mod) => (
                      <span key={mod} className="text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-300">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Release History timeline */}
                <div className="space-y-3 border-t border-gray-900/60 pt-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider text-gray-500">Release Changelog</h3>
                  <div className="space-y-3">
                    {selectedModel.releaseHistory.map((hist, idx) => (
                      <div key={idx} className="relative pl-4 border-l border-indigo-500/30 text-xs">
                        <div className="absolute left-0 top-1.5 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <div className="flex justify-between text-gray-400 font-semibold text-[11px]">
                          <span>{hist.version}</span>
                          <span>{hist.date}</span>
                        </div>
                        <p className="text-gray-500 mt-0.5 leading-relaxed">{hist.changes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-6 rounded-2xl border border-white/10 text-center text-gray-500 py-16">
                Select a model from the list to see granular details, capability breakdowns, and release logs.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
