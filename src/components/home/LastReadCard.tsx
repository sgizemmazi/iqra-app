import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const LastReadCard: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="px-5">
      <motion.div 
        className="featured-card p-5 cursor-pointer"
        onClick={() => navigate('/learn/surah/1')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream/20 text-cream/90 text-xs font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {language === 'tr' ? 'Son Okunan' : 'Last Read'}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-cream mb-1">
                Al-Fatiha
              </h3>
              <p className="text-cream/70 text-sm flex items-center gap-1">
                {language === 'tr' ? 'Ayet 1-7 • Devam Et' : 'Verse 1-7 • Continue'}
                <ChevronRight className="w-4 h-4" />
              </p>
            </div>

            {/* Play button */}
            <motion.button 
              className="w-14 h-14 rounded-full bg-cream flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate('/learn/surah/1');
              }}
            >
              <Play className="w-6 h-6 text-sage fill-sage ml-0.5" />
            </motion.button>
          </div>
        </div>

        {/* Decorative Islamic pattern */}
        <div className="absolute top-3 right-3 opacity-15">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="1.5" className="text-cream" />
            <circle cx="40" cy="40" r="25" stroke="currentColor" strokeWidth="1" className="text-cream" />
            <path d="M40 5L40 75M5 40L75 40" stroke="currentColor" strokeWidth="1" opacity="0.5" className="text-cream"/>
            <path d="M40 15L60 40L40 65L20 40Z" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-cream"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default LastReadCard;