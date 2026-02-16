import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/types/gamification';
import { useLanguage } from '@/contexts/LanguageContext';

interface BadgeCelebrationProps {
  badge: Badge | null;
  onClose: () => void;
}

const BadgeCelebration: React.FC<BadgeCelebrationProps> = ({ badge, onClose }) => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (badge) {
      setIsVisible(true);
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [badge]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!badge) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          {/* Islamic geometric pattern particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: '50vw',
                  y: '50vh',
                  rotate: 0
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1.5, 2],
                  x: `${30 + Math.random() * 40}vw`,
                  y: `${20 + Math.random() * 60}vh`,
                  rotate: 360
                }}
                transition={{ 
                  duration: 2 + Math.random(),
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
                className="absolute text-4xl"
              >
                {['✨', '☪️', '🌙', '⭐'][i % 4]}
              </motion.div>
            ))}
          </div>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
            className="relative bg-gradient-to-br from-card via-card to-gold-light/30 rounded-3xl p-8 mx-6 border border-gold/30 max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center"
              >
                <motion.span 
                  className="text-4xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {badge.icon}
                </motion.span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="text-center pt-8">
              {/* Arabic calligraphy style header */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-arabic text-2xl text-gold mb-2"
              >
                ماشاء الله
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold text-foreground mb-1"
              >
                {language === 'tr' ? 'Rozet Kazanıldı!' : 'Badge Earned!'}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-arabic text-lg text-muted-foreground mb-4"
              >
                {badge.nameArabic}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-muted/50 rounded-2xl p-4 mb-4"
              >
                <h3 className="text-lg font-bold text-foreground mb-1">{badge.name}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </motion.div>

              {/* XP reward */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center gap-2 text-sage font-semibold"
              >
                <span className="text-2xl">⚡</span>
                <span>+100 XP</span>
              </motion.div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={handleClose}
                className="mt-6 w-full py-3 bg-sage text-cream rounded-xl font-medium hover:bg-sage-dark transition-colors"
              >
                {language === 'tr' ? 'Harika!' : 'Great!'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeCelebration;
