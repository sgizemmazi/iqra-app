import React from 'react';
import { MapPin, Bell, BellOff, Volume2 } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Prayer {
  name: string;
  nameArabic: string;
  time: string;
  isNext: boolean;
  isPast: boolean;
  notificationEnabled: boolean;
}

const prayers: Prayer[] = [
  { name: 'Fajr', nameArabic: 'الفجر', time: '05:23', isNext: false, isPast: true, notificationEnabled: true },
  { name: 'Sunrise', nameArabic: 'الشروق', time: '06:52', isNext: false, isPast: true, notificationEnabled: false },
  { name: 'Dhuhr', nameArabic: 'الظهر', time: '12:45', isNext: true, isPast: false, notificationEnabled: true },
  { name: 'Asr', nameArabic: 'العصر', time: '16:15', isNext: false, isPast: false, notificationEnabled: true },
  { name: 'Maghrib', nameArabic: 'المغرب', time: '19:32', isNext: false, isPast: false, notificationEnabled: true },
  { name: 'Isha', nameArabic: 'العشاء', time: '21:05', isNext: false, isPast: false, notificationEnabled: true },
];

const PrayerPage: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="px-6 pt-8 pb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Prayer Times</h1>
          <p className="text-muted-foreground">{today}</p>
          
          {/* Location */}
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>New York, USA</span>
            <button className="text-primary font-medium ml-2">Change</button>
          </div>
        </div>

        {/* Current Prayer Highlight */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-3xl p-6 text-cream relative overflow-hidden">
            <div className="absolute inset-0 pattern-islamic opacity-10" />
            <div className="relative z-10">
              <p className="text-cream/60 text-sm mb-2">Next Prayer</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-arabic text-xl text-gold mb-1">الظهر</p>
                  <h2 className="text-3xl font-bold">Dhuhr</h2>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold">12:45</p>
                  <p className="text-cream/60 text-sm mt-1">in 2h 15m</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer List */}
        <div className="px-6">
          <div className="space-y-3">
            {prayers.map((prayer) => (
              <div
                key={prayer.name}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl transition-all",
                  prayer.isNext 
                    ? "bg-sage-light border-2 border-sage/30" 
                    : "bg-card border border-border/50",
                  prayer.isPast && "opacity-50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    prayer.isNext ? "bg-sage text-cream" : "bg-muted"
                  )}>
                    <span className="font-arabic text-lg">
                      {prayer.nameArabic.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className={cn(
                      "font-semibold",
                      prayer.isNext ? "text-sage-dark" : "text-foreground"
                    )}>
                      {prayer.name}
                    </p>
                    <p className="font-arabic text-sm text-muted-foreground">
                      {prayer.nameArabic}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={cn(
                    "text-xl font-semibold tabular-nums",
                    prayer.isNext ? "text-sage" : "text-foreground"
                  )}>
                    {prayer.time}
                  </span>
                  <button className={cn(
                    "p-2 rounded-lg transition-colors",
                    prayer.notificationEnabled 
                      ? "text-primary hover:bg-muted" 
                      : "text-muted-foreground hover:bg-muted"
                  )}>
                    {prayer.notificationEnabled ? (
                      <Bell className="w-5 h-5" />
                    ) : (
                      <BellOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adhan Settings */}
        <div className="px-6 py-6">
          <Button variant="gentle" className="w-full">
            <Volume2 className="w-5 h-5" />
            Adhan & Notification Settings
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PrayerPage;
