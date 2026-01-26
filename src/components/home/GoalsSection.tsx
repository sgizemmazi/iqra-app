import React from 'react';
import { Check, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { DailyGoal } from '@/types/gamification';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface GoalsSectionProps {
  goals: DailyGoal[];
  onGoalClick?: (goalId: string) => void;
}

const GoalsSection: React.FC<GoalsSectionProps> = ({ goals, onGoalClick }) => {
  const { t } = useLanguage();
  const completedCount = goals.filter(g => g.isCompleted).length;
  const totalXP = goals.reduce((acc, g) => acc + (g.isCompleted ? g.xpReward : 0), 0);
  const allCompleted = completedCount === goals.length;
  const progressPercent = (completedCount / goals.length) * 100;

  const getGoalTitle = (goal: DailyGoal) => {
    switch (goal.id) {
      case 'learn_ayah': return t('goals.learnAyah');
      case 'daily_dua': return t('goals.dailyDua');
      case 'quiz_complete': return t('goals.completeQuiz');
      case 'review_surah': return t('goals.reviewSurah');
      default: return goal.title;
    }
  };

  return (
    <div className="px-6">
      <motion.div 
        className="stacked-card glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{t('goals.title')}</h3>
              <p className="text-xs text-muted-foreground">
                {completedCount}/{goals.length} {t('goals.completed')}
              </p>
            </div>
          </div>
          {totalXP > 0 && (
            <motion.div 
              className="floating-badge bg-gold-light text-gold border-gold/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
            >
              +{totalXP} XP
            </motion.div>
          )}
        </div>

        {/* Circular progress indicator */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-muted"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-primary"
                strokeLinecap="round"
                strokeDasharray={175.9}
                initial={{ strokeDashoffset: 175.9 }}
                animate={{ strokeDashoffset: 175.9 - (175.9 * progressPercent / 100) }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-foreground">
              {Math.round(progressPercent)}%
            </span>
          </div>
          
          <div className="flex-1 space-y-1">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                  goal.isCompleted 
                    ? "bg-primary text-white" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {goal.isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={cn(
                  "text-sm flex-1 truncate",
                  goal.isCompleted 
                    ? "text-muted-foreground line-through" 
                    : "text-foreground"
                )}>
                  {getGoalTitle(goal)}
                </span>
                <span className="text-xs font-medium text-gold">
                  +{goal.xpReward}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA or celebration */}
        {allCompleted ? (
          <motion.div 
            className="p-3 rounded-2xl bg-gradient-to-r from-primary/10 to-gold/10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm font-medium text-primary">
              ✨ {t('goals.allCompleted')}
            </p>
          </motion.div>
        ) : (
          <motion.button 
            className="w-full p-3 rounded-2xl bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span>{t('goals.title')} →</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default GoalsSection;
