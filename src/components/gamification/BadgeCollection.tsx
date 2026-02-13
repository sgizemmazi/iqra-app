import React from "react";
import { Lock, Star, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/types/gamification";

interface BadgeCollectionProps {
  badges: Badge[];
  showAll?: boolean;
}

const BadgeCollection: React.FC<BadgeCollectionProps> = ({
  badges,
  showAll = false,
}) => {
  const earnedBadges = badges.filter((b) => b.isEarned);
  const lockedBadges = badges.filter((b) => !b.isEarned);
  const displayBadges = showAll ? badges : earnedBadges.slice(0, 4);

  const gradients = [
    "from-emerald-600 via-teal-600 to-cyan-600",
    "from-teal-600 via-cyan-600 to-blue-500",
    "from-blue-700 via-blue-500 to-cyan-600",
    "from-amber-500 via-orange-500 to-amber-600",
  ];

  return (
    <div className="glass-card rounded-3xl p-6 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 pattern-dots opacity-20"></div>

      <div className="relative z-10">
        {/* Header with gradient */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-600" /> Rozetlerim
            </h3>
            <p className="text-sm font-semibold text-muted-foreground mt-1">
              {earnedBadges.length}/{badges.length} rozet kazanıldı
            </p>
          </div>
          {!showAll && earnedBadges.length > 4 && (
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Tümünü Gör
            </button>
          )}
        </div>

        {/* Badges Grid with 3D effects */}
        <div className="grid grid-cols-4 gap-4">
          {displayBadges.map((badge, index) => {
            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={badge.id}
                className={cn(
                  "relative flex flex-col items-center animate-fade-in group",
                  !badge.isEarned && "opacity-60",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 3D Badge Icon */}
                <div className="relative mb-3">
                  {badge.isEarned ? (
                    <>
                      {/* Glow effect background */}
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-soft",
                        gradient
                      )}></div>

                      {/* Badge container */}
                      <div className={cn(
                        "relative w-20 h-20 rounded-3xl bg-gradient-to-br flex items-center justify-center text-3xl shadow-2xl transform transition-all group-hover:scale-110 group-hover:rotate-6",
                        gradient
                      )}>
                        {badge.icon}
                      </div>

                      {/* Sparkle decoration */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
                        <Star className="w-3 h-3 text-white" fill="white" />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Locked badge */}
                      <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shadow-xl">
                        <span className="opacity-30 text-3xl">{badge.icon}</span>
                        <div className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center">
                          <Lock className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Badge Name */}
                <p
                  className={cn(
                    "text-xs text-center font-bold line-clamp-2 px-1",
                    badge.isEarned
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                      : "text-muted-foreground",
                  )}
                >
                  {badge.name}
                </p>

                {/* Progress for locked badges with gradient */}
                {!badge.isEarned && badge.progress !== undefined && (
                  <div className="w-full mt-2 px-1">
                    <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${(badge.progress / (badge.maxProgress || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground text-center mt-1 font-semibold">
                      {badge.progress}/{badge.maxProgress}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Badge Preview with gradient card */}
        {lockedBadges.length > 0 && !showAll && (
          <div className="mt-6 p-4 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-amber-600/10 dark:from-emerald-600/20 dark:via-teal-600/20 dark:to-amber-600/20 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1">
                <Star className="w-3 h-3" />
                Sonraki rozet:
              </p>
              <div className="flex items-center gap-4">
                {/* Next badge icon */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-2xl shadow-lg">
                    <span className="opacity-40">{lockedBadges[0].icon}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">
                    {lockedBadges[0].name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {lockedBadges[0].requirement}
                  </p>
                </div>

                {lockedBadges[0].progress !== undefined && (
                  <div className="text-right">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg">
                      <p className="text-sm font-black text-white">
                        {lockedBadges[0].progress}/{lockedBadges[0].maxProgress}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress bar for next badge */}
              {lockedBadges[0].progress !== undefined && (
                <div className="mt-3 h-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full progress-gradient rounded-full transition-all duration-500"
                    style={{
                      width: `${(lockedBadges[0].progress / (lockedBadges[0].maxProgress || 1)) * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeCollection;
