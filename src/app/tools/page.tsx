'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_TOOLS, AITool } from '@/lib/mockData';
import { 
  Search, 
  Star, 
  ExternalLink, 
  Sparkles, 
  Filter, 
  ArrowUpDown, 
  Shuffle, 
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
      // Sort by last month popularity score (last element of array)
      const aPop = a.popularityTrend[a.popularityTrend.length - 1] || 0;
      const bPop = b.popularityTrend[b.popularityTrend.length - 1] || 0;
      return bPop - aPop;
    }
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
          AI Tool Discovery Hub
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Discover, compare, and track the leading developer, design, automation, and research AI tools in the industry.
        </p>
      </div>

      {/* Categories Horizontal Carousel */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex gap-2 w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_4px_12px_rgba(99,102,241,0.2)]'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar: Filters, Search, Sort */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
        <div className="relative w-full lg:w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search tools, use-cases, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-950 border border-white/10 rounded-xl focus:border-indigo-500/60 focus:outline-none text-white placeholder-gray-500"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end items-center">
          {/* Pricing Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 flex items-center gap-1"><Filter size={12} /> Pricing:</span>
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="text-xs bg-gray-950 border border-white/10 text-white px-2 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500"
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
              className="text-xs bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-white/10"
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col justify-between"
            >
              <div>
                {/* Logo, name, category, rating */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                      {tool.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{tool.name}</h3>
                      <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-mono">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    <Star size={12} fill="currentColor" />
                    <span>{tool.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 mt-4 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>

                {/* Best use case */}
                <div className="mt-4 p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block">Best Use Case</span>
                  <p className="text-xs text-gray-300 line-clamp-2 font-medium">{tool.bestUseCase}</p>
                </div>
              </div>

              {/* Lower Section: Sparkline & Pricing, Actions */}
              <div className="mt-6 border-t border-gray-900/60 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block">Pricing Model</span>
                    <span className="text-xs font-semibold text-white">{tool.pricingType}</span>
                    <span className="text-[10px] text-gray-500 block leading-none mt-0.5">{tool.pricingDetail}</span>
                  </div>

                  {/* Tiny Sparkline */}
                  <div className="h-10 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={tool.popularityTrend.map((val, idx) => ({ idx, val }))}>
                        <Line 
                          type="monotone" 
                          dataKey="val" 
                          stroke={tool.category === 'Coding' ? '#06b6d4' : '#6366f1'} 
                          strokeWidth={1.5} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <span className="text-[8px] text-gray-500 block text-right font-mono mt-0.5">Popularity (6m)</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setDetailTool(tool)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors"
                  >
                    <Info size={12} /> Specs
                  </button>
                  <a 
                    href={tool.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
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
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel p-6 rounded-2xl border border-white/10 overflow-hidden"
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
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                    {detailTool.logo}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{detailTool.name}</h2>
                    <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-mono">
                      {detailTool.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">Description</h4>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">{detailTool.description}</p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">Best Use Case</h4>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed font-semibold">{detailTool.bestUseCase}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">Pricing Detail</h4>
                      <p className="text-xs text-gray-300 mt-1">{detailTool.pricingDetail}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider font-semibold">User Rating</h4>
                      <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                        <Star size={14} fill="currentColor" /> {detailTool.rating.toFixed(1)} / 5.0
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">Competitor Alternatives</h4>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {detailTool.alternatives.map((alt) => (
                        <span key={alt} className="text-[10px] font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-900/60">
                  <button 
                    onClick={() => setDetailTool(null)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors"
                  >
                    Close Specifications
                  </button>
                  <a 
                    href={detailTool.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors glow-indigo"
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
