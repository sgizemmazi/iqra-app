import React from 'react';
import { cn } from '@/lib/utils';
import BottomNav from './BottomNav';

interface MobileLayoutWarmProps {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
}

const MobileLayoutWarm: React.FC<MobileLayoutWarmProps> = ({
  children,
  className,
  hideNav = false
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto relative">
      {/* Main content area */}
      <main
        className={cn(
          "flex-1 overflow-y-auto relative",
          !hideNav && "pb-28",
          className
        )}
      >
        {children}
      </main>

      {/* Bottom Navigation - Unified across all pages */}
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default MobileLayoutWarm;
