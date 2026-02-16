import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Compass, Heart, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const QuickActionsWarm: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const categories = [
    {
      icon: BookOpen,
      label: language === 'tr' ? 'Sureler' : 'Surahs',
      subtitle: language === 'tr' ? '114 Sure' : '114 Surahs',
      path: '/learn',
      color: 'bg-primary',
    },
    {
      icon: Heart,
      label: language === 'tr' ? 'Dualar' : 'Duas',
      subtitle: language === 'tr' ? '25 Dua' : '25 Duas',
      path: '/learn',
      color: 'bg-brand-cyan',
    },
    {
      icon: HelpCircle,
      label: 'Quiz',
      subtitle: language === 'tr' ? 'Bilgi Yarış' : 'Knowledge Test',
      path: '/quiz',
      color: 'bg-secondary',
    },
    {
      icon: Compass,
      label: language === 'tr' ? 'Kıble' : 'Qibla',
      subtitle: language === 'tr' ? 'Yön Bul' : 'Find Direction',
      path: '/qibla',
      color: 'bg-accent',
    },
  ];

  return (
    <div className="px-5 py-4">
      {/* Categories Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.label}
              onClick={() => navigate(category.path)}
              className="relative glass-card p-5 rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Subtle bg on hover */}
              <div
                className={cn(
                  'absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity',
                  category.color
                )}
              />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div
                  className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center group-hover:shadow-xl transition-all group-hover:scale-110',
                    category.color
                  )}
                >
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <span className="text-base font-black text-foreground block">
                    {category.label}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {category.subtitle}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default QuickActionsWarm;
