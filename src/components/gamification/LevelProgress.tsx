import React from "react";
import { Sparkles, Flame, Zap, Trophy } from "lucide-react";
import { UserProgress } from "@/types/gamification";

interface LevelProgressProps {
  progress: UserProgress;
  compact?: boolean;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  progress,
  compact = false,
}) => {
  const percentage = (progress.currentXP / progress.xpForNextLevel) * 100;

  if (compact) {
    return (
      <div className="flex items-center gap-4">
        {/* Vibrant Level Badge with gradient */}
        <div className="relative animate-pulse-soft">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center shadow-xl glow-green">
            <span className="text-2xl font-black text-white drop-shadow-lg">
              {progress.level}
            </span>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* XP Bar with gradient */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Seviye {progress.level}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              {progress.currentXP}/{progress.xpForNextLevel} XP
            </span>
          </div>
          <div className="h-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-full overflow-hidden shadow-inner relative">
            <div
              className="h-full progress-gradient rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Vibrant Streak Badge */}
        <div className="flex flex-col items-center px-4 py-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg glow-gold">
          <Flame className="w-5 h-5 text-white mb-1 animate-pulse-soft" />
          <span className="text-xl font-black text-white">
            {progress.streak}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-8 overflow-hidden relative">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30"></div>

      <div className="relative z-10">
        {/* Header with 3D elements */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            {/* 3D Level Circle with gradient and glow */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-soft"></div>
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-105">
                <span className="text-4xl font-black text-white drop-shadow-2xl">
                  {progress.level}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center border-4 border-card shadow-lg animate-bounce-subtle">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center border-4 border-card shadow-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent mb-1">
                Seviye {progress.level}
              </h3>
              <p className="text-base font-semibold text-muted-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Öğrenme Yolcusu
              </p>
            </div>
          </div>

          {/* Vibrant Streak Display */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex flex-col items-center px-6 py-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-xl">
              <Flame className="w-8 h-8 text-white mb-2 animate-pulse-soft drop-shadow-lg" />
              <span className="text-3xl font-black text-white drop-shadow-lg">
                {progress.streak}
              </span>
              <span className="text-sm font-bold text-white/90">
                gün seri
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced XP Progress with 3D effect */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-bold text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              Sonraki seviyeye: <span className="text-emerald-600">{progress.xpForNextLevel - progress.currentXP} XP</span>
            </span>
            <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full shadow-lg">
              <span className="text-base font-black text-white">
                {Math.round(percentage)}%
              </span>
            </div>
          </div>

          {/* 3D Progress bar with gradient */}
          <div className="relative h-8 bg-gradient-to-r from-emerald-100 via-teal-100 to-amber-100 dark:from-emerald-950/50 dark:via-teal-950/50 dark:to-amber-950/50 rounded-2xl overflow-hidden shadow-inner">
            <div
              className="absolute inset-y-0 left-0 progress-gradient rounded-2xl transition-all duration-700 shadow-xl"
              style={{ width: `${percentage}%` }}
            />
            {/* Progress text inside bar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white drop-shadow-lg mix-blend-difference">
                {progress.currentXP} / {progress.xpForNextLevel} XP
              </span>
            </div>
          </div>
        </div>

        {/* Total XP Display with gradient */}
        <div className="mt-6 pt-6 border-t-2 border-emerald-200 dark:border-emerald-900/30 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700">
            <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse-soft" />
            <span className="text-sm font-semibold text-muted-foreground">
              Toplam:
            </span>
            <span className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {progress.totalXP} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;
