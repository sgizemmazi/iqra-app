import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Menu, Settings, Cloud, Thermometer } from 'lucide-react';

const HeaderWarm: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="px-5 pt-6 pb-4">
      {/* Top row with menu and settings */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button 
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5 text-foreground" />
        </motion.button>
        
        <h1 className="text-lg font-bold text-foreground">
          {language === 'tr' ? 'Kuran Rehberi' : 'Quran Guide'}
        </h1>
        
        <motion.button 
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-5 h-5 text-foreground" />
        </motion.button>
      </motion.div>

      {/* Info cards row - like weather info in reference */}
      <motion.div 
        className="flex items-center justify-between gap-4 px-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center">
            <Cloud className="w-5 h-5 text-sage" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {language === 'tr' ? 'Durum' : 'Status'}
            </p>
            <p className="text-sm font-semibold text-foreground">
              {language === 'tr' ? 'Aktif' : 'Active'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-light flex items-center justify-center">
            <Thermometer className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {language === 'tr' ? 'İlerleme' : 'Progress'}
            </p>
            <p className="text-sm font-semibold text-foreground">25%</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-streak-light flex items-center justify-center">
            <span className="text-sm font-bold text-streak">🔥</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {language === 'tr' ? 'Seri' : 'Streak'}
            </p>
            <p className="text-sm font-semibold text-foreground">3</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeaderWarm;