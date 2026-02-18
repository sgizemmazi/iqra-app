import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Heart, ChevronRight, CheckCircle2, ArrowLeft, Sparkles, Star } from 'lucide-react';
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
  { id: '48', type: 'surah', nameKey: 'surah.fath', nameArabic: 'الفتح', versesCount: 29 },
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

  const colors = [
    'bg-primary',
    'bg-brand-cyan',
    'bg-secondary',
    'bg-accent',
  ];

  return (
    <MobileLayoutWarm hideNav>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="p-5 pb-8 bg-primary rounded-b-3xl">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/')}
              className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-black text-white">{t('learn.title')}</h1>
            <div className="w-11" />
          </div>

          {/* Progress Stats with gradient cards */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-black text-white">{learnedSurahsCount}/{totalSurahs}</span>
              </div>
              <span className="text-xs font-bold text-white/90">{t('learn.surahs')}</span>
            </div>
            <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-black text-white">{learnedDuasCount}/{totalDuas}</span>
              </div>
              <span className="text-xs font-bold text-white/90">{t('learn.duas')}</span>
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
            <div className="inline-flex items-center gap-2 p-1.5 bg-muted rounded-2xl">
              <button
                onClick={() => setActiveTab('surahs')}
                className={cn(
                  'px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2',
                  activeTab === 'surahs'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <BookOpen className="w-4 h-4" />
                {t('learn.surahs')}
              </button>
              <button
                onClick={() => setActiveTab('duas')}
                className={cn(
                  'px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2',
                  activeTab === 'duas'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Heart className="w-4 h-4" />
                {t('learn.duas')}
              </button>
            </div>
          </motion.div>

          {/* Continue Card */}
          {items.find(i => !getItemProgress(i).isCompleted) && (
            <motion.div
              className="glass-card p-5 mb-5 rounded-2xl overflow-hidden relative group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {t('learn.continueWhere')}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-foreground">
                      {t(items.find(i => !getItemProgress(i).isCompleted)?.nameKey || '')}
                    </p>
                    <p className="font-arabic text-base text-muted-foreground">
                      {items.find(i => !getItemProgress(i).isCompleted)?.nameArabic}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const item = items.find(i => !getItemProgress(i).isCompleted);
                      if (item) navigate(`/learn/${item.type}/${item.id}`);
                    }}
                    className="px-5 py-2.5 bg-primary text-primary-foreground font-bold rounded-2xl hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <span className="text-sm">{t('learn.continue')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid Cards with gradients */}
          <motion.div
            className="grid grid-cols-2 gap-4 pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {items.map((item, index) => {
              const { isCompleted } = getItemProgress(item);
              const color = colors[index % colors.length];

              return (
                <motion.button
                  key={item.id}
                  onClick={() => navigate(`/learn/${item.type}/${item.id}`)}
                  className="relative glass-card p-5 rounded-2xl overflow-hidden group text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.03 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Hover bg */}
                  <div
                    className={cn(
                      'absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity',
                      color
                    )}
                  />

                  <div className="relative z-10 flex flex-col items-center gap-3">
                    {/* Icon */}
                    <div
                      className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center group-hover:shadow-xl transition-all',
                        isCompleted ? 'bg-primary' : color
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-7 h-7 text-primary-foreground" />
                      ) : activeTab === 'surahs' ? (
                        <BookOpen className="w-7 h-7 text-primary-foreground" />
                      ) : (
                        <Heart className="w-7 h-7 text-primary-foreground" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-center w-full">
                      <span className="text-sm font-black block truncate text-foreground">
                        {t(item.nameKey)}
                      </span>
                      <span className="font-arabic text-sm text-muted-foreground block mt-1">
                        {item.nameArabic}
                      </span>
                      {item.versesCount && (
                        <span className="text-xs text-muted-foreground mt-1 block font-semibold">
                          {item.versesCount} {t('learn.verses')}
                        </span>
                      )}
                    </div>

                    {/* Completion badge */}
                    {isCompleted && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-accent-foreground" fill="currentColor" />
                      </div>
                    )}
                  </div>
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
