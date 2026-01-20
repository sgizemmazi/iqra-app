import React from 'react';
import { Sparkles, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserProgress } from '@/types/gamification';

interface LevelProgressProps {
  progress: UserProgress;
  compact?: boolean;
}

const LevelProgress: React.FC<LevelProgressProps> = ({ progress, compact = false }) => {
  const percentage = (progress.currentXP / progress.xpForNextLevel) * 100;

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {/* Level Badge */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">{progress.level}</span>
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-sage rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* XP Bar */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-foreground">Seviye {progress.level}</span>
            <span className="text-xs text-muted-foreground">{progress.currentXP}/{progress.xpForNextLevel} XP</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sage to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{progress.streak}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 border border-border/50 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Level Circle */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold via-amber-500 to-orange-500 flex items-center justify-center shadow-lg animate-pulse-gentle">
              <span className="text-2xl font-bold text-white">{progress.level}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-sage rounded-full flex items-center justify-center border-2 border-card">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">Seviye {progress.level}</h3>
            <p className="text-sm text-muted-foreground">Öğrenme Yolcusu</p>
          </div>
        </div>

        {/* Streak */}
        <div className="flex flex-col items-center px-4 py-2 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl">
          <Flame className="w-6 h-6 text-orange-500 mb-1" />
          <span className="text-xl font-bold text-orange-600 dark:text-orange-400">{progress.streak}</span>
          <span className="text-xs text-orange-600/70 dark:text-orange-400/70">gün seri</span>
        </div>
      </div>

      {/* XP Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Sonraki seviyeye: {progress.xpForNextLevel - progress.currentXP} XP
          </span>
          <span className="text-sm font-bold text-sage">{Math.round(percentage)}%</span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sage via-teal-500 to-emerald-500 rounded-full transition-all duration-700 relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{progress.currentXP} XP</span>
          <span className="text-xs text-muted-foreground">{progress.xpForNextLevel} XP</span>
        </div>
      </div>

      {/* Total XP */}
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-gold" />
        <span className="text-sm text-muted-foreground">Toplam: <strong className="text-foreground">{progress.totalXP} XP</strong></span>
      </div>
    </div>
  );
};

export default LevelProgress;
