'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_MODELS, AIModel } from '@/lib/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  Label,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Check, 
  HelpCircle 
} from 'lucide-react';

export default function BenchmarkCenter() {
  const [selectedModels, setSelectedModels] = useState<string[]>(
    MOCK_MODELS.slice(0, 5).map(m => m.id) // Default first 5 models selected
  );
  
  const [radarModelId, setRadarModelId] = useState<string>(MOCK_MODELS[0].id);
  const [activeMetric, setActiveMetric] = useState<'codingScore' | 'reasoningScore' | 'mathScore' | 'visionScore' | 'speedTokensPerSec'>('codingScore');

  // Toggle model selection
  const toggleModel = (id: string) => {
    if (selectedModels.includes(id)) {
      if (selectedModels.length > 1) {
        setSelectedModels(selectedModels.filter(m => m !== id));
      }
    } else {
      setSelectedModels([...selectedModels, id]);
    }
  };

  // Filtered models for comparison
  const comparedModels = MOCK_MODELS.filter(m => selectedModels.includes(m.id));

  // Data for single radar chart
  const radarModel = MOCK_MODELS.find(m => m.id === radarModelId) || MOCK_MODELS[0];
  const radarData = [
    { subject: 'Coding', value: radarModel.codingScore },
    { subject: 'Reasoning', value: radarModel.reasoningScore },
    { subject: 'Math', value: radarModel.mathScore },
    { subject: 'Vision', value: radarModel.visionScore },
    { subject: 'Overall', value: radarModel.performanceScore }
  ];

  // Data for Scatter Chart: Speed vs Cost
  // We want to map: x = speed (tokens/sec), y = cost (input $/M), name = model name
  const scatterData = MOCK_MODELS.map(m => ({
    x: m.speedTokensPerSec,
    y: m.costInputPerM,
    name: m.name,
    score: m.performanceScore
  }));

  // Bar chart metric labels mapping
  const metricLabels = {
    codingScore: 'Coding Benchmark (HumanEval equivalent)',
    reasoningScore: 'Reasoning Score (GPQA equivalent)',
    mathScore: 'Mathematics Benchmarks (MATH/GSM8k)',
    visionScore: 'Multimodal Vision Capability (MMMU)',
    speedTokensPerSec: 'Generation Speed (Tokens/Second)'
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
          Interactive Benchmark Center
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Perform side-by-side evaluation of major models on reasoning, coding, math, vision, speed, and token cost metrics.
        </p>
      </div>

      {/* Model Selection Filtering Checklist */}
      <div className="glass-card p-4 rounded-xl border border-white/5 space-y-3">
        <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">Select Models for Comparison Grid</span>
        <div className="flex flex-wrap gap-2">
          {MOCK_MODELS.map((model) => {
            const isChecked = selectedModels.includes(model.id);
            return (
              <button
                key={model.id}
                onClick={() => toggleModel(model.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isChecked
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_4px_12px_rgba(99,102,241,0.15)]'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                  isChecked ? 'bg-white border-white text-indigo-600' : 'border-gray-600 bg-transparent'
                }`}>
                  {isChecked && <Check size={10} strokeWidth={3} />}
                </div>
                <span>{model.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Metrics Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Selected Metric Bar Chart */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-white/5 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 size={16} className="text-indigo-400" /> Metric Ranking Compare
              </h2>
              <p className="text-xs text-gray-500">Live comparison scores for selected models</p>
            </div>
            
            {/* Metric Switcher */}
            <select
              value={activeMetric}
              onChange={(e) => setActiveMetric(e.target.value as any)}
              className="text-xs bg-gray-950 border border-white/10 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500 font-semibold"
            >
              <option value="codingScore">Coding Benchmarks</option>
              <option value="reasoningScore">Reasoning (GPQA)</option>
              <option value="mathScore">Mathematics (MATH)</option>
              <option value="visionScore">Vision Capability</option>
              <option value="speedTokensPerSec">Generation Speed</option>
            </select>
          </div>

          {/* Bar Chart */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparedModels} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(17,24,39,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}
                  labelStyle={{ color: 'white', fontWeight: 600 }}
                />
                <Bar dataKey={activeMetric} radius={[4, 4, 0, 0]} maxBarSize={28}>
                  {comparedModels.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.id === radarModelId ? '#a855f7' : '#6366f1'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center text-xs text-gray-400">
            📊 Metric Mode: <strong className="text-white">{metricLabels[activeMetric]}</strong>
          </div>
        </div>

        {/* Right 1 Column: Radar Chart (Model Profile) */}
        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap size={16} className="text-purple-400" /> Model Profile Radar
            </h2>
            <p className="text-xs text-gray-500">Multidimensional footprint of a single model</p>
          </div>

          {/* Radar Model Selector */}
          <select
            value={radarModelId}
            onChange={(e) => setRadarModelId(e.target.value)}
            className="w-full text-xs bg-gray-950 border border-white/10 text-white p-2.5 rounded-xl focus:outline-none focus:border-purple-500 font-semibold"
          >
            {MOCK_MODELS.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          {/* Radar Chart */}
          <div className="h-60 w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" fontSize={8} />
                <Radar 
                  name={radarModel.name} 
                  dataKey="value" 
                  stroke="#a855f7" 
                  fill="#a855f7" 
                  fillOpacity={0.35} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Speed vs Cost Scatter Plot: Developer Trade-off Chart */}
      <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp size={16} className="text-cyan-400" /> Efficiency Frontier: Speed vs. Cost
          </h2>
          <p className="text-xs text-gray-500">
            Compare models on their cost per million input tokens (y-axis) vs. generation speed in tokens per second (x-axis).
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              {/* x-axis: generation speed */}
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Speed" 
                unit=" t/s" 
                stroke="#6b7280" 
                fontSize={10} 
                tickLine={false}
              >
                <Label value="Generation Speed (tokens/sec)" offset={-10} position="insideBottom" fill="#9ca3af" fontSize={10} />
              </XAxis>
              
              {/* y-axis: cost in dollars per M */}
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Input Cost" 
                unit=" $/M" 
                stroke="#6b7280" 
                fontSize={10} 
                tickLine={false}
              >
                <Label value="Input Cost ($ per Million Tokens)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#9ca3af" fontSize={10} />
              </YAxis>
              
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ background: 'rgba(17,24,39,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}
                labelStyle={{ display: 'none' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 bg-gray-900 border border-white/10 rounded-xl space-y-1 text-xs">
                        <strong className="text-white block text-sm">{data.name}</strong>
                        <span className="text-gray-400 block">Speed: {data.x} t/s</span>
                        <span className="text-emerald-400 block font-semibold">Cost: ${data.y.toFixed(2)}/M tokens</span>
                        <span className="text-indigo-400 block font-semibold">Performance Score: {data.score}/100</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="AI Models" data={scatterData} fill="#06b6d4" line={false}>
                {scatterData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.y < 2.0 && entry.x > 100 
                        ? '#10b981' // Green: fast & cheap (e.g. Gemini 1.5 Flash, DeepSeek V3)
                        : entry.y > 10.0 
                          ? '#f43f5e' // Red: high cost (e.g. o1 Pro)
                          : '#6366f1' // Indigo: balanced
                    } 
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Legend helper */}
        <div className="flex flex-wrap justify-center gap-6 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>High Efficiency Frontier (Fast & Economical)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Standard Production Tier (Balanced)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Heavy Reasoning Tier (Premium Pricing)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
