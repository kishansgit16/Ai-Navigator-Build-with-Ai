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
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 glass-panel border-r border-gray-800/40 flex flex-col transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and branding */}
        <div className="h-16 flex items-center px-6 border-b border-gray-800/40 gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-lg glow-indigo">
            N
          </div>
          <div>
            <span className="font-bold text-white tracking-wider text-sm block">AI NAVIGATOR</span>
            <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Guide Map & Analytics</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/10 border border-indigo-500/20 text-white shadow-[0_4px_12px_rgba(99,102,241,0.08)]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-indigo-400' : 'text-gray-400'} />
                <span>{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User profile / Footer */}
        <div className="p-4 border-t border-gray-800/40 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-semibold text-white">
            JD
          </div>
          <div className="overflow-hidden">
            <span className="block text-sm font-semibold text-white truncate">AI Explorer</span>
            <span className="block text-[11px] text-gray-500 truncate">developer@ainav.dev</span>
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
