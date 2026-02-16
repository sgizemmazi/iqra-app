import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Clock, Hand } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const BottomNav3D: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const navItems = [
    { icon: Home, label: language === 'tr' ? 'Ana Sayfa' : 'Home', path: '/' },
    { icon: BookOpen, label: language === 'tr' ? 'Öğren' : 'Learn', path: '/learn' },
    { icon: Clock, label: language === 'tr' ? 'Namaz' : 'Prayer', path: '/prayer' },
    { icon: Hand, label: language === 'tr' ? 'Zikirmatik' : 'Dhikr', path: '/zikirmatik' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe-bottom">
      <div className="max-w-lg mx-auto px-4 pb-4">
        <motion.nav 
          className="glass-card rounded-3xl px-2 py-3 flex items-center justify-around"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring" as const, 
            stiffness: 300, 
            damping: 30,
            delay: 0.3 
          }}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-300",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-2xl"
                    initial={false}
                    transition={{
                      type: "spring" as const,
                      stiffness: 400,
                      damping: 30
                    }}
                  />
                )}
                
                {/* Icon with float animation when active */}
                <motion.div
                  animate={isActive ? { y: [0, -2, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Icon className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isActive && "drop-shadow-sm"
                  )} />
                </motion.div>
                
                <span className={cn(
                  "text-[11px] font-medium relative z-10",
                  isActive && "font-semibold"
                )}>
                  {item.label}
                </span>

                {/* Active dot */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-0.5 w-1 h-1 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.nav>
      </div>
    </div>
  );
};

export default BottomNav3D;
