import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserProgress } from "@/types/gamification";
import { Sparkles, Trophy, Zap } from "lucide-react";

interface DialControlWarmProps {
  progress: UserProgress;
}

const DialControlWarm: React.FC<DialControlWarmProps> = ({ progress }) => {
  const { language } = useLanguage();
  const progressPercent = Math.min(
    (progress.currentXP / progress.xpForNextLevel) * 100,
    100,
  );

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
              {/* Main level badge */}
              <div className="relative w-32 h-32 rounded-3xl bg-primary flex flex-col items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground mb-1 opacity-80" />
                <span className="text-5xl font-black text-primary-foreground">
                  {progress.level}
                </span>
                <span className="text-sm font-bold text-primary-foreground mt-1">
                  {language === "tr" ? "Seviye" : "Level"}
                </span>
              </div>

              {/* Trophy decoration */}
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-2xl flex items-center justify-center border-4 border-card">
                <Trophy className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-muted-foreground flex items-center gap-1">
                <Zap className="w-4 h-4 text-primary" />
                {language === "tr" ? "Sonraki seviyeye" : "To next level"}
              </span>
              <div className="px-3 py-1 bg-primary rounded-full flex">
                <span className="text-xs font-black text-primary-foreground">
                  {Math.round(progressPercent)}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-6 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 progress-gradient rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
              {/* XP text inside bar */}
              <div className="absolute inset-0 flex items-center justify-center"></div>
            </div>
            <span className="text-xs font-bold text-black mix-blend-difference opacity-35 flex justify-end">
              {progress.currentXP} / {progress.xpForNextLevel} XP
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl border border-primary/30">
              <p className="text-xs font-semibold text-muted-foreground">
                {language === "tr" ? "Toplam XP" : "Total XP"}
              </p>
              <p className="text-lg font-black text-primary">
                {progress.totalXP}
              </p>
            </div>
            <div className="p-3 bg-accent/10 dark:bg-accent/20 rounded-2xl border border-accent/30">
              <p className="text-xs font-semibold text-muted-foreground">
                {language === "tr" ? "Kalan XP" : "Remaining XP"}
              </p>
              <p className="text-lg font-black text-accent">
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
