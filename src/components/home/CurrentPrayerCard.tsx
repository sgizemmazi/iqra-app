import React, { useState, useEffect } from 'react';
import { Clock, Bell, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Prayer {
  name: string;
  nameArabic: string;
  time: string;
}

const prayers: Prayer[] = [
  { name: 'Fajr', nameArabic: 'الفجر', time: '05:23' },
  { name: 'Dhuhr', nameArabic: 'الظهر', time: '12:45' },
  { name: 'Asr', nameArabic: 'العصر', time: '16:15' },
  { name: 'Maghrib', nameArabic: 'المغرب', time: '19:32' },
  { name: 'Isha', nameArabic: 'العشاء', time: '21:05' },
];

const CurrentPrayerCard: React.FC = () => {
  const [currentPrayer, setCurrentPrayer] = useState(prayers[1]); // Demo: Dhuhr
  const [timeUntil, setTimeUntil] = useState('2h 15m');

  return (
    <div className="px-6">
      <div className="bg-gradient-to-br from-navy to-navy-light rounded-3xl p-6 text-cream shadow-large relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 pattern-islamic opacity-10" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cream/70" />
              <span className="text-sm text-cream/70">Current Prayer</span>
            </div>
            <button className="p-2 rounded-xl bg-cream/10 hover:bg-cream/20 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Prayer Info */}
          <div className="flex items-end justify-between">
            <div>
              <p className="font-arabic text-2xl text-gold mb-1">
                {currentPrayer.nameArabic}
              </p>
              <h2 className="text-4xl font-bold tracking-tight">
                {currentPrayer.name}
              </h2>
              <p className="text-cream/60 mt-2 text-lg">
                {currentPrayer.time}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-cream/50 text-sm">Next prayer in</p>
              <p className="text-2xl font-semibold text-gold">{timeUntil}</p>
            </div>
          </div>

          {/* Adhan Button */}
          <button className="mt-6 w-full py-3 rounded-2xl bg-cream/10 hover:bg-cream/15 transition-all flex items-center justify-center gap-2 text-cream/90">
            <Volume2 className="w-5 h-5" />
            <span className="font-medium">Listen to Adhan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentPrayerCard;
