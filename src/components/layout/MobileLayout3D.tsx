import React from 'react';
import { cn } from '@/lib/utils';
import BottomNav from './BottomNav';
import { motion } from 'framer-motion';

interface MobileLayout3DProps {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
}

const MobileLayout3D: React.FC<MobileLayout3DProps> = ({
  children,
  className,
  hideNav = false
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-600/10 to-pink-600/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr bg-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main content area */}
      <main
        className={cn(
          "flex-1 overflow-y-auto relative z-10",
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

export default MobileLayout3D;
