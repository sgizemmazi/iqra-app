import React from 'react';

const GreetingHeader: React.FC = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getIslamicGreeting = () => {
    return 'السلام عليكم';
  };

  return (
    <div className="px-6 pt-8 pb-4">
      <p className="font-arabic text-xl text-sage mb-1">{getIslamicGreeting()}</p>
      <h1 className="text-2xl font-semibold text-foreground">
        {getGreeting()}
      </h1>
      <p className="text-muted-foreground mt-1">
        May peace be with you today
      </p>
    </div>
  );
};

export default GreetingHeader;
