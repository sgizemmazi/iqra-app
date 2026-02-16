import React, { useState } from 'react';
import { MapPin, Bell, BellOff, Volume2, Loader2, RefreshCw } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePrayerTimes, getNextPrayer, prayerNamesTr } from '@/hooks/usePrayerTimes';

const PrayerPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { prayerTimes, location, loading, refetch } = usePrayerTimes();
  const nextPrayer = getNextPrayer(prayerTimes);
  
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    Fajr: true,
    Sunrise: false,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  });
  
  const today = new Date().toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  const toggleNotification = (prayerKey: string) => {
    setNotifications(prev => ({
      ...prev,
      [prayerKey]: !prev[prayerKey]
    }));
  };

  const prayerList = prayerTimes ? [
    { key: 'Fajr', time: prayerTimes.Fajr },
    { key: 'Sunrise', time: prayerTimes.Sunrise },
    { key: 'Dhuhr', time: prayerTimes.Dhuhr },
    { key: 'Asr', time: prayerTimes.Asr },
    { key: 'Maghrib', time: prayerTimes.Maghrib },
    { key: 'Isha', time: prayerTimes.Isha },
  ] : [];

  const isPast = (time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const prayerTime = hours * 60 + minutes;
    const currentTime = now.getHours() * 60 + now.getMinutes();
    return prayerTime < currentTime;
  };

  const nextPrayerInfo = nextPrayer ? prayerNamesTr[nextPrayer.name] : null;

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{t('prayer.title')}</h1>
              <p className="text-muted-foreground">{today}</p>
            </div>
            <button 
              onClick={refetch}
              className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
              <RefreshCw className={cn("w-5 h-5 text-muted-foreground", loading && "animate-spin")} />
            </button>
          </div>
          
          {/* Location */}
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location?.city}, {location?.country}</span>
            <button className="text-primary font-medium ml-2">{t('prayer.change')}</button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Current Prayer Highlight */}
            <div className="px-6 mb-6">
              <div className="bg-primary rounded-3xl p-6 text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 pattern-dots opacity-10" />
                <div className="relative z-10">
                  <p className="opacity-60 text-sm mb-2">{t('prayer.nextPrayer')}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-arabic text-xl text-gold mb-1">{nextPrayerInfo?.arabic}</p>
                      <h2 className="text-3xl font-bold">
                        {language === 'tr' ? nextPrayerInfo?.tr : nextPrayer?.name}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold tabular-nums">{nextPrayer?.time}</p>
                      <p className="opacity-60 text-sm mt-1">{nextPrayer?.timeUntil} {t('prayer.remaining')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer List */}
            <div className="px-6">
              <div className="space-y-3">
                {prayerList.map((prayer) => {
                  const info = prayerNamesTr[prayer.key];
                  const isNext = nextPrayer?.name === prayer.key;
                  const passed = isPast(prayer.time);
                  
                  return (
                    <div
                      key={prayer.key}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl transition-all",
                        isNext 
                          ? "bg-primary/10 border-2 border-primary/30" 
                          : "bg-card border border-border/50",
                        passed && !isNext && "opacity-50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          isNext ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                          <span className="font-arabic text-lg">
                            {info.arabic.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className={cn(
                            "font-semibold",
                            isNext ? "text-primary" : "text-foreground"
                          )}>
                            {language === 'tr' ? info.tr : prayer.key}
                          </p>
                          <p className="font-arabic text-sm text-muted-foreground">
                            {info.arabic}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "text-xl font-semibold tabular-nums",
                          isNext ? "text-primary" : "text-foreground"
                        )}>
                          {prayer.time}
                        </span>
                        <button 
                          onClick={() => toggleNotification(prayer.key)}
                          className={cn(
                            "p-2 rounded-lg transition-colors",
                            notifications[prayer.key] 
                              ? "text-primary hover:bg-muted" 
                              : "text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {notifications[prayer.key] ? (
                            <Bell className="w-5 h-5" />
                          ) : (
                            <BellOff className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Adhan Settings */}
            <div className="px-6 py-6">
              <Button variant="gentle" className="w-full">
                <Volume2 className="w-5 h-5" />
                {t('prayer.adhanSettings')}
              </Button>
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
};

export default PrayerPage;
