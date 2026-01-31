import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Ana Sayfa', path: '/' },
  { icon: BookOpen, label: 'Öğren', path: '/learn' },
  { icon: Clock, label: 'Namaz', path: '/prayer' },
  { icon: User, label: 'Profil', path: '/profile' },
];

const BottomNavWarm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-lg mx-auto">
        <nav className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors min-w-[64px]",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 bg-teal-light rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                <Icon className={cn(
                  "w-5 h-5 relative z-10 transition-colors",
                  isActive && "text-primary"
                )} />
                
                <span className={cn(
                  "text-[10px] font-medium relative z-10",
                  isActive && "font-semibold text-primary"
                )}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </nav>
        
        {/* Safe area padding */}
        <div className="h-safe-bottom" />
      </div>
    </div>
  );
};

export default BottomNavWarm;
