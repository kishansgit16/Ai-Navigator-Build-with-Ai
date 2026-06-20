'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_TOOLS, AITool } from '@/lib/mockData';
import { 
  Search, 
  Star, 
  ExternalLink, 
  Filter, 
  ArrowUpDown, 
  Info,
  X 
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function ToolDiscovery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'popularity'>('rating');
  const [detailTool, setDetailTool] = useState<AITool | null>(null);

  const categories = [
    'All',
    'Coding',
    'Design',
    'Video Generation',
    'Image Generation',
    'Research',
    'Marketing',
    'Automation',
    'Productivity',
    'Voice AI',
    'Agent Frameworks'
  ];

  const pricingTypes = ['All', 'Free', 'Freemium', 'Paid', 'Open Source'];

  // Filter and sort logic
  const filteredTools = MOCK_TOOLS.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.bestUseCase.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesPricing = selectedPricing === 'All' || tool.pricingType === selectedPricing;
    return matchesSearch && matchesCategory && matchesPricing;
  }).sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      const aPop = a.popularityTrend[a.popularityTrend.length - 1] || 0;
      const bPop = b.popularityTrend[b.popularityTrend.length - 1] || 0;
      return bPop - aPop;
    }
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
          AI Tool Discovery Hub
        </h1>
        <p className="text-gray-400 text-sm mt-1 max-w-2xl leading-relaxed">
          Discover, compare, and track the leading developer, design, automation, and research AI tools in the industry.
        </p>
      </div>

      {/* Categories Horizontal Carousel */}
      <div className="overflow-x-auto pb-3 scrollbar-none">
        <div className="flex gap-2.5 w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 border-blue-500 text-white shadow-[0_4px_12px_rgba(59,130,246,0.2)]'
                  : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar: Filters, Search, Sort */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl">
        <div className="relative w-full lg:w-96">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search tools, use-cases, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-zinc-950 border border-white/5 rounded-xl focus:border-blue-500/60 focus:outline-none text-white placeholder-gray-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end items-center">
          {/* Pricing Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 flex items-center gap-1"><Filter size={12} /> Pricing:</span>
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="text-xs bg-zinc-950 border border-white/5 text-white px-3 py-1.5 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
            >
              {pricingTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Sort Toggles */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 flex items-center gap-1"><ArrowUpDown size={12} /> Sort By:</span>
            <button
              onClick={() => setSortBy(sortBy === 'rating' ? 'popularity' : 'rating')}
              className="text-xs bg-white/[0.03] border border-white/10 text-white px-4 py-1.5 rounded-xl font-semibold hover:bg-white/[0.06] transition-colors"
            >
              {sortBy === 'rating' ? '⭐ Rating' : '📈 Popularity'}
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTools.map((tool, index) => (
            <motion.div
              layout
              key={tool.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
            >
              <div className="space-y-4">
                {/* Logo, name, category, rating */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-lg">
                      {tool.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs">{tool.name}</h3>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/10 font-mono">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg">
                    <Star size={11} fill="currentColor" />
                    <span>{tool.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>

                {/* Best use case */}
                <div className="p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-1">
                  <span className="text-[9px] uppercase font-bold text-gray-500 tracking-widest block">Best Use Case</span>
                  <p className="text-xs text-gray-300 line-clamp-2 font-semibold leading-relaxed">{tool.bestUseCase}</p>
                </div>
              </div>

              {/* Lower Section: Sparkline & Pricing, Actions */}
              <div className="mt-6 border-t border-white/[0.04] pt-5 space-y-5">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold text-gray-500 tracking-widest block">Pricing Model</span>
                    <span className="text-xs font-bold text-white">{tool.pricingType}</span>
                    <span className="text-[10px] text-gray-500 block">{tool.pricingDetail}</span>
                  </div>

                  {/* Tiny Sparkline */}
                  <div className="h-10 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={tool.popularityTrend.map((val, idx) => ({ idx, val }))}>
                        <Line 
                          type="monotone" 
                          dataKey="val" 
                          stroke={tool.category === 'Coding' ? '#3b82f6' : '#a855f7'} 
                          strokeWidth={1.5} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <span className="text-[8px] text-gray-500 block text-right font-mono mt-1">Growth (6m)</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setDetailTool(tool)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors"
                  >
                    <Info size={12} /> Specs
                  </button>
                  <a 
                    href={tool.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {detailTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailTool(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="relative w-full max-w-lg glass-panel p-6 md:p-8 rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setDetailTool(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-2xl">
                    {detailTool.logo}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">{detailTool.name}</h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/10 font-mono">
                      {detailTool.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <h4 className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Description</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{detailTool.description}</p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Best Use Case</h4>
                    <p className="text-xs text-gray-300 font-semibold leading-relaxed">{detailTool.bestUseCase}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <h4 className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Pricing Detail</h4>
                      <p className="text-xs text-gray-300 font-bold">{detailTool.pricingDetail}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">User Rating</h4>
                      <p className="text-xs text-amber-400 font-bold flex items-center gap-1">
                        <Star size={13} fill="currentColor" /> {detailTool.rating.toFixed(1)} / 5.0
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Competitor Alternatives</h4>
                    <div className="flex flex-wrap gap-2">
                      {detailTool.alternatives.map((alt) => (
                        <span key={alt} className="text-[9px] font-bold uppercase tracking-wider bg-white/[0.02] border border-white/5 px-3 py-1 rounded-xl text-gray-300">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-5 border-t border-white/[0.05]">
                  <button 
                    onClick={() => setDetailTool(null)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors"
                  >
                    Close
                  </button>
                  <a 
                    href={detailTool.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors glow-blue"
                  >
                    Visit website <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
