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
        {/* Vibrant Level Badge */}
        <div className="relative animate-pulse-soft">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <span className="text-2xl font-black text-primary-foreground">
              {progress.level}
            </span>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-cyan rounded-full flex items-center justify-center animate-bounce-subtle">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>

        {/* XP Bar */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-bold text-primary">
              Seviye {progress.level}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              {progress.currentXP}/{progress.xpForNextLevel} XP
            </span>
          </div>
          <div className="h-4 bg-muted rounded-full overflow-hidden relative">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Vibrant Streak Badge */}
        <div className="flex flex-col items-center px-4 py-2 bg-accent rounded-2xl">
          <Flame className="w-5 h-5 text-accent-foreground mb-1 animate-pulse-soft" />
          <span className="text-xl font-black text-accent-foreground">
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
            {/* 3D Level Circle */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-soft"></div>
              <div className="relative w-24 h-24 rounded-3xl bg-primary flex items-center justify-center transform transition-transform group-hover:scale-105">
                <span className="text-4xl font-black text-primary-foreground">
                  {progress.level}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-cyan rounded-2xl flex items-center justify-center border-4 border-card animate-bounce-subtle">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-accent rounded-xl flex items-center justify-center border-4 border-card">
                <Zap className="w-4 h-4 text-accent-foreground" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-primary mb-1">
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
            <div className="absolute inset-0 bg-accent rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex flex-col items-center px-6 py-4 bg-accent rounded-2xl">
              <Flame className="w-8 h-8 text-accent-foreground mb-2 animate-pulse-soft" />
              <span className="text-3xl font-black text-accent-foreground">
                {progress.streak}
              </span>
              <span className="text-sm font-bold text-accent-foreground">
                gün seri
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced XP Progress with 3D effect */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-bold text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Sonraki seviyeye: <span className="text-primary">{progress.xpForNextLevel - progress.currentXP} XP</span>
            </span>
            <div className="px-4 py-1.5 bg-primary rounded-full">
              <span className="text-base font-black text-primary-foreground">
                {Math.round(percentage)}%
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-8 bg-muted rounded-2xl overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-primary rounded-2xl transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
            {/* Progress text inside bar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white mix-blend-difference">
                {progress.currentXP} / {progress.xpForNextLevel} XP
              </span>
            </div>
          </div>
        </div>

        {/* Total XP Display */}
        <div className="mt-6 pt-6 border-t-2 border-primary/20 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 rounded-2xl border-2 border-primary/30">
            <Sparkles className="w-5 h-5 text-primary animate-pulse-soft" />
            <span className="text-sm font-semibold text-muted-foreground">
              Toplam:
            </span>
            <span className="text-xl font-black text-primary">
              {progress.totalXP} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;
