import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserProgress } from '@/types/gamification';
import { Zap, Flame, Star } from 'lucide-react';

interface ProgressCardWarmProps {
  progress: UserProgress;
}

const ProgressCardWarm: React.FC<ProgressCardWarmProps> = ({ progress }) => {
  const { language } = useLanguage();
  
  const progressPercent = Math.min((progress.currentXP / progress.xpForNextLevel) * 100, 100);
  const radius = 45;
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
          {/* Circular Progress - Like reference dial */}
          <div className="relative w-28 h-28">
            <svg className="w-full h-full progress-ring" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="10"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="hsl(var(--sage))"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground">
                {language === 'tr' ? 'Seviye' : 'Level'}
              </span>
              <span className="text-2xl font-bold text-foreground">
                {progress.level}
              </span>
            </div>
          </div>

          {/* Progress info */}
          <div className="flex-1">
            <h3 className="font-bold text-foreground mb-1">
              {language === 'tr' ? 'İlerleme Durumu' : 'Progress Status'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {progress.currentXP} / {progress.xpForNextLevel} XP
            </p>

            {/* Stats row - device cards style */}
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold-light">
                <Zap className="w-4 h-4 text-gold" />
                <div>
                  <p className="text-xs font-bold text-foreground">{progress.totalXP}</p>
                  <p className="text-[10px] text-muted-foreground">XP</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-streak-light">
                <Flame className="w-4 h-4 text-streak" />
                <div>
                  <p className="text-xs font-bold text-foreground">{progress.streak}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {language === 'tr' ? 'Gün' : 'Days'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sage-light">
                <Star className="w-4 h-4 text-sage" />
                <div>
                  <p className="text-xs font-bold text-foreground">{progress.dailyGoalsCompleted}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {language === 'tr' ? 'Görev' : 'Goals'}
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