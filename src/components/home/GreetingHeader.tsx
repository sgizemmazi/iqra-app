import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const GreetingHeader: React.FC = () => {
  const { language } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'tr') {
      if (hour < 12) return 'Günaydın';
      if (hour < 17) return 'İyi Günler';
      return 'İyi Akşamlar';
    }
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getSubtitle = () => {
    return language === 'tr' 
      ? 'Bugün huzurlu bir gün olsun' 
      : 'May peace be with you today';
  };

  return (
    <div className="px-6 pt-8 pb-4">
      <p className="font-arabic text-2xl text-primary mb-1">السلام عليكم</p>
      <h1 className="text-3xl font-bold text-foreground tracking-tight">
        {getGreeting()}
      </h1>
      <p className="text-muted-foreground mt-2 text-base">
        {getSubtitle()}
      </p>
    </div>
  );
};

export default GreetingHeader;
