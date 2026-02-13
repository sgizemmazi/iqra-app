import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Compass, Heart, HelpCircle, Grid3X3, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const QuickActionsWarm: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'categories' | 'recent'>('categories');

  const categories = [
    {
      icon: BookOpen,
      label: language === 'tr' ? 'Sureler' : 'Surahs',
      subtitle: language === 'tr' ? '114 Sure' : '114 Surahs',
      path: '/learn',
      gradient: 'from-emerald-600 to-teal-600',
    },
    {
      icon: Heart,
      label: language === 'tr' ? 'Dualar' : 'Duas',
      subtitle: language === 'tr' ? '25 Dua' : '25 Duas',
      path: '/learn',
      gradient: 'from-teal-600 to-cyan-600',
    },
    {
      icon: HelpCircle,
      label: 'Quiz',
      subtitle: language === 'tr' ? 'Bilgi Yarış' : 'Knowledge Test',
      path: '/quiz',
      gradient: 'from-blue-700 to-blue-500',
    },
    {
      icon: Compass,
      label: language === 'tr' ? 'Kıble' : 'Qibla',
      subtitle: language === 'tr' ? 'Yön Bul' : 'Find Direction',
      path: '/qibla',
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="px-5 py-4">
      {/* Tab Switcher with Islamic colors */}
      <motion.div
        className="flex items-center justify-center mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <div className="inline-flex items-center gap-2 p-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl shadow-sm">
          <button
            onClick={() => setActiveTab('categories')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2',
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Grid3X3 className="w-4 h-4" />
            {language === 'tr' ? 'Kategoriler' : 'Categories'}
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2',
              activeTab === 'recent'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <List className="w-4 h-4" />
            {language === 'tr' ? 'Son Görülen' : 'Recent'}
          </button>
        </div>
      </motion.div>

      {/* Categories Grid with Islamic gradients */}
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
              {/* Gradient glow on hover */}
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity',
                  category.gradient
                )}
              />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div
                  className={cn(
                    'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110',
                    category.gradient
                  )}
                >
                  <Icon className="w-7 h-7 text-white" />
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
