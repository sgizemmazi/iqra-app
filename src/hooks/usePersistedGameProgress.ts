import { useState, useCallback, useRef, useEffect } from 'react';
import { UserProgress, Badge, DailyGoal } from '@/types/gamification';

export interface QuizStats {
  totalQuizzes: number;
  correctAnswers: number;
  totalQuestions: number;
  bestStreak: number;
}

const STORAGE_KEYS = {
  PROGRESS: 'game_progress',
  BADGES: 'game_badges',
  DAILY_GOALS: 'game_daily_goals',
  QUIZ_STATS: 'game_quiz_stats',
  COMPLETED_QUIZ_SETS: 'completed_quiz_sets',
};

const defaultProgress: UserProgress = {
  level: 1,
  currentXP: 0,
  xpForNextLevel: 100,
  totalXP: 0,
  streak: 0,
  dailyGoalsCompleted: 0,
  dailyGoalsTotal: 4,
};

const defaultQuizStats: QuizStats = {
  totalQuizzes: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  bestStreak: 0,
};

const defaultBadges: Badge[] = [
  {
    id: 'first_surah',
    name: 'İlk Adım',
    nameArabic: 'الخطوة الأولى',
    description: 'İlk sureni tamamladın!',
    icon: '🌟',
    isEarned: false,
    category: 'learning',
    requirement: '1 sure tamamla',
  },
  {
    id: 'week_streak',
    name: '7 Gün Serisi',
    nameArabic: 'سلسلة ٧ أيام',
    description: 'Bir hafta boyunca her gün çalıştın!',
    icon: '🔥',
    isEarned: false,
    category: 'streak',
    requirement: '7 günlük seri yap',
    progress: 0,
    maxProgress: 7,
  },
  {
    id: 'fatiha_master',
    name: 'Fatiha Ustası',
    nameArabic: 'ماهر الفاتحة',
    description: 'Fatiha suresini tamamen ezberledin!',
    icon: '📖',
    isEarned: false,
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
    progress: 0,
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
    progress: 0,
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
    progress: 0,
    maxProgress: 5,
  },
];

const getDefaultDailyGoals = (): DailyGoal[] => [
  {
    id: 'learn_ayah',
    title: 'Bugünkü Ayeti Öğren',
    description: '1 ayet ezberle',
    icon: '📖',
    xpReward: 25,
    isCompleted: false,
    progress: 0,
    maxProgress: 1,
    type: 'surah',
  },
  {
    id: 'daily_dua',
    title: 'Günün Duası',
    description: 'Bir dua oku ve dinle',
    icon: '🤲',
    xpReward: 15,
    isCompleted: false,
    progress: 0,
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

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
  }
  return defaultValue;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

export function usePersistedGameProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => 
    loadFromStorage(STORAGE_KEYS.PROGRESS, defaultProgress)
  );
  const [badges, setBadges] = useState<Badge[]>(() => 
    loadFromStorage(STORAGE_KEYS.BADGES, defaultBadges)
  );
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>(() => 
    loadFromStorage(STORAGE_KEYS.DAILY_GOALS, getDefaultDailyGoals())
  );
  const [quizStats, setQuizStats] = useState<QuizStats>(() => 
    loadFromStorage(STORAGE_KEYS.QUIZ_STATS, defaultQuizStats)
  );
  const [completedQuizSets, setCompletedQuizSets] = useState<string[]>(() => 
    loadFromStorage(STORAGE_KEYS.COMPLETED_QUIZ_SETS, [])
  );
  const [levelUpData, setLevelUpData] = useState<{ show: boolean; newLevel: number }>({
    show: false,
    newLevel: 0,
  });
  const previousLevelRef = useRef(progress.level);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROGRESS, progress);
  }, [progress]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BADGES, badges);
  }, [badges]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.DAILY_GOALS, dailyGoals);
  }, [dailyGoals]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.QUIZ_STATS, quizStats);
  }, [quizStats]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.COMPLETED_QUIZ_SETS, completedQuizSets);
  }, [completedQuizSets]);

  const closeLevelUpCelebration = useCallback(() => {
    setLevelUpData({ show: false, newLevel: 0 });
  }, []);

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

      // Trigger level up celebration
      if (newLevel > previousLevelRef.current) {
        previousLevelRef.current = newLevel;
        setTimeout(() => {
          setLevelUpData({ show: true, newLevel });
        }, 300);
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

  const recordQuizResult = useCallback((correctAnswers: number, totalQuestions: number, streak: number) => {
    setQuizStats((prev) => {
      const newStats = {
        totalQuizzes: prev.totalQuizzes + 1,
        correctAnswers: prev.correctAnswers + correctAnswers,
        totalQuestions: prev.totalQuestions + totalQuestions,
        bestStreak: Math.max(prev.bestStreak, streak),
      };

      // Check for quiz master badge
      if (newStats.totalQuizzes >= 10) {
        setBadges((badges) =>
          badges.map((badge) =>
            badge.id === 'quiz_master' && !badge.isEarned
              ? { ...badge, isEarned: true, earnedDate: new Date().toISOString().split('T')[0] }
              : badge
          )
        );
      }

      return newStats;
    });

    // Update badge progress
    setBadges((prev) =>
      prev.map((badge) =>
        badge.id === 'quiz_master' && !badge.isEarned
          ? { ...badge, progress: Math.min((badge.progress || 0) + 1, badge.maxProgress || 10) }
          : badge
      )
    );
  }, []);

  const markQuizSetCompleted = useCallback((quizSetId: string) => {
    setCompletedQuizSets((prev) => {
      if (!prev.includes(quizSetId)) {
        return [...prev, quizSetId];
      }
      return prev;
    });
  }, []);

  const isQuizSetCompleted = useCallback((quizSetId: string) => {
    return completedQuizSets.includes(quizSetId);
  }, [completedQuizSets]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    setBadges(defaultBadges);
    setDailyGoals(getDefaultDailyGoals());
    setQuizStats(defaultQuizStats);
    setCompletedQuizSets([]);
    previousLevelRef.current = defaultProgress.level;
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }, []);

  return {
    progress,
    badges,
    dailyGoals,
    quizStats,
    completedQuizSets,
    addXP,
    completeGoal,
    earnBadge,
    recordQuizResult,
    markQuizSetCompleted,
    isQuizSetCompleted,
    resetProgress,
    levelUpData,
    closeLevelUpCelebration,
  };
}
