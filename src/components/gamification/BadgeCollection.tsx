import React from 'react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/types/gamification';

interface BadgeCollectionProps {
  badges: Badge[];
  showAll?: boolean;
}

const BadgeCollection: React.FC<BadgeCollectionProps> = ({ badges, showAll = false }) => {
  const earnedBadges = badges.filter(b => b.isEarned);
  const lockedBadges = badges.filter(b => !b.isEarned);
  const displayBadges = showAll ? badges : earnedBadges.slice(0, 4);

  return (
    <div className="bg-card rounded-3xl p-5 border border-border/50 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <span className="text-xl">🏅</span> Rozetlerim
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {earnedBadges.length}/{badges.length} rozet kazanıldı
          </p>
        </div>
        {!showAll && earnedBadges.length > 4 && (
          <button className="text-sm text-sage font-medium">
            Tümünü Gör
          </button>
        )}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-4 gap-3">
        {displayBadges.map((badge, index) => (
          <div
            key={badge.id}
            className={cn(
              "relative flex flex-col items-center animate-fade-in",
              !badge.isEarned && "opacity-50"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Badge Icon */}
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-1.5 relative",
              badge.isEarned 
                ? "bg-gradient-to-br from-gold-light to-amber-200 dark:from-gold-light/30 dark:to-amber-900/30 shadow-md" 
                : "bg-muted"
            )}>
              {badge.isEarned ? (
                badge.icon
              ) : (
                <>
                  <span className="opacity-30">{badge.icon}</span>
                  <Lock className="w-4 h-4 text-muted-foreground absolute bottom-1 right-1" />
                </>
              )}
            </div>

            {/* Badge Name */}
            <p className={cn(
              "text-xs text-center font-medium line-clamp-2",
              badge.isEarned ? "text-foreground" : "text-muted-foreground"
            )}>
              {badge.name}
            </p>

            {/* Progress for locked badges */}
            {!badge.isEarned && badge.progress !== undefined && (
              <div className="w-full mt-1">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sage/50 rounded-full"
                    style={{ width: `${(badge.progress / (badge.maxProgress || 1)) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-0.5">
                  {badge.progress}/{badge.maxProgress}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next Badge Preview */}
      {lockedBadges.length > 0 && !showAll && (
        <div className="mt-4 p-3 bg-muted/50 rounded-2xl">
          <p className="text-xs text-muted-foreground mb-2">Sonraki rozet:</p>
          <div className="flex items-center gap-3">
            <span className="text-xl">{lockedBadges[0].icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{lockedBadges[0].name}</p>
              <p className="text-xs text-muted-foreground">{lockedBadges[0].requirement}</p>
            </div>
            {lockedBadges[0].progress !== undefined && (
              <div className="text-right">
                <p className="text-sm font-bold text-sage">
                  {lockedBadges[0].progress}/{lockedBadges[0].maxProgress}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeCollection;
