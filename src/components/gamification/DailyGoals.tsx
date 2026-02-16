import React from "react";
import { Check, ChevronRight, Gift, Target, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { DailyGoal } from "@/types/gamification";
import { useLanguage } from "@/contexts/LanguageContext";

interface DailyGoalsProps {
  goals: DailyGoal[];
  onGoalClick?: (goalId: string) => void;
}

const DailyGoals: React.FC<DailyGoalsProps> = ({ goals, onGoalClick }) => {
  const { t } = useLanguage();
  const completedCount = goals.filter((g) => g.isCompleted).length;
  const totalXP = goals.reduce(
    (acc, g) => acc + (g.isCompleted ? g.xpReward : 0),
    0,
  );
  const allCompleted = completedCount === goals.length;

  const getGoalTitle = (goal: DailyGoal) => {
    switch (goal.id) {
      case "learn_ayah":
        return t("goals.learnAyah");
      case "daily_dua":
        return t("goals.dailyDua");
      case "quiz_complete":
        return t("goals.completeQuiz");
      case "review_surah":
        return t("goals.reviewSurah");
      default:
        return goal.title;
    }
  };

  const getGoalDescription = (goal: DailyGoal) => {
    switch (goal.id) {
      case "learn_ayah":
        return t("goals.learnAyahDesc");
      case "daily_dua":
        return t("goals.dailyDuaDesc");
      case "quiz_complete":
        return t("goals.completeQuizDesc");
      case "review_surah":
        return t("goals.reviewSurahDesc");
      default:
        return goal.description;
    }
  };

  const goalGradients = [
    "bg-primary",
    "bg-brand-cyan",
    "bg-secondary",
    "bg-accent",
  ];

  return (
    <div className="glass-card rounded-3xl p-6 overflow-hidden relative">
      {/* Animated background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-20"></div>

      <div className="relative z-10">
        {/* Header with celebration effect */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-black bg-primary bg-clip-text text-transparent flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" /> {t("goals.title")}
            </h3>
            <p className="text-sm font-semibold text-muted-foreground mt-1">
              {completedCount}/{goals.length} {t("goals.completed")} •{" "}
              <span className="text-primary font-bold">+{totalXP} XP</span>{" "}
              {t("goals.earned")}
            </p>
          </div>
          {allCompleted && (
            <div className="relative">
              <div className="absolute inset-0 from-accent to-brand-copper rounded-2xl blur-lg opacity-50 animate-pulse-soft"></div>
              <div className="relative flex items-center gap-2 px-4 py-2 from-accent to-brand-copper rounded-2xl">
                <Gift className="w-5 h-5 text-white" />
                <span className="text-sm font-black text-white">
                  {t("goals.great")}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Vibrant Progress Bar */}
        <div className="relative h-4 from-primary/10 to-brand-cyan/10 dark:from-primary/20/30 dark:to-brand-cyan/20/30 rounded-full overflow-hidden mb-6">
          <div
            className="h-full progress-gradient rounded-full transition-all duration-700"
            style={{ width: `${(completedCount / goals.length) * 100}%` }}
          />
          {/* Percentage badge on progress bar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-black mix-blend-difference">
              {Math.round((completedCount / goals.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Goals List with gradient cards */}
        <div className="space-y-3">
          {goals.map((goal, index) => {
            const gradient = goalGradients[index % goalGradients.length];

            return (
              <div
                key={goal.id}
                onClick={() => !goal.isCompleted && onGoalClick?.(goal.id)}
                className={cn(
                  "relative w-full flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer group overflow-hidden",
                  goal.isCompleted
                    ? "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
                    : "glass-card hover:shadow-xl hover:scale-[1.02]",
                  "animate-fade-in",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Decorative glow for incomplete goals */}
                {!goal.isCompleted && (
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl",
                      gradient,
                    )}
                  ></div>
                )}

                {/* Icon with gradient background */}
                <div className="relative z-10">
                  {goal.isCompleted ? (
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                      <Check className="w-7 h-7 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform",
                        gradient,
                      )}
                    >
                      {goal.icon}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 relative z-10">
                  <p
                    className={cn(
                      "font-bold text-base",
                      goal.isCompleted
                        ? "text-muted-foreground line-through"
                        : "text-foreground",
                    )}
                  >
                    {getGoalTitle(goal)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getGoalDescription(goal)}
                  </p>
                </div>

                {/* XP Reward with gradient */}
                <div className="relative z-10">
                  <div
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl transition-all",
                      goal.isCompleted
                        ? "from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800"
                        : `${gradient} group-hover:shadow-xl`,
                    )}
                  >
                    <span
                      className={cn(
                        "text-base font-black",
                        goal.isCompleted
                          ? "text-muted-foreground"
                          : "text-white",
                      )}
                    >
                      +{goal.xpReward}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-bold",
                        goal.isCompleted
                          ? "text-muted-foreground"
                          : "text-white/90",
                      )}
                    >
                      XP
                    </span>
                  </div>
                </div>

                {!goal.isCompleted && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground relative z-10 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            );
          })}
        </div>

        {/* Celebration Message with gradient */}
        {allCompleted && (
          <div className="mt-6 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-primary rounded-2xl opacity-10 animate-pulse-soft"></div>

            <div className="relative p-5 border-2 border-primary/30 dark:border-primary/30 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-primary animate-pulse-soft" />
                <Sparkles className="w-5 h-5 text-brand-cyan animate-bounce-subtle" />
                <Sparkles className="w-6 h-6 text-accent animate-pulse-soft" />
              </div>
              <p className="text-lg font-black bg-primary bg-clip-text text-transparent">
                {t("goals.allCompleted")}
              </p>
              <p className="text-sm text-muted-foreground mt-1 font-semibold">
                Harika bir iş çıkardın! 🎉
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyGoals;
