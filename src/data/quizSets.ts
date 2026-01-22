import { QuizQuestion } from '@/types/gamification';

export interface QuizSet {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'surah' | 'dua' | 'islamic_knowledge';
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  xpBonus: number;
}

export const quizSets: QuizSet[] = [
  {
    id: 'fatiha_basics',
    title: 'Fatiha Suresi Temelleri',
    description: 'Fatiha suresi hakkında temel bilgiler',
    icon: '📖',
    category: 'surah',
    difficulty: 'easy',
    xpBonus: 20,
    questions: [
      {
        id: 'f1',
        type: 'multiple_choice',
        question: 'Fatiha Suresi kaç ayettir?',
        options: ['5 ayet', '6 ayet', '7 ayet', '8 ayet'],
        correctAnswer: 2,
        explanation: 'Fatiha Suresi 7 ayetten oluşur ve Kuran\'ın ilk suresidir.',
        xpReward: 10,
        category: 'surah',
      },
      {
        id: 'f2',
        type: 'multiple_choice',
        question: '"الحمد لله رب العالمين" ayetinin anlamı nedir?',
        questionArabic: 'الحمد لله رب العالمين',
        options: [
          'Rahman ve Rahim olan Allah\'ın adıyla',
          'Hamd, alemlerin Rabbi Allah\'a mahsustur',
          'Din gününün sahibi',
          'Yalnız sana kulluk ederiz'
        ],
        correctAnswer: 1,
        explanation: 'Bu ayet "Hamd, alemlerin Rabbi Allah\'a mahsustur" anlamına gelir.',
        xpReward: 15,
        category: 'surah',
      },
      {
        id: 'f3',
        type: 'true_false',
        question: 'Fatiha Suresi Kuran\'ın ilk suresidir.',
        options: ['Doğru', 'Yanlış'],
        correctAnswer: 0,
        explanation: 'Evet, Fatiha Suresi Kuran-ı Kerim\'in ilk suresidir.',
        xpReward: 10,
        category: 'surah',
      },
    ],
  },
  {
    id: 'daily_duas',
    title: 'Günlük Dualar',
    description: 'Günlük hayatta okunan dualar',
    icon: '🤲',
    category: 'dua',
    difficulty: 'easy',
    xpBonus: 15,
    questions: [
      {
        id: 'd1',
        type: 'true_false',
        question: '"Bismillahirrahmanirrahim" yemek yemeden önce okunur.',
        options: ['Doğru', 'Yanlış'],
        correctAnswer: 0,
        explanation: 'Evet, yemeğe başlamadan önce Besmele çekilir.',
        xpReward: 10,
        category: 'dua',
      },
      {
        id: 'd2',
        type: 'multiple_choice',
        question: 'Yemekten sonra hangi dua okunur?',
        options: [
          'Bismillah',
          'Elhamdülillah',
          'SubhanAllah',
          'Allahu Ekber'
        ],
        correctAnswer: 1,
        explanation: 'Yemekten sonra "Elhamdülillah" (Allah\'a hamd olsun) denir.',
        xpReward: 10,
        category: 'dua',
      },
      {
        id: 'd3',
        type: 'multiple_choice',
        question: 'Uyumadan önce hangi sure okunması tavsiye edilir?',
        options: ['Fatiha', 'Ayetel Kürsi', 'Nas', 'Kevser'],
        correctAnswer: 1,
        explanation: 'Ayetel Kürsi, uyumadan önce okunması tavsiye edilen surelerdendir.',
        xpReward: 15,
        category: 'dua',
      },
    ],
  },
  {
    id: 'ihlas_suresi',
    title: 'İhlas Suresi',
    description: 'İhlas suresi bilgi testi',
    icon: '✨',
    category: 'surah',
    difficulty: 'medium',
    xpBonus: 25,
    questions: [
      {
        id: 'i1',
        type: 'multiple_choice',
        question: 'İhlas Suresi kaç ayettir?',
        options: ['3 ayet', '4 ayet', '5 ayet', '6 ayet'],
        correctAnswer: 1,
        explanation: 'İhlas Suresi 4 ayetten oluşur.',
        xpReward: 10,
        category: 'surah',
      },
      {
        id: 'i2',
        type: 'true_false',
        question: 'İhlas Suresi, Kuran\'ın üçte birine denktir.',
        options: ['Doğru', 'Yanlış'],
        correctAnswer: 0,
        explanation: 'Hz. Muhammed (s.a.v.) İhlas Suresinin Kuran\'ın üçte birine denk olduğunu bildirmiştir.',
        xpReward: 15,
        category: 'surah',
      },
      {
        id: 'i3',
        type: 'multiple_choice',
        question: '"قل هو الله أحد" ne demektir?',
        questionArabic: 'قل هو الله أحد',
        options: [
          'De ki: O Allah birdir',
          'Allah her şeyi bilir',
          'Hamd Allah\'a mahsustur',
          'Allah en büyüktür'
        ],
        correctAnswer: 0,
        explanation: '"Kul hüvallahu ehad" - "De ki: O Allah birdir" anlamına gelir.',
        xpReward: 15,
        category: 'surah',
      },
    ],
  },
  {
    id: 'namaz_bilgisi',
    title: 'Namaz Bilgisi',
    description: 'Namazla ilgili temel bilgiler',
    icon: '🕌',
    category: 'islamic_knowledge',
    difficulty: 'medium',
    xpBonus: 30,
    questions: [
      {
        id: 'n1',
        type: 'true_false',
        question: 'Sabah namazının farzı 2 rekattır.',
        options: ['Doğru', 'Yanlış'],
        correctAnswer: 0,
        explanation: 'Sabah namazının farzı 2 rekattır.',
        xpReward: 10,
        category: 'islamic_knowledge',
      },
      {
        id: 'n2',
        type: 'multiple_choice',
        question: 'Günde kaç vakit namaz farzdır?',
        options: ['3 vakit', '4 vakit', '5 vakit', '6 vakit'],
        correctAnswer: 2,
        explanation: 'Günde 5 vakit namaz farzdır: Sabah, Öğle, İkindi, Akşam ve Yatsı.',
        xpReward: 10,
        category: 'islamic_knowledge',
      },
      {
        id: 'n3',
        type: 'multiple_choice',
        question: 'Öğle namazının farzı kaç rekattır?',
        options: ['2 rekat', '3 rekat', '4 rekat', '5 rekat'],
        correctAnswer: 2,
        explanation: 'Öğle namazının farzı 4 rekattır.',
        xpReward: 15,
        category: 'islamic_knowledge',
      },
    ],
  },
  {
    id: 'felak_nas',
    title: 'Felak ve Nas Sureleri',
    description: 'Muavvizeteyn hakkında bilgiler',
    icon: '🛡️',
    category: 'surah',
    difficulty: 'medium',
    xpBonus: 25,
    questions: [
      {
        id: 'fn1',
        type: 'multiple_choice',
        question: 'Felak Suresi kaç ayettir?',
        options: ['4 ayet', '5 ayet', '6 ayet', '7 ayet'],
        correctAnswer: 1,
        explanation: 'Felak Suresi 5 ayetten oluşur.',
        xpReward: 10,
        category: 'surah',
      },
      {
        id: 'fn2',
        type: 'multiple_choice',
        question: 'Nas Suresi kaç ayettir?',
        options: ['4 ayet', '5 ayet', '6 ayet', '7 ayet'],
        correctAnswer: 2,
        explanation: 'Nas Suresi 6 ayetten oluşur.',
        xpReward: 10,
        category: 'surah',
      },
      {
        id: 'fn3',
        type: 'true_false',
        question: 'Felak ve Nas surelerine birlikte "Muavvizeteyn" denir.',
        options: ['Doğru', 'Yanlış'],
        correctAnswer: 0,
        explanation: 'Evet, bu iki sure birlikte "Muavvizeteyn" (iki koruyucu sure) olarak adlandırılır.',
        xpReward: 15,
        category: 'surah',
      },
    ],
  },
];

export const getNextQuizSet = (completedIds: string[]): QuizSet | null => {
  return quizSets.find(set => !completedIds.includes(set.id)) || null;
};

export const getQuizSetById = (id: string): QuizSet | undefined => {
  return quizSets.find(set => set.id === id);
};
