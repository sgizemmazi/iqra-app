import React from "react";
import { MapNode as MapNodeType } from "@/types/gameMap";
import { Lesson } from "@/types/gamification";
import { Lock, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MapNodeProps {
  node: MapNodeType;
  lesson: Lesson;
  onClick?: () => void;
  isCurrent?: boolean;
}

/**
 * MapNode Component
 * Haritadaki her bir ders node'unu gösterir
 * 3 durum: Locked, Unlocked, Completed
 */
export const MapNode: React.FC<MapNodeProps> = ({
  node,
  lesson,
  onClick,
  isCurrent = false,
}) => {
  const { isUnlocked, isCompleted, stars } = node;

  // Durum belirleme
  const isLocked = !isUnlocked;
  const canClick = isUnlocked && onClick;
  const isCheckpoint = lesson.contentType === "checkpoint";

  return (
    <div
      className="absolute"
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
        transform: "translate(-50%, -50%)", // Merkeze hizala
      }}
    >
      <button
        onClick={canClick ? onClick : undefined}
        disabled={isLocked}
        className={cn(
          "relative flex flex-col items-center justify-center",
          "transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",

          // Checkpoint nodes are larger and have special styling
          isCheckpoint ? "w-24 h-24 rounded-3xl" : "w-20 h-20 rounded-2xl",

          // Locked state
          isLocked &&
            "bg-muted border-2 border-border cursor-not-allowed opacity-60",

          // Checkpoint unlocked state (golden/warning color)
          !isLocked &&
            !isCompleted &&
            isCheckpoint &&
            "bg-amber-500 text-white border-2 border-amber-600 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer ring-2 ring-amber-300",

          // Normal unlocked state
          !isLocked &&
            !isCompleted &&
            !isCheckpoint &&
            "bg-primary text-primary-foreground border-2 border-primary shadow-md hover:shadow-lg hover:scale-105 cursor-pointer",

          // Current node (pulse animation)
          isCurrent && !isCompleted && "animate-pulse-soft ring-2 ring-accent",

          // Checkpoint completed state (golden)
          isCompleted &&
            isCheckpoint &&
            "bg-amber-100 text-amber-900 border-2 border-amber-400 shadow-sm",

          // Normal completed state
          isCompleted &&
            !isCheckpoint &&
            "bg-accent text-accent-foreground border-2 border-accent/80 shadow-sm",
        )}
        aria-label={`${lesson.title.tr} - ${
          isLocked ? "Kilitli" : isCompleted ? "Tamamlandı" : "Oyna"
        }`}
      >
        {/* İkon */}
        <div className="text-2xl mb-1">
          {isLocked && <Lock className="w-6 h-6" />}
          {!isLocked && !isCompleted && (
            <span className="text-2xl">
              {getIconForContentType(lesson.contentType)}
            </span>
          )}
          {isCompleted && <Check className="w-6 h-6" />}
        </div>

        {/* Node numarası */}
        <div className="text-xs font-semibold">{node.order + 1}</div>

        {/* Completed: Yıldız gösterimi */}
        {isCompleted && stars > 0 && (
          <div className="absolute -bottom-2 flex gap-0.5">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-accent text-accent" />
            ))}
          </div>
        )}

        {/* XP badge (unlocked nodes için) */}
        {!isLocked && !isCompleted && (
          <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
            +{lesson.totalXP}
          </div>
        )}
      </button>

      {/* Node ismi (sadece unlocked/current için) */}
      {(isUnlocked || isCurrent) && (
        <div className="absolute top-full mt-2 text-center w-24 -translate-x-1/2 left-1/2">
          <p className="text-[10px] font-medium text-foreground truncate">
            {lesson.title.tr}
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Content type'a göre emoji/ikon döndür
 */
function getIconForContentType(contentType: string): string {
  switch (contentType) {
    case "surah":
      return "📖";
    case "dua":
      return "🤲";
    case "knowledge":
      return "⭐";
    case "checkpoint":
      return "🏆";
    default:
      return "📚";
  }
}
