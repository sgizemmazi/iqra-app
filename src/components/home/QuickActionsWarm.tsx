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
    },
    { 
      icon: Heart, 
      label: language === 'tr' ? 'Dualar' : 'Duas',
      subtitle: language === 'tr' ? '25 Dua' : '25 Duas',
      path: '/learn',
    },
    { 
      icon: HelpCircle, 
      label: 'Quiz',
      subtitle: language === 'tr' ? 'Bilgi Yarış' : 'Knowledge Test',
      path: '/quiz',
    },
    { 
      icon: Compass, 
      label: language === 'tr' ? 'Kıble' : 'Qibla',
      subtitle: language === 'tr' ? 'Yön Bul' : 'Find Direction',
      path: '/qibla',
    },
  ];

  return (
    <div className="px-5 py-4">
      {/* Tab Switcher */}
      <motion.div 
        className="flex items-center justify-center mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <div className="tab-switcher">
          <button 
            onClick={() => setActiveTab('categories')}
            className={cn("tab-switcher-item", activeTab === 'categories' && "active")}
          >
            <Grid3X3 className="w-4 h-4 inline-block mr-1.5" />
            {language === 'tr' ? 'Kategoriler' : 'Categories'}
          </button>
          <button 
            onClick={() => setActiveTab('recent')}
            className={cn("tab-switcher-item", activeTab === 'recent' && "active")}
          >
            <List className="w-4 h-4 inline-block mr-1.5" />
            {language === 'tr' ? 'Son Görülen' : 'Recent'}
          </button>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div 
        className="grid grid-cols-2 gap-3"
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
              className="room-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="room-card-icon">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <span className="text-sm font-semibold text-foreground block">
                  {category.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {category.subtitle}
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default QuickActionsWarm;