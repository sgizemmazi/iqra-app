export interface UserProgress {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  totalXP: number;
  streak: number;
  dailyGoalsCompleted: number;
  dailyGoalsTotal: number;
}

export interface Badge {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  icon: string;
  isEarned: boolean;
  earnedDate?: string;
  category: 'learning' | 'streak' | 'prayer' | 'special';
  requirement: string;
  progress?: number;
  maxProgress?: number;
}

export interface DailyGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  isCompleted: boolean;
  progress: number;
  maxProgress: number;
  type: 'surah' | 'dua' | 'prayer' | 'quiz';
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank';
  question: string;
  questionArabic?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  xpReward: number;
  category: 'surah' | 'dua' | 'islamic_knowledge' | 'friday' | 'ramadan';
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  isCurrentUser: boolean;
}
