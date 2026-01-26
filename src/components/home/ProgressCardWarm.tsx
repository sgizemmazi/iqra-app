import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserProgress } from '@/types/gamification';

interface ProgressCardWarmProps {
  progress: UserProgress;
}

const ProgressCardWarm: React.FC<ProgressCardWarmProps> = ({ progress }) => {
  const { language } = useLanguage();
  
  const progressPercent = Math.min((progress.currentXP / progress.xpForNextLevel) * 100, 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="px-5 py-4">
      <motion.div 
        className="clean-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="flex items-center gap-5">
          {/* Circular Progress */}
          <div className="relative w-24 h-24">
            <svg className="w-full h-full progress-ring">
              {/* Background circle */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <motion.circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </svg>
            {/* Center percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-foreground">
                {Math.round(progressPercent)}%
              </span>
            </div>
          </div>

          {/* Progress info */}
          <div className="flex-1">
            <h3 className="font-bold text-foreground mb-1">
              {language === 'tr' ? 'Öğrenme İlerlemesi' : 'Learning Progress'}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {language === 'tr' 
                ? `${progress.currentXP} / ${progress.xpForNextLevel} XP`
                : `${progress.currentXP} / ${progress.xpForNextLevel} XP`
              }
            </p>

            {/* Stats row */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg icon-box flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{progress.level}</span>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {language === 'tr' ? 'Seviye' : 'Level'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-streak-orange-light flex items-center justify-center">
                  <span className="text-xs font-bold text-streak-orange">{progress.streak}</span>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {language === 'tr' ? 'Gün' : 'Days'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressCardWarm;
