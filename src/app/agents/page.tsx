'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_AGENTS, AgentFramework } from '@/lib/mockData';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { 
  GitFork, 
  Star, 
  Users, 
  Cpu, 
  Layers, 
  Zap, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

export default function AgentObservatory() {
  const [selectedAgent, setSelectedAgent] = useState<AgentFramework | null>(MOCK_AGENTS[0]);

  // Star growth data mapped for charts
  // Star numbers are actuals. Months: Jan - Jun
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  // Transform stars growth history for chart rendering
  const starHistoryData = months.map((month, idx) => {
    const dataObj: Record<string, any> = { month };
    MOCK_AGENTS.forEach(agent => {
      // Exclude proprietary assistants with no stars
      if (agent.githubStars > 0) {
        dataObj[agent.name] = agent.githubStarsGrowth[idx];
      }
    });
    return dataObj;
  });

  // Framework performance scores comparison chart data
  const performanceData = MOCK_AGENTS.map(agent => ({
    name: agent.name,
    Coding: agent.codingPerformance,
    Autonomy: agent.autonomyScore,
    Adoption: agent.adoptionRate
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
          AI Agent Observatory
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Tracking community adoption, GitHub growth velocity, capability metrics, and protocol support across leading agentic frameworks.
        </p>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Star Growth Line Chart */}
        <div className="glass-card p-5 rounded-2xl border border-white/5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Star size={16} className="text-amber-400" /> GitHub Star Trajectory
            </h2>
            <p className="text-xs text-gray-500">Star counts across open-source frameworks (last 6 months)</p>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={starHistoryData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(17,24,39,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}
                  labelStyle={{ color: 'white', fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="CrewAI" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="LangGraph" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="AutoGen" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Claude MCP Ecosystem" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Google ADK" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Capability Scores Bar Chart */}
        <div className="glass-card p-5 rounded-2xl border border-white/5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu size={16} className="text-indigo-400" /> Capability Metric Comparison
            </h2>
            <p className="text-xs text-gray-500">Benchmark comparison of coding competency, autonomy index, and developer adoption</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(17,24,39,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}
                  labelStyle={{ color: 'white', fontWeight: 600 }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="Coding" fill="#6366f1" radius={[2, 2, 0, 0]} maxBarSize={12} />
                <Bar dataKey="Autonomy" fill="#06b6d4" radius={[2, 2, 0, 0]} maxBarSize={12} />
                <Bar dataKey="Adoption" fill="#a855f7" radius={[2, 2, 0, 0]} maxBarSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid of Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_AGENTS.map((agent) => (
          <motion.div
            key={agent.id}
            whileHover={{ y: -3 }}
            onClick={() => setSelectedAgent(agent)}
            className={`glass-card p-5 rounded-2xl border cursor-pointer ${
              selectedAgent?.id === agent.id ? 'border-indigo-500/80 bg-indigo-950/15' : 'border-white/5'
            }`}
          >
            {/* Logo and Name */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                  {agent.logo}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{agent.name}</h3>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {agent.githubStars > 0 ? `${(agent.githubStars / 1000).toFixed(1)}k stars` : 'Proprietary API'}
                  </span>
                </div>
              </div>
              {agent.mcpSupport && (
                <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  MCP Native
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-gray-400 mt-4 leading-relaxed line-clamp-3">
              {agent.description}
            </p>

            {/* Grid of Mini KPIs */}
            <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-gray-900/60 text-xs">
              <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                <span className="text-gray-500">Adoption Rate</span>
                <span className="font-bold text-indigo-400">{agent.adoptionRate}%</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                <span className="text-gray-500">Coding Power</span>
                <span className="font-bold text-cyan-400">{agent.codingPerformance}%</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl col-span-2">
                <span className="text-gray-500">Community Activity</span>
                <span className="font-bold text-purple-400">{agent.communityActivity}/100</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
