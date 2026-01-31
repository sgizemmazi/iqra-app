import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';

const surahPreview = [
  { number: 1, name: 'Al-Fatiha', arabicName: 'الفاتحة', verses: 7, type: 'Mekki' },
  { number: 112, name: 'Al-Ikhlas', arabicName: 'الإخلاص', verses: 4, type: 'Mekki' },
  { number: 113, name: 'Al-Falaq', arabicName: 'الفلق', verses: 5, type: 'Medeni' },
  { number: 114, name: "An-Nas", arabicName: 'الناس', verses: 6, type: 'Medeni' },
];

const SurahListPreview: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isSurahLearned } = usePersistedGameProgress();

  return (
    <div className="px-5 py-4">
      {/* Section Header */}
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-bold text-foreground">
          {language === 'tr' ? 'Popüler Sureler' : 'Popular Surahs'}
        </h2>
        <button 
          onClick={() => navigate('/learn')}
          className="text-sm text-sage font-medium flex items-center gap-1"
        >
          {language === 'tr' ? 'Tümü' : 'See All'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Surah List */}
      <motion.div 
        className="clean-card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {surahPreview.map((surah, index) => {
          const isLearned = isSurahLearned(surah.number.toString());
          
          return (
            <motion.button
              key={surah.number}
              onClick={() => navigate(`/learn/surah/${surah.number}`)}
              className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-b-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              {/* Number badge */}
              <div className="w-11 h-11 rounded-xl bg-sage-light flex items-center justify-center text-sm font-bold text-sage">
                {surah.number}
              </div>

              {/* Surah info */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{surah.name}</h3>
                  {isLearned && <CheckCircle2 className="w-4 h-4 text-sage" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {surah.type} • {surah.verses} {language === 'tr' ? 'Ayet' : 'Verses'}
                </p>
              </div>

              {/* Arabic name */}
              <span className="font-arabic text-xl text-sage">
                {surah.arabicName}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SurahListPreview;