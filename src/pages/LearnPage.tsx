import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Heart, ChevronRight, CheckCircle2 } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface LearnItem {
  id: string;
  type: 'surah' | 'dua';
  nameKey: string;
  nameArabic: string;
  versesCount?: number;
  progress: number;
  isCompleted: boolean;
}

const surahs: LearnItem[] = [
  { id: '1', type: 'surah', nameKey: 'surah.fatiha', nameArabic: 'الفاتحة', versesCount: 7, progress: 100, isCompleted: true },
  { id: '112', type: 'surah', nameKey: 'surah.ikhlas', nameArabic: 'الإخلاص', versesCount: 4, progress: 75, isCompleted: false },
  { id: '113', type: 'surah', nameKey: 'surah.falaq', nameArabic: 'الفلق', versesCount: 5, progress: 50, isCompleted: false },
  { id: '114', type: 'surah', nameKey: 'surah.nas', nameArabic: 'الناس', versesCount: 6, progress: 25, isCompleted: false },
  { id: '110', type: 'surah', nameKey: 'surah.nasr', nameArabic: 'النصر', versesCount: 3, progress: 0, isCompleted: false },
];

const duas: LearnItem[] = [
  { id: 'd1', type: 'dua', nameKey: 'dua.beforeEating', nameArabic: 'دعاء قبل الطعام', progress: 100, isCompleted: true },
  { id: 'd2', type: 'dua', nameKey: 'dua.afterEating', nameArabic: 'دعاء بعد الطعام', progress: 60, isCompleted: false },
  { id: 'd3', type: 'dua', nameKey: 'dua.beforeSleeping', nameArabic: 'دعاء قبل النوم', progress: 0, isCompleted: false },
];

const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<'surahs' | 'duas'>('surahs');

  const items = activeTab === 'surahs' ? surahs : duas;

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">{t('learn.title')}</h1>
          <p className="text-muted-foreground">{t('learn.subtitle')}</p>
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
        {items.find(i => i.progress > 0 && !i.isCompleted) && (
          <div className="px-6 mb-6">
            <div className="bg-sage-light rounded-3xl p-5 border border-sage/20">
              <p className="text-sm text-sage font-medium mb-2">{t('learn.continueWhere')}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {t(items.find(i => i.progress > 0 && !i.isCompleted)?.nameKey || '')}
                  </p>
                  <p className="font-arabic text-muted-foreground">
                    {items.find(i => i.progress > 0 && !i.isCompleted)?.nameArabic}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/learn/${activeTab.slice(0, -1)}/${items.find(i => i.progress > 0 && !i.isCompleted)?.id}`)}
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
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => navigate(`/learn/${item.type}/${item.id}`)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 transition-all hover:shadow-soft text-left",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon */}
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center relative",
                item.isCompleted ? "bg-sage/20" : "bg-muted"
              )}>
                {item.isCompleted ? (
                  <CheckCircle2 className="w-7 h-7 text-sage" />
                ) : (
                  <span className="font-arabic text-xl text-muted-foreground">
                    {item.nameArabic.slice(0, 2)}
                  </span>
                )}
                {/* Progress ring */}
                {!item.isCompleted && item.progress > 0 && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      fill="none"
                      stroke="hsl(var(--sage))"
                      strokeWidth="3"
                      strokeDasharray={`${(item.progress / 100) * 150.8} 150.8`}
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
                {!item.isCompleted && item.progress > 0 && (
                  <p className="text-sm text-sage mt-1">%{item.progress} {t('learn.learned')}</p>
                )}
              </div>

              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default LearnPage;
