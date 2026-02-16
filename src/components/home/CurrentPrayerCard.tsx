import React from 'react';
import { Clock, Bell, Volume2, MapPin, Loader2 } from 'lucide-react';
import { usePrayerTimes, getNextPrayer, prayerNamesTr } from '@/hooks/usePrayerTimes';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const CurrentPrayerCard: React.FC = () => {
  const { prayerTimes, location, loading } = usePrayerTimes();
  const { language } = useLanguage();
  const nextPrayer = getNextPrayer(prayerTimes);

  if (loading) {
    return (
      <div className="px-6">
        <div className="glass-card rounded-3xl p-6 flex items-center justify-center min-h-[180px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const prayerInfo = nextPrayer ? prayerNamesTr[nextPrayer.name] : null;
  const displayName = language === 'tr' ? prayerInfo?.tr : nextPrayer?.name;

  return (
    <div className="px-6">
      <motion.div 
        className="relative rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-sage-dark" />
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 pattern-islamic opacity-10" />
        
        {/* Content */}
        <div className="relative z-10 p-6 text-primary-foreground">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">
                {location?.city}, {location?.country}
              </span>
            </div>
            <button className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Prayer Info */}
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 opacity-70" />
                <span className="text-sm opacity-70">{language === 'tr' ? 'Sonraki Namaz' : 'Next Prayer'}</span>
              </div>
              <p className="font-arabic text-xl text-gold/90 mb-1">
                {prayerInfo?.arabic}
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                {displayName}
              </h2>
            </div>
            
            <div className="text-right">
              <p className="text-4xl font-bold tabular-nums tracking-tight">
                {nextPrayer?.time}
              </p>
              <p className="opacity-70 text-sm mt-1 font-medium">
                {nextPrayer?.timeUntil} {language === 'tr' ? 'kaldı' : 'remaining'}
              </p>
            </div>
          </div>

          {/* Adhan Button */}
          <button className="mt-6 w-full py-3.5 rounded-2xl bg-white/15 hover:bg-white/20 transition-all flex items-center justify-center gap-2 font-medium backdrop-blur-sm">
            <Volume2 className="w-5 h-5" />
            <span>{language === 'tr' ? 'Ezan Dinle' : 'Listen to Adhan'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CurrentPrayerCard;
