import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import GreetingHeader from '@/components/home/GreetingHeader';
import CurrentPrayerCard from '@/components/home/CurrentPrayerCard';
import QuickActions from '@/components/home/QuickActions';
import LevelProgress from '@/components/gamification/LevelProgress';
import DailyGoals from '@/components/gamification/DailyGoals';
import BadgeCollection from '@/components/gamification/BadgeCollection';
import { useGameProgress } from '@/hooks/useGameProgress';

const Index: React.FC = () => {
  const { progress, dailyGoals, badges, completeGoal } = useGameProgress();

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
        
        {/* Daily Goals */}
        <div className="px-6">
          <DailyGoals goals={dailyGoals} onGoalClick={completeGoal} />
        </div>

        {/* Badges */}
        <div className="px-6 pb-4">
          <BadgeCollection badges={badges} />
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
