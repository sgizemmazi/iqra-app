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
        transliteration: 'İnna fetahna leke fethan mubina'
      },
      {
        number: 2,
        arabic: 'لِّيَغْفِرَ لَكَ اللَّهُ مَا تَقَدَّمَ مِن ذَنبِكَ وَمَا تَأَخَّرَ وَيُتِمَّ نِعْمَتَهُ عَلَيْكَ وَيَهْدِيَكَ صِرَاطًا مُّسْتَقِيمًا',
        translationTr: 'Allah, senin geçmiş ve gelecek günahlarını bağışlasın; sana olan nimetini tamamlasın ve seni doğru yola iletsin.',
        translationEn: 'That Allah may forgive for you what preceded of your sin and what will follow and complete His favor upon you and guide you to a straight path.',
        transliteration: 'Liyağfire lekellaahu maa tekaddeme min zenbike ve maa teahhara ve yutimme ni\'metehu aleyke ve yehdiyeke sıratan mustekima'
      },
      {
        number: 3,
        arabic: 'وَيَنصُرَكَ اللَّهُ نَصْرًا عَزِيزًا',
        translationTr: 'Ve Allah sana şanlı bir zaferle yardım etsin.',
        translationEn: 'And that Allah may aid you with a mighty victory.',
        transliteration: 'Ve yensurakeallahu nasran aziza'
      },
      {
        number: 4,
        arabic: 'هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ لِيَزْدَادُوا إِيمَانًا مَّعَ إِيمَانِهِمْ',
        translationTr: 'Müminlerin imanlarına iman katmaları için onların kalplerine huzur ve güven indiren O\'dur.',
        translationEn: 'It is He who sent down tranquility into the hearts of the believers that they would increase in faith along with their present faith.',
        transliteration: 'Hüvellezi enzelessekinete fi kulubil mu\'minine liyezdadu imanen mea imanihim'
      },
      {
        number: 5,
        arabic: 'لِّيُدْخِلَ الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا',
        translationTr: 'Mümin erkekleri ve mümin kadınları, altından ırmaklar akan cennetlere koysun; orada ebedi olarak kalsınlar.',
        translationEn: 'That He may admit the believing men and the believing women to gardens beneath which rivers flow to abide therein eternally.',
        transliteration: 'Liyudhillel mu\'minine vel mu\'minati cennatin tecri min tahtihal enharu halidine fiha'
      },
      {
        number: 6,
        arabic: 'وَيُعَذِّبَ الْمُنَافِقِينَ وَالْمُنَافِقَاتِ وَالْمُشْرِكِينَ وَالْمُشْرِكَاتِ الظَّانِّينَ بِاللَّهِ ظَنَّ السَّوْءِ',
        translationTr: 'Allah hakkında kötü zanda bulunan münafıklara ve müşriklere azap etsin.',
        translationEn: 'And that He may punish the hypocrite men and hypocrite women, and the polytheist men and polytheist women who assume about Allah an assumption of evil nature.',
        transliteration: 'Ve yuazzibel munafikiyne vel munafıkati vel muşrikiyne vel muşrikatiż żanniyne billahi żannes sev\''
      },
      {
        number: 7,
        arabic: 'وَلِلَّهِ جُنُودُ السَّمَاوَاتِ وَالْأَرْضِ ۚ وَكَانَ اللَّهُ عَزِيزًا حَكِيمًا',
        translationTr: 'Göklerin ve yerin orduları Allah\'ındır. Allah mutlak güç sahibidir, hüküm ve hikmet sahibidir.',
        translationEn: 'And to Allah belong the soldiers of the heavens and the earth, and ever is Allah Exalted in Might and Wise.',
        transliteration: 'Ve lillahi cunudu semavati vel ard ve kanallahu aziyen hakima'
      },
      {
        number: 8,
        arabic: 'إِنَّا أَرْسَلْنَاكَ شَاهِدًا وَمُبَشِّرًا وَنَذِيرًا',
        translationTr: 'Şüphesiz biz seni bir şahit, bir müjdeci ve bir uyarıcı olarak gönderdik.',
        translationEn: 'Indeed, We have sent you as a witness and a bringer of good tidings and a warner.',
        transliteration: 'İnna erselnake şahiden ve mubeşşiran ve nezira'
      },
      {
        number: 9,
        arabic: 'لِّتُؤْمِنُوا بِاللَّهِ وَرَسُولِهِ وَتُعَزِّرُوهُ وَتُوَقِّرُوهُ وَتُسَبِّحُوهُ بُكْرَةً وَأَصِيلًا',
        translationTr: 'Ta ki Allah\'a ve Resulü\'ne inanesiniz, onu destekleyip saygı gösteresiniz ve sabah akşam Allah\'ı tesbih edesiniz.',
        translationEn: 'That you may believe in Allah and His Messenger and honor him and respect the Prophet and exalt Allah morning and afternoon.',
        transliteration: 'Litu\'minu billahi ve resulihi ve tuazziruhu ve tuvakkıruhu ve tüsebbihuhu bukreten ve asıla'
      },
      {
        number: 10,
        arabic: 'إِنَّ الَّذِينَ يُبَايِعُونَكَ إِنَّمَا يُبَايِعُونَ اللَّهَ يَدُ اللَّهِ فَوْقَ أَيْدِيهِمْ',
        translationTr: 'Sana biat edenler, şüphesiz Allah\'a biat etmektedirler. Allah\'ın eli onların ellerinin üzerindedir.',
        translationEn: 'Indeed, those who pledge allegiance to you are actually pledging allegiance to Allah. The hand of Allah is over their hands.',
        transliteration: 'İnnellezine yubayiuuneke innema yubayiunallah yadullahi fevka eydihim'
      },
      {
        number: 11,
        arabic: 'سَيَقُولُ لَكَ الْمُخَلَّفُونَ مِنَ الْأَعْرَابِ شَغَلَتْنَا أَمْوَالُنَا وَأَهْلُونَا فَاسْتَغْفِرْ لَنَا',
        translationTr: 'Bedevilerden geri kalanlar sana: "Bizi mallarımız ve ailemiz meşgul etti; bizim için mağfiret dile!" diyecekler.',
        translationEn: 'Those who remained behind of the bedouins will say to you, "Our properties and our families occupied us, so ask forgiveness for us."',
        transliteration: 'Seyekulü lekel muhallefune minel a\'rabi şeğaletna emvalüna ve ehluna festağfir lena'
      },
      {
        number: 12,
        arabic: 'بَلْ ظَنَنتُمْ أَن لَّن يَنقَلِبَ الرَّسُولُ وَالْمُؤْمِنُونَ إِلَىٰ أَهْلِيهِمْ أَبَدًا',
        translationTr: 'Hayır, siz peygamberin ve müminlerin ailelerine asla dönmeyeceğini sandınız.',
        translationEn: 'But you thought that the Messenger and the believers would never return to their families, ever.',
        transliteration: 'Bel zanentum en len yenkaliberrasulu vel mu\'minune ila ehlihim ebeden'
      },
      {
        number: 13,
        arabic: 'وَمَن لَّمْ يُؤْمِن بِاللَّهِ وَرَسُولِهِ فَإِنَّا أَعْتَدْنَا لِلْكَافِرِينَ سَعِيرًا',
        translationTr: 'Kim Allah\'a ve Resulü\'ne inanmazsa, şüphesiz biz kâfirler için alevli bir ateş hazırladık.',
        translationEn: 'And whoever has not believed in Allah and His Messenger - then indeed, We have prepared for the disbelievers a Blaze.',
        transliteration: 'Ve men lem yu\'min billahi ve resulihi fe inna e\'tedna lilkafiriyne se\'ira'
      },
      {
        number: 14,
        arabic: 'وَلِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ يَغْفِرُ لِمَن يَشَاءُ وَيُعَذِّبُ مَن يَشَاءُ',
        translationTr: 'Göklerin ve yerin mülkü Allah\'ındır. Dilediğini bağışlar, dilediğine azap eder.',
        translationEn: 'And to Allah belongs the dominion of the heavens and the earth. He forgives whom He wills and punishes whom He wills.',
        transliteration: 'Ve lillahi mulku semavati vel ard yağfiru limen yeşau ve yuazzibu men yeşau'
      },
      {
        number: 15,
        arabic: 'سَيَقُولُ الْمُخَلَّفُونَ إِذَا انطَلَقْتُمْ إِلَىٰ مَغَانِمَ لِتَأْخُذُوهَا ذَرُونَا نَتَّبِعْكُمْ',
        translationTr: 'Ganimetler almak için yola çıktığınızda geri kalanlar: "Bırakın bizi de size katılalım" diyecekler.',
        translationEn: 'Those who remained behind will say when you set out toward the war booty to take it, "Let us follow you."',
        transliteration: 'Seyekulel muhallefune izantalaktum ila meğaniyme litahuzuha zeruna nettebikum'
      },
      {
        number: 16,
        arabic: 'قُل لِّلْمُخَلَّفِينَ مِنَ الْأَعْرَابِ سَتُدْعَوْنَ إِلَىٰ قَوْمٍ أُولِي بَأْسٍ شَدِيدٍ',
        translationTr: 'Bedevilerden geri kalanlara de ki: "Yakında çok sert savaşan bir kavme karşı savaşmaya çağrılacaksınız."',
        translationEn: 'Say to those who remained behind of the bedouins, "You will be called to face a people of great military might."',
        transliteration: 'Kul lilmuhallefine minel a\'rabi studavne ila kavmin uli be\'sin şedidin'
      },
      {
        number: 17,
        arabic: 'لَّيْسَ عَلَى الْأَعْمَىٰ حَرَجٌ وَلَا عَلَى الْأَعْرَجِ حَرَجٌ وَلَا عَلَى الْمَرِيضِ حَرَجٌ',
        translationTr: 'Köre güçlük yoktur, topala güçlük yoktur, hastaya güçlük yoktur.',
        translationEn: 'There is not upon the blind any guilt or upon the lame any guilt or upon the ill any guilt.',
        transliteration: 'Leyse alel a\'ma haracun ve la alel a\'raci haracun ve la alel meridi harac'
      },
      {
        number: 18,
        arabic: 'لَّقَدْ رَضِيَ اللَّهُ عَنِ الْمُؤْمِنِينَ إِذْ يُبَايِعُونَكَ تَحْتَ الشَّجَرَةِ',
        translationTr: 'Andolsun, Allah, ağaç altında sana biat ederlerken müminlerden razı oldu.',
        translationEn: 'Certainly was Allah pleased with the believers when they pledged allegiance to you under the tree.',
        transliteration: 'Lekad radıyallahu anil mu\'miniyne iz yubayiuneke tahteşşecerati'
      },
      {
        number: 19,
        arabic: 'وَمَغَانِمَ كَثِيرَةً يَأْخُذُونَهَا وَكَانَ اللَّهُ عَزِيزًا حَكِيمًا',
        translationTr: 'Ve alacakları birçok ganimetler verdi. Allah mutlak güç sahibidir, hüküm ve hikmet sahibidir.',
        translationEn: 'And much war booty which they will take. And ever is Allah Exalted in Might and Wise.',
        transliteration: 'Ve meğanime kesiyreten ye\'huzuneha ve kanallahu aziyen hakima'
      },
      {
        number: 20,
        arabic: 'وَعَدَكُمُ اللَّهُ مَغَانِمَ كَثِيرَةً تَأْخُذُونَهَا فَعَجَّلَ لَكُمْ هَٰذِهِ',
        translationTr: 'Allah size alacağınız pek çok ganimetler vaat etmiştir; şimdilik size bunu vermiştir.',
        translationEn: 'Allah has promised you much booty that you will take and has hastened for you this victory.',
        transliteration: 'Ve adekumullahu meğanime kesiyreten te\'huzuneha fececcele lekum hazihi'
      },
      {
        number: 21,
        arabic: 'وَأُخْرَىٰ لَمْ تَقْدِرُوا عَلَيْهَا قَدْ أَحَاطَ اللَّهُ بِهَا وَكَانَ اللَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرًا',
        translationTr: 'Henüz ele geçiremediğiniz başka ganimetler de var. Allah onları çepeçevre kuşatmıştır. Allah her şeye kadirdir.',
        translationEn: 'And other victories which you were not yet able to gain Allah has already encompassed. And ever is Allah, over all things, competent.',
        transliteration: 'Ve uhra lem takdiru aleyha kad ehatallahu biha ve kanallahu ala kulli şey\'in kadira'
      },
      {
        number: 22,
        arabic: 'وَلَوْ قَاتَلَكُمُ الَّذِينَ كَفَرُوا لَوَلَّوُا الْأَدْبَارَ ثُمَّ لَا يَجِدُونَ وَلِيًّا وَلَا نَصِيرًا',
        translationTr: 'Eğer kâfirler sizinle savaşsalardı, kesinlikle geri dönüp kaçarlardı. Sonra bir dost ve yardımcı bulamazlardı.',
        translationEn: 'And if those who disbelieved had fought you, they would have turned their backs in flight. Then they would not find a protector or a helper.',
        transliteration: 'Ve lev katelekumullezine keferu levellevel edbara summe la yecidune veliyyen ve la nasira'
      },
      {
        number: 23,
        arabic: 'سُنَّةَ اللَّهِ الَّتِي قَدْ خَلَتْ مِن قَبْلُ وَلَن تَجِدَ لِسُنَّةِ اللَّهِ تَبْدِيلًا',
        translationTr: 'Bu, daha önce de geçerli olan Allah\'ın kanunudur. Allah\'ın kanununda asla değişiklik bulamazsın.',
        translationEn: 'This is the established way of Allah which has occurred before. And never will you find in the way of Allah any change.',
        transliteration: 'Sünnetallahilleti kad halet min kabl ve len ticide lisünnetillahi tebdila'
      },
      {
        number: 24,
        arabic: 'وَهُوَ الَّذِي كَفَّ أَيْدِيَهُمْ عَنكُمْ وَأَيْدِيَكُمْ عَنْهُم بِبَطْنِ مَكَّةَ',
        translationTr: 'Mekke\'nin içinde sizi onlara, onları da size karşı zafer kazandırmanızın ardından ellerini sizden çeken O\'dur.',
        translationEn: 'And it is He who withheld their hands from you and your hands from them within Makkah after He caused you to overcome them.',
        transliteration: 'Ve hüvellezi keffe eydiyehum ankum ve eydiyekum anhum bibatnı mekke'
      },
      {
        number: 25,
        arabic: 'هُمُ الَّذِينَ كَفَرُوا وَصَدُّوكُمْ عَنِ الْمَسْجِدِ الْحَرَامِ وَالْهَدْيَ مَعْكُوفًا أَن يَبْلُغَ مَحِلَّهُ',
        translationTr: 'Onlar, kâfir olan ve sizi Mescid-i Haram\'dan ve kurbanlıkların yerlerine ulaşmasından alıkoyanlardır.',
        translationEn: 'They are the ones who disbelieved and obstructed you from al-Masjid al-Haram while the offering was prevented from reaching its place of sacrifice.',
        transliteration: 'Hümüllezine keferu ve saddukum anil mescidil harami vel hedye ma\'kufen en yeblüğa mahılleh'
      },
      {
        number: 26,
        arabic: 'إِذْ جَعَلَ الَّذِينَ كَفَرُوا فِي قُلُوبِهِمُ الْحَمِيَّةَ حَمِيَّةَ الْجَاهِلِيَّةِ فَأَنزَلَ اللَّهُ سَكِينَتَهُ عَلَىٰ رَسُولِهِ',
        translationTr: 'O vakit kâfirler kalplerine cahiliye taassubunu yerleştirdiklerinde Allah, Resulü\'ne ve müminlere huzur ve güvenini indirdi.',
        translationEn: 'When those who disbelieved had put into their hearts chauvinism of the time of ignorance, Allah sent down His tranquility upon His Messenger and upon the believers.',
        transliteration: 'İz cealellezine keferu fi kulubihimul hamiyyete hamiyyetel cahiliyyeti fe enzelallahu sekinetehu ala resulihi'
      },
      {
        number: 27,
        arabic: 'لَّقَدْ صَدَقَ اللَّهُ رَسُولَهُ الرُّؤْيَا بِالْحَقِّ لَتَدْخُلُنَّ الْمَسْجِدَ الْحَرَامَ إِن شَاءَ اللَّهُ آمِنِينَ',
        translationTr: 'Allah, elçisinin rüyasını doğru çıkardı. Allah dilerse mutlaka Mescid-i Haram\'a güvenle gireceksiniz.',
        translationEn: 'Already had Allah showed His Messenger the vision in truth. You will surely enter al-Masjid al-Haram, if Allah wills, in safety.',
        transliteration: 'Lekad sadakallahu resulehu ru\'yabilhakk letedhulennel mescidel harame in şaallahu aminine'
      },
      {
        number: 28,
        arabic: 'هُوَ الَّذِي أَرْسَلَ رَسُولَهُ بِالْهُدَىٰ وَدِينِ الْحَقِّ لِيُظْهِرَهُ عَلَى الدِّينِ كُلِّهِ',
        translationTr: 'O, bütün dinlere üstün kılmak için Resulü\'nü hidayet ve hak din ile gönderendir.',
        translationEn: 'It is He who sent His Messenger with guidance and the religion of truth to manifest it over all religion.',
        transliteration: 'Hüvellezi ersele resulehu bilhuda ve dinilhakki liyuzhirehu aleddini kullihi'
      },
      {
        number: 29,
        arabic: 'مُّحَمَّدٌ رَّسُولُ اللَّهِ وَالَّذِينَ مَعَهُ أَشِدَّاءُ عَلَى الْكُفَّارِ رُحَمَاءُ بَيْنَهُمْ تَرَاهُمْ رُكَّعًا سُجَّدًا',
        translationTr: 'Muhammed, Allah\'ın Resulü\'dür. Beraberindekiler kâfirlere karşı çetin, kendi aralarında ise merhametlidirler. Onları rükûda, secdede görürsün.',
        translationEn: 'Muhammad is the Messenger of Allah; and those with him are forceful against the disbelievers, merciful among themselves. You see them bowing and prostrating in prayer.',
        transliteration: 'Muhammedün resulullah vellezine me\'ahu eşiddau alel kuffari rühamau beynehüm terahüm rükkean sücceden'
      },
    ],
  },
];

export const getSurahById = (id: string): SurahData | undefined => {
  return surahsData.find(s => s.id === id);
};
