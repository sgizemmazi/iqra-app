import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import GreetingHeader from '@/components/home/GreetingHeader';
import CurrentPrayerCard from '@/components/home/CurrentPrayerCard';
import QuickActions from '@/components/home/QuickActions';
import ProgressOverview from '@/components/home/ProgressOverview';
import LevelProgress from '@/components/gamification/LevelProgress';
import DailyGoals from '@/components/gamification/DailyGoals';
import BadgeCollection from '@/components/gamification/BadgeCollection';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';

const Index: React.FC = () => {
  const { progress, dailyGoals, badges, quizStats, completeGoal, levelUpData, closeLevelUpCelebration } = usePersistedGameProgress();

  return (
    <MobileLayout>
      <div className="animate-fade-in space-y-4">
        <GreetingHeader />
        
        {/* Level & Streak - Compact */}
        <div className="px-6">
          <LevelProgress progress={progress} compact />
        </div>

        <CurrentPrayerCard />
        <QuickActions />
        
        {/* Progress Overview - Quiz Stats */}
        <div className="px-6">
          <ProgressOverview quizStats={quizStats} />
        </div>
        
        {/* Daily Goals */}
        <div className="px-6">
          <DailyGoals goals={dailyGoals} onGoalClick={completeGoal} />
        </div>

        {/* Badges */}
        <div className="px-6 pb-4">
          <BadgeCollection badges={badges} />
        </div>
      </div>

      {/* Level Up Celebration */}
      <LevelUpCelebration
        newLevel={levelUpData.newLevel}
        isVisible={levelUpData.show}
        onClose={closeLevelUpCelebration}
      />
    </MobileLayout>
  );
};

export default Index;
