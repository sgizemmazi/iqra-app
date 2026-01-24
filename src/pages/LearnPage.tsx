import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Heart, ChevronRight, CheckCircle2 } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';

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
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">{t('learn.title')}</h1>
          <p className="text-muted-foreground">{t('learn.subtitle')}</p>
        </div>

        {/* Progress Summary */}
        <div className="px-6 mb-4">
          <div className="bg-card rounded-2xl p-4 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-2xl font-bold text-foreground">{learnedSurahsCount}/{totalSurahs}</p>
                <p className="text-xs text-muted-foreground">{t('learn.surahs')}</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center flex-1">
                <p className="text-2xl font-bold text-foreground">{learnedDuasCount}/{totalDuas}</p>
                <p className="text-xs text-muted-foreground">{t('learn.duas')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="px-6 mb-6">
          <div className="flex bg-muted rounded-2xl p-1.5">
            <button
              onClick={() => setActiveTab('surahs')}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                activeTab === 'surahs'
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground"
              )}
            >
              <BookOpen className="w-5 h-5" />
              {t('learn.surahs')}
            </button>
            <button
              onClick={() => setActiveTab('duas')}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                activeTab === 'duas'
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground"
              )}
            >
              <Heart className="w-5 h-5" />
              {t('learn.duas')}
            </button>
          </div>
        </div>

        {/* Continue Learning Card */}
        {items.find(i => !getItemProgress(i).isCompleted) && (
          <div className="px-6 mb-6">
            <div className="bg-sage-light rounded-3xl p-5 border border-sage/20">
              <p className="text-sm text-sage font-medium mb-2">{t('learn.continueWhere')}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {t(items.find(i => !getItemProgress(i).isCompleted)?.nameKey || '')}
                  </p>
                  <p className="font-arabic text-muted-foreground">
                    {items.find(i => !getItemProgress(i).isCompleted)?.nameArabic}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const item = items.find(i => !getItemProgress(i).isCompleted);
                    if (item) navigate(`/learn/${item.type}/${item.id}`);
                  }}
                  className="bg-sage text-cream px-5 py-2.5 rounded-xl font-medium hover:bg-sage-dark transition-colors"
                >
                  {t('learn.continue')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="px-6 space-y-3 pb-6">
          {items.map((item, index) => {
            const { progress, isCompleted } = getItemProgress(item);
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(`/learn/${item.type}/${item.id}`)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl bg-card border transition-all hover:shadow-soft text-left",
                  isCompleted ? "border-sage/30" : "border-border/50",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Icon */}
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center relative",
                  isCompleted ? "bg-sage/20" : "bg-muted"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-7 h-7 text-sage" />
                  ) : (
                    <span className="font-arabic text-xl text-muted-foreground">
                      {item.nameArabic.slice(0, 2)}
                    </span>
                  )}
                  {/* Progress ring for non-completed items */}
                  {!isCompleted && progress > 0 && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="hsl(var(--sage))"
                        strokeWidth="3"
                        strokeDasharray={`${(progress / 100) * 150.8} 150.8`}
                        strokeLinecap="round"
                        className="opacity-50"
                      />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{t(item.nameKey)}</p>
                    {item.versesCount && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {item.versesCount} {t('learn.verses')}
                      </span>
                    )}
                  </div>
                  <p className="font-arabic text-muted-foreground">{item.nameArabic}</p>
                  {isCompleted && (
                    <p className="text-sm text-sage mt-1">
                      {language === 'tr' ? 'Tamamlandı ✓' : 'Completed ✓'}
                    </p>
                  )}
                </div>

                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
};

export default LearnPage;