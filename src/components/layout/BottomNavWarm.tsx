import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const BottomNavWarm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const navItems = [
    { icon: Home, label: language === 'tr' ? 'Ana Sayfa' : 'Home', path: '/' },
    { icon: BookOpen, label: language === 'tr' ? 'Öğren' : 'Learn', path: '/learn' },
    { icon: Clock, label: language === 'tr' ? 'Namaz' : 'Prayer', path: '/prayer' },
    { icon: User, label: language === 'tr' ? 'Profil' : 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-lg mx-auto px-4 pb-2">
        <nav className="flex items-center justify-around py-3 px-2 bg-card/95 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[64px]",
                  isActive ? "text-sage" : "text-muted-foreground"
                )}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 bg-sage-light rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                <Icon className={cn(
                  "w-5 h-5 relative z-10 transition-colors",
                  isActive && "text-sage"
                )} />
                
                <span className={cn(
                  "text-[10px] font-medium relative z-10",
                  isActive && "font-semibold text-sage"
                )}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </nav>
      </div>
      
      {/* Safe area padding */}
      <div className="h-safe-bottom bg-background" />
    </div>
  );
};

export default BottomNavWarm;