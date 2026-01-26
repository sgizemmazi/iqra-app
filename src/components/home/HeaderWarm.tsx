import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const HeaderWarm: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="px-5 pt-8 pb-4">
      {/* Top row */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <p className="text-sm text-muted-foreground">
            {language === 'tr' ? 'Hoş geldiniz' : 'Welcome back'}
          </p>
          <h1 className="text-xl font-bold text-foreground mt-0.5">
            {language === 'tr' ? 'Kuran Uygulaması' : 'Quran App'}
          </h1>
        </div>
        
        {/* Book icon */}
        <motion.div 
          className="w-12 h-12 rounded-2xl icon-box-primary flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BookOpen className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeaderWarm;
