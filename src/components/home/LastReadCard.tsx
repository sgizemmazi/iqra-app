import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const LastReadCard: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="px-5">
      <motion.div 
        className="featured-card p-5 cursor-pointer"
        onClick={() => navigate('/learn')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white/90 text-xs font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {language === 'tr' ? 'Son Okunan' : 'Last Read'}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Al-Fatiha
              </h3>
              <p className="text-white/70 text-sm">
                {language === 'tr' ? 'Ayet 1-7' : 'Verse 1-7'}
              </p>
            </div>

            {/* Play button */}
            <motion.button 
              className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </motion.button>
          </div>
        </div>

        {/* Decorative Islamic pattern */}
        <div className="absolute top-3 right-3 opacity-20">
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            <circle cx="35" cy="35" r="30" stroke="white" strokeWidth="1.5" />
            <circle cx="35" cy="35" r="22" stroke="white" strokeWidth="1" />
            <path d="M35 5L35 65M5 35L65 35" stroke="white" strokeWidth="1" opacity="0.5"/>
            <path d="M35 15L55 35L35 55L15 35Z" stroke="white" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default LastReadCard;
