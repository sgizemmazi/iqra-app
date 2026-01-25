import React from 'react';
import { Clock, Bell, Volume2, MapPin, Loader2 } from 'lucide-react';
import { usePrayerTimes, getNextPrayer, prayerNamesTr } from '@/hooks/usePrayerTimes';
import { useLanguage } from '@/contexts/LanguageContext';

const CurrentPrayerCard: React.FC = () => {
  const { prayerTimes, location, loading } = usePrayerTimes();
  const { language } = useLanguage();
  const nextPrayer = getNextPrayer(prayerTimes);

  if (loading) {
    return (
      <div className="px-6">
        <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 text-primary-foreground shadow-large flex items-center justify-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  const prayerInfo = nextPrayer ? prayerNamesTr[nextPrayer.name] : null;
  const displayName = language === 'tr' ? prayerInfo?.tr : nextPrayer?.name;

  return (
    <div className="px-6">
      <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 text-primary-foreground shadow-large relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 pattern-islamic opacity-10" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 opacity-70" />
              <span className="text-sm opacity-70">
                {location?.city}, {location?.country}
              </span>
            </div>
            <button className="p-2 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Current Prayer Label */}
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 opacity-70" />
            <span className="text-sm opacity-70">{language === 'tr' ? 'Sonraki Namaz' : 'Next Prayer'}</span>
          </div>

          {/* Prayer Info */}
          <div className="flex items-end justify-between">
            <div>
              <p className="font-arabic text-2xl text-gold mb-1">
                {prayerInfo?.arabic}
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                {displayName}
              </h2>
            </div>
            
            <div className="text-right">
              <p className="text-4xl font-bold tabular-nums">
                {nextPrayer?.time}
              </p>
              <p className="opacity-60 text-sm mt-1">
                {nextPrayer?.timeUntil} {language === 'tr' ? 'kaldı' : 'remaining'}
              </p>
            </div>
          </div>

          {/* Adhan Button */}
          <button className="mt-5 w-full py-3 rounded-2xl bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-all flex items-center justify-center gap-2">
            <Volume2 className="w-5 h-5" />
            <span className="font-medium">{language === 'tr' ? 'Ezan Dinle' : 'Listen to Adhan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentPrayerCard;
