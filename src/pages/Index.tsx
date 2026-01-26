import React from 'react';
import MobileLayout3D from '@/components/layout/MobileLayout3D';
import HeroSection from '@/components/home/HeroSection';
import PrayerCard3D from '@/components/home/PrayerCard3D';
import QuickActionsFloating from '@/components/home/QuickActionsFloating';
import StatsCards from '@/components/home/StatsCards';
import GoalsSection from '@/components/home/GoalsSection';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const { progress, dailyGoals, badges, quizStats, completeGoal, levelUpData, closeLevelUpCelebration } = usePersistedGameProgress();

  return (
    <MobileLayout3D>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero greeting section */}
        <HeroSection />
        
        {/* Stats overview - compact horizontal cards */}
        <StatsCards progress={progress} quizStats={quizStats} />
        
        {/* 3D Prayer Card - Main focal point */}
        <PrayerCard3D />
        
        {/* Floating quick actions */}
        <QuickActionsFloating />
        
        {/* Goals with circular progress */}
        <GoalsSection goals={dailyGoals} onGoalClick={completeGoal} />
        
        {/* Bottom spacing */}
        <div className="h-4" />
      </motion.div>

      {/* Level Up Celebration */}
      <LevelUpCelebration
        newLevel={levelUpData.newLevel}
        isVisible={levelUpData.show}
        onClose={closeLevelUpCelebration}
      />
    </MobileLayout3D>
  );
};

export default Index;
