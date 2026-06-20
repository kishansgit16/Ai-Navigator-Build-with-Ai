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
  CartesianGrid
} from 'recharts';
import { 
  Cpu, 
  Compass, 
  Eye, 
  Newspaper, 
  TrendingUp, 
  DollarSign, 
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
    provider: m.provider
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
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
            AI Navigator
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time insights, metrics, and personalized roadmaps for the AI ecosystem.
          </p>
        </div>
        <div className="text-xs text-gray-500 font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
          Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Models Tracked', value: totalModels, icon: Cpu, color: 'text-indigo-400', border: 'border-indigo-500/10' },
          { label: 'Tools Directory', value: totalTools, icon: Compass, color: 'text-cyan-400', border: 'border-cyan-500/10' },
          { label: 'Agent Ecosystem', value: totalFrameworks, icon: Eye, color: 'text-purple-400', border: 'border-purple-500/10' },
          { label: 'News Intelligence', value: totalNews, icon: Newspaper, color: 'text-emerald-400', border: 'border-emerald-500/10' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={`glass-card p-5 rounded-2xl border ${stat.border} flex items-center justify-between`}
          >
            <div>
              <span className="text-xs text-gray-400 font-medium block">{stat.label}</span>
              <span className="text-2xl font-bold text-white mt-1 block tracking-tight">{stat.value}</span>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Performance Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-5 rounded-2xl border border-white/5"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Model Benchmarks</h2>
              <p className="text-xs text-gray-500">Overall capability scores (out of 100)</p>
            </div>
            <Link 
              href="/models"
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20"
            >
              Analytics <ArrowUpRight size={14} />
            </Link>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis domain={[60, 100]} stroke="#6b7280" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(17,24,39,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}
                  labelStyle={{ color: 'white', fontWeight: 600 }}
                />
                <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* GitHub Stars Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-5 rounded-2xl border border-white/5"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Agent Framework Growth</h2>
              <p className="text-xs text-gray-500">GitHub stars trajectory (Jan - Jun)</p>
            </div>
            <Link 
              href="/agents"
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20"
            >
              Observatory <ArrowUpRight size={14} />
            </Link>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={agentGrowthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(17,24,39,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}
                  labelStyle={{ color: 'white', fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="CrewAI" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="AutoGen" stroke="#a855f7" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="LangGraph" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Lower Section: News Intelligence & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Feed Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-base font-bold text-white">AI Intelligence Feed</h2>
            <div className="flex gap-2">
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 font-mono px-2 py-0.5 rounded border border-indigo-500/20">Releases</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-400 font-mono px-2 py-0.5 rounded border border-purple-500/20">Open Source</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {MOCK_NEWS.slice(0, 3).map((news) => (
              <motion.div
                key={news.id}
                whileHover={{ x: 4 }}
                className="glass-card p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-4 items-start"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500">{news.source}</span>
                    <span className="text-xs text-gray-600">• {news.readTime}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white leading-tight">{news.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{news.summary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Roadmaps */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white px-1">Interactive Guides</h2>
          
          <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-4 bg-gradient-to-b from-slate-900/60 to-slate-950/60">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Code2 size={20} />
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white">Create Custom AI Roadmap</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Answer a few quick questions about your skill level and goal to generate a personalized learning roadmap.
              </p>
            </div>
            
            <Link 
              href="/roadmap"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors glow-indigo"
            >
              Start Roadmapping
            </Link>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-4 bg-gradient-to-b from-slate-900/60 to-slate-950/60">
            <div className="h-10 w-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <TrendingUp size={20} />
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white">Ecosystem Navigation Map</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Explore the visual relationships mapping foundational models to frameworks, agent orchestration, and application layers.
              </p>
            </div>
            
            <Link 
              href="/ecosystem"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-white/10 transition-colors"
            >
              Open Ecosystem Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
