import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MobileLayoutWarm from "@/components/layout/MobileLayoutWarm";
import HeaderWarm from "@/components/home/HeaderWarm";
import { GameMap } from "@/components/gameMap/GameMap";
import { LevelUpCelebration } from "@/components/gamification/LevelUpCelebration";
import { usePersistedGameProgress } from "@/hooks/usePersistedGameProgress";
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const { levelUpData, closeLevelUpCelebration } = usePersistedGameProgress();
  const location = useLocation();
  const { toast } = useToast();

  // Ders sonuç kontrolü
  useEffect(() => {
    const state = location.state as any;

    if (state?.lessonFailed) {
      toast({
        variant: "default",
        title: "❌ Ders Başarısız",
        description: `${state.lessonTitle} dersinde ${state.wrongCount} yanlış yaptınız. Lütfen dersi tekrar oynayın.`,
        duration: 5000,
      });
      // State'i temizle
      window.history.replaceState({}, document.title);
    } else if (state?.lessonCompleted) {
      const starsEmoji = "⭐".repeat(state.stars);
      const message = state.passed
        ? `Tebrikler! ${starsEmoji}`
        : `Checkpoint geçildi! Ancak yeterli puan alınamadı. ${state.stars} yıldız.`;

      toast({
        variant: "default",
        title: state.passed ? "✅ Ders Tamamlandı" : "⚠️ Düşük Puan",
        description: message,
        duration: 4000,
      });
      // State'i temizle
      window.history.replaceState({}, document.title);
    }
  }, [location, toast]);

  return (
    <MobileLayoutWarm>
      <div className="flex flex-col h-full">
        {/* Header with status info */}
        <HeaderWarm />

        {/* Game Map - Spiral lesson map */}
        <GameMap />
      </div>

      {/* Level Up Celebration */}
      <LevelUpCelebration
        newLevel={levelUpData.newLevel}
        isVisible={levelUpData.show}
        onClose={closeLevelUpCelebration}
      />
    </MobileLayoutWarm>
  );
};

export default Index;
