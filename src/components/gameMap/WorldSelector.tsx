import React from "react";
import { MapWorld } from "@/types/gameMap";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorldSelectorProps {
  worlds: MapWorld[];
  currentWorldId: string;
  onWorldChange: (worldId: string) => void;
  /** Kullanıcının toplam XP'si (world unlock kontrolü için) */
  totalXP: number;
}

/**
 * WorldSelector Component
 * Farklı dünyalar (Sureler, Peygamberler, vb.) arasında geçiş yapar
 */
export const WorldSelector: React.FC<WorldSelectorProps> = ({
  worlds,
  currentWorldId,
  onWorldChange,
  totalXP,
}) => {
  return (
    <div className="w-full bg-card border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {worlds.map((world) => {
            const isActive = world.id === currentWorldId;
            const isLocked = world.requiredXP
              ? totalXP < world.requiredXP
              : false;
            const canClick = !isLocked;

            return (
              <button
                key={world.id}
                onClick={() => canClick && onWorldChange(world.id)}
                disabled={isLocked}
                className={cn(
                  "flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl",
                  "transition-all duration-200",
                  "border-2",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",

                  // Active state
                  isActive &&
                    !isLocked &&
                    "bg-primary text-primary-foreground border-primary shadow-md",

                  // Inactive but unlocked
                  !isActive &&
                    !isLocked &&
                    "bg-card text-foreground border-border hover:border-primary/50 hover:shadow-sm cursor-pointer",

                  // Locked state
                  isLocked &&
                    "bg-muted text-muted-foreground border-border opacity-60 cursor-not-allowed",
                )}
                aria-label={`${world.title.tr} ${
                  isLocked ? "- Kilitli" : isActive ? "- Seçil i" : ""
                }`}
              >
                {/* İkon */}
                <span className="text-2xl">{world.icon}</span>

                {/* World bilgisi */}
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold">
                    {world.title.tr}
                  </span>

                  {/* Locked: Gereken XP göster */}
                  {isLocked && world.requiredXP && (
                    <div className="flex items-center gap-1 text-xs">
                      <Lock className="w-3 h-3" />
                      <span>{world.requiredXP} XP</span>
                    </div>
                  )}

                  {/* Unlocked: Node sayısı */}
                  {!isLocked && (
                    <span className="text-xs opacity-75">
                      {world.totalNodes} ders
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Aktif world açıklaması */}
        {worlds.find((w) => w.id === currentWorldId) && (
          <div className="mt-3 text-center">
            <p className="text-sm text-muted-foreground">
              {worlds.find((w) => w.id === currentWorldId)?.description.tr}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * scrollbar-hide utility için CSS (index.css'e eklenebilir)
 * .scrollbar-hide::-webkit-scrollbar {
 *   display: none;
 * }
 * .scrollbar-hide {
 *   -ms-overflow-style: none;
 *   scrollbar-width: none;
 * }
 */
