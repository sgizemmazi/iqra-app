import { Lesson } from "@/types/gamification";

/**
 * Öğrenme yolu — Duolingo-stili günlük kısa dersler.
 *
 * Her ders 1-2 ayet kapsar, 3-4 adımdan oluşur (~3-5 dak).
 * Adım tiyleri:
 *   intro          – Arapça metni + çeviri + açıklama oku (pasif)
 *   read_translate – Arapça gösterilir, doğru çeviriyi seç (aktif)
 *   fill_blank     – Arapça metinde boşluk, eksik kelimeyi seç
 *   review         – Önceki ayetin tekrar sorusu
 *
 * Arapça metinler surahsData.ts'deki authoritative kaynaktan alındı.
 */
export const lessons: Lesson[] = [
  // -----------------------------------------------------------------------
  // DERS 1 — Bismillah (Fatiha 1. Ayet)
  // -----------------------------------------------------------------------
  {
    id: "fatiha_1",
    title: { tr: "Bismillah", en: "Bismillah", ar: "بسم الله" },
    description: {
      tr: "Fatiha Suresi 1. Ayeti",
      en: "Al-Fatiha Verse 1",
      ar: "سورة الفاتحة الآية الأولى",
    },
    contentType: "surah",
    contentId: "1",
    difficulty: "easy",
    estimatedMinutes: 3,
    totalXP: 30, // 5 + 15 + 10
    order: 1,
    steps: [
      {
        id: "fatiha_1_intro",
        type: "intro",
        arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillahirrahmanirrahim",
        translation: {
          tr: "Rahmân ve Rahîm olan Allah'ın adıyla",
          en: "In the name of Allah, the Most Gracious, the Most Merciful",
          ar: "بسم الله الرحمن الرحيم",
        },
        explanation: {
          tr: "Bu ayet her surenin başında okunur. Her işe Allah'ın adıyla başlanır.",
          en: "This verse is recited at the beginning of every surah. Every action is begun in the name of Allah.",
          ar: "هذه الآية تُقرأ في بداية كل سورة. كل عمل يبدأ باسم الله.",
        },
        xpReward: 5,
      },
      {
        id: "fatiha_1_translate",
        type: "read_translate",
        arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillahirrahmanirrahim",
        translation: {
          tr: "Rahmân ve Rahîm olan Allah'ın adıyla",
          en: "In the name of Allah, the Most Gracious, the Most Merciful",
          ar: "بسم الله الرحمن الرحيم",
        },
        wrongOptions: [
          {
            tr: "Hamd, âlemlerin Rabbi Allah'a mahsustur",
            en: "All praise is due to Allah, Lord of the worlds",
            ar: "الحمد لله رب العالمين",
          },
          {
            tr: "Bizi doğru yola ilet",
            en: "Guide us to the straight path",
            ar: "اهدنا الصراط المستقيم",
          },
        ],
        xpReward: 15,
      },
      {
        id: "fatiha_1_blank",
        type: "fill_blank",
        arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ {BLANK}",
        transliteration: "Bismillahirrahmanir___",
        translation: {
          tr: "Rahmân ve Rahîm olan Allah'ın adıyla",
          en: "In the name of Allah, the Most Gracious, the Most Merciful",
          ar: "بسم الله الرحمن الرحيم",
        },
        blankWord: "الرَّحِيمِ",
        wrongWords: ["الْعَالَمِينَ", "الْمُسْتَقِيمَ"],
        explanation: {
          tr: '"Rahim" Allah\'ın rahmet ettiği kişilere özel olan rahmetini ifade eder.',
          en: '"Rahim" refers to Allah\'s special mercy upon those He shows mercy to.',
          ar: '"الرحيم" يعني رحمة الله الخاصة على من رحمهم.',
        },
        xpReward: 10,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // DERS 2 — Alhamdulillah (Fatiha 2. Ayet)  +  Ayet 1 tekrar
  // -----------------------------------------------------------------------
  {
    id: "fatiha_2",
    title: { tr: "Alhamdulillah", en: "Alhamdulillah", ar: "الحمد لله" },
    description: {
      tr: "Fatiha Suresi 2. Ayeti",
      en: "Al-Fatiha Verse 2",
      ar: "سورة الفاتحة الآية الثانية",
    },
    contentType: "surah",
    contentId: "1",
    difficulty: "easy",
    estimatedMinutes: 3,
    totalXP: 30, // 5 + 15 + 10
    order: 2,
    steps: [
      {
        id: "fatiha_2_intro",
        type: "intro",
        arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Elhamdülillahi rabbil alemin",
        translation: {
          tr: "Hamd, âlemlerin Rabbi Allah'a mahsustur",
          en: "All praise is due to Allah, Lord of all the worlds",
          ar: "الحمد لله رب العالمين",
        },
        explanation: {
          tr: "Bu ayet Allah'a hamd etmenin önemini vurgular. Hamd, en temel ibadet biçimlerinden biridir.",
          en: "This verse emphasizes the importance of praising Allah. Praise is one of the most fundamental forms of worship.",
          ar: "هذه الآية تُبيّن أهمية حمد الله. الحمد هو أحد أهم أنواع العبادة.",
        },
        xpReward: 5,
      },
      {
        id: "fatiha_2_translate",
        type: "read_translate",
        arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Elhamdülillahi rabbil alemin",
        translation: {
          tr: "Hamd, âlemlerin Rabbi Allah'a mahsustur",
          en: "All praise is due to Allah, Lord of all the worlds",
          ar: "الحمد لله رب العالمين",
        },
        wrongOptions: [
          {
            tr: "Rahmân ve Rahîm olan Allah'ın adıyla",
            en: "In the name of Allah, the Most Gracious, the Most Merciful",
            ar: "بسم الله الرحمن الرحيم",
          },
          {
            tr: "O, Rahmân ve Rahîm'dir",
            en: "The Most Gracious, the Most Merciful",
            ar: "الرحمن الرحيم",
          },
        ],
        xpReward: 15,
      },
      // Ayet 1 tekrar
      {
        id: "fatiha_2_review",
        type: "review",
        arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillahirrahmanirrahim",
        translation: {
          tr: "Rahmân ve Rahîm olan Allah'ın adıyla",
          en: "In the name of Allah, the Most Gracious, the Most Merciful",
          ar: "بسم الله الرحمن الرحيم",
        },
        wrongOptions: [
          {
            tr: "Hamd, âlemlerin Rabbi Allah'a mahsustur",
            en: "All praise is due to Allah, Lord of all the worlds",
            ar: "الحمد لله رب العالمين",
          },
          {
            tr: "Din gününün sahibidir",
            en: "Master of the Day of Judgment",
            ar: "ملك يوم الدين",
          },
        ],
        xpReward: 10,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // DERS 3 — Rahman & Rahim (Fatiha 3. Ayet)  +  Ayet 2 tekrar
  // -----------------------------------------------------------------------
  {
    id: "fatiha_3",
    title: {
      tr: "Rahman ve Rahim",
      en: "Rahman and Rahim",
      ar: "الرحمن والرحيم",
    },
    description: {
      tr: "Fatiha Suresi 3. Ayeti",
      en: "Al-Fatiha Verse 3",
      ar: "سورة الفاتحة الآية الثالثة",
    },
    contentType: "surah",
    contentId: "1",
    difficulty: "easy",
    estimatedMinutes: 4,
    totalXP: 40, // 5 + 15 + 10 + 10
    order: 3,
    steps: [
      {
        id: "fatiha_3_intro",
        type: "intro",
        arabicText: "الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Er-Rahmanir-Rahim",
        translation: {
          tr: "O, Rahmân ve Rahîm'dir",
          en: "The Most Gracious, the Most Merciful",
          ar: "الرحمن الرحيم",
        },
        explanation: {
          tr: '"Rahman" Allah\'ın bu dünyada tüm insanlara olan rahmetini ifade eder. "Rahim" ise Ahiret\'te mü\'minlere özel rahmetini belirtir.',
          en: '"Rahman" refers to Allah\'s mercy to all people in this world. "Rahim" refers to His special mercy for believers in the Afterlife.',
          ar: '"الرحمن" يعني رحمة الله على جميع الناس في الدنيا. "الرحيم" يعني رحمته الخاصة للمؤمنين في الآخرة.',
        },
        xpReward: 5,
      },
      {
        id: "fatiha_3_translate",
        type: "read_translate",
        arabicText: "الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Er-Rahmanir-Rahim",
        translation: {
          tr: "O, Rahmân ve Rahîm'dir",
          en: "The Most Gracious, the Most Merciful",
          ar: "الرحمن الرحيم",
        },
        wrongOptions: [
          {
            tr: "Din gününün sahibidir",
            en: "Master of the Day of Judgment",
            ar: "ملك يوم الدين",
          },
          {
            tr: "Yalnız sana kulluk eder ve yalnız senden yardım dileriz",
            en: "You alone we worship, and You alone we ask for help",
            ar: "إياك نعبد وإياك نستعين",
          },
        ],
        xpReward: 15,
      },
      {
        id: "fatiha_3_blank",
        type: "fill_blank",
        arabicText: "الرَّحْمَٰنِ {BLANK}",
        transliteration: "Er-Rahmanir-___",
        translation: {
          tr: "O, Rahmân ve Rahîm'dir",
          en: "The Most Gracious, the Most Merciful",
          ar: "الرحمن الرحيم",
        },
        blankWord: "الرَّحِيمِ",
        wrongWords: ["الْعَالَمِينَ", "الْفَتْحُ"],
        explanation: {
          tr: '"Rahim" Allah\'ın özel rahmet sıfatıdır.',
          en: '"Rahim" is Allah\'s attribute of special mercy.',
          ar: '"الرحيم" هو صفة رحمة الله الخاصة.',
        },
        xpReward: 10,
      },
      // Ayet 2 tekrar
      {
        id: "fatiha_3_review",
        type: "review",
        arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Elhamdülillahi rabbil alemin",
        translation: {
          tr: "Hamd, âlemlerin Rabbi Allah'a mahsustur",
          en: "All praise is due to Allah, Lord of all the worlds",
          ar: "الحمد لله رب العالمين",
        },
        wrongOptions: [
          {
            tr: "O, Rahmân ve Rahîm'dir",
            en: "The Most Gracious, the Most Merciful",
            ar: "الرحمن الرحيم",
          },
          {
            tr: "Bizi doğru yola ilet",
            en: "Guide us to the straight path",
            ar: "اهدنا الصراط المستقيم",
          },
        ],
        xpReward: 10,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // CHECKPOINT — Sureler Seviyesi Geçiş Quizi
  // -----------------------------------------------------------------------
  {
    id: "checkpoint_surahs",
    title: {
      tr: "Sureler Testi 🏆",
      en: "Surahs Test 🏆",
      ar: "اختبار السور 🏆",
    },
    description: {
      tr: "Bir sonraki seviyeye geçmek için %45 başarı gereklidir",
      en: "45% success required to advance to next level",
      ar: "مطلوب نجاح 45٪ للتقدم إلى المستوى التالي",
    },
    contentType: "checkpoint",
    contentId: "surahs_checkpoint",
    difficulty: "medium",
    estimatedMinutes: 8,
    totalXP: 100,
    order: 4,
    passThreshold: 45, // %45 başarı oranı gerekli
    steps: [
      // Sure 1'den soru
      {
        id: "checkpoint_q1",
        type: "fill_blank",
        arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ {BLANK}",
        transliteration: "Bismillahirrahmanir___",
        translation: {
          tr: "Rahmân ve Rahîm olan Allah'ın adıyla",
          en: "In the name of Allah, the Most Gracious, the Most Merciful",
          ar: "بسم الله الرحمن الرحيم",
        },
        blankWord: "الرَّحِيمِ",
        wrongWords: ["الْعَالَمِينَ", "الْمُسْتَقِيمَ", "الدِّينِ"],
        explanation: {
          tr: "Doğru cevap: الرَّحِيمِ (er-Rahim)",
          en: "Correct answer: الرَّحِيمِ (ar-Rahim)",
          ar: "الإجابة الصحيحة: الرَّحِيمِ",
        },
        xpReward: 20,
      },
      // Sure 2'den soru
      {
        id: "checkpoint_q2",
        type: "read_translate",
        arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Elhamdülillahi rabbil alemin",
        translation: {
          tr: "Hamd, âlemlerin Rabbi Allah'a mahsustur",
          en: "All praise is due to Allah, Lord of all the worlds",
          ar: "الحمد لله رب العالمين",
        },
        wrongOptions: [
          {
            tr: "Rahmân ve Rahîm olan Allah'ın adıyla",
            en: "In the name of Allah, the Most Gracious, the Most Merciful",
            ar: "بسم الله الرحمن الرحيم",
          },
          {
            tr: "Din (ceza) gününün sahibidir",
            en: "Master of the Day of Judgment",
            ar: "مالك يوم الدين",
          },
          {
            tr: "Bizi doğru yola ilet",
            en: "Guide us to the straight path",
            ar: "اهدنا الصراط المستقيم",
          },
        ],
        xpReward: 20,
      },
      // Sure 3'ten soru
      {
        id: "checkpoint_q3",
        type: "read_translate",
        arabicText: "الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Errahmanir rahim",
        translation: {
          tr: "O, Rahmân ve Rahîm'dir",
          en: "The Most Gracious, the Most Merciful",
          ar: "الرحمن الرحيم",
        },
        wrongOptions: [
          {
            tr: "Hamd, âlemlerin Rabbi Allah'a mahsustur",
            en: "All praise is due to Allah, Lord of all the worlds",
            ar: "الحمد لله رب العالمين",
          },
          {
            tr: "Sana kulluk ederiz",
            en: "You alone we worship",
            ar: "إياك نعبد",
          },
          {
            tr: "Bizi doğru yola ilet",
            en: "Guide us to the straight path",
            ar: "اهدنا الصراط المستقيم",
          },
        ],
        xpReward: 20,
      },
      // Karışık tekrar sorusu
      {
        id: "checkpoint_q4",
        type: "fill_blank",
        arabicText: "الْحَمْدُ لِلَّهِ {BLANK} الْعَالَمِينَ",
        transliteration: "Elhamdülillahi ___ alemin",
        translation: {
          tr: "Hamd, âlemlerin Rabbi Allah'a mahsustur",
          en: "All praise is due to Allah, Lord of all the worlds",
          ar: "الحمد لله رب العالمين",
        },
        blankWord: "رَبِّ",
        wrongWords: ["مَالِكِ", "إِلَى", "نَعْبُدُ"],
        explanation: {
          tr: "Doğru cevap: رَبِّ (Rabb - Rabbimiz)",
          en: "Correct answer: رَبِّ (Rabb - Lord)",
          ar: "الإجابة الصحيحة: رَبِّ",
        },
        xpReward: 20,
      },
      // Son soru
      {
        id: "checkpoint_q5",
        type: "read_translate",
        arabicText: "مَالِكِ يَوْمِ الدِّينِ",
        transliteration: "Maliki yevmiddin",
        translation: {
          tr: "Din (ceza) gününün sahibidir",
          en: "Master of the Day of Judgment",
          ar: "مالك يوم الدين",
        },
        wrongOptions: [
          {
            tr: "Rahmân ve Rahîm olan Allah'ın adıyla",
            en: "In the name of Allah, the Most Gracious, the Most Merciful",
            ar: "بسم الله الرحمن الرحيم",
          },
          {
            tr: "Sana kulluk ederiz ve senden yardım dileriz",
            en: "You alone we worship and You alone we ask for help",
            ar: "إياك نعبد وإياك نستعين",
          },
          {
            tr: "Bizi doğru yola ilet",
            en: "Guide us to the straight path",
            ar: "اهدنا الصراط المستقيم",
          },
        ],
        xpReward: 20,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------
export const getLessonById = (id: string): Lesson | undefined =>
  lessons.find((l) => l.id === id);

export const getNextLesson = (completedIds: string[]): Lesson | null =>
  lessons.find((l) => !completedIds.includes(l.id)) || null;

export const getLessonsBySurah = (surahId: string): Lesson[] =>
  lessons.filter((l) => l.contentType === "surah" && l.contentId === surahId);
