import React from 'react';
import { Clock, Bell, Volume2, MapPin, Loader2, Sparkles } from 'lucide-react';
import { usePrayerTimes, getNextPrayer, prayerNamesTr } from '@/hooks/usePrayerTimes';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const PrayerCard3D: React.FC = () => {
  const { prayerTimes, location, loading } = usePrayerTimes();
  const { language } = useLanguage();
  const nextPrayer = getNextPrayer(prayerTimes);

  if (loading) {
    return (
      <div className="px-6">
        <div className="prayer-card-3d p-8 flex items-center justify-center min-h-[200px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-white/80" />
          </motion.div>
        </div>
      </div>
    );
  }

  const prayerInfo = nextPrayer ? prayerNamesTr[nextPrayer.name] : null;
  const displayName = language === 'tr' ? prayerInfo?.tr : nextPrayer?.name;

  return (
    <div className="px-6">
      <motion.div 
        className="prayer-card-3d relative"
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-islamic opacity-40 rounded-[calc(var(--radius)+8px)]" />
        
        {/* Decorative orb */}
        <motion.div 
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-gold/30 to-transparent blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative z-10 p-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.div 
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
              whileHover={{ scale: 1.02 }}
            >
              <MapPin className="w-4 h-4 text-white/80" />
              <span className="text-sm font-medium text-white/90">
                {location?.city}, {location?.country}
              </span>
            </motion.div>
            
            <motion.button 
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Main prayer info - stacked layout */}
          <div className="space-y-4">
            {/* Next prayer label */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-white/80" />
              </div>
              <span className="text-sm text-white/70 font-medium">
                {language === 'tr' ? 'Sonraki Namaz' : 'Next Prayer'}
              </span>
            </div>

            {/* Prayer name and time - hero display */}
            <div className="flex items-end justify-between">
              <div>
                <motion.p 
                  className="font-arabic text-2xl text-gold/90 mb-1"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {prayerInfo?.arabic}
                </motion.p>
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  {displayName}
                </h2>
              </div>
              
              <div className="text-right">
                <motion.p 
                  className="text-5xl font-bold text-white tabular-nums tracking-tight"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {nextPrayer?.time}
                </motion.p>
                <div className="flex items-center gap-1.5 justify-end mt-2">
                  <Sparkles className="w-4 h-4 text-gold/80" />
                  <p className="text-white/70 text-sm font-medium">
                    {nextPrayer?.timeUntil} {language === 'tr' ? 'kaldı' : 'left'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <motion.button 
            className="mt-7 w-full py-4 rounded-2xl bg-white/15 hover:bg-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-3 font-semibold text-white border border-white/10"
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
          >
            <Volume2 className="w-5 h-5" />
            <span>{language === 'tr' ? 'Ezan Dinle' : 'Listen to Adhan'}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PrayerCard3D;
