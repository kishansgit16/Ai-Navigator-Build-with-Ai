'use client';

import React, { useState } from 'react';
import Sidebar from '../navigation/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-950 text-gray-100 selection:bg-indigo-500/30 selection:text-white">
      {/* Sidebar navigation */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content frame */}
      <main className="flex-1 md:pl-64 min-h-screen flex flex-col transition-all duration-300">
        <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full pt-16 md:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
