import React from 'react';
import { Check, ChevronRight, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DailyGoal } from '@/types/gamification';

interface DailyGoalsProps {
  goals: DailyGoal[];
  onGoalClick?: (goalId: string) => void;
}

const DailyGoals: React.FC<DailyGoalsProps> = ({ goals, onGoalClick }) => {
  const completedCount = goals.filter(g => g.isCompleted).length;
  const totalXP = goals.reduce((acc, g) => acc + (g.isCompleted ? g.xpReward : 0), 0);
  const allCompleted = completedCount === goals.length;

  return (
    <div className="bg-card rounded-3xl p-5 border border-border/50 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <span className="text-xl">🎯</span> Günlük Görevler
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {completedCount}/{goals.length} tamamlandı • +{totalXP} XP kazanıldı
          </p>
        </div>
        {allCompleted && (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-sage-light rounded-xl">
            <Gift className="w-4 h-4 text-sage" />
            <span className="text-sm font-medium text-sage">Harika!</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500",
            allCompleted 
              ? "bg-gradient-to-r from-sage to-emerald-500" 
              : "bg-sage"
          )}
          style={{ width: `${(completedCount / goals.length) * 100}%` }}
        />
      </div>

      {/* Goals List */}
      <div className="space-y-2">
        {goals.map((goal, index) => (
          <button
            key={goal.id}
            onClick={() => !goal.isCompleted && onGoalClick?.(goal.id)}
            disabled={goal.isCompleted}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left",
              goal.isCompleted 
                ? "bg-sage-light/50 opacity-80" 
                : "bg-muted hover:bg-muted/80 active:scale-[0.98]",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Icon */}
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center text-lg",
              goal.isCompleted ? "bg-sage/20" : "bg-card"
            )}>
              {goal.isCompleted ? (
                <Check className="w-5 h-5 text-sage" />
              ) : (
                goal.icon
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-medium",
                goal.isCompleted ? "text-muted-foreground line-through" : "text-foreground"
              )}>
                {goal.title}
              </p>
              <p className="text-xs text-muted-foreground">{goal.description}</p>
            </div>

            {/* XP Reward */}
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg",
              goal.isCompleted ? "bg-sage/10" : "bg-gold-light"
            )}>
              <span className={cn(
                "text-sm font-bold",
                goal.isCompleted ? "text-sage" : "text-gold"
              )}>
                +{goal.xpReward}
              </span>
              <span className="text-xs text-muted-foreground">XP</span>
            </div>

            {!goal.isCompleted && (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        ))}
      </div>

      {/* Bonus Message */}
      {allCompleted && (
        <div className="mt-4 p-3 bg-gradient-to-r from-sage-light to-teal-100 dark:from-sage-light/20 dark:to-teal-900/20 rounded-2xl text-center">
          <p className="text-sm text-sage font-medium">
            ✨ Tüm günlük görevleri tamamladın! Yarın görüşürüz.
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyGoals;
