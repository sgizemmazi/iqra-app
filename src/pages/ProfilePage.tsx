import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Bell, Moon, Globe, Volume2, Info, Heart, History, Trash2 } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LevelProgress from '@/components/gamification/LevelProgress';
import BadgeCollection from '@/components/gamification/BadgeCollection';
import DailyGoals from '@/components/gamification/DailyGoals';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { progress, resetProgress } = usePersistedGameProgress();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetDialog(false);
  };

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header with Avatar */}
        <div className="px-6 pt-8 pb-6 text-center">
          <div className="w-24 h-24 rounded-full bg-sage-light mx-auto mb-4 flex items-center justify-center">
            <span className="font-arabic text-3xl text-sage">م</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t('profile.welcome')}</h1>
          <p className="text-muted-foreground mt-1">{t('profile.subtitle')}</p>
        </div>

        {/* Gamification Section */}
        <div className="px-6 mb-6 space-y-4">
          <LevelProgress progress={progress} />

          <DailyGoals
            goals={[
              {
                id: 'learn_ayah',
                title: 'Ayet Öğren',
                description: '1 ayet öğren',
                icon: '📖',
                xpReward: 50,
                isCompleted: true,
                progress: 1,
                maxProgress: 1,
                type: 'surah',
              },
              {
                id: 'daily_dua',
                title: 'Günlük Dua',
                description: 'Bir dua oku',
                icon: '🤲',
                xpReward: 30,
                isCompleted: false,
                progress: 0,
                maxProgress: 1,
                type: 'dua',
              },
              {
                id: 'quiz_complete',
                title: 'Quiz Tamamla',
                description: 'Bir quiz çöz',
                icon: '🎯',
                xpReward: 100,
                isCompleted: false,
                progress: 0,
                maxProgress: 1,
                type: 'quiz',
              },
            ]}
          />

          <BadgeCollection
            badges={[
              {
                id: '1',
                name: 'İlk Adım',
                nameArabic: 'أول خطوة',
                icon: '🌟',
                description: 'İlk adımı attın',
                requirement: '5 sure öğren',
                category: 'learning',
                isEarned: true,
              },
              {
                id: '2',
                name: 'Düzenli',
                nameArabic: 'منتظم',
                icon: '🔥',
                description: '7 gün seri yaptın',
                requirement: '7 gün seri',
                category: 'streak',
                isEarned: true,
              },
              {
                id: '3',
                name: 'Uzman',
                nameArabic: 'خبير',
                icon: '🏆',
                description: 'Quiz uzmanı',
                requirement: '50 quiz tamamla',
                category: 'learning',
                isEarned: false,
                progress: 23,
                maxProgress: 50,
              },
              {
                id: '4',
                name: 'Hafız',
                nameArabic: 'حافظ',
                icon: '📿',
                description: 'Hafızlık yolunda',
                requirement: '10 sure ezberle',
                category: 'special',
                isEarned: false,
                progress: 4,
                maxProgress: 10,
              },
            ]}
          />
        </div>

        {/* Preferences */}
        <div className="px-6 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {t('profile.preferences')}
          </h3>
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            {/* Notifications */}
            <button
              onClick={() => setNotifications(!notifications)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left border-b border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t('profile.notifications')}</p>
                  <p className="text-sm text-muted-foreground">{t('profile.notificationsDesc')}</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </button>

            {/* Audio Settings */}
            <button
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left border-b border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t('profile.audioSettings')}</p>
                  <p className="text-sm text-muted-foreground">{t('profile.audioDesc')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Language */}
            <button
              onClick={() => setShowLanguageDialog(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left border-b border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t('profile.language')}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'tr' ? 'Türkçe' : 'English'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Dark Mode */}
            <button
              onClick={() => handleDarkModeToggle(resolvedTheme !== 'dark')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left border-b border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Moon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t('profile.darkMode')}</p>
                  <p className="text-sm text-muted-foreground">{t('profile.darkModeDesc')}</p>
                </div>
              </div>
              <Switch checked={resolvedTheme === 'dark'} onCheckedChange={handleDarkModeToggle} />
            </button>

            {/* History */}
            <button
              onClick={() => navigate('/history')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <History className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t('profile.history')}</p>
                  <p className="text-sm text-muted-foreground">{t('profile.historyDesc')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* About */}
        <div className="px-6 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {t('profile.about')}
          </h3>
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            {/* Rate the App */}
            <button
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left border-b border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Heart className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground">{t('profile.rateApp')}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* About & Credits */}
            <button
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left border-b border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Info className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground">{t('profile.aboutCredits')}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Reset Progress */}
            <button
              onClick={() => setShowResetDialog(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-destructive">{t('profile.resetProgress')}</p>
                  <p className="text-sm text-muted-foreground">{t('profile.resetDesc')}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Version */}
        <div className="px-6 pb-8 text-center">
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground/60 mt-1">{t('profile.madeWith')}</p>
        </div>
      </div>

      {/* Language Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>{t('profile.language')}</DialogTitle>
          </DialogHeader>
          <LanguageSelector onClose={() => setShowLanguageDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>{t('profile.resetProgress')}</DialogTitle>
            <DialogDescription>
              {language === 'tr' 
                ? 'Tüm ilerlemeniz silinecek. Bu işlem geri alınamaz.'
                : 'All your progress will be deleted. This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleResetProgress}>
              {t('common.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
};

export default ProfilePage;
