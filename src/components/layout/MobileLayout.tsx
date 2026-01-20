import React from 'react';
import { cn } from '@/lib/utils';
import BottomNav from './BottomNav';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  className,
  hideNav = false 
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto relative">
      {/* Main content area */}
      <main 
        className={cn(
          "flex-1 overflow-y-auto",
          !hideNav && "pb-24",
          className
        )}
      >
        {children}
      </main>
      
      {/* Bottom Navigation */}
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default MobileLayout;
