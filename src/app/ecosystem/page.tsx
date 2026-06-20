'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  MOCK_ECOSYSTEM_NODES, 
  MOCK_ECOSYSTEM_LINKS, 
  EcosystemNode 
} from '@/lib/mockData';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Sliders, 
  Info,
  GitFork,
  Cpu,
  Layers,
  Eye,
  Compass,
  Briefcase
} from 'lucide-react';

export default function EcosystemMap() {
  const [scale, setScale] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  
  // Filters
  const [visibleTypes, setVisibleTypes] = useState<Record<string, boolean>>({
    model: true,
    framework: true,
    agent: true,
    application: true,
    industry: true
  });

  // Toggle filter type
  const toggleType = (type: string) => {
    setVisibleTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Dimensions of canvas
  const width = 1000;
  const height = 600;
  const paddingX = 80;
  const paddingY = 60;

  // Group nodes into layered columns
  // Columns: Models -> Frameworks -> Agents -> Applications -> Industries
  const columns = useMemo(() => {
    const cols: Record<string, number> = {
      model: 0,
      framework: 1,
      agent: 2,
      application: 3,
      industry: 4
    };
    return cols;
  }, []);

  // Filter nodes based on selected types
  const nodes = useMemo(() => {
    return MOCK_ECOSYSTEM_NODES.filter(node => visibleTypes[node.type]);
  }, [visibleTypes]);

  // Compute node coordinates dynamically
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    
    // Group nodes by columns
    const groupedNodes: Record<number, EcosystemNode[]> = { 0: [], 1: [], 2: [], 3: [], 4: [] };
    nodes.forEach(node => {
      const colIdx = columns[node.type];
      groupedNodes[colIdx].push(node);
    });

    const colWidth = (width - paddingX * 2) / 4;

    // Allocate y-positions dynamically based on number of items in each column
    for (let c = 0; c < 5; c++) {
      const colNodes = groupedNodes[c];
      const count = colNodes.length;
      
      colNodes.forEach((node, idx) => {
        const x = paddingX + c * colWidth;
        // Space nodes out vertically
        let y = paddingY;
        if (count > 1) {
          y = paddingY + (idx * (height - paddingY * 2)) / (count - 1);
        } else {
          y = height / 2; // Center if single node
        }
        
        positions[node.id] = { x, y };
      });
    }

    return positions;
  }, [nodes, columns, width, height]);

  // Filter links: both source and target must be visible in nodePositions
  const links = useMemo(() => {
    return MOCK_ECOSYSTEM_LINKS.filter(
      link => nodePositions[link.source] && nodePositions[link.target]
    );
  }, [nodePositions]);

  // Helper to determine if a connection is highlighted
  const isLinkHighlighted = (sourceId: string, targetId: string) => {
    if (!hoveredNodeId) return true;
    return sourceId === hoveredNodeId || targetId === hoveredNodeId;
  };

  // Helper to determine node icon
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'model': return Cpu;
      case 'framework': return Layers;
      case 'agent': return Eye;
      case 'application': return Compass;
      case 'industry': return Briefcase;
      default: return GitFork;
    }
  };

  // Selected node details
  const selectedNode = MOCK_ECOSYSTEM_NODES.find(n => n.id === selectedNodeId);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
            AI Ecosystem Map
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            An interactive lineage map displaying connections from foundation models to developer utilities and industry frameworks.
          </p>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1.5 rounded-xl">
          <button 
            onClick={() => setScale(Math.max(0.6, scale - 0.15))}
            className="p-2 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-xs font-mono font-bold text-white px-2 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={() => setScale(Math.min(1.5, scale + 0.15))}
            className="p-2 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button 
            onClick={() => setScale(1)}
            className="p-2 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors"
            title="Reset Zoom"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Filter Checkbox Row */}
      <div className="glass-card p-4 rounded-xl border border-white/5 space-y-3">
        <span className="text-xs uppercase font-bold text-gray-500 tracking-wider flex items-center gap-1.5">
          <Sliders size={12} /> Toggle Map Layers
        </span>
        <div className="flex flex-wrap gap-3">
          {[
            { type: 'model', label: 'Models', color: 'text-rose-400' },
            { type: 'framework', label: 'Frameworks', color: 'text-indigo-400' },
            { type: 'agent', label: 'Agents', color: 'text-purple-400' },
            { type: 'application', label: 'Applications', color: 'text-cyan-400' },
            { type: 'industry', label: 'Industries', color: 'text-emerald-400' }
          ].map((layer) => {
            const isVisible = visibleTypes[layer.type];
            return (
              <button
                key={layer.type}
                onClick={() => toggleType(layer.type)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                  isVisible 
                    ? 'bg-white/5 border-white/20 text-white' 
                    : 'bg-transparent border-transparent text-gray-600'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${layer.color} ${isVisible ? 'opacity-100 shadow-[0_0_8px_currentColor]' : 'opacity-30'}`} />
                <span>{layer.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Canvas Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: SVG Map Frame */}
        <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-white/5 bg-gray-950/80 glass-panel shadow-inner relative flex justify-center items-center h-[520px]">
          {/* Scrollable Container wrapper */}
          <div className="w-full h-full overflow-auto p-4 flex justify-center items-center">
            
            {/* SVG Visual network graph */}
            <motion.div 
              style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
              className="transition-transform duration-200 ease-out shrink-0"
            >
              <svg width={width} height={height} className="overflow-visible select-none">
                
                {/* 1. Draw connection lines */}
                <g>
                  {links.map((link, idx) => {
                    const start = nodePositions[link.source];
                    const end = nodePositions[link.target];
                    if (!start || !end) return null;

                    // Smooth Bezier path calculation
                    const midX = (start.x + end.x) / 2;
                    const pathD = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
                    
                    const highlighted = isLinkHighlighted(link.source, link.target);

                    return (
                      <path
                        key={`link-${idx}`}
                        d={pathD}
                        fill="none"
                        stroke={highlighted ? 'url(#grad-active)' : 'rgba(255,255,255,0.03)'}
                        strokeWidth={highlighted ? 1.5 : 1}
                        strokeOpacity={highlighted ? 0.6 : 0.25}
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </g>

                {/* 2. Definitions for glow gradients */}
                <defs>
                  <linearGradient id="grad-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                {/* 3. Draw nodes */}
                <g>
                  {nodes.map((node) => {
                    const pos = nodePositions[node.id];
                    if (!pos) return null;

                    const Icon = getNodeIcon(node.type);
                    const isSelected = selectedNodeId === node.id;
                    const isHovered = hoveredNodeId === node.id;
                    
                    // Dim nodes when another node is hovered and this one isn't connected
                    const isDimmed = hoveredNodeId && 
                      hoveredNodeId !== node.id && 
                      !links.some(l => 
                        (l.source === hoveredNodeId && l.target === node.id) ||
                        (l.target === hoveredNodeId && l.source === node.id)
                      );

                    return (
                      <g 
                        key={node.id}
                        transform={`translate(${pos.x}, ${pos.y})`}
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                        onClick={() => setSelectedNodeId(node.id)}
                        className="cursor-pointer group"
                        opacity={isDimmed ? 0.2 : 1}
                      >
                        {/* Glowing Background aura */}
                        {(isHovered || isSelected) && (
                          <circle 
                            r={24} 
                            fill="none" 
                            stroke={node.type === 'model' ? '#f43f5e' : '#6366f1'} 
                            strokeWidth={2}
                            strokeDasharray="4 2"
                            className="animate-spin"
                            style={{ animationDuration: '8s' }}
                          />
                        )}

                        {/* Outer frame circle */}
                        <circle 
                          r={18} 
                          fill="rgba(10,10,15,0.9)" 
                          stroke={isSelected ? '#6366f1' : 'rgba(255,255,255,0.1)'} 
                          strokeWidth={1.5}
                          className="group-hover:stroke-indigo-400 group-hover:scale-110 transition-all"
                        />

                        {/* Icon component */}
                        <g transform="translate(-8, -8)" className="pointer-events-none text-gray-400 group-hover:text-white">
                          <Icon size={16} />
                        </g>

                        {/* Node Label Text */}
                        <text
                          y={30}
                          textAnchor="middle"
                          fill={isHovered || isSelected ? '#ffffff' : '#9ca3af'}
                          fontSize={9}
                          fontWeight={isHovered || isSelected ? '700' : '500'}
                          className="pointer-events-none transition-colors"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </g>

              </svg>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Node Details Panel */}
        <div className="lg:col-span-4">
          {selectedNode ? (
            <div className="glass-card p-6 rounded-2xl border border-white/10 h-full space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                    {React.createElement(getNodeIcon(selectedNode.type), { size: 18, className: 'text-indigo-400' })}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{selectedNode.label}</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-mono">
                      {selectedNode.type}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">Lineage Info</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {selectedNode.details || "No supplementary description available for this node element."}
                  </p>
                </div>

                <div className="space-y-2 border-t border-gray-900/60 pt-4">
                  <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">Ecosystem Connections</h4>
                  
                  {/* Connected links helper */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {MOCK_ECOSYSTEM_LINKS.filter(l => l.source === selectedNodeId || l.target === selectedNodeId).map((l, idx) => {
                      const otherId = l.source === selectedNodeId ? l.target : l.source;
                      const otherNode = MOCK_ECOSYSTEM_NODES.find(n => n.id === otherId);
                      return (
                        <div key={idx} className="flex justify-between items-center bg-white/5 p-2 rounded-xl text-xs">
                          <span className="text-gray-400">{l.source === selectedNodeId ? 'Feeds Into' : 'Fed By'}</span>
                          <span className="font-bold text-white">{otherNode?.label || otherId}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedNodeId(null)}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors"
              >
                Dismiss Details
              </button>
            </div>
          ) : (
            <div className="glass-card p-6 rounded-2xl border border-white/10 h-full text-center text-gray-500 flex flex-col justify-center items-center py-24 space-y-4">
              <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Info size={18} />
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Node Details Panel</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Hover over network paths to trace paths, or click on nodes to inspect connection parameters.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
