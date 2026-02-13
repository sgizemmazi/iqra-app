import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserProgress } from '@/types/gamification';
import { Sparkles, Trophy, Zap } from 'lucide-react';

interface DialControlWarmProps {
  progress: UserProgress;
}

const DialControlWarm: React.FC<DialControlWarmProps> = ({ progress }) => {
  const { language } = useLanguage();
  const progressPercent = Math.min((progress.currentXP / progress.xpForNextLevel) * 100, 100);

  return (
    <div className="px-5 py-6">
      <motion.div
        className="glass-card p-8 rounded-3xl overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 pattern-grid opacity-20"></div>

        <div className="relative z-10">
          {/* Level Display with 3D effect - Islamic colors */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse-soft"></div>

              {/* Main level badge */}
              <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex flex-col items-center justify-center shadow-2xl">
                <Sparkles className="w-6 h-6 text-white mb-1 opacity-80" />
                <span className="text-5xl font-black text-white drop-shadow-2xl">{progress.level}</span>
                <span className="text-sm font-bold text-white/90 mt-1">
                  {language === 'tr' ? 'Seviye' : 'Level'}
                </span>
              </div>

              {/* Trophy decoration */}
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center border-4 border-card shadow-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-muted-foreground flex items-center gap-1">
                <Zap className="w-4 h-4 text-emerald-600" />
                {language === 'tr' ? 'Sonraki seviyeye' : 'To next level'}
              </span>
              <div className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full shadow-md">
                <span className="text-xs font-black text-white">
                  {Math.round(progressPercent)}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-6 bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 dark:from-emerald-950/50 dark:via-teal-950/50 dark:to-cyan-950/50 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute inset-y-0 left-0 progress-gradient rounded-full transition-all duration-700 shadow-lg"
                style={{ width: `${progressPercent}%` }}
              />
              {/* XP text inside bar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white drop-shadow-lg mix-blend-difference">
                  {progress.currentXP} / {progress.xpForNextLevel} XP
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 dark:from-emerald-600/20 dark:to-teal-600/20 rounded-2xl border border-emerald-300 dark:border-emerald-700">
              <p className="text-xs font-semibold text-muted-foreground">
                {language === 'tr' ? 'Toplam XP' : 'Total XP'}
              </p>
              <p className="text-lg font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {progress.totalXP}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 rounded-2xl border border-amber-300 dark:border-amber-700">
              <p className="text-xs font-semibold text-muted-foreground">
                {language === 'tr' ? 'Kalan XP' : 'Remaining XP'}
              </p>
              <p className="text-lg font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                {progress.xpForNextLevel - progress.currentXP}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DialControlWarm;
