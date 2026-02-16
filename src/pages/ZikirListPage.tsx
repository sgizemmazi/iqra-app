import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileLayoutWarm from '@/components/layout/MobileLayoutWarm';

interface Dhikr {
  id: string;
  ar: string;
  tr: string;
  en: string;
  count: number;
}

const dhikrList: Dhikr[] = [
  { id: 'd1', ar: 'سُبْحَانَ اللّٰهِ', tr: 'Subhanallah', en: 'Glory be to Allah', count: 33 },
  { id: 'd2', ar: 'اَلْحَمْدُ لِلّٰهِ', tr: 'Alhamdulillah', en: 'Praise be to Allah', count: 33 },
  { id: 'd3', ar: 'اللّٰهُ اَكْبَرُ', tr: 'Allahu Akbar', en: 'Allah is the Greatest', count: 34 },
  { id: 'd4', ar: 'لَا إِلٰهَ إِلَّا اللّٰهُ', tr: 'La ilahe illallah', en: 'There is no god but Allah', count: 100 },
  { id: 'd5', ar: 'أَسْتَغْفِرُ اللّٰهَ', tr: 'Estağfirullah', en: 'I seek forgiveness from Allah', count: 100 },
  { id: 'd6', ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ', tr: 'La havle vela kuvvete illa billah', en: 'There is no power except with Allah', count: 10 },
];

const ZikirListPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <MobileLayoutWarm hideNav>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="p-5 pb-8 bg-primary rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/zikirmatik')}
              className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-black text-white">
              {language === 'tr' ? 'Popüler Zikirler' : 'Popular Dhikr'}
            </h1>
            <div className="w-11" />
          </div>
          <p className="text-sm text-white/90 text-center">
            {language === 'tr'
              ? 'Bir zikir seçin ve saymaya başlayın'
              : 'Choose a dhikr and start counting'}
          </p>
        </div>

        {/* Dhikr List */}
        <div className="px-5 py-6 space-y-3">
          {dhikrList.map((dhikr, index) => (
            <motion.button
              key={dhikr.id}
              onClick={() => navigate('/zikirmatik', {
                state: {
                  target: dhikr.count,
                  dhikrAr: dhikr.ar,
                  dhikrTr: dhikr.tr,
                  dhikrEn: dhikr.en
                }
              })}
              className="w-full glass-card p-5 rounded-2xl text-left hover:bg-muted/50 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-arabic text-2xl text-foreground mb-2">
                    {dhikr.ar}
                  </p>
                  <p className="text-sm font-bold text-muted-foreground">
                    {language === 'tr' ? dhikr.tr : dhikr.en}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="px-4 py-2 bg-primary rounded-xl">
                    <span className="text-sm font-black text-primary-foreground">
                      {dhikr.count}x
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                    {language === 'tr' ? 'Başla' : 'Start'} →
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </MobileLayoutWarm>
  );
};

export default ZikirListPage;
