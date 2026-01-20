import { useState, useCallback } from 'react';
import { UserProgress, Badge, DailyGoal } from '@/types/gamification';

const initialProgress: UserProgress = {
  level: 3,
  currentXP: 245,
  xpForNextLevel: 400,
  totalXP: 845,
  streak: 7,
  dailyGoalsCompleted: 2,
  dailyGoalsTotal: 4,
};

const initialBadges: Badge[] = [
  {
    id: 'first_surah',
    name: 'İlk Adım',
    nameArabic: 'الخطوة الأولى',
    description: 'İlk sureni tamamladın!',
    icon: '🌟',
    isEarned: true,
    earnedDate: '2024-01-15',
    category: 'learning',
    requirement: '1 sure tamamla',
  },
  {
    id: 'week_streak',
    name: '7 Gün Serisi',
    nameArabic: 'سلسلة ٧ أيام',
    description: 'Bir hafta boyunca her gün çalıştın!',
    icon: '🔥',
    isEarned: true,
    earnedDate: '2024-01-20',
    category: 'streak',
    requirement: '7 günlük seri yap',
  },
  {
    id: 'fatiha_master',
    name: 'Fatiha Ustası',
    nameArabic: 'ماهر الفاتحة',
    description: 'Fatiha suresini tamamen ezberledin!',
    icon: '📖',
    isEarned: true,
    earnedDate: '2024-01-18',
    category: 'learning',
    requirement: 'Fatiha suresini tamamla',
  },
  {
    id: 'quiz_master',
    name: 'Quiz Şampiyonu',
    nameArabic: 'بطل الاختبار',
    description: '10 quiz\'i art arda doğru bitir',
    icon: '🏆',
    isEarned: false,
    category: 'learning',
    requirement: '10 quiz başarıyla tamamla',
    progress: 6,
    maxProgress: 10,
  },
  {
    id: 'month_streak',
    name: '30 Gün Serisi',
    nameArabic: 'سلسلة ٣٠ يوماً',
    description: 'Bir ay boyunca her gün çalış!',
    icon: '💎',
    isEarned: false,
    category: 'streak',
    requirement: '30 günlük seri yap',
    progress: 7,
    maxProgress: 30,
  },
  {
    id: 'five_surahs',
    name: '5 Sure Hafızı',
    nameArabic: 'حافظ ٥ سور',
    description: '5 sureyi ezberle',
    icon: '✨',
    isEarned: false,
    category: 'learning',
    requirement: '5 sure ezberle',
    progress: 1,
    maxProgress: 5,
  },
];

const initialDailyGoals: DailyGoal[] = [
  {
    id: 'learn_ayah',
    title: 'Bugünkü Ayeti Öğren',
    description: '1 ayet ezberle',
    icon: '📖',
    xpReward: 25,
    isCompleted: true,
    progress: 1,
    maxProgress: 1,
    type: 'surah',
  },
  {
    id: 'daily_dua',
    title: 'Günün Duası',
    description: 'Bir dua oku ve dinle',
    icon: '🤲',
    xpReward: 15,
    isCompleted: true,
    progress: 1,
    maxProgress: 1,
    type: 'dua',
  },
  {
    id: 'quiz_complete',
    title: 'Quiz Tamamla',
    description: '1 quiz çöz',
    icon: '❓',
    xpReward: 30,
    isCompleted: false,
    progress: 0,
    maxProgress: 1,
    type: 'quiz',
  },
  {
    id: 'review_surah',
    title: 'Tekrar Yap',
    description: 'Öğrendiğin bir sureyi tekrar et',
    icon: '🔄',
    xpReward: 20,
    isCompleted: false,
    progress: 0,
    maxProgress: 1,
    type: 'surah',
  },
];

export function useGameProgress() {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>(initialDailyGoals);

  const addXP = useCallback((amount: number) => {
    setProgress((prev) => {
      let newXP = prev.currentXP + amount;
      let newLevel = prev.level;
      let xpNeeded = prev.xpForNextLevel;

      while (newXP >= xpNeeded) {
        newXP -= xpNeeded;
        newLevel += 1;
        xpNeeded = Math.floor(xpNeeded * 1.3);
      }

      return {
        ...prev,
        currentXP: newXP,
        level: newLevel,
        xpForNextLevel: xpNeeded,
        totalXP: prev.totalXP + amount,
      };
    });
  }, []);

  const completeGoal = useCallback((goalId: string) => {
    setDailyGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId && !goal.isCompleted) {
          addXP(goal.xpReward);
          return { ...goal, isCompleted: true, progress: goal.maxProgress };
        }
        return goal;
      })
    );
    setProgress((prev) => ({
      ...prev,
      dailyGoalsCompleted: prev.dailyGoalsCompleted + 1,
    }));
  }, [addXP]);

  const earnBadge = useCallback((badgeId: string) => {
    setBadges((prev) =>
      prev.map((badge) =>
        badge.id === badgeId
          ? { ...badge, isEarned: true, earnedDate: new Date().toISOString().split('T')[0] }
          : badge
      )
    );
    addXP(100); // Bonus XP for badges
  }, [addXP]);

  return {
    progress,
    badges,
    dailyGoals,
    addXP,
    completeGoal,
    earnBadge,
  };
}
