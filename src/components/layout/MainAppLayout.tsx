import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string; // To be passed to Header, e.g., "Leads Overview"
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle, className }) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Sidebar />
      <Header pageTitle={pageTitle} /> 
      {/* 
        The main content area needs:
        - Margin left to account for the fixed sidebar (w-64 -> ml-64)
        - Margin top to account for the fixed header (h-16 -> mt-16)
        - Padding as specified (p-6)
        - Scrolling behavior (overflow-y-auto)
        - Minimum width (min-w-0) to prevent content from breaking flex/grid layouts
      */}
      <main className="ml-64 mt-16 p-6 min-w-0 overflow-y-auto" style={{height: 'calc(100vh - 4rem)'}}>
        {/* The style above (height: calc(100vh - 4rem)) ensures the main area itself can scroll correctly within the viewport if its content exceeds 100vh - header_height */}
        {/* The container for children elements as per mainContent.container requirements */}
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
