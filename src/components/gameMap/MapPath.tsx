import React from "react";
import { Position, createPathBetweenNodes } from "@/utils/spiralLayout";

export interface MapPathProps {
  /** Başlangıç pozisyonu */
  start: Position;
  /** Bitiş pozisyonu */
  end: Position;
  /** Yol tamamlanmış mı (renkli göster) */
  isCompleted?: boolean;
  /** Aktif yol mu (animasyon) */
  isActive?: boolean;
}

/**
 * MapPath Component
 * Node'lar arası bağlantı çizgilerini SVG ile çizer
 */
export const MapPath: React.FC<MapPathProps> = ({
  start,
  end,
  isCompleted = false,
  isActive = false,
}) => {
  const pathString = createPathBetweenNodes(start, end);

  return (
    <path
      d={pathString}
      fill="none"
      stroke={isCompleted ? "hsl(var(--accent))" : "hsl(var(--border))"}
      strokeWidth={isCompleted ? 3 : 2}
      strokeDasharray={isCompleted ? "0" : "5,5"}
      strokeLinecap="round"
      className={isActive ? "animate-pulse" : ""}
      opacity={isCompleted ? 0.8 : 0.3}
    />
  );
};

/**
 * MapPaths Component
 * Tüm map path'lerini bir SVG container'ında çizer
 */
export interface MapPathsProps {
  /** Tüm node pozisyonları (sırayla) */
  positions: Position[];
  /** Tamamlanmış node'ların index'leri */
  completedNodeIndices: Set<number>;
  /** Aktif (current) node'un index'i */
  currentNodeIndex?: number;
  /** SVG viewport genişliği */
  width: number;
  /** SVG viewport yüksekliği */
  height: number;
}

export const MapPaths: React.FC<MapPathsProps> = ({
  positions,
  completedNodeIndices,
  currentNodeIndex,
  width,
  height,
}) => {
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={width}
      height={height}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {positions.map((position, index) => {
        // Son node'dan sonra path yok
        if (index >= positions.length - 1) return null;

        const nextPosition = positions[index + 1];
        const isPathCompleted = completedNodeIndices.has(index);
        const isPathActive =
          currentNodeIndex !== undefined && index === currentNodeIndex;

        return (
          <MapPath
            key={`path-${index}`}
            start={position}
            end={nextPosition}
            isCompleted={isPathCompleted}
            isActive={isPathActive}
          />
        );
      })}
    </svg>
  );
};
