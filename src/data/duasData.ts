export interface DuaData {
  id: string;
  nameTr: string;
  nameEn: string;
  nameArabic: string;
  arabic: string;
  translationTr: string;
  translationEn: string;
  transliteration: string;
  occasion: string;
  occasionEn: string;
}

export const duasData: DuaData[] = [
  {
    id: 'd1',
    nameTr: 'Yemekten Önce',
    nameEn: 'Before Eating',
    nameArabic: 'دعاء قبل الطعام',
    arabic: 'بِسْمِ اللَّهِ',
    translationTr: 'Allah\'ın adıyla',
    translationEn: 'In the name of Allah',
    transliteration: 'Bismillah',
    occasion: 'Yemek yemeye başlarken okunur',
    occasionEn: 'Said before starting to eat',
  },
  {
    id: 'd2',
    nameTr: 'Yemekten Sonra',
    nameEn: 'After Eating',
    nameArabic: 'دعاء بعد الطعام',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    translationTr: 'Bana bu yemeği yediren ve benim hiçbir güç ve kuvvetim olmaksızın bunu bana rızık olarak veren Allah\'a hamd olsun',
    translationEn: 'Praise be to Allah who fed me this and provided me with it without any effort on my part or power',
    transliteration: 'Elhamdülillahillezi et\'ameni haza ve razakanihi min ğayri havlin minni vela kuvveh',
    occasion: 'Yemek yedikten sonra okunur',
    occasionEn: 'Said after finishing a meal',
  },
  {
    id: 'd3',
    nameTr: 'Uyumadan Önce',
    nameEn: 'Before Sleeping',
    nameArabic: 'دعاء قبل النوم',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    translationTr: 'Allah\'ım! Senin adınla ölür ve dirilirim',
    translationEn: 'In Your name, O Allah, I die and I live',
    transliteration: 'Bismikallahümme emutü ve ahya',
    occasion: 'Uyumadan önce okunur',
    occasionEn: 'Said before going to sleep',
  },
  {
    id: 'd4',
    nameTr: 'Uyanınca',
    nameEn: 'Upon Waking Up',
    nameArabic: 'دعاء الاستيقاظ',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    translationTr: 'Bizi öldürdükten sonra dirilten Allah\'a hamd olsun. Dönüş yalnız O\'nadır',
    translationEn: 'Praise be to Allah who gave us life after He had caused us to die and to Him is the return',
    transliteration: 'Elhamdülillahillezi ahyana ba\'de ma ematena ve ileyhinnuşur',
    occasion: 'Uykudan uyanınca okunur',
    occasionEn: 'Said upon waking up',
  },
  {
    id: 'd5',
    nameTr: 'Eve Girerken',
    nameEn: 'Entering Home',
    nameArabic: 'دعاء دخول البيت',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
    translationTr: 'Allah\'ın adıyla girdik, Allah\'ın adıyla çıktık ve Rabbimiz Allah\'a tevekkül ettik',
    translationEn: 'In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we rely',
    transliteration: 'Bismillahi velecna ve bismillahi haracna ve alallahi rabbina tevekkelna',
    occasion: 'Eve girerken okunur',
    occasionEn: 'Said when entering home',
  },
  {
    id: 'd6',
    nameTr: 'Evden Çıkarken',
    nameEn: 'Leaving Home',
    nameArabic: 'دعاء الخروج من البيت',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    translationTr: 'Allah\'ın adıyla! Allah\'a tevekkül ettim. Güç ve kuvvet ancak Allah\'tandır',
    translationEn: 'In the name of Allah, I place my trust in Allah, and there is no power nor strength except with Allah',
    transliteration: 'Bismillahi tevekkeltü alallahi ve la havle ve la kuvvete illa billah',
    occasion: 'Evden çıkarken okunur',
    occasionEn: 'Said when leaving home',
  },
  {
    id: 'd7',
    nameTr: 'Tuvalete Girerken',
    nameEn: 'Entering Bathroom',
    nameArabic: 'دعاء دخول الخلاء',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    translationTr: 'Allah\'ım! Erkek ve dişi şeytanlardan sana sığınırım',
    translationEn: 'O Allah, I seek refuge in You from the male and female devils',
    transliteration: 'Allahümme inni euzü bike minel-hubüsi vel-habaisi',
    occasion: 'Tuvalete girerken okunur',
    occasionEn: 'Said when entering the bathroom',
  },
  {
    id: 'd8',
    nameTr: 'Tuvalet Çıkışı',
    nameEn: 'Leaving Bathroom',
    nameArabic: 'دعاء الخروج من الخلاء',
    arabic: 'غُفْرَانَكَ',
    translationTr: 'Allah\'ım! Senin mağfiretini dilerim',
    translationEn: 'I seek Your forgiveness',
    transliteration: 'Ğufraneke',
    occasion: 'Tuvaletten çıkarken okunur',
    occasionEn: 'Said when leaving the bathroom',
  },
  {
    id: 'd9',
    nameTr: 'Sabah Duası',
    nameEn: 'Morning Supplication',
    nameArabic: 'دعاء الصباح',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ',
    translationTr: 'Sabaha eriştik, mülk de Allah\'ın olarak sabaha erişti. Hamd Allah\'a mahsustur',
    translationEn: 'We have reached the morning and the dominion has reached the morning, belonging to Allah, and praise is to Allah',
    transliteration: 'Esbahna ve esbahal-mülkü lillahi vel-hamdü lillah',
    occasion: 'Sabah kalktığında okunur',
    occasionEn: 'Said in the morning',
  },
  {
    id: 'd10',
    nameTr: 'Akşam Duası',
    nameEn: 'Evening Supplication',
    nameArabic: 'دعاء المساء',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ',
    translationTr: 'Akşama eriştik, mülk de Allah\'ın olarak akşama erişti. Hamd Allah\'a mahsustur',
    translationEn: 'We have reached the evening and the dominion has reached the evening, belonging to Allah, and praise is to Allah',
    transliteration: 'Emseyna ve emsel-mülkü lillahi vel-hamdü lillah',
    occasion: 'Akşam olduğunda okunur',
    occasionEn: 'Said in the evening',
  },
];

export const getDuaById = (id: string): DuaData | undefined => {
  return duasData.find(d => d.id === id);
};
