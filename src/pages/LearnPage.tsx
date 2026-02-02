import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Heart, ChevronRight, CheckCircle2, ArrowLeft, Grid3X3, List } from 'lucide-react';
import MobileLayoutWarm from '@/components/layout/MobileLayoutWarm';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { motion } from 'framer-motion';

interface LearnItem {
  id: string;
  type: 'surah' | 'dua';
  nameKey: string;
  nameArabic: string;
  versesCount?: number;
}

const surahs: LearnItem[] = [
  { id: '1', type: 'surah', nameKey: 'surah.fatiha', nameArabic: 'الفاتحة', versesCount: 7 },
  { id: '112', type: 'surah', nameKey: 'surah.ikhlas', nameArabic: 'الإخلاص', versesCount: 4 },
  { id: '113', type: 'surah', nameKey: 'surah.falaq', nameArabic: 'الفلق', versesCount: 5 },
  { id: '114', type: 'surah', nameKey: 'surah.nas', nameArabic: 'الناس', versesCount: 6 },
  { id: '110', type: 'surah', nameKey: 'surah.nasr', nameArabic: 'النصر', versesCount: 3 },
  { id: '108', type: 'surah', nameKey: 'surah.kawthar', nameArabic: 'الكوثر', versesCount: 3 },
  { id: '109', type: 'surah', nameKey: 'surah.kafirun', nameArabic: 'الكافرون', versesCount: 6 },
  { id: '111', type: 'surah', nameKey: 'surah.masad', nameArabic: 'المسد', versesCount: 5 },
];

const duas: LearnItem[] = [
  { id: 'd1', type: 'dua', nameKey: 'dua.beforeEating', nameArabic: 'دعاء قبل الطعام' },
  { id: 'd2', type: 'dua', nameKey: 'dua.afterEating', nameArabic: 'دعاء بعد الطعام' },
  { id: 'd3', type: 'dua', nameKey: 'dua.beforeSleeping', nameArabic: 'دعاء قبل النوم' },
  { id: 'd4', type: 'dua', nameKey: 'dua.waking', nameArabic: 'دعاء الاستيقاظ' },
  { id: 'd5', type: 'dua', nameKey: 'dua.leavingHome', nameArabic: 'دعاء الخروج' },
  { id: 'd6', type: 'dua', nameKey: 'dua.enteringHome', nameArabic: 'دعاء الدخول' },
  { id: 'd7', type: 'dua', nameKey: 'dua.traveling', nameArabic: 'دعاء السفر' },
  { id: 'd8', type: 'dua', nameKey: 'dua.enteringMosque', nameArabic: 'دعاء دخول المسجد' },
  { id: 'd9', type: 'dua', nameKey: 'dua.leavingMosque', nameArabic: 'دعاء الخروج من المسجد' },
  { id: 'd10', type: 'dua', nameKey: 'dua.rain', nameArabic: 'دعاء المطر' },
];

const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { learnedContent, isSurahLearned, isDuaLearned } = usePersistedGameProgress();
  const [activeTab, setActiveTab] = React.useState<'surahs' | 'duas'>('surahs');

  const items = activeTab === 'surahs' ? surahs : duas;

  const getItemProgress = (item: LearnItem): { progress: number; isCompleted: boolean } => {
    if (item.type === 'surah') {
      const isCompleted = isSurahLearned(item.id);
      return { progress: isCompleted ? 100 : 0, isCompleted };
    } else {
      const isCompleted = isDuaLearned(item.id);
      return { progress: isCompleted ? 100 : 0, isCompleted };
    }
  };

  const learnedSurahsCount = learnedContent.surahs.length;
  const learnedDuasCount = learnedContent.duas.length;
  const totalSurahs = surahs.length;
  const totalDuas = duas.length;

  return (
    <MobileLayoutWarm hideNav>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="detail-header">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-cream" />
            </button>
            <h1 className="text-lg font-semibold text-cream">{t('learn.title')}</h1>
            <div className="w-10" />
          </div>

          {/* Progress Stats */}
          <div className="flex items-center justify-center gap-8 py-4">
            <div className="text-center">
              <div className="dial-control w-16 h-16 mx-auto mb-2">
                <span className="text-lg font-bold text-sage">{learnedSurahsCount}/{totalSurahs}</span>
              </div>
              <span className="text-xs text-cream/80">{t('learn.surahs')}</span>
            </div>
            <div className="text-center">
              <div className="dial-control w-16 h-16 mx-auto mb-2">
                <span className="text-lg font-bold text-sage">{learnedDuasCount}/{totalDuas}</span>
              </div>
              <span className="text-xs text-cream/80">{t('learn.duas')}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 -mt-4 relative z-10">
          {/* Tab Switcher */}
          <motion.div 
            className="flex items-center justify-center mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="tab-switcher">
              <button 
                onClick={() => setActiveTab('surahs')}
                className={cn("tab-switcher-item", activeTab === 'surahs' && "active")}
              >
                <Grid3X3 className="w-4 h-4 inline-block mr-1.5" />
                {t('learn.surahs')}
              </button>
              <button 
                onClick={() => setActiveTab('duas')}
                className={cn("tab-switcher-item", activeTab === 'duas' && "active")}
              >
                <List className="w-4 h-4 inline-block mr-1.5" />
                {t('learn.duas')}
              </button>
            </div>
          </motion.div>

          {/* Continue Card */}
          {items.find(i => !getItemProgress(i).isCompleted) && (
            <motion.div 
              className="featured-card p-5 mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <p className="text-sm text-cream/80 mb-2">{t('learn.continueWhere')}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-cream">
                    {t(items.find(i => !getItemProgress(i).isCompleted)?.nameKey || '')}
                  </p>
                  <p className="font-arabic text-cream/70">
                    {items.find(i => !getItemProgress(i).isCompleted)?.nameArabic}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const item = items.find(i => !getItemProgress(i).isCompleted);
                    if (item) navigate(`/learn/${item.type}/${item.id}`);
                  }}
                  className="control-btn active"
                >
                  <span className="text-sm font-medium">{t('learn.continue')}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Room Cards Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-3 pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {items.map((item, index) => {
              const { isCompleted } = getItemProgress(item);
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => navigate(`/learn/${item.type}/${item.id}`)}
                  className={cn(
                    "room-card text-left",
                    isCompleted && "active"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="room-card-icon">
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : activeTab === 'surahs' ? (
                      <BookOpen className="w-6 h-6" />
                    ) : (
                      <Heart className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-center w-full">
                    <span className="text-sm font-semibold block truncate">
                      {t(item.nameKey)}
                    </span>
                    <span className="font-arabic text-xs opacity-70 block">
                      {item.nameArabic}
                    </span>
                    {item.versesCount && (
                      <span className="text-xs opacity-60 mt-1 block">
                        {item.versesCount} {t('learn.verses')}
                      </span>
                    )}
                  </div>
                  {isCompleted && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </MobileLayoutWarm>
  );
};

export default LearnPage;
