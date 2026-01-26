import React from 'react';
import MobileLayoutWarm from '@/components/layout/MobileLayoutWarm';
import HeaderWarm from '@/components/home/HeaderWarm';
import LastReadCard from '@/components/home/LastReadCard';
import QuickActionsWarm from '@/components/home/QuickActionsWarm';
import SurahListPreview from '@/components/home/SurahListPreview';
import ProgressCardWarm from '@/components/home/ProgressCardWarm';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const { progress, dailyGoals, badges, quizStats, completeGoal, levelUpData, closeLevelUpCelebration } = usePersistedGameProgress();

  return (
    <MobileLayoutWarm>
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <HeaderWarm />
        
        {/* Last Read Card - Featured */}
        <LastReadCard />
        
        {/* Quick Actions Grid */}
        <QuickActionsWarm />
        
        {/* Surah List Preview */}
        <SurahListPreview />
        
        {/* Progress Card */}
        <ProgressCardWarm progress={progress} />
        
        {/* Bottom spacing */}
        <div className="h-4" />
      </motion.div>

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