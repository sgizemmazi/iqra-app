import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const { language } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'tr') {
      if (hour < 6) return 'Hayırlı Geceler';
      if (hour < 12) return 'Hayırlı Sabahlar';
      if (hour < 17) return 'Hayırlı Günler';
      if (hour < 21) return 'Hayırlı Akşamlar';
      return 'Hayırlı Geceler';
    }
    if (hour < 6) return 'Good Night';
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  return (
    <div className="relative px-6 pt-10 pb-6 overflow-hidden">
      {/* Decorative floating elements */}
      <motion.div 
        className="absolute top-8 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 blur-xl"
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-20 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 blur-lg"
        animate={{ 
          y: [0, 8, 0],
          x: [0, 4, 0],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Main content */}
      <div className="relative z-10">
        {/* Arabic greeting with glow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-arabic text-3xl text-gradient-gold inline-block">
            السلام عليكم
          </span>
        </motion.div>

        {/* Main greeting */}
        <motion.h1 
          className="text-4xl font-bold text-foreground mt-3 tracking-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {getGreeting()}
        </motion.h1>

        {/* Subtitle with floating pill style */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4"
        >
          <span className="floating-badge text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {language === 'tr' 
              ? 'Huzurlu bir gün dileriz' 
              : 'Wishing you a peaceful day'}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
