import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapNode } from "./MapNode";
import { MapPaths } from "./MapPath";
import { lessons } from "@/data/lessonsData";
import { prophetLessons } from "@/data/prophetLessons";
import { MapNode as MapNodeType } from "@/types/gameMap";
import { Lesson } from "@/types/gamification";
import { calculateResponsiveSpiralPositions } from "@/utils/spiralLayout";
import { usePersistedGameProgress } from "@/hooks/usePersistedGameProgress";

/**
 * GameMap Component
 * Ana oyun haritası - zigzag layout ile tüm lesson'ları gösterir
 * Önce sureler, sonra peygamberler art arda devam eder
 */
export const GameMap: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Progress hook'tan veri al
  const { progress } = usePersistedGameProgress();

  // Container width için state
  const [containerWidth, setContainerWidth] = React.useState(375);

  // Window resize listener
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Tüm lesson'ları birleştir (önce sureler, sonra peygamberler)
  const allLessons = useMemo((): Lesson[] => {
    return [...lessons, ...prophetLessons];
  }, []);

  // Spiral pozisyonları hesapla
  const nodePositions = useMemo(() => {
    return calculateResponsiveSpiralPositions(
      allLessons.length,
      containerWidth,
    );
  }, [allLessons.length, containerWidth]);

  // Map node'ları oluştur
  const mapNodes = useMemo((): MapNodeType[] => {
    return allLessons.map((lesson, index) => {
      const position = nodePositions[index];

      // Progress kontrolü
      const lessonProgress = progress?.lessonProgress?.[lesson.id];
      const isCompleted = lessonProgress?.completed || false;

      // İlk node her zaman unlocked
      // Diğerleri: önceki dersten 3 yıldız alınması gerekli (%90+)
      let isUnlocked = index === 0;
      if (index > 0) {
        const previousLesson = allLessons[index - 1];
        const previousProgress = progress?.lessonProgress?.[previousLesson?.id];
        const isPreviousCompleted = previousProgress?.completed || false;
        const previousScore = previousProgress?.completionPercentage || 0;

        // Eğer önceki ders checkpoint ise, pass threshold kontrolü yap
        if (previousLesson?.contentType === 'checkpoint' && previousLesson.passThreshold) {
          isUnlocked = isPreviousCompleted && previousScore >= previousLesson.passThreshold;
        } else {
          // Normal ders - 3 yıldız gerekli (%90+ başarı)
          isUnlocked = isPreviousCompleted && previousScore >= 90;
        }
      }

      // Stars: completion percentage'a göre
      let stars: 0 | 1 | 2 | 3 = 0;
      if (isCompleted && lessonProgress) {
        const completionPercent = lessonProgress.completionPercentage || 0;
        if (completionPercent >= 90) stars = 3;
        else if (completionPercent >= 70) stars = 2;
        else if (completionPercent >= 50) stars = 1;
      }

      return {
        id: `lesson_node_${index}`,
        worldId: "all_lessons",
        lessonId: lesson.id,
        order: index,
        position,
        isUnlocked,
        isCompleted,
        stars,
      };
    });
  }, [allLessons, nodePositions, progress]);

  // Tamamlanmış node index'leri
  const completedNodeIndices = useMemo(() => {
    const indices = new Set<number>();
    mapNodes.forEach((node, index) => {
      if (node.isCompleted) {
        indices.add(index);
      }
    });
    return indices;
  }, [mapNodes]);

  // Current (aktif) node index'i - ilk incomplete node
  const currentNodeIndex = useMemo(() => {
    return mapNodes.findIndex((node) => !node.isCompleted && node.isUnlocked);
  }, [mapNodes]);

  // Node tıkla - lesson'a git
  const handleNodeClick = (node: MapNodeType, lesson: Lesson) => {
    if (node.isUnlocked) {
      navigate(`/learn/lesson/${lesson.id}`);
    }
  };

  // SVG viewport boyutları
  const viewportHeight = useMemo(() => {
    if (nodePositions.length === 0) return 600;
    const maxY = Math.max(...nodePositions.map((p) => p.y));
    return maxY + 150; // Alt padding
  }, [nodePositions]);

  return (
    <div className="w-full bg-background h-full">
      {/* Map Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-y-auto"
      >
        {/* Path'ler (background) */}
        <MapPaths
          positions={nodePositions}
          completedNodeIndices={completedNodeIndices}
          currentNodeIndex={currentNodeIndex}
          width={containerWidth}
          height={viewportHeight}
        />

        {/* Node'lar (foreground) */}
        <div
          className="relative"
          style={{
            width: `${containerWidth}px`,
            height: `${viewportHeight}px`,
          }}
        >
          {mapNodes.map((node, index) => {
            const lesson = allLessons[index];
            if (!lesson) return null;

            return (
              <MapNode
                key={node.id}
                node={node}
                lesson={lesson}
                onClick={() => handleNodeClick(node, lesson)}
                isCurrent={index === currentNodeIndex}
              />
            );
          })}
        </div>

        {/* Tebrik mesajı - tüm dersler tamamlandıysa */}
        {mapNodes.length > 0 && mapNodes.every((node) => node.isCompleted) && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-6 py-3 rounded-2xl shadow-lg animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="font-bold">Tebrikler!</p>
                <p className="text-sm">Tüm dersler tamamlandı!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameMap;
