import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowLeft, Trash2 } from 'lucide-react';
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

const defaultDhikrList: Dhikr[] = [
  { id: 'd1', ar: 'سُبْحَانَ اللّٰهِ', tr: 'Subhanallah', en: 'Glory be to Allah', count: 33 },
  { id: 'd2', ar: 'اَلْحَمْدُ لِلّٰهِ', tr: 'Alhamdulillah', en: 'Praise be to Allah', count: 33 },
  { id: 'd3', ar: 'اللّٰهُ اَكْبَرُ', tr: 'Allahu Akbar', en: 'Allah is the Greatest', count: 34 },
  { id: 'd4', ar: 'لَا إِلٰهَ إِلَّا اللّٰهُ', tr: 'La ilahe illallah', en: 'There is no god but Allah', count: 100 },
  { id: 'd5', ar: 'أَسْتَغْفِرُ اللّٰهَ', tr: 'Estağfirullah', en: 'I seek forgiveness from Allah', count: 100 },
  { id: 'd6', ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ', tr: 'La havle vela kuvvete illa billah', en: 'There is no power except with Allah', count: 10 },
];

interface SwipeableItemProps {
  dhikr: Dhikr;
  index: number;
  language: string;
  onDelete: (id: string) => void;
  onSelect: (dhikr: Dhikr) => void;
}

const SwipeableItem: React.FC<SwipeableItemProps> = ({ dhikr, index, language, onDelete, onSelect }) => {
  const x = useMotionValue(0);
  const deleteOpacity = useTransform(x, [-90, -20], [1, 0]);
  const deleteScale = useTransform(x, [-90, -20], [1, 0.6]);

  const handleDragEnd = (_: never, info: { offset: { x: number } }) => {
    if (info.offset.x < -72) {
      animate(x, -400, { duration: 0.2, ease: 'easeIn' }).then(() => onDelete(dhikr.id));
    } else {
      animate(x, 0, { type: 'spring', stiffness: 350, damping: 35 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative rounded-2xl overflow-hidden"
    >
      {/* Delete background */}
      <motion.div
        className="absolute inset-0 bg-destructive flex items-center justify-end pr-5 rounded-2xl"
        style={{ opacity: deleteOpacity }}
      >
        <motion.div style={{ scale: deleteScale }}>
          <Trash2 className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>

      {/* Swipeable card */}
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -90, right: 0 }}
        dragElastic={0.08}
        onDragEnd={handleDragEnd}
        className="glass-card p-5 rounded-2xl text-left cursor-grab active:cursor-grabbing"
        onClick={() => onSelect(dhikr)}
        whileTap={{ scale: 0.99 }}
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
            <span className="text-xs font-bold text-primary">
              {language === 'tr' ? 'Başla' : 'Start'} →
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ZikirListPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [items, setItems] = useState<Dhikr[]>(defaultDhikrList);

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(d => d.id !== id));
  };

  const handleSelect = (dhikr: Dhikr) => {
    navigate('/zikirmatik', {
      state: {
        target: dhikr.count,
        dhikrAr: dhikr.ar,
        dhikrTr: dhikr.tr,
        dhikrEn: dhikr.en,
      },
    });
  };

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
              ? 'Sola kaydırarak silebilirsiniz'
              : 'Swipe left to remove'}
          </p>
        </div>

        {/* Dhikr List */}
        <div className="px-5 py-6 space-y-3">
          {items.map((dhikr, index) => (
            <SwipeableItem
              key={dhikr.id}
              dhikr={dhikr}
              index={index}
              language={language}
              onDelete={handleDelete}
              onSelect={handleSelect}
            />
          ))}
          {items.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm font-bold">
                {language === 'tr' ? 'Liste boş' : 'List is empty'}
              </p>
            </div>
          )}
        </div>

        <div className="h-20" />
      </div>
    </MobileLayoutWarm>
  );
};

export default ZikirListPage;
