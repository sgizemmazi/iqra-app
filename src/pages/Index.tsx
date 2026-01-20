import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import GreetingHeader from '@/components/home/GreetingHeader';
import CurrentPrayerCard from '@/components/home/CurrentPrayerCard';
import QuickActions from '@/components/home/QuickActions';
import GentleReminder from '@/components/home/GentleReminder';
import ProgressOverview from '@/components/home/ProgressOverview';

const Index: React.FC = () => {
  return (
    <MobileLayout>
      <div className="animate-fade-in">
        <GreetingHeader />
        <CurrentPrayerCard />
        <QuickActions />
        <GentleReminder />
        <ProgressOverview />
      </div>
    </MobileLayout>
  );
};

export default Index;
