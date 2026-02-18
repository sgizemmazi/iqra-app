// ---------------------------------------------------------------------------
// Çok dilli metin
// ---------------------------------------------------------------------------
export interface I18nText {
  tr: string;
  en: string;
  ar: string;
}

// ---------------------------------------------------------------------------
// Kullanıcı ilerlemesi
// ---------------------------------------------------------------------------
export interface UserProgress {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  totalXP: number;
  streak: number;
  dailyGoalsCompleted: number;
  dailyGoalsTotal: number;
}

// ---------------------------------------------------------------------------
// Rozet
// ---------------------------------------------------------------------------
export interface Badge {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  icon: string;
  isEarned: boolean;
  earnedDate?: string;
  category: "learning" | "streak" | "prayer" | "special";
  requirement: string;
  progress?: number;
  maxProgress?: number;
}

// ---------------------------------------------------------------------------
// Günlük görev
// ---------------------------------------------------------------------------
export interface DailyGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  isCompleted: boolean;
  progress: number;
  maxProgress: number;
  type: "surah" | "dua" | "prayer" | "quiz";
}

// ---------------------------------------------------------------------------
// Quiz sorusu  —  trilingual (TR / EN / AR)
// ---------------------------------------------------------------------------
export interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "true_false" | "fill_blank";

  /** Sorunun her dildeki versiyonu */
  questionTr: string;
  questionEn: string;
  questionAr: string;

  /** Soruda atıfta bulunulan Arapça sure/ayet metni (isteğe bağlı, öne çıkarılır) */
  verseAr?: string;

  /** Seçenekler — her dilde ayrı */
  optionsTr?: string[];
  optionsEn?: string[];
  optionsAr?: string[];

  /** Doğru cevabın indexi (MCQ / T-F) */
  correctAnswer: string | number;

  /** Açıklama — her dilde */
  explanationTr?: string;
  explanationEn?: string;
  explanationAr?: string;

  xpReward: number;
  category: "surah" | "dua" | "islamic_knowledge" | "friday" | "ramadan";
}

// ---------------------------------------------------------------------------
// Quiz istatistikleri
// ---------------------------------------------------------------------------
export interface QuizStats {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  totalQuestions: number;
  correctAnswers: number;
}

// ---------------------------------------------------------------------------
// Leaderboard
// ---------------------------------------------------------------------------
export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  isCurrentUser: boolean;
}

// ---------------------------------------------------------------------------
// Ders tipi  —  Duolingo-stili günlük kısa ders
// ---------------------------------------------------------------------------
export type LessonStepType =
  | "intro" // Oku & oku — Arapça + çeviri + açıklama gösterilir
  | "read_translate" // Arapça gösterilir, kullanıcı doğru çeviriyi seçer
  | "fill_blank" // Arapça metinde boşluk var, kullanıcı eksik kelimeyi seçer
  | "review"; // Önceki ayetin tekrar sorusu (mekanik olarak read_translate gibi)

export interface LessonStep {
  id: string;
  type: LessonStepType;

  /** Arapça ayet metni ({BLANK} ile boşluk placeholder'ı taşıyabilir) */
  arabicText: string;
  transliteration: string;
  /** Doğru çeviri / doğru cevap */
  translation: I18nText;

  /** read_translate / review: yanlış seçenek çeviri */
  wrongOptions?: I18nText[];

  /** fill_blank: boşluğu dolduracak doğru Arapça kelime */
  blankWord?: string;
  /** fill_blank: yanlış kelime seçenekleri */
  wrongWords?: string[];

  /** Adım tamamlandığında gösterilen açıklama */
  explanation?: I18nText;

  xpReward: number;
}

export interface Lesson {
  id: string;
  title: I18nText;
  description: I18nText;
  contentType: "surah" | "dua" | "knowledge" | "checkpoint";
  contentId: string; // surah/dua id
  steps: LessonStep[];
  estimatedMinutes: number;
  totalXP: number; // step xpReward toplamı
  order: number; // öğrenme yolunda sıra
  difficulty: "easy" | "medium" | "hard";
  passThreshold?: number; // checkpoint quizler için minimum başarı yüzdesi
}

/** Tek bir ders için kullanıcı ilerlemesi */
export interface LessonProgress {
  lessonId: string;
  completedSteps: string[];
  completed: boolean;
  completedAt?: string;
  xpEarned: number;
  completionPercentage?: number;
}
