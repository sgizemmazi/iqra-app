import React from 'react';
import MobileLayoutWarm from '@/components/layout/MobileLayoutWarm';
import HeaderWarm from '@/components/home/HeaderWarm';
import QuickActionsWarm from '@/components/home/QuickActionsWarm';
import DialControlWarm from '@/components/home/DialControlWarm';
import DeviceCardsWarm from '@/components/home/DeviceCardsWarm';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const { progress, levelUpData, closeLevelUpCelebration } = usePersistedGameProgress();

  return (
    <MobileLayoutWarm>
      <motion.div 
        className="space-y-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with status info */}
        <HeaderWarm />
        
        {/* Quick Actions Grid - Rooms style */}
        <QuickActionsWarm />
        
        {/* Dial Control - Temperature style */}
        <DialControlWarm progress={progress} />
        
        {/* Device Cards - Bottom devices */}
        <DeviceCardsWarm />
        
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