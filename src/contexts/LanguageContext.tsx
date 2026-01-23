import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface Translations {
  [key: string]: {
    tr: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { tr: 'Ana Sayfa', en: 'Home' },
  'nav.learn': { tr: 'Öğren', en: 'Learn' },
  'nav.prayer': { tr: 'Namaz', en: 'Prayer' },
  'nav.profile': { tr: 'Profil', en: 'Profile' },
  
  // Home Page
  'home.greeting': { tr: 'Selamün Aleyküm', en: 'Assalamu Alaikum' },
  'home.subtitle': { tr: 'Hayırlı bir gün olsun', en: 'Have a blessed day' },
  'home.currentPrayer': { tr: 'Şu anki namaz', en: 'Current Prayer' },
  
  // Learn Page
  'learn.title': { tr: 'Öğren ve Ezberle', en: 'Learn & Memorize' },
  'learn.subtitle': { tr: 'Her gün bir adım ileri', en: 'Take it one step at a time' },
  'learn.surahs': { tr: 'Sureler', en: 'Surahs' },
  'learn.duas': { tr: 'Dualar', en: 'Duas' },
  'learn.continue': { tr: 'Devam Et', en: 'Continue' },
  'learn.continueWhere': { tr: 'Kaldığın yerden devam et', en: 'Continue where you left off' },
  'learn.verses': { tr: 'ayet', en: 'verses' },
  'learn.learned': { tr: 'öğrenildi', en: 'learned' },
  
  // Surah Names
  'surah.fatiha': { tr: 'Fatiha', en: 'Al-Fatiha' },
  'surah.ikhlas': { tr: 'İhlas', en: 'Al-Ikhlas' },
  'surah.falaq': { tr: 'Felak', en: 'Al-Falaq' },
  'surah.nas': { tr: 'Nas', en: 'An-Nas' },
  'surah.nasr': { tr: 'Nasr', en: 'An-Nasr' },
  
  // Duas
  'dua.beforeEating': { tr: 'Yemekten Önce', en: 'Before Eating' },
  'dua.afterEating': { tr: 'Yemekten Sonra', en: 'After Eating' },
  'dua.beforeSleeping': { tr: 'Uyumadan Önce', en: 'Before Sleeping' },
  
  // Profile Page
  'profile.welcome': { tr: 'Hoş Geldin', en: 'Welcome' },
  'profile.subtitle': { tr: 'Yolculuğun mübarek olsun', en: 'May your journey be blessed' },
  'profile.surahs': { tr: 'Sure', en: 'Surahs' },
  'profile.days': { tr: 'Gün', en: 'Days' },
  'profile.totalTime': { tr: 'Toplam Süre', en: 'Total Time' },
  'profile.preferences': { tr: 'Tercihler', en: 'Preferences' },
  'profile.about': { tr: 'Hakkında', en: 'About' },
  'profile.notifications': { tr: 'Bildirimler', en: 'Notifications' },
  'profile.notificationsDesc': { tr: 'Namaz ve günlük hatırlatmalar', en: 'Prayer reminders & daily tips' },
  'profile.audioSettings': { tr: 'Ses Ayarları', en: 'Audio Settings' },
  'profile.audioDesc': { tr: 'Kari, hız ve tekrar', en: 'Reciter, speed & repeat' },
  'profile.language': { tr: 'Dil', en: 'Language' },
  'profile.darkMode': { tr: 'Karanlık Mod', en: 'Dark Mode' },
  'profile.darkModeDesc': { tr: 'Göz yormayan tema', en: 'Easy on the eyes' },
  'profile.rateApp': { tr: 'Uygulamayı Puanla', en: 'Rate the App' },
  'profile.aboutCredits': { tr: 'Hakkında ve Katkılar', en: 'About & Credits' },
  'profile.history': { tr: 'Geçmiş', en: 'History' },
  'profile.historyDesc': { tr: 'Aktivite geçmişini görüntüle', en: 'View activity history' },
  'profile.resetProgress': { tr: 'İlerlemeyi Sıfırla', en: 'Reset Progress' },
  'profile.resetDesc': { tr: 'Tüm verileri temizle', en: 'Clear all data' },
  'profile.madeWith': { tr: 'Ümmet için ❤️ ile yapıldı', en: 'Made with ❤️ for the Ummah' },
  
  // Daily Goals
  'goals.title': { tr: 'Günlük Görevler', en: 'Daily Goals' },
  'goals.completed': { tr: 'tamamlandı', en: 'completed' },
  'goals.earned': { tr: 'kazanıldı', en: 'earned' },
  'goals.allCompleted': { tr: 'Tüm günlük görevleri tamamladın! Yarın görüşürüz.', en: 'You completed all daily goals! See you tomorrow.' },
  'goals.great': { tr: 'Harika!', en: 'Great!' },
  'goals.learnAyah': { tr: 'Bugünkü Ayeti Öğren', en: 'Learn Today\'s Verse' },
  'goals.learnAyahDesc': { tr: '1 ayet ezberle', en: 'Memorize 1 verse' },
  'goals.dailyDua': { tr: 'Günün Duası', en: 'Daily Dua' },
  'goals.dailyDuaDesc': { tr: 'Bir dua oku ve dinle', en: 'Read and listen to a dua' },
  'goals.completeQuiz': { tr: 'Quiz Tamamla', en: 'Complete Quiz' },
  'goals.completeQuizDesc': { tr: '1 quiz çöz', en: 'Solve 1 quiz' },
  'goals.reviewSurah': { tr: 'Tekrar Yap', en: 'Review' },
  'goals.reviewSurahDesc': { tr: 'Öğrendiğin bir sureyi tekrar et', en: 'Review a surah you learned' },
  
  // Quiz
  'quiz.select': { tr: 'Quiz Seç', en: 'Select Quiz' },
  'quiz.selectDesc': { tr: 'Bir quiz seçerek öğrenmeye başla. Tamamladığın quizler işaretlenecek.', en: 'Start learning by selecting a quiz. Completed quizzes will be marked.' },
  'quiz.completed': { tr: 'Quiz Tamamlandı!', en: 'Quiz Completed!' },
  'quiz.correct': { tr: 'Doğru', en: 'Correct' },
  'quiz.excellent': { tr: 'Muhteşem! Harika iş çıkardın!', en: 'Excellent! Great job!' },
  'quiz.good': { tr: 'İyi gidiyorsun! Devam et!', en: 'You\'re doing great! Keep going!' },
  'quiz.encourage': { tr: 'Her gün biraz daha iyi olacaksın!', en: 'You\'ll get better every day!' },
  'quiz.bonusIncluded': { tr: 'bonus XP dahil', en: 'bonus XP included' },
  'quiz.nextQuiz': { tr: 'Sonraki Quiz', en: 'Next Quiz' },
  'quiz.tryAgain': { tr: 'Tekrar Dene', en: 'Try Again' },
  'quiz.backToAll': { tr: 'Tüm Quizlere Dön', en: 'Back to All Quizzes' },
  'quiz.question': { tr: 'Soru', en: 'Question' },
  'quiz.nextQuestion': { tr: 'Sonraki Soru', en: 'Next Question' },
  'quiz.seeResults': { tr: 'Sonuçları Gör', en: 'See Results' },
  'quiz.correctAnswer': { tr: 'Doğru!', en: 'Correct!' },
  'quiz.wrongAnswer': { tr: 'Doğru cevap değil', en: 'Not the correct answer' },
  'quiz.easy': { tr: 'Kolay', en: 'Easy' },
  'quiz.medium': { tr: 'Orta', en: 'Medium' },
  'quiz.hard': { tr: 'Zor', en: 'Hard' },
  'quiz.questions': { tr: 'soru', en: 'questions' },
  
  // Progress
  'progress.totalQuizzes': { tr: 'Toplam Quiz', en: 'Total Quizzes' },
  'progress.correctAnswers': { tr: 'Doğru Cevap', en: 'Correct Answers' },
  'progress.accuracy': { tr: 'Başarı Oranı', en: 'Accuracy' },
  'progress.bestStreak': { tr: 'En İyi Seri', en: 'Best Streak' },
  'progress.level': { tr: 'Seviye', en: 'Level' },
  'progress.streak': { tr: 'Gün Serisi', en: 'Day Streak' },
  
  // History
  'history.title': { tr: 'Aktivite Geçmişi', en: 'Activity History' },
  'history.noActivity': { tr: 'Henüz aktivite yok', en: 'No activity yet' },
  'history.quizCompleted': { tr: 'Quiz tamamlandı', en: 'Quiz completed' },
  'history.goalCompleted': { tr: 'Görev tamamlandı', en: 'Goal completed' },
  'history.levelUp': { tr: 'Seviye atlandı', en: 'Level up' },
  'history.badgeEarned': { tr: 'Rozet kazanıldı', en: 'Badge earned' },
  'history.today': { tr: 'Bugün', en: 'Today' },
  'history.yesterday': { tr: 'Dün', en: 'Yesterday' },
  
  // Common
  'common.xp': { tr: 'XP', en: 'XP' },
  'common.loading': { tr: 'Yükleniyor...', en: 'Loading...' },
  'common.cancel': { tr: 'İptal', en: 'Cancel' },
  'common.confirm': { tr: 'Onayla', en: 'Confirm' },
  'common.back': { tr: 'Geri', en: 'Back' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'tr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
