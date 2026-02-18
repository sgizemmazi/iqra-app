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
  {
    id: '48',
    nameTr: 'Fetih',
    nameEn: 'Al-Fath',
    nameArabic: 'الفتح',
    versesCount: 29,
    revelationType: 'medinan',
    ayahs: [
      {
        number: 1,
        arabic: 'إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا',
        translationTr: 'Şüphesiz biz sana apaçık bir fetih verdik.',
        translationEn: 'Indeed, We have given you a clear conquest.',
        transliteration: 'İnnâ fetahnâ leke fethan mübînâ'
      },
      {
        number: 2,
        arabic: 'لِّيَغْفِرَ لَكَ اللَّهُ مَا تَقَدَّمَ مِن ذَنبِكَ وَمَا تَأَخَّرَ وَيُتِمَّ نِعْمَتَهُ عَلَيْكَ وَيَهْدِيَكَ صِرَاطًا مُّسْتَقِيمًا',
        translationTr: 'Allah, senin geçmiş ve gelecek günahlarını bağışlasın; sana olan nimetini tamamlasın ve seni doğru yola iletsin.',
        translationEn: 'That Allah may forgive for you what preceded of your sin and what will follow and complete His favor upon you and guide you to a straight path.',
        transliteration: 'Liyağfira lekelâhu mâ tekaddeme min zenbike ve mâ teahhara ve yütimme ni\'metehu aleyke ve yehdiyeke sırâtan müstekîmâ'
      },
      {
        number: 3,
        arabic: 'وَيَنصُرَكَ اللَّهُ نَصْرًا عَزِيزًا',
        translationTr: 'Ve Allah sana şanlı bir zaferle yardım etsin.',
        translationEn: 'And that Allah may aid you with a mighty victory.',
        transliteration: 'Ve yensurakellâhu nasran azîzâ'
      },
      {
        number: 4,
        arabic: 'هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ لِيَزْدَادُوا إِيمَانًا مَّعَ إِيمَانِهِمْ وَلِلَّهِ جُنُودُ السَّمَاوَاتِ وَالْأَرْضِ وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا',
        translationTr: 'Müminlerin imanlarına iman katmaları için onların kalplerine huzur ve güven indiren O\'dur. Göklerin ve yerin orduları Allah\'ındır. Allah Alîm\'dir, Hakîm\'dir.',
        translationEn: 'It is He who sent down tranquility into the hearts of the believers that they would increase in faith. And to Allah belong the soldiers of the heavens and the earth, and ever is Allah Knowing and Wise.',
        transliteration: 'Hüvellezî enzelessekînete fî kulûbil mü\'minîne liyezdâdû îmânen mea îmânihim ve lillâhi cünûdüssemâvâti vel ardi ve kânellâhu alîmen hakîmâ'
      },
      {
        number: 5,
        arabic: 'لِّيُدْخِلَ الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا وَيُكَفِّرَ عَنْهُمْ سَيِّئَاتِهِمْ وَكَانَ ذَٰلِكَ عِندَ اللَّهِ فَوْزًا عَظِيمًا',
        translationTr: 'Mümin erkekleri ve mümin kadınları, altından ırmaklar akan cennetlere koysun; orada ebedi olarak kalsınlar. Onların kötülüklerini örtüp bağışlasın. Bu, Allah katında büyük bir kurtuluştur.',
        translationEn: 'That He may admit the believing men and the believing women to gardens beneath which rivers flow to abide therein eternally and remove from them their misdeeds – and ever is that, in the sight of Allah, a great attainment.',
        transliteration: 'Liyüdhilel mü\'minîne vel mü\'minâti cennâtin tecrî min tahtihel enhâru hâlidîne fîhâ ve yükeffire anhüm seyyiâtihim ve kâne zâlike indellâhi fevzen azîmâ'
      },
      {
        number: 6,
        arabic: 'وَيُعَذِّبَ الْمُنَافِقِينَ وَالْمُنَافِقَاتِ وَالْمُشْرِكِينَ وَالْمُشْرِكَاتِ الظَّانِّينَ بِاللَّهِ ظَنَّ السَّوْءِ عَلَيْهِمْ دَائِرَةُ السَّوْءِ وَغَضِبَ اللَّهُ عَلَيْهِمْ وَلَعَنَهُمْ وَأَعَدَّ لَهُمْ جَهَنَّمَ وَسَاءَتْ مَصِيرًا',
        translationTr: 'Allah hakkında kötü zanda bulunan münafıklara ve müşriklere azap etsin. Kötülük çemberi onların üzerinedir. Allah onlara gazap etmiş, onları lanetlemiş ve kendilerine cehennem hazırlamıştır. Orası ne kötü bir varış yeridir!',
        translationEn: 'And that He may punish the hypocrite men and hypocrite women, and the polytheist men and polytheist women – those who assume about Allah an assumption of evil nature. Upon them is a misfortune of evil nature; and Allah has become angry with them and has cursed them and prepared for them Hell, and evil it is as a destination.',
        transliteration: 'Ve yuazzibel münâfikîne vel münâfikâti vel müşrikîne vel müşrikâtiz zannîne billâhi zannes sev\' aleyhim dâiretüs sev\' ve ğadıbellâhu aleyhim ve leânehüm ve eadde lehüm cehenneme ve sâet masîrâ'
      },
      {
        number: 7,
        arabic: 'وَلِلَّهِ جُنُودُ السَّمَاوَاتِ وَالْأَرْضِ وَكَانَ اللَّهُ عَزِيزًا حَكِيمًا',
        translationTr: 'Göklerin ve yerin orduları Allah\'ındır. Allah mutlak güç sahibidir, hüküm ve hikmet sahibidir.',
        translationEn: 'And to Allah belong the soldiers of the heavens and the earth, and ever is Allah Exalted in Might and Wise.',
        transliteration: 'Ve lillâhi cünûdüssemâvâti vel ardi ve kânellâhu azîzen hakîmâ'
      },
      {
        number: 8,
        arabic: 'إِنَّا أَرْسَلْنَاكَ شَاهِدًا وَمُبَشِّرًا وَنَذِيرًا',
        translationTr: 'Şüphesiz biz seni bir şahit, bir müjdeci ve bir uyarıcı olarak gönderdik.',
        translationEn: 'Indeed, We have sent you as a witness and a bringer of good tidings and a warner.',
        transliteration: 'İnnâ erselnâke şâhiden ve mübeşşiran ve nezîrâ'
      },
      {
        number: 9,
        arabic: 'لِّتُؤْمِنُوا بِاللَّهِ وَرَسُولِهِ وَتُعَزِّرُوهُ وَتُوَقِّرُوهُ وَتُسَبِّحُوهُ بُكْرَةً وَأَصِيلًا',
        translationTr: 'Ta ki Allah\'a ve Resulü\'ne inanesiniz, onu destekleyip saygı gösteresiniz ve sabah akşam Allah\'ı tesbih edesiniz.',
        translationEn: 'That you may believe in Allah and His Messenger and honor him and respect the Prophet and exalt Allah morning and afternoon.',
        transliteration: 'Litu\'minû billâhi ve resûlihî ve tuazzirûhu ve tüvakkırûhu ve tüsebbihuhu bükreten ve asîlâ'
      },
      {
        number: 10,
        arabic: 'إِنَّ الَّذِينَ يُبَايِعُونَكَ إِنَّمَا يُبَايِعُونَ اللَّهَ يَدُ اللَّهِ فَوْقَ أَيْدِيهِمْ فَمَن نَّكَثَ فَإِنَّمَا يَنكُثُ عَلَىٰ نَفْسِهِ وَمَنْ أَوْفَىٰ بِمَا عَاهَدَ عَلَيْهُ اللَّهَ فَسَيُؤْتِيهِ أَجْرًا عَظِيمًا',
        translationTr: 'Sana biat edenler, şüphesiz Allah\'a biat etmektedirler. Allah\'ın eli onların ellerinin üzerindedir. Kim ahdini bozarsa, ancak kendi aleyhine bozmuş olur. Kim de Allah\'a verdiği sözü yerine getirirse, Allah ona büyük bir mükâfat verecektir.',
        translationEn: 'Indeed, those who pledge allegiance to you are actually pledging allegiance to Allah. The hand of Allah is over their hands. So he who breaks his oath only breaks it to the detriment of himself. And he who fulfills that which he has promised Allah – He will give him a great reward.',
        transliteration: 'İnnellezîne yübâyi\'ûneke innemâ yübâyi\'ûnellâh yedullâhi fevka eydîhim femen nekese feinnema yenkusu alâ nefsihî ve men evfâ bimâ âhede aleyhullâhe feseyü\'tîhi ecren azîmâ'
      },
      {
        number: 11,
        arabic: 'سَيَقُولُ لَكَ الْمُخَلَّفُونَ مِنَ الْأَعْرَابِ شَغَلَتْنَا أَمْوَالُنَا وَأَهْلُونَا فَاسْتَغْفِرْ لَنَا يَقُولُونَ بِأَلْسِنَتِهِم مَّا لَيْسَ فِي قُلُوبِهِمْ قُلْ فَمَن يَمْلِكُ لَكُم مِّنَ اللَّهِ شَيْئًا إِنْ أَرَادَ بِكُمْ ضَرًّا أَوْ أَرَادَ بِكُمْ نَفْعًا بَلْ كَانَ اللَّهُ بِمَا تَعْمَلُونَ خَبِيرًا',
        translationTr: 'Bedevilerden geri kalanlar sana: "Bizi mallarımız ve ailemiz meşgul etti; bizim için mağfiret dile!" diyecekler. Dillerinde kalplerinde olmayan şeyi söylüyorlar. De ki: "Allah size zarar vermek isterse ya da size fayda sağlamak isterse, O\'na karşı kimin elinden ne gelir?" Hayır, Allah yaptıklarınızdan haberdardır.',
        translationEn: 'Those who remained behind of the bedouins will say to you, "Our properties and our families occupied us, so ask forgiveness for us." They say with their tongues what is not within their hearts. Say, "Then who could prevent Allah at all if He intended for you harm or intended for you benefit? Rather, ever is Allah of what you do, Aware."',
        transliteration: 'Seyekûlü lekel muhallefûne minel a\'râbi şeğaletnâ emvâlünâ ve ehlûnâ festağfir lenâ yekûlûne bielsinetihin mâ leyse fî kulûbihim kul femen yemliku lekum minallâhi şey\'en in erâde bikum darren ev erâde bikum nef\'â bel kânellâhu bimâ ta\'melûne habîrâ'
      },
      {
        number: 12,
        arabic: 'بَلْ ظَنَنتُمْ أَن لَّن يَنقَلِبَ الرَّسُولُ وَالْمُؤْمِنُونَ إِلَىٰ أَهْلِيهِمْ أَبَدًا وَزُيِّنَ ذَٰلِكَ فِي قُلُوبِكُمْ وَظَنَنتُمْ ظَنَّ السَّوْءِ وَكُنتُمْ قَوْمًا بُورًا',
        translationTr: 'Hayır, siz peygamberin ve müminlerin ailelerine asla dönmeyeceğini sandınız; bu kötü zan kalplerinde güzel gösterildi ve siz helake giden bir topluluk oldunuz.',
        translationEn: 'But you thought that the Messenger and the believers would never return to their families, ever, and that was made pleasing in your hearts. And you assumed an assumption of evil and became a people ruined.',
        transliteration: 'Bel zanentum en len yenkaliberresûlü vel mü\'minûne ilâ ehlîhim ebedâ ve züyyine zâlike fî kulûbiküm ve zanentum zannes sev\' ve küntüm kavmen bûrâ'
      },
      {
        number: 13,
        arabic: 'وَمَن لَّمْ يُؤْمِن بِاللَّهِ وَرَسُولِهِ فَإِنَّا أَعْتَدْنَا لِلْكَافِرِينَ سَعِيرًا',
        translationTr: 'Kim Allah\'a ve Resulü\'ne inanmazsa, şüphesiz biz kâfirler için alevli bir ateş hazırladık.',
        translationEn: 'And whoever has not believed in Allah and His Messenger - then indeed, We have prepared for the disbelievers a Blaze.',
        transliteration: 'Ve men lem yü\'min billâhi ve resûlihî feinnâ a\'tednâ lilkâfirîne se\'îrâ'
      },
      {
        number: 14,
        arabic: 'وَلِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ يَغْفِرُ لِمَن يَشَاءُ وَيُعَذِّبُ مَن يَشَاءُ وَكَانَ اللَّهُ غَفُورًا رَّحِيمًا',
        translationTr: 'Göklerin ve yerin mülkü Allah\'ındır. Dilediğini bağışlar, dilediğine azap eder. Allah bağışlayandır, merhamet edendir.',
        translationEn: 'And to Allah belongs the dominion of the heavens and the earth. He forgives whom He wills and punishes whom He wills. And ever is Allah Forgiving and Merciful.',
        transliteration: 'Ve lillâhi mülküssemâvâti vel ardi yağfiru limen yeşâü ve yuazzibu men yeşâü ve kânellâhu ğafûren rahîmâ'
      },
      {
        number: 15,
        arabic: 'سَيَقُولُ الْمُخَلَّفُونَ إِذَا انطَلَقْتُمْ إِلَىٰ مَغَانِمَ لِتَأْخُذُوهَا ذَرُونَا نَتَّبِعْكُمْ يُرِيدُونَ أَن يُبَدِّلُوا كَلَامَ اللَّهِ قُل لَّن تَتَّبِعُونَا كَذَٰلِكُمْ قَالَ اللَّهُ مِن قَبْلُ فَسَيَقُولُونَ بَلْ تَحْسُدُونَنَا بَلْ كَانُوا لَا يَفْقَهُونَ إِلَّا قَلِيلًا',
        translationTr: 'Ganimetler almak için yola çıktığınızda geri kalanlar: "Bırakın bizi de size katılalım" diyecekler. Allah\'ın sözünü değiştirmek istiyorlar. De ki: "Sizi asla takip etmeyeceksiniz; Allah daha önce böyle buyurmuştu." Bunun üzerine: "Hayır, bize imreniyorsunuz" diyecekler. Aslında onlar pek az şey anlıyorlar.',
        translationEn: 'Those who remained behind will say when you set out toward the war booty to take it, "Let us follow you." They wish to change the words of Allah. Say, "You will not follow us. Thus did Allah say before." Then they will say, "Rather, you envy us." But they understood little.',
        transliteration: 'Seyekûlül muhallefûne izantalaktum ilâ meğânime litehuzûhâ zerûnâ nettebi\'küm yürîdûne en yübeddilû kelâmellâh kul len tettebi\'ûnâ kezâliküm kâlellâhu min kablu feseyekûlûne bel tahsudûnenâ bel kânû lâ yefkahûne illâ kalîlâ'
      },
      {
        number: 16,
        arabic: 'قُل لِّلْمُخَلَّفِينَ مِنَ الْأَعْرَابِ سَتُدْعَوْنَ إِلَىٰ قَوْمٍ أُولِي بَأْسٍ شَدِيدٍ تُقَاتِلُونَهُمْ أَوْ يُسْلِمُونَ فَإِن تُطِيعُوا يُؤْتِكُمُ اللَّهُ أَجْرًا حَسَنًا وَإِن تَتَوَلَّوْا كَمَا تَوَلَّيْتُم مِّن قَبْلُ يُعَذِّبْكُمْ عَذَابًا أَلِيمًا',
        translationTr: 'Bedevilerden geri kalanlara de ki: "Yakında çok sert savaşan bir kavme karşı savaşmaya çağrılacaksınız; onlarla savaşacaksınız ya da Müslüman olacaklar. Eğer itaat ederseniz Allah size güzel bir mükâfat verir; daha önce sırt çevirdiğiniz gibi yüz çevirirseniz, sizi acı bir azapla cezalandırır."',
        translationEn: 'Say to those who remained behind of the bedouins, "You will be called to face a people of great military might; you will fight them or they will submit. So if you obey, Allah will give you a good reward; but if you turn away as you turned away before, He will punish you with a painful punishment."',
        transliteration: 'Kul lilmuhallefîne minel a\'râbi setüd\'avne ilâ kavmin ülî be\'sin şedîdin tükâtilûnehüm ev yüslimûne fein tütî\'û yü\'tikümüllâhu ecren hasenâ ve in tetevellev kemâ tevelleytüm min kablu yuazzibküm azâben elîmâ'
      },
      {
        number: 17,
        arabic: 'لَّيْسَ عَلَى الْأَعْمَىٰ حَرَجٌ وَلَا عَلَى الْأَعْرَجِ حَرَجٌ وَلَا عَلَى الْمَرِيضِ حَرَجٌ وَمَن يُطِعِ اللَّهَ وَرَسُولَهُ يُدْخِلْهُ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ وَمَن يَتَوَلَّ يُعَذِّبْهُ عَذَابًا أَلِيمًا',
        translationTr: 'Köre güçlük yoktur, topala güçlük yoktur, hastaya güçlük yoktur. Kim Allah\'a ve Resulü\'ne itaat ederse onu, altından ırmaklar akan cennetlere koyar; kim de yüz çevirirse onu acı bir azapla cezalandırır.',
        translationEn: 'There is not upon the blind any guilt or upon the lame any guilt or upon the ill any guilt. And whoever obeys Allah and His Messenger – He will admit him to gardens beneath which rivers flow; but whoever turns away – He will punish him with a painful punishment.',
        transliteration: 'Leyse alel a\'mâ haracün ve lâ alel a\'raci haracün ve lâ alel marîdi haracün ve men yüti\'illâhe ve resûlehu yüdhilhu cennâtin tecrî min tahtihel enhâru ve men yetevelle yuazzibhu azâben elîmâ'
      },
      {
        number: 18,
        arabic: 'لَّقَدْ رَضِيَ اللَّهُ عَنِ الْمُؤْمِنِينَ إِذْ يُبَايِعُونَكَ تَحْتَ الشَّجَرَةِ فَعَلِمَ مَا فِي قُلُوبِهِمْ فَأَنزَلَ السَّكِينَةَ عَلَيْهِمْ وَأَثَابَهُمْ فَتْحًا قَرِيبًا',
        translationTr: 'Andolsun, Allah, ağaç altında sana biat ederlerken müminlerden razı oldu. Kalplerinde olanı bildi, onlara huzur ve güven indirdi ve onları yakın bir fetihle mükâfatlandırdı.',
        translationEn: 'Certainly was Allah pleased with the believers when they pledged allegiance to you under the tree, and He knew what was in their hearts, so He sent down tranquility upon them and rewarded them with an imminent conquest.',
        transliteration: 'Lekad radıyallâhu anil mü\'minîne iz yübâyi\'ûneke tahteşşecerati fe\'alime mâ fî kulûbihim feenzelessekînete aleyhim ve esâbehüm fethan karîbâ'
      },
      {
        number: 19,
        arabic: 'وَمَغَانِمَ كَثِيرَةً يَأْخُذُونَهَا وَكَانَ اللَّهُ عَزِيزًا حَكِيمًا',
        translationTr: 'Ve alacakları birçok ganimetler verdi. Allah mutlak güç sahibidir, hüküm ve hikmet sahibidir.',
        translationEn: 'And much war booty which they will take. And ever is Allah Exalted in Might and Wise.',
        transliteration: 'Ve meğânime kesîreten ye\'huzûnehâ ve kânellâhu azîzen hakîmâ'
      },
      {
        number: 20,
        arabic: 'وَعَدَكُمُ اللَّهُ مَغَانِمَ كَثِيرَةً تَأْخُذُونَهَا فَعَجَّلَ لَكُمْ هَٰذِهِ وَكَفَّ أَيْدِيَ النَّاسِ عَنكُمْ وَلِتَكُونَ آيَةً لِّلْمُؤْمِنِينَ وَيَهْدِيَكُمْ صِرَاطًا مُّسْتَقِيمًا',
        translationTr: 'Allah size alacağınız pek çok ganimetler vaat etmiştir; şimdilik size bunu vermiştir. İnsanların ellerini sizden uzak tutmuştur ki bu, müminler için bir ayet olsun ve sizi doğru yola ulaştırsın.',
        translationEn: 'Allah has promised you much booty that you will take and has hastened for you this and withheld the hands of people from you – that it may be a sign for the believers and that He may guide you to a straight path.',
        transliteration: 'Ve adekümüllâhu meğânime kesîreten te\'huzûnehâ feaccele lekum hâzihî ve keffe eydiyennâsi anküm ve litrekûne âyeten lil mü\'minîne ve yehdiyeküm sırâtan müstekîmâ'
      },
      {
        number: 21,
        arabic: 'وَأُخْرَىٰ لَمْ تَقْدِرُوا عَلَيْهَا قَدْ أَحَاطَ اللَّهُ بِهَا وَكَانَ اللَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرًا',
        translationTr: 'Henüz ele geçiremediğiniz başka ganimetler de var. Allah onları çepeçevre kuşatmıştır. Allah her şeye kadirdir.',
        translationEn: 'And other victories which you were not yet able to gain Allah has already encompassed. And ever is Allah, over all things, competent.',
        transliteration: 'Ve uhrâ lem takdirû aleyhâ kad ahâtellâhu bihâ ve kânellâhu alâ külli şey\'in kadîrâ'
      },
      {
        number: 22,
        arabic: 'وَلَوْ قَاتَلَكُمُ الَّذِينَ كَفَرُوا لَوَلَّوُا الْأَدْبَارَ ثُمَّ لَا يَجِدُونَ وَلِيًّا وَلَا نَصِيرًا',
        translationTr: 'Eğer kâfirler sizinle savaşsalardı, kesinlikle geri dönüp kaçarlardı. Sonra bir dost ve yardımcı bulamazlardı.',
        translationEn: 'And if those who disbelieved had fought you, they would have turned their backs in flight. Then they would not find a protector or a helper.',
        transliteration: 'Ve lev kâtelekümüllezîne keferû levellevel edbâre sümme lâ yecidûne veliyyen ve lâ nasîrâ'
      },
      {
        number: 23,
        arabic: 'سُنَّةَ اللَّهِ الَّتِي قَدْ خَلَتْ مِن قَبْلُ وَلَن تَجِدَ لِسُنَّةِ اللَّهِ تَبْدِيلًا',
        translationTr: 'Bu, daha önce de geçerli olan Allah\'ın kanunudur. Allah\'ın kanununda asla değişiklik bulamazsın.',
        translationEn: 'This is the established way of Allah which has occurred before. And never will you find in the way of Allah any change.',
        transliteration: 'Sünnetellâhilletî kad halet min kablu ve len tecide lisünnetillâhi tebdîlâ'
      },
      {
        number: 24,
        arabic: 'وَهُوَ الَّذِي كَفَّ أَيْدِيَهُمْ عَنكُمْ وَأَيْدِيَكُمْ عَنْهُم بِبَطْنِ مَكَّةَ مِن بَعْدِ أَنْ أَظْفَرَكُمْ عَلَيْهِمْ وَكَانَ اللَّهُ بِمَا تَعْمَلُونَ بَصِيرًا',
        translationTr: 'Mekke\'nin içinde, sizi onlara galip getirdikten sonra sizi onlara, onları da size karşı zafer kazanmaktan alıkoyan O\'dur. Allah yaptıklarınızı hakkıyla görmektedir.',
        translationEn: 'And it is He who withheld their hands from you and your hands from them within Makkah after He caused you to overcome them. And ever is Allah of what you do, Seeing.',
        transliteration: 'Ve hüvellezî keffe eydiyehum anküm ve eydiyeküm anhüm bibatnı mekkete min ba\'di en azferaküm aleyhim ve kânellâhu bimâ ta\'melûne basîrâ'
      },
      {
        number: 25,
        arabic: 'هُمُ الَّذِينَ كَفَرُوا وَصَدُّوكُمْ عَنِ الْمَسْجِدِ الْحَرَامِ وَالْهَدْيَ مَعْكُوفًا أَن يَبْلُغَ مَحِلَّهُ وَلَوْلَا رِجَالٌ مُّؤْمِنُونَ وَنِسَاءٌ مُّؤْمِنَاتٌ لَّمْ تَعْلَمُوهُمْ أَن تَطَئُوهُمْ فَتُصِيبَكُم مِّنْهُم مَّعَرَّةٌ بِغَيْرِ عِلْمٍ لِّيُدْخِلَ اللَّهُ فِي رَحْمَتِهِ مَن يَشَاءُ لَوْ تَزَيَّلُوا لَعَذَّبْنَا الَّذِينَ كَفَرُوا مِنْهُمْ عَذَابًا أَلِيمًا',
        translationTr: 'Onlar, kâfir olan ve sizi Mescid-i Haram\'dan ve kurbanlıkların yerlerine ulaşmasından alıkoyanlardır. Eğer onların içindeki farkında olmadığınız mümin erkekler ve mümin kadınlar olmasaydı ve bilmeden onları çiğneyip size büyük üzüntü vermeseydiniz (savaşırdınız). Allah dilediğini rahmetine dahil etmek için (sizi engelledi). Birbirinden ayrılmış olsalardı, onlar içindeki kafirlere mutlaka acı bir azap verirdik.',
        translationEn: 'They are the ones who disbelieved and obstructed you from al-Masjid al-Haram while the offering was prevented from reaching its place of sacrifice. And if not for believing men and believing women whom you did not know – that you might trample them and there would befall you because of them dishonor without your knowledge – so that Allah would admit into His mercy whom He wills. If they had been apart, We would have punished those who disbelieved among them with painful punishment.',
        transliteration: 'Hümüllezîne keferû ve saddûküm anil mescidil harâmi vel hedye ma\'kûfen en yeblüğa mahılleh ve levlâ ricâlün mü\'minûne ve nisâün mü\'minâtün lem ta\'lemûhüm en tataeûhüm fetuşîbeküm minhüm mearretün biğayri ilmin liyüdhilallâhu fî rahmetihî men yeşâü lev tezeyyelû leazzebnellezîne keferû minhüm azâben elîmâ'
      },
      {
        number: 26,
        arabic: 'إِذْ جَعَلَ الَّذِينَ كَفَرُوا فِي قُلُوبِهِمُ الْحَمِيَّةَ حَمِيَّةَ الْجَاهِلِيَّةِ فَأَنزَلَ اللَّهُ سَكِينَتَهُ عَلَىٰ رَسُولِهِ وَعَلَى الْمُؤْمِنِينَ وَأَلْزَمَهُمْ كَلِمَةَ التَّقْوَىٰ وَكَانُوا أَحَقَّ بِهَا وَأَهْلَهَا وَكَانَ اللَّهُ بِكُلِّ شَيْءٍ عَلِيمًا',
        translationTr: 'O vakit kâfirler kalplerine cahiliye taassubunu yerleştirdiklerinde Allah, Resulü\'ne ve müminlere huzur ve güvenini indirdi; onları takvâ sözüne bağlı kıldı. Zaten bunlar o söze en layık ve ehil olanlardı. Allah her şeyi bilendir.',
        translationEn: 'When those who disbelieved had put into their hearts chauvinism – the chauvinism of the time of ignorance. But Allah sent down His tranquility upon His Messenger and upon the believers and imposed upon them the word of righteousness, and they were more deserving of it and worthy of it. And ever is Allah, of all things, Knowing.',
        transliteration: 'İz cealellezîne keferû fî kulûbihimül hamiyyete hamiyyetel câhiliyyeti feenzelellâhu sekînetehu alâ resûlihî ve alel mü\'minîne ve elzemehüm kelimetet takva ve kânû ehakka bihâ ve ehlehâ ve kânellâhu bikülli şey\'in alîmâ'
      },
      {
        number: 27,
        arabic: 'لَّقَدْ صَدَقَ اللَّهُ رَسُولَهُ الرُّؤْيَا بِالْحَقِّ لَتَدْخُلُنَّ الْمَسْجِدَ الْحَرَامَ إِن شَاءَ اللَّهُ آمِنِينَ مُحَلِّقِينَ رُءُوسَكُمْ وَمُقَصِّرِينَ لَا تَخَافُونَ فَعَلِمَ مَا لَمْ تَعْلَمُوا فَجَعَلَ مِن دُونِ ذَٰلِكَ فَتْحًا قَرِيبًا',
        translationTr: 'Allah, elçisinin rüyasını doğru çıkardı. Allah dilerse mutlaka Mescid-i Haram\'a güvenle gireceksiniz; başlarınızı tıraş etmiş ve kısaltmış olarak, korkmadan. Allah bilmediğinizi bildi de bunun öncesinde yakın bir fetih kıldı.',
        translationEn: 'Already had Allah showed His Messenger the vision in truth. You will surely enter al-Masjid al-Haram, if Allah wills, in safety, with your heads shaved and hair shortened, not fearing. He knew what you did not know and has arranged before that a near conquest.',
        transliteration: 'Lekad sadakallâhu resûlehu rü\'yâ bil hakki letedhulennel mescidel harâme in şâellâhu âminîne muhallıkîne ru\'ûseküm ve mukassırîne lâ tehâfûne fealime mâ lem ta\'lemû feceale min dûni zâlike fethan karîbâ'
      },
      {
        number: 28,
        arabic: 'هُوَ الَّذِي أَرْسَلَ رَسُولَهُ بِالْهُدَىٰ وَدِينِ الْحَقِّ لِيُظْهِرَهُ عَلَى الدِّينِ كُلِّهِ وَكَفَىٰ بِاللَّهِ شَهِيدًا',
        translationTr: 'O, bütün dinlere üstün kılmak için Resulü\'nü hidayet ve hak din ile gönderendir. Şahit olarak Allah yeter.',
        translationEn: 'It is He who sent His Messenger with guidance and the religion of truth to manifest it over all religion. And sufficient is Allah as Witness.',
        transliteration: 'Hüvellezî ersele resûlehu bilhüdâ ve dînil hakki liyuzhirehu aleddîni küllihî ve kefâ billâhi şehîdâ'
      },
      {
        number: 29,
        arabic: 'مُّحَمَّدٌ رَّسُولُ اللَّهِ وَالَّذِينَ مَعَهُ أَشِدَّاءُ عَلَى الْكُفَّارِ رُحَمَاءُ بَيْنَهُمْ تَرَاهُمْ رُكَّعًا سُجَّدًا يَبْتَغُونَ فَضْلًا مِّنَ اللَّهِ وَرِضْوَانًا سِيمَاهُمْ فِي وُجُوهِهِم مِّنْ أَثَرِ السُّجُودِ ذَٰلِكَ مَثَلُهُمْ فِي التَّوْرَاةِ وَمَثَلُهُمْ فِي الْإِنجِيلِ كَزَرْعٍ أَخْرَجَ شَطْأَهُ فَآزَرَهُ فَاسْتَغْلَظَ فَاسْتَوَىٰ عَلَىٰ سُوقِهِ يُعْجِبُ الزُّرَّاعَ لِيَغِيظَ بِهِمُ الْكُفَّارَ وَعَدَ اللَّهُ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ مِنْهُم مَّغْفِرَةً وَأَجْرًا عَظِيمًا',
        translationTr: 'Muhammed, Allah\'ın Resulü\'dür. Beraberindekiler kâfirlere karşı çetin, kendi aralarında ise merhametlidirler. Onları rükûda, secdede görürsün. Allah\'tan lütuf ve rıza ararlar. Alametleri, yüzlerindeki secde izidir. Bu, onların Tevrat\'taki vasıflarıdır. İncil\'deki vasıfları ise şöyledir: Onlar filizini çıkarmış, onu güçlendirmiş, giderek kalınlaşmış, sonunda gövdesi üzerinde doğrulmuş bir ekine benzerler ki bu, ekicilerin hoşuna gider. Böylece Allah, onlar sayesinde kâfirleri öfkelendirsin. Allah içlerinden inanıp iyi işler yapanlara mağfiret ve büyük bir mükâfat vaat etmiştir.',
        translationEn: 'Muhammad is the Messenger of Allah; and those with him are forceful against the disbelievers, merciful among themselves. You see them bowing and prostrating, seeking bounty from Allah and His approval. Their mark is on their faces from the trace of prostration. That is their description in the Torah. And their description in the Gospel is as a plant which produces its offshoots and strengthens them so they grow firm and stand upon their stalks, delighting the sowers – so that He may enrage by them the disbelievers. Allah has promised those who believe and do righteous deeds among them forgiveness and a great reward.',
        transliteration: 'Muhammedün resûlullâh vellezîne meahû eşiddâü alel küffâri ruhamâü beynehüm terâhüm rükkeân süccedâ yebteğûne fadlen minallâhi ve rıdvânâ sîmâhüm fî vücûhihim min eseris sücûdi zâlike meselühüm fittevrati ve meselühüm filingilî kezera\'in ahrace şat\'ehü feâzerehü festeğlaze festavâ alâ sûkihî yu\'cibüz zurrâ\'a liyeğîza bihimül küffâr veadallâhüllezîne âmenû ve amilüssâlihâti minhüm mağfireten ve ecren azîmâ'
      },
    ],
  },
];

export const getSurahById = (id: string): SurahData | undefined => {
  return surahsData.find(s => s.id === id);
};
