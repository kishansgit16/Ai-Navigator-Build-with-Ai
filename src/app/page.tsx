'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MOCK_MODELS, 
  MOCK_TOOLS, 
  MOCK_AGENTS, 
  MOCK_NEWS 
} from '@/lib/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Cell
} from 'recharts';
import { 
  Cpu, 
  Compass, 
  Eye, 
  Newspaper, 
  TrendingUp, 
  Code2, 
  ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  // Stat Summaries
  const totalModels = MOCK_MODELS.length;
  const totalTools = MOCK_TOOLS.length;
  const totalFrameworks = MOCK_AGENTS.length;
  const totalNews = MOCK_NEWS.length;

  // Chart 1 data: Model Performance Comparison
  const modelPerformanceData = MOCK_MODELS.slice(0, 6).map(m => ({
    name: m.name,
    score: m.performanceScore,
  }));

  // Chart 2 data: Agent Framework GitHub Growth (using raw star values)
  const agentGrowthData = [
    { month: 'Jan', CrewAI: 10000, AutoGen: 24000, LangGraph: 1200 },
    { month: 'Feb', CrewAI: 12000, AutoGen: 26000, LangGraph: 2200 },
    { month: 'Mar', CrewAI: 14200, AutoGen: 28000, LangGraph: 3500 },
    { month: 'Apr', CrewAI: 16500, AutoGen: 29500, LangGraph: 4400 },
    { month: 'May', CrewAI: 18200, AutoGen: 31000, LangGraph: 5200 },
    { month: 'Jun', CrewAI: 19800, AutoGen: 32000, LangGraph: 6200 }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-left py-4 space-y-4"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
          Navigate the AI Ecosystem
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Discover AI models, tools, frameworks and personalized roadmaps through beautiful analytics.
        </p>
      </motion.div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Models Tracked', value: totalModels, icon: Cpu, color: 'text-blue-400', border: 'border-blue-500/10' },
          { label: 'Tools Directory', value: totalTools, icon: Compass, color: 'text-purple-400', border: 'border-purple-500/10' },
          { label: 'Agent Ecosystem', value: totalFrameworks, icon: Eye, color: 'text-indigo-400', border: 'border-indigo-500/10' },
          { label: 'News Intelligence', value: totalNews, icon: Newspaper, color: 'text-sky-400', border: 'border-sky-500/10' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`glass-card p-6 rounded-2xl border ${stat.border} flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.15)]`}
          >
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">{stat.label}</span>
              <span className="text-3xl font-extrabold text-white mt-1 block tracking-tight">{stat.value}</span>
            </div>
            <div className={`p-3.5 rounded-xl bg-white/[0.03] border border-white/5 ${stat.color}`}>
              <stat.icon size={18} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Model Performance Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 rounded-2xl border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Model Benchmarks</h2>
              <p className="text-xs text-gray-500">Overall capability scores (out of 100)</p>
            </div>
            <Link 
              href="/models"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20 font-semibold transition-all"
            >
              Analytics <ArrowUpRight size={14} />
            </Link>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelPerformanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} />
                <YAxis domain={[70, 100]} stroke="#52525b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(9,9,11,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}
                  labelStyle={{ color: 'white', fontWeight: 600 }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={28}>
                  {modelPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#a855f7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* GitHub Stars Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 rounded-2xl border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Agent Framework Growth</h2>
              <p className="text-xs text-gray-500">GitHub stars trajectory (Jan - Jun)</p>
            </div>
            <Link 
              href="/agents"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/20 font-semibold transition-all"
            >
              Observatory <ArrowUpRight size={14} />
            </Link>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={agentGrowthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="month" stroke="#52525b" fontSize={11} tickLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(9,9,11,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}
                  labelStyle={{ color: 'white', fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="CrewAI" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="AutoGen" stroke="#a855f7" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="LangGraph" stroke="#6366f1" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Lower Section: News Intelligence & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* News Feed Cards */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-white tracking-tight">AI Intelligence Feed</h2>
            <div className="flex gap-2">
              <span className="text-[10px] bg-blue-500/10 text-blue-400 font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-blue-500/20">Releases</span>
              <span className="text-[10px] bg-purple-500/10 text-purple-400 font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-purple-500/20">Open Source</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {MOCK_NEWS.slice(0, 3).map((news) => (
              <motion.div
                key={news.id}
                whileHover={{ x: 4 }}
                className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row gap-4 items-start shadow-md"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/10">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500">{news.source}</span>
                    <span className="text-xs text-gray-600">• {news.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">{news.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{news.summary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Roadmaps */}
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-white tracking-tight px-1">Interactive Guides</h2>
          
          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-5 bg-gradient-to-b from-zinc-900/40 to-zinc-950/40 shadow-lg">
            <div className="h-10 w-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Code2 size={18} />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Create Custom AI Roadmap</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Generate a personalized learning roadmap matching your budget, tools, and background.
              </p>
            </div>
            
            <Link 
              href="/roadmap"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-colors glow-blue"
            >
              Start Roadmapping
            </Link>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-5 bg-gradient-to-b from-zinc-900/40 to-zinc-950/40 shadow-lg">
            <div className="h-10 w-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <TrendingUp size={18} />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Ecosystem Navigation Map</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Explore a modular, visual network linking AI components.
              </p>
            </div>
            
            <Link 
              href="/ecosystem"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
            >
              Open Ecosystem Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
