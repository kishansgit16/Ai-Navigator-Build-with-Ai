'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Cpu,
  Compass,
  Map,
  Eye,
  BarChart3,
  GitFork,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Model Analytics', path: '/models', icon: Cpu },
    { name: 'Tool Discovery', path: '/tools', icon: Compass },
    { name: 'Roadmap Generator', path: '/roadmap', icon: Map },
    { name: 'Agent Observatory', path: '/agents', icon: Eye },
    { name: 'Benchmark Center', path: '/benchmark', icon: BarChart3 },
    { name: 'Ecosystem Map', path: '/ecosystem', icon: GitFork },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-xl bg-[#0e0e11] border border-white/5 text-gray-400 hover:text-white transition-all shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#09090b]/80 backdrop-blur-xl border-r border-white/[0.04] flex flex-col transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and branding */}
        <div className="h-16 flex items-center px-6 border-b border-white/[0.04] gap-3">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(99,102,241,0.25)]">
            N
          </div>
          <div>
            <span className="font-bold text-white tracking-tight text-xs block">AI NAVIGATOR</span>
            <span className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">Guide & Analytics</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-xs font-semibold relative ${
                  isActive
                    ? 'bg-white/[0.03] border border-white/[0.05] text-white'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-200'} />
                <span>{item.name}</span>
                {isActive && (
                  <>
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r shadow-[0_0_8px_#3b82f6]" />
                    <div className="ml-auto w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User profile / Footer */}
        <div className="p-4 border-t border-white/[0.04] flex items-center gap-3 bg-[#0c0c0e]/30">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
            JD
          </div>
          <div className="overflow-hidden">
            <span className="block text-xs font-bold text-white truncate">AI Explorer</span>
            <span className="block text-[10px] text-gray-500 font-medium truncate">developer@ainav.dev</span>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}
