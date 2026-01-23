export interface Ayah {
  number: number;
  arabic: string;
  translationTr: string;
  translationEn: string;
  transliteration: string;
}

export interface SurahData {
  id: string;
  nameTr: string;
  nameEn: string;
  nameArabic: string;
  versesCount: number;
  revelationType: 'meccan' | 'medinan';
  ayahs: Ayah[];
}

export const surahsData: SurahData[] = [
  {
    id: '1',
    nameTr: 'Fatiha',
    nameEn: 'Al-Fatiha',
    nameArabic: 'الفاتحة',
    versesCount: 7,
    revelationType: 'meccan',
    ayahs: [
      { 
        number: 1, 
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 
        translationTr: 'Rahmân ve Rahîm olan Allah\'ın adıyla',
        translationEn: 'In the name of Allah, the Most Gracious, the Most Merciful',
        transliteration: 'Bismillahirrahmanirrahim'
      },
      { 
        number: 2, 
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', 
        translationTr: 'Hamd, âlemlerin Rabbi Allah\'a mahsustur',
        translationEn: 'All praise is due to Allah, Lord of all the worlds',
        transliteration: 'Elhamdülillahi rabbil alemin'
      },
      { 
        number: 3, 
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', 
        translationTr: 'O, Rahmân ve Rahîm\'dir',
        translationEn: 'The Most Gracious, the Most Merciful',
        transliteration: 'Er-Rahmanir-Rahim'
      },
      { 
        number: 4, 
        arabic: 'مَالِكِ يَوْمِ الدِّينِ', 
        translationTr: 'Din gününün sahibidir',
        translationEn: 'Master of the Day of Judgment',
        transliteration: 'Maliki yevmid-din'
      },
      { 
        number: 5, 
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', 
        translationTr: 'Yalnız sana kulluk eder ve yalnız senden yardım dileriz',
        translationEn: 'You alone we worship, and You alone we ask for help',
        transliteration: 'İyyake na\'büdü ve iyyake nestein'
      },
      { 
        number: 6, 
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', 
        translationTr: 'Bizi doğru yola ilet',
        translationEn: 'Guide us to the straight path',
        transliteration: 'İhdinas-sıratal-müstakim'
      },
      { 
        number: 7, 
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', 
        translationTr: 'Nimet verdiklerinin yoluna; gazaba uğramışların ve sapkınların yoluna değil',
        translationEn: 'The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray',
        transliteration: 'Sıratalleziyne en\'amte aleyhim ğayril-mağdubi aleyhim velad-dallin'
      },
    ],
  },
  {
    id: '112',
    nameTr: 'İhlas',
    nameEn: 'Al-Ikhlas',
    nameArabic: 'الإخلاص',
    versesCount: 4,
    revelationType: 'meccan',
    ayahs: [
      { 
        number: 1, 
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', 
        translationTr: 'De ki: O, Allah\'tır, bir tektir',
        translationEn: 'Say: He is Allah, the One',
        transliteration: 'Kul hüvallahu ehad'
      },
      { 
        number: 2, 
        arabic: 'اللَّهُ الصَّمَدُ', 
        translationTr: 'Allah Samed\'dir (her şey O\'na muhtaç, O hiçbir şeye muhtaç değil)',
        translationEn: 'Allah, the Eternal Refuge',
        transliteration: 'Allahus-samed'
      },
      { 
        number: 3, 
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', 
        translationTr: 'O, doğurmamış ve doğurulmamıştır',
        translationEn: 'He neither begets nor is born',
        transliteration: 'Lem yelid velem yuled'
      },
      { 
        number: 4, 
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', 
        translationTr: 'Ve O\'nun hiçbir dengi yoktur',
        translationEn: 'Nor is there to Him any equivalent',
        transliteration: 'Velem yekün lehu küfüven ehad'
      },
    ],
  },
  {
    id: '113',
    nameTr: 'Felak',
    nameEn: 'Al-Falaq',
    nameArabic: 'الفلق',
    versesCount: 5,
    revelationType: 'meccan',
    ayahs: [
      { 
        number: 1, 
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', 
        translationTr: 'De ki: Sabahın Rabbine sığınırım',
        translationEn: 'Say: I seek refuge in the Lord of daybreak',
        transliteration: 'Kul euzu birabbil-felak'
      },
      { 
        number: 2, 
        arabic: 'مِن شَرِّ مَا خَلَقَ', 
        translationTr: 'Yarattığı şeylerin şerrinden',
        translationEn: 'From the evil of that which He created',
        transliteration: 'Min şerri ma halak'
      },
      { 
        number: 3, 
        arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', 
        translationTr: 'Karanlığı çöktüğü zaman gecenin şerrinden',
        translationEn: 'And from the evil of darkness when it settles',
        transliteration: 'Ve min şerri ğasikın iza vekab'
      },
      { 
        number: 4, 
        arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', 
        translationTr: 'Düğümlere üfleyenlerin şerrinden',
        translationEn: 'And from the evil of the blowers in knots',
        transliteration: 'Ve min şerrin-neffasati fil-ukad'
      },
      { 
        number: 5, 
        arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', 
        translationTr: 'Ve haset ettiği zaman hasetçinin şerrinden',
        translationEn: 'And from the evil of an envier when he envies',
        transliteration: 'Ve min şerri hasidin iza hased'
      },
    ],
  },
  {
    id: '114',
    nameTr: 'Nas',
    nameEn: 'An-Nas',
    nameArabic: 'الناس',
    versesCount: 6,
    revelationType: 'meccan',
    ayahs: [
      { 
        number: 1, 
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', 
        translationTr: 'De ki: İnsanların Rabbine sığınırım',
        translationEn: 'Say: I seek refuge in the Lord of mankind',
        transliteration: 'Kul euzu birabbin-nas'
      },
      { 
        number: 2, 
        arabic: 'مَلِكِ النَّاسِ', 
        translationTr: 'İnsanların Melik\'ine (hükümdarına)',
        translationEn: 'The Sovereign of mankind',
        transliteration: 'Melikin-nas'
      },
      { 
        number: 3, 
        arabic: 'إِلَٰهِ النَّاسِ', 
        translationTr: 'İnsanların İlah\'ına',
        translationEn: 'The God of mankind',
        transliteration: 'İlahin-nas'
      },
      { 
        number: 4, 
        arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', 
        translationTr: 'Sinsi vesvesecinin şerrinden',
        translationEn: 'From the evil of the retreating whisperer',
        transliteration: 'Min şerril-vesvasil-hannas'
      },
      { 
        number: 5, 
        arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', 
        translationTr: 'O ki insanların göğüslerine vesvese verir',
        translationEn: 'Who whispers [evil] into the breasts of mankind',
        transliteration: 'Ellezi yüvesvisü fi sudurin-nas'
      },
      { 
        number: 6, 
        arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', 
        translationTr: 'Cinlerden ve insanlardan (olan vesvesecilerin şerrinden)',
        translationEn: 'From among the jinn and mankind',
        transliteration: 'Minel-cinneti ven-nas'
      },
    ],
  },
  {
    id: '110',
    nameTr: 'Nasr',
    nameEn: 'An-Nasr',
    nameArabic: 'النصر',
    versesCount: 3,
    revelationType: 'medinan',
    ayahs: [
      { 
        number: 1, 
        arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ', 
        translationTr: 'Allah\'ın yardımı ve fetih geldiğinde',
        translationEn: 'When the victory of Allah has come and the conquest',
        transliteration: 'İza cae nasrullahi vel-feth'
      },
      { 
        number: 2, 
        arabic: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا', 
        translationTr: 'Ve insanların bölük bölük Allah\'ın dinine girdiğini gördüğünde',
        translationEn: 'And you see the people entering into the religion of Allah in multitudes',
        transliteration: 'Ve raeytennase yedhulune fi dinillahi efvaca'
      },
      { 
        number: 3, 
        arabic: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا', 
        translationTr: 'Rabbini hamd ile tesbih et ve O\'ndan mağfiret dile. Şüphesiz O, tevbeleri çok kabul edendir',
        translationEn: 'Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance',
        transliteration: 'Fesebbih bihamdi rabbike vestağfirh, innehu kane tevvaba'
      },
    ],
  },
  {
    id: '108',
    nameTr: 'Kevser',
    nameEn: 'Al-Kawthar',
    nameArabic: 'الكوثر',
    versesCount: 3,
    revelationType: 'meccan',
    ayahs: [
      { 
        number: 1, 
        arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', 
        translationTr: 'Biz sana Kevser\'i verdik',
        translationEn: 'Indeed, We have granted you, [O Muhammad], al-Kawthar',
        transliteration: 'İnna a\'taynakël-kevser'
      },
      { 
        number: 2, 
        arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', 
        translationTr: 'Öyleyse Rabbin için namaz kıl ve kurban kes',
        translationEn: 'So pray to your Lord and sacrifice [to Him alone]',
        transliteration: 'Fesalli lirabbike venhar'
      },
      { 
        number: 3, 
        arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', 
        translationTr: 'Şüphesiz sana kin besleyenin kendisi soyu kesiktir',
        translationEn: 'Indeed, your enemy is the one cut off',
        transliteration: 'İnne şanieke hüvel-ebter'
      },
    ],
  },
  {
    id: '107',
    nameTr: 'Maun',
    nameEn: 'Al-Ma\'un',
    nameArabic: 'الماعون',
    versesCount: 7,
    revelationType: 'meccan',
    ayahs: [
      { 
        number: 1, 
        arabic: 'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ', 
        translationTr: 'Dini yalanlayanı gördün mü?',
        translationEn: 'Have you seen the one who denies the Recompense?',
        transliteration: 'Eraeytellezi yükezzibü biddin'
      },
      { 
        number: 2, 
        arabic: 'فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ', 
        translationTr: 'İşte o, yetimi itip kakan kişidir',
        translationEn: 'For that is the one who drives away the orphan',
        transliteration: 'Fezalikelezi yedu\'ul-yetim'
      },
      { 
        number: 3, 
        arabic: 'وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ', 
        translationTr: 'Yoksulu doyurmayı teşvik etmez',
        translationEn: 'And does not encourage the feeding of the poor',
        transliteration: 'Vela yehuddu ala taamil-miskin'
      },
      { 
        number: 4, 
        arabic: 'فَوَيْلٌ لِّلْمُصَلِّينَ', 
        translationTr: 'Yazıklar olsun o namaz kılanlara ki',
        translationEn: 'So woe to those who pray',
        transliteration: 'Feveylün lil-musallin'
      },
      { 
        number: 5, 
        arabic: 'الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ', 
        translationTr: 'Onlar namazlarından gafildirler',
        translationEn: '[But] who are heedless of their prayer',
        transliteration: 'Elleziyne hüm an salatihim sahun'
      },
      { 
        number: 6, 
        arabic: 'الَّذِينَ هُمْ يُرَاءُونَ', 
        translationTr: 'Onlar gösteriş yapanlardır',
        translationEn: 'Those who make show [of their deeds]',
        transliteration: 'Elleziyne hüm yuraun'
      },
      { 
        number: 7, 
        arabic: 'وَيَمْنَعُونَ الْمَاعُونَ', 
        translationTr: 'Ve yardımlığı engellerler',
        translationEn: 'And withhold [simple] assistance',
        transliteration: 'Ve yemne\'unel-ma\'un'
      },
    ],
  },
  {
    id: '105',
    nameTr: 'Fil',
    nameEn: 'Al-Fil',
    nameArabic: 'الفيل',
    versesCount: 5,
    revelationType: 'meccan',
    ayahs: [
      { 
        number: 1, 
        arabic: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ', 
        translationTr: 'Rabbinin fil sahiplerine ne yaptığını görmedin mi?',
        translationEn: 'Have you not considered, how your Lord dealt with the companions of the elephant?',
        transliteration: 'Elem tera keyfe feale rabbüke biashabil-fil'
      },
      { 
        number: 2, 
        arabic: 'أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ', 
        translationTr: 'Onların tuzaklarını boşa çıkarmadı mı?',
        translationEn: 'Did He not make their plan into misguidance?',
        transliteration: 'Elem yec\'al keydehüm fi tadlil'
      },
      { 
        number: 3, 
        arabic: 'وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ', 
        translationTr: 'Üzerlerine bölük bölük kuşlar gönderdi',
        translationEn: 'And He sent against them birds in flocks',
        transliteration: 'Ve ersele aleyhim tayran ebabil'
      },
      { 
        number: 4, 
        arabic: 'تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ', 
        translationTr: 'Onlara pişmiş çamurdan taşlar atıyorlardı',
        translationEn: 'Striking them with stones of hard clay',
        transliteration: 'Termihim bihicaratin min siccil'
      },
      { 
        number: 5, 
        arabic: 'فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ', 
        translationTr: 'Sonunda onları yenilmiş ekin yaprağı gibi yaptı',
        translationEn: 'And He made them like eaten straw',
        transliteration: 'Fece\'alehüm ke\'asfim me\'kul'
      },
    ],
  },
];

export const getSurahById = (id: string): SurahData | undefined => {
  return surahsData.find(s => s.id === id);
};
