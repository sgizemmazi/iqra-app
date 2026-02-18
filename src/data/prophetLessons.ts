import { Lesson } from "@/types/gamification";

/**
 * Peygamberler dersleri
 * Her peygamber için 3-4 adımlık interaktif dersler
 */
export const prophetLessons: Lesson[] = [
  {
    id: "prophet_adam",
    title: {
      tr: "Hz. Adem (a.s.)",
      en: "Prophet Adam (a.s.)",
      ar: "النبي آدم عليه السلام",
    },
    description: {
      tr: "İlk insan ve ilk peygamber Hz. Adem'in hikayesi",
      en: "The story of the first human and first prophet, Adam",
      ar: "قصة أول إنسان وأول نبي آدم",
    },
    contentType: "knowledge",
    contentId: "prophet_adam",
    difficulty: "easy",
    estimatedMinutes: 5,
    totalXP: 50,
    order: 1,
    steps: [
      {
        id: "adam_intro",
        type: "intro",
        arabicText: "آدَمُ عَلَيْهِ السَّلَامُ",
        transliteration: "Adam Aleyhisselam",
        translation: {
          tr: "Hz. Adem (Allah'ın selamı üzerine olsun)",
          en: "Prophet Adam (Peace be upon him)",
          ar: "النبي آدم (عليه السلام)",
        },
        explanation: {
          tr: "Hz. Adem, Allah'ın yarattığı ilk insan ve ilk peygamberdir. Allah onu topraktan yarattı ve meleklere önünde secde etmelerini emretti.",
          en: "Prophet Adam is the first human created by Allah and the first prophet. Allah created him from clay and commanded the angels to prostrate before him.",
          ar: "النبي آدم هو أول إنسان خلقه الله وأول نبي. خلقه الله من طين وأمر الملائكة بالسجود له.",
        },
        xpReward: 10,
      },
      {
        id: "adam_story",
        type: "read_translate",
        arabicText: "وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا",
        transliteration: "Ve alleme Ademe'l-esmae kulleha",
        translation: {
          tr: "Ve Adem'e bütün isimleri öğretti",
          en: "And He taught Adam all the names",
          ar: "وعلَّم آدم الأسماء كلها",
        },
        explanation: {
          tr: "Allah, Hz. Adem'e tüm varlıkların isimlerini öğretti. Bu, insanın öğrenme ve bilgi yeteneğini gösterir.",
          en: "Allah taught Adam the names of all things. This shows the human capacity for learning and knowledge.",
          ar: "علَّم الله آدم أسماء جميع الأشياء. وهذا يُظهر قدرة الإنسان على التعلم والمعرفة.",
        },
        xpReward: 20,
      },
      {
        id: "adam_quiz",
        type: "fill_blank",
        arabicText: "Allah, Hz. Adem'i _____ yarattı.",
        blankWord: "topraktan",
        options: ["topraktan", "sudan", "ateşten", "rüzgardan"],
        correctAnswer: "topraktan",
        explanation: {
          tr: "Allah, Hz. Adem'i topraktan yarattı ve ona ruh üfledi.",
          en: "Allah created Adam from clay and breathed spirit into him.",
          ar: "خلق الله آدم من الطين ونفخ فيه الروح.",
        },
        xpReward: 20,
      },
    ],
  },

  {
    id: "prophet_nuh",
    title: {
      tr: "Hz. Nuh (a.s.)",
      en: "Prophet Noah (a.s.)",
      ar: "النبي نوح عليه السلام",
    },
    description: {
      tr: "Tufan ve gemi yapan peygamber Hz. Nuh",
      en: "Prophet Noah who built the ark before the great flood",
      ar: "النبي نوح الذي بنى السفينة قبل الطوفان العظيم",
    },
    contentType: "knowledge",
    contentId: "prophet_nuh",
    difficulty: "easy",
    estimatedMinutes: 5,
    totalXP: 50,
    order: 2,
    steps: [
      {
        id: "nuh_intro",
        type: "intro",
        arabicText: "نُوحٌ عَلَيْهِ السَّلَامُ",
        transliteration: "Nuh Aleyhisselam",
        translation: {
          tr: "Hz. Nuh (Allah'ın selamı üzerine olsun)",
          en: "Prophet Noah (Peace be upon him)",
          ar: "النبي نوح (عليه السلام)",
        },
        explanation: {
          tr: "Hz. Nuh, kavmini 950 yıl boyunca Allah'a iman etmeye çağırdı. Sadece az sayıda insan ona inandı.",
          en: "Prophet Noah called his people to believe in Allah for 950 years. Only a few people believed in him.",
          ar: "دعا النبي نوح قومه إلى الإيمان بالله لمدة 950 عامًا. وآمن به عدد قليل من الناس.",
        },
        xpReward: 10,
      },
      {
        id: "nuh_story",
        type: "read_translate",
        arabicText: "فَأَوْحَيْنَا إِلَيْهِ أَنِ اصْنَعِ الْفُلْكَ",
        transliteration: "Fe evhayna ileyhi eni's-nai'l-fulke",
        translation: {
          tr: "Ona vahyettik ki: Gemiyi yap!",
          en: "So We inspired him: Build the ship!",
          ar: "فأوحينا إليه أن اصنع الفلك",
        },
        explanation: {
          tr: "Allah, Hz. Nuh'a gemi yapmasını emretti. İnanan insanlar ve her hayvandan bir çift gemi binecekti.",
          en: "Allah commanded Noah to build a ship. The believers and pairs of every animal would board the ship.",
          ar: "أمر الله نوحًا ببناء سفينة. سيصعد المؤمنون وأزواج من كل حيوان السفينة.",
        },
        xpReward: 20,
      },
      {
        id: "nuh_quiz",
        type: "fill_blank",
        arabicText: "Hz. Nuh kaç yıl boyunca kavmini iman etmeye çağırdı?",
        blankWord: "950",
        options: ["100", "500", "950", "1000"],
        correctAnswer: "950",
        explanation: {
          tr: "Hz. Nuh 950 yıl boyunca sabırla kavmini uyardı ve Tevhid'e davet etti.",
          en: "Prophet Noah patiently warned his people for 950 years and invited them to monotheism.",
          ar: "حذَّر النبي نوح قومه بصبر لمدة 950 عامًا ودعاهم إلى التوحيد.",
        },
        xpReward: 20,
      },
    ],
  },

  {
    id: "prophet_ibrahim",
    title: {
      tr: "Hz. İbrahim (a.s.)",
      en: "Prophet Abraham (a.s.)",
      ar: "النبي إبراهيم عليه السلام",
    },
    description: {
      tr: "Peygamberlerin babası Hz. İbrahim",
      en: "The father of prophets, Abraham",
      ar: "أبو الأنبياء إبراهيم",
    },
    contentType: "knowledge",
    contentId: "prophet_ibrahim",
    difficulty: "easy",
    estimatedMinutes: 6,
    totalXP: 50,
    order: 3,
    steps: [
      {
        id: "ibrahim_intro",
        type: "intro",
        arabicText: "إِبْرَاهِيمُ عَلَيْهِ السَّلَامُ",
        transliteration: "İbrahim Aleyhisselam",
        translation: {
          tr: "Hz. İbrahim (Allah'ın selamı üzerine olsun)",
          en: "Prophet Abraham (Peace be upon him)",
          ar: "النبي إبراهيم (عليه السلام)",
        },
        explanation: {
          tr: "Hz. İbrahim, iman ve tevhid konusunda büyük bir örnek olan peygamberlerdendir. Putperest bir kavim arasında tek Allah'a inanmıştır.",
          en: "Prophet Abraham is a great example of faith and monotheism. He believed in one Allah among idol worshippers.",
          ar: "النبي إبراهيم مثال عظيم للإيمان والتوحيد. آمن بالله الواحد بين عبدة الأصنام.",
        },
        xpReward: 10,
      },
      {
        id: "ibrahim_story",
        type: "read_translate",
        arabicText: "فَلَمَّا جَنَّ عَلَيْهِ اللَّيْلُ رَأَى كَوْكَبًا",
        transliteration: "Felemma cenne aleyhi'l-leylu rea kevkeba",
        translation: {
          tr: "Gece olup karanlık basınca bir yıldız gördü",
          en: "When the night covered him, he saw a star",
          ar: "فلما جنَّ عليه الليل رأى كوكبًا",
        },
        explanation: {
          tr: "Hz. İbrahim kavmine Allah'ın varlığını ve birliğini göstermek için yıldızlara, aya ve güneşe baktı. Fakat hepsinin batıp kaybold uğunu görünce 'Batanları sevmem' dedi.",
          en: "Abraham looked at stars, moon and sun to show his people Allah's existence and oneness. But when he saw they all set and disappear, he said 'I do not love those that set.'",
          ar: "نظر إبراهيم إلى النجوم والقمر والشمس ليُظهر لقومه وجود الله ووحدانيته. ولكن عندما رآها تغرب وتختفي قال: لا أحب الآفلين.",
        },
        xpReward: 20,
      },
      {
        id: "ibrahim_quiz",
        type: "fill_blank",
        arabicText: "Hz. İbrahim'e 'Halilullah' yani _____ denir.",
        blankWord: "Allah'ın dostu",
        options: [
          "Allah'ın dostu",
          "Allah'ın kulu",
          "Allah'ın elçisi",
          "Allah'ın peygamberi",
        ],
        correctAnswer: "Allah'ın dostu",
        explanation: {
          tr: "Hz. İbrahim'in Allah'a yakınlığı ve dostluğu nedeniyle kendisine 'Halilullah' (Allah'ın dostu) unvanı verilmiştir.",
          en: "Because of Abraham's closeness and friendship with Allah, he was given the title 'Khalilullah' (Friend of Allah).",
          ar: "بسبب قرب إبراهيم وصداقته مع الله، مُنح لقب 'خليل الله' (صديق الله).",
        },
        xpReward: 20,
      },
    ],
  },

  {
    id: "prophet_ismail",
    title: {
      tr: "Hz. İsmail (a.s.)",
      en: "Prophet Ishmael (a.s.)",
      ar: "النبي إسماعيل عليه السلام",
    },
    description: {
      tr: "Kabe'nin yapımında yardım eden Hz. İsmail",
      en: "Prophet Ishmael who helped build the Kaaba",
      ar: "النبي إسماعيل الذي ساعد في بناء الكعبة",
    },
    contentType: "knowledge",
    contentId: "prophet_ismail",
    difficulty: "easy",
    estimatedMinutes: 5,
    totalXP: 50,
    order: 4,
    steps: [
      {
        id: "ismail_intro",
        type: "intro",
        arabicText: "إِسْمَاعِيلُ عَلَيْهِ السَّلَامُ",
        transliteration: "İsmail Aleyhisselam",
        translation: {
          tr: "Hz. İsmail (Allah'ın selamı üzerine olsun)",
          en: "Prophet Ishmael (Peace be upon him)",
          ar: "النبي إسماعيل (عليه السلام)",
        },
        explanation: {
          tr: "Hz. İsmail, Hz. İbrahim'in oğludur. Sabır ve itaat konusunda örnek bir peygamberdir.",
          en: "Prophet Ishmael is the son of Abraham. He is an exemplary prophet in patience and obedience.",
          ar: "النبي إسماعيل هو ابن إبراهيم. إنه نبي مثالي في الصبر والطاعة.",
        },
        xpReward: 10,
      },
      {
        id: "ismail_story",
        type: "read_translate",
        arabicText:
          "وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ",
        transliteration:
          "Ve iz yerfa'u İbrahimu'l-kavaide mine'l-beyti ve İsmail",
        translation: {
          tr: "Hani İbrahim, İsmail ile birlikte Beyt'in (Kabe'nin) temellerini yükseltiyordu",
          en: "And when Abraham was raising the foundations of the House with Ishmael",
          ar: "وإذ يرفع إبراهيم القواعد من البيت وإسماعيل",
        },
        explanation: {
          tr: "Hz. İbrahim ve oğlu Hz. İsmail birlikte Kabe'yi inşa ettiler. Bu, baba-oğul arasındaki güzel bir işbirliği örneğidir.",
          en: "Abraham and his son Ishmael built the Kaaba together. This is a beautiful example of father-son cooperation.",
          ar: "بنى إبراهيم وابنه إسماعيل الكعبة معًا. هذا مثال جميل على التعاون بين الأب والابن.",
        },
        xpReward: 20,
      },
      {
        id: "ismail_quiz",
        type: "fill_blank",
        arabicText: "Hz. İsmail babasıyla birlikte _____ inşa etti.",
        blankWord: "Kabe'yi",
        options: [
          "Kabe'yi",
          "Mescid-i Aksa'yı",
          "Mescid-i Nebevi'yi",
          "Mescid-i Haram'ı",
        ],
        correctAnswer: "Kabe'yi",
        explanation: {
          tr: "Hz. İbrahim ve Hz. İsmail birlikte Mekke'de Kabe'yi inşa ettiler.",
          en: "Abraham and Ishmael built the Kaaba together in Mecca.",
          ar: "بنى إبراهيم وإسماعيل الكعبة معًا في مكة.",
        },
        xpReward: 20,
      },
    ],
  },

  {
    id: "prophet_yusuf",
    title: {
      tr: "Hz. Yusuf (a.s.)",
      en: "Prophet Joseph (a.s.)",
      ar: "النبي يوسف عليه السلام",
    },
    description: {
      tr: "Rüya tabir eden ve güzel ahlak sahibi Hz. Yusuf",
      en: "Prophet Joseph who interpreted dreams and had beautiful character",
      ar: "النبي يوسف الذي فسَّر الأحلام وكان ذا خلق جميل",
    },
    contentType: "knowledge",
    contentId: "prophet_yusuf",
    difficulty: "medium",
    estimatedMinutes: 6,
    totalXP: 50,
    order: 5,
    steps: [
      {
        id: "yusuf_intro",
        type: "intro",
        arabicText: "يُوسُفُ عَلَيْهِ السَّلَامُ",
        transliteration: "Yusuf Aleyhisselam",
        translation: {
          tr: "Hz. Yusuf (Allah'ın selamı üzerine olsun)",
          en: "Prophet Joseph (Peace be upon him)",
          ar: "النبي يوسف (عليه السلام)",
        },
        explanation: {
          tr: "Hz. Yusuf, Hz. Yakub'un oğludur. Kur'an'da ona özel bir sure ayrılmıştır. Sabır, affedicilik ve güzel ahlak sahibiydi.",
          en: "Prophet Joseph is the son of Jacob. A special chapter in the Quran is dedicated to him. He had patience, forgiveness and beautiful character.",
          ar: "النبي يوسف هو ابن يعقوب. خُصصت له سورة خاصة في القرآن. كان صبورًا وغفورًا وذا خلق جميل.",
        },
        xpReward: 10,
      },
      {
        id: "yusuf_story",
        type: "read_translate",
        arabicText:
          "لَقَدْ كَانَ فِي يُوسُفَ وَإِخْوَتِهِ آيَاتٌ لِلسَّائِلِينَ",
        transliteration: "Lekad kane fi Yusufe ve ihvetihi ayatun lis-sailin",
        translation: {
          tr: "Andolsun ki Yusuf'ta ve kardeşlerinde soranlar için ibretler vardır",
          en: "Indeed in Joseph and his brothers are signs for those who ask",
          ar: "لقد كان في يوسف وإخوته آيات للسائلين",
        },
        explanation: {
          tr: "Hz. Yusuf'un hikayesi imtihan, sabır ve Allah'a tevekkül konusunda derslerle doludur. Kardeşleri tarafından kuyuya atıldı, ama sonunda Mısır'da vezir oldu.",
          en: "The story of Joseph is full of lessons about trials, patience and trust in Allah. He was thrown into a well by his brothers, but eventually became a minister in Egypt.",
          ar: "قصة يوسف مليئة بالدروس عن الابتلاء والصبر والتوكل على الله. ألقاه إخوته في البئر، لكنه أصبح في النهاية وزيرًا في مصر.",
        },
        xpReward: 20,
      },
      {
        id: "yusuf_quiz",
        type: "fill_blank",
        arabicText: "Hz. Yusuf'un özel yeteneği _____ idi.",
        blankWord: "rüya ta biri",
        options: [
          "rüya tabiri",
          "şifa vermek",
          "mucize göstermek",
          "gelecek görme",
        ],
        correctAnswer: "rüya tabiri",
        explanation: {
          tr: "Allah, Hz. Yusuf'a rüyaları yorumlama yeteneği vermişti. Bu sayede hapisteyken kralın rüyasını yorumladı.",
          en: "Allah gave Joseph the ability to interpret dreams. Through this, he interpreted the king's dream while in prison.",
          ar: "أعطى الله يوسف القدرة على تفسير الأحلام. وبفضل هذا فسَّر حلم الملك وهو في السجن.",
        },
        xpReward: 20,
      },
    ],
  },

  {
    id: "prophet_musa",
    title: {
      tr: "Hz. Musa (a.s.)",
      en: "Prophet Moses (a.s.)",
      ar: "النبي موسى عليه السلام",
    },
    description: {
      tr: "Firavun'a karşı duran ve İsrailoğullarını kurtaran Hz. Musa",
      en: "Prophet Moses who stood against Pharaoh and saved the Israelites",
      ar: "النبي موسى الذي واجه فرعون وأنقذ بني إسرائيل",
    },
    contentType: "knowledge",
    contentId: "prophet_musa",
    difficulty: "medium",
    estimatedMinutes: 6,
    totalXP: 50,
    order: 6,
    steps: [
      {
        id: "musa_intro",
        type: "intro",
        arabicText: "مُوسَى عَلَيْهِ السَّلَامُ",
        transliteration: "Musa Aleyhisselam",
        translation: {
          tr: " Hz. Musa (Allah'ın selamı üzerine olsun)",
          en: "Prophet Moses (Peace be upon him)",
          ar: "النبي موسى (عليه السلام)",
        },
        explanation: {
          tr: "Hz. Musa, İsrailoğulları'na gönderilen büyük peygamberlerden biridir. Allah'tan Tevrat'ı almıştır.",
          en: "Prophet Moses is one of the great prophets sent to the Israelites. He received the Torah from Allah.",
          ar: "النبي موسى هو أحد الأنبياء العظام المُرسلين إلى بني إسرائيل. تلقى التوراة من الله.",
        },
        xpReward: 10,
      },
      {
        id: "musa_story",
        type: "read_translate",
        arabicText: "فَأَلْقَى عَصَاهُ فَإِذَا هِيَ ثُعْبَانٌ مُبِينٌ",
        transliteration: "Fe elka asahu fe iza hiye su'banun mubin",
        translation: {
          tr: "Musa asasını atıverdi, bir de ne görsünler, o apaçık bir yılandır",
          en: "So he threw his staff, and suddenly it was a serpent, plain to see",
          ar: "فألقى عصاه فإذا هي ثعبان مبين",
        },
        explanation: {
          tr: "Allah, Hz. Musa'ya mucizeler verdi. Asasını attığında yılana dönüşürdü. Bu mucizelerle Firavun'a Allah'ın gücünü gösterdi.",
          en: "Allah gave Moses miracles. When he threw his staff, it turned into a serpent. With these miracles, he showed Pharaoh the power of Allah.",
          ar: "أعطى الله موسى معجزات. عندما ألقى عصاه، تحولت إلى ثعبان. وبهذه المعجزات أظهر لفرعون قوة الله.",
        },
        xpReward: 20,
      },
      {
        id: "musa_quiz",
        type: "fill_blank",
        arabicText: "Hz. Musa'ya indirilen kitap _____'dır.",
        blankWord: "Tevrat",
        options: ["Tevrat", "İncil", "Zebur", "Kuran"],
        correctAnswer: "Tevrat",
        explanation: {
          tr: "Allah, Hz. Musa'ya Tevrat'ı indirdi. Tevrat, semavi kitaplardan biridir.",
          en: "Allah revealed the Torah to Moses. The Torah is one of the divine books.",
          ar: "أنزل الله التوراة على موسى. التوراة هي أحد الكتب السماوية.",
        },
        xpReward: 20,
      },
    ],
  },

  {
    id: "prophet_dawud",
    title: {
      tr: "Hz. Davud (a.s.)",
      en: "Prophet David (a.s.)",
      ar: "النبي داود عليه السلام",
    },
    description: {
      tr: "Güzel sesli ve Zebur sahibi Hz. Davud",
      en: "Prophet David with beautiful voice and the Psalms",
      ar: "النبي داود صاحب الصوت الجميل والزبور",
    },
    contentType: "knowledge",
    contentId: "prophet_dawud",
    difficulty: "easy",
    estimatedMinutes: 5,
    totalXP: 50,
    order: 7,
    steps: [
      {
        id: "dawud_intro",
        type: "intro",
        arabicText: "دَاوُدُ عَلَيْهِ السَّلَامُ",
        transliteration: "Davud Aleyhisselam",
        translation: {
          tr: "Hz. Davud (Allah'ın selamı üzerine olsun)",
          en: "Prophet David (Peace be upon him)",
          ar: "النبي داود (عليه السلام)",
        },
        explanation: {
          tr: "Hz. Davud hem peygamber hem de kraldı. Allah ona Zebur'u indirdi ve çok güzel bir ses vermişti.",
          en: "Prophet David was both a prophet and a king. Allah revealed the Psalms to him and gave him a very beautiful voice.",
          ar: "كان النبي داود نبيًا وملكًا. أنزل الله عليه الزبور وأعطاه صوتًا جميلاً جدًا.",
        },
        xpReward: 10,
      },
      {
        id: "dawud_story",
        type: "read_translate",
        arabicText: "وَآتَيْنَا دَاوُودَ زَبُورًا",
        transliteration: "Ve ateyna Davude Zebura",
        translation: {
          tr: "Ve Davud'a Zebur'u verdik",
          en: "And We gave David the Psalms",
          ar: "وآتينا داود زبورًا",
        },
        explanation: {
          tr: "Zebur, Hz. Davud'a indirilen ilahi kitaptır. Hz. Davud onu çok güzel sesiyle okurdu, dağlar ve kuşlar ona eşlik ederdi.",
          en: "The Psalms is the divine book revealed to David. David would recite it with his beautiful voice, and mountains and birds would echo with him.",
          ar: "الزبور هو الكتاب الإلهي المُنزل على داود. كان داود يتلوه بصوته الجميل، وكانت الجبال والطيور تُسبِّح معه.",
        },
        xpReward: 20,
      },
      {
        id: "dawud_quiz",
        type: "fill_blank",
        arabicText: "Hz. Davud'a indirilen kitap _____'dur.",
        blankWord: "Zebur",
        options: ["Zebur", "Tevrat", "İncil", "Kuran"],
        correctAnswer: "Zebur",
        explanation: {
          tr: "Zebur, Hz. Davud'a indirilen semavi kitaptır. Dua ve zikirlerden oluşur.",
          en: "The Psalms is the divine book revealed to David. It consists of prayers and remembrances.",
          ar: "الزبور هو الكتاب السماوي المُنزل على داود. يتكون من الأدعية والأذكار.",
        },
        xpReward: 20,
      },
    ],
  },

  {
    id: "prophet_sulayman",
    title: {
      tr: "Hz. Süleyman (a.s.)",
      en: "Prophet Solomon (a.s.)",
      ar: "النبي سليمان عليه السلام",
    },
    description: {
      tr: "Rüzgara, cinlere ve hayvanlara hükmeden Hz. Süleyman",
      en: "Prophet Solomon who commanded wind, jinn and animals",
      ar: "النبي سليمان الذي سيطر على الرياح والجن والحيوانات",
    },
    contentType: "knowledge",
    contentId: "prophet_sulayman",
    difficulty: "medium",
    estimatedMinutes: 6,
    totalXP: 50,
    order: 8,
    steps: [
      {
        id: "sulayman_intro",
        type: "intro",
        arabicText: "سُلَيْمَانُ عَلَيْهِ السَّلَامُ",
        transliteration: "Süleyman Aleyhisselam",
        translation: {
          tr: "Hz. Süleyman (Allah'ın selamı üzerine olsun)",
          en: "Prophet Solomon (Peace be upon him)",
          ar: "النبي سليمان (عليه السلام)",
        },
        explanation: {
          tr: "Hz. Süleyman, Hz. Davud'un oğludur. Allah ona büyük bir mülk ve olağanüstü yetenekler verdi.",
          en: "Prophet Solomon is the son of David. Allah gave him a great kingdom and extraordinary abilities.",
          ar: "النبي سليمان هو ابن داود. أعطاه الله مملكة عظيمة وقدرات غير عادية.",
        },
        xpReward: 10,
      },
      {
        id: "sulayman_story",
        type: "read_translate",
        arabicText:
          "وَ سَخَّرْنَا مَعَ دَاوُودَ الْجِبَالَ يُسَبِّحْنَ وَالطَّيْرَ",
        transliteration: "Ve sehharna mea Davudi'l-cibale yusebihne ve't-tayr",
        translation: {
          tr: "Davud ile birlikte dağları ve kuşları emrine verdik, onlar tesbih ederlerdi",
          en: "And We subjected the mountains with David, glorifying, and the birds",
          ar: "وسخَّرنا مع داود الجبال يُسبِّحن والطير",
        },
        explanation: {
          tr: "Hz. Süleyman hayvanların dilini anlardı, rüzgarı yönlendirebilirdi ve cinler ona hizmet ederdi. Tüm bunları Allah'a şükretmek için kullandı.",
          en: "Solomon understood the language of animals, could direct the wind, and jinn served him. He used all of this to thank Allah.",
          ar: "كان سليمان يفهم لغة الحيوانات، ويستطيع توجيه الرياح، وكانت الجن تخدمه. استخدم كل هذا لشكر الله.",
        },
        xpReward: 20,
      },
      {
        id: "sulayman_quiz",
        type: "fill_blank",
        arabicText: "Hz. Süleyman _____ dilini anlardı.",
        blankWord: "hayvanların",
        options: ["hayvanların", "meleklerin", "insanların", "balıkların"],
        correctAnswer: "hayvanların",
        explanation: {
          tr: "Allah, Hz. Süleyman'a hayvanların dilini anlama yeteneği verdi. Karınca ordusunun konuşmasını bile duyabiliyordu.",
          en: "Allah gave Solomon the ability to understand the language of animals. He could even hear the speech of an army of ants.",
          ar: "أعطى الله سليمان القدرة على فهم لغة الحيوانات. كان يستطيع حتى سماع كلام جيش من النمل.",
        },
        xpReward: 20,
      },
    ],
  },

  {
    id: "prophet_isa",
    title: {
      tr: "Hz. İsa (a.s.)",
      en: "Prophet Jesus (a.s.)",
      ar: "النبي عيسى عليه السلام",
    },
    description: {
      tr: "Mucizelerle doğan ve İncil'e sahip Hz. İsa",
      en: "Prophet Jesus born by miracles with the Gospel",
      ar: "النبي عيسى المولود بالمعجزات وصاحب الإنجيل",
    },
    contentType: "knowledge",
    contentId: "prophet_isa",
    difficulty: "medium",
    estimatedMinutes: 6,
    totalXP: 50,
    order: 9,
    steps: [
      {
        id: "isa_intro",
        type: "intro",
        arabicText: "عِيسَى عَلَيْهِ السَّلَامُ",
        transliteration: "İsa Aleyhisselam",
        translation: {
          tr: "Hz. İsa (Allah'ın selamı üzerine olsun)",
          en: "Prophet Jesus (Peace be upon him)",
          ar: "النبي عيسى (عليه السلام)",
        },
        explanation: {
          tr: "Hz. İsa, Hz. Meryem'in oğludur. Babasız olarak, Allah'ın mucizesiyle dünyaya geldi.",
          en: "Prophet Jesus is the son of Mary. He was born without a father, by the miracle of Allah.",
          ar: "النبي عيسى هو ابن مريم. وُلد بدون أب، بمعجزة من الله.",
        },
        xpReward: 10,
      },
      {
        id: "isa_story",
        type: "read_translate",
        arabicText: "إِنَّ مَثَلَ عِيسَى عِنْدَ اللَّهِ كَمَثَلِ آدَمَ",
        transliteration: "İnne mesele İsa indallahi kemeseli Adem",
        translation: {
          tr: "İsa'nın Allah katındaki durumu Adem'in durumu gibidir",
          en: "Indeed, the example of Jesus to Allah is like that of Adam",
          ar: "إن مثل عيسى عند الله كمثل آدم",
        },
        explanation: {
          tr: "Allah hem Hz. Adem'i babasız-anasız, hem de Hz. İsa'yı babasız yaratmıştır. Her ikisi de Allah'ın kudretinin birer göstergesidir.",
          en: "Allah created both Adam without father or mother, and Jesus without a father. Both are signs of Allah's power.",
          ar: "خلق الله آدم بدون أب أو أم، وعيسى بدون أب. كلاهما علامة على قدرة الله.",
        },
        xpReward: 20,
      },
      {
        id: "isa_quiz",
        type: "fill_blank",
        arabicText: "Hz. İsa'ya indirilen kitap _____'dir.",
        blankWord: "İncil",
        options: ["İncil", "Tevrat", "Zebur", "Kuran"],
        correctAnswer: "İncil",
        explanation: {
          tr: "Allah, Hz. İsa'ya İncil'i indirdi. İncil, semavi kitaplardan biridir.",
          en: "Allah revealed the Gospel to Jesus. The Gospel is one of the divine books.",
          ar: "أنزل الله الإنجيل على عيسى. الإنجيل هو أحد الكتب السماوية.",
        },
        xpReward: 20,
      },
    ],
  },

  {
    id: "prophet_muhammad",
    title: {
      tr: "Hz. Muhammed (s.a.v.)",
      en: "Prophet Muhammad (peace be upon him)",
      ar: "النبي محمد صلى الله عليه وسلم",
    },
    description: {
      tr: "Son peygamber ve Kuran-ı Kerim'in sahibi Hz. Muhammed",
      en: "The last prophet and owner of the Quran, Muhammad",
      ar: "النبي الأخير وصاحب القرآن الكريم محمد",
    },
    contentType: "knowledge",
    contentId: "prophet_muhammad",
    difficulty: "medium",
    estimatedMinutes: 7,
    totalXP: 60,
    order: 10,
    steps: [
      {
        id: "muhammad_intro",
        type: "intro",
        arabicText: "مُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ",
        transliteration: "Muhammed Sallallahu Aleyhi ve Sellem",
        translation: {
          tr: "Hz. Muhammed (Allah'ın salat ve selamı üzerine olsun)",
          en: "Prophet Muhammad (Peace and blessings be upon him)",
          ar: "النبي محمد (صلى الله عليه وسلم)",
        },
        explanation: {
          tr: "Hz. Muhammed, Allah'ın son peygamberidir. Tüm insanlığa gönderilmiştir ve ona Kuran-ı Kerim indirilmiştir.",
          en: "Prophet Muhammad is the last prophet of Allah. He was sent to all humanity and the Quran was revealed to him.",
          ar: "النبي محمد هو آخر أنبياء الله. أُرسل إلى البشرية جمعاء وأُنزل عليه القرآن الكريم.",
        },
        xpReward: 15,
      },
      {
        id: "muhammad_story",
        type: "read_translate",
        arabicText: "مُحَمَّدٌ رَسُولُ اللَّهِ",
        transliteration: "Muhammedun Resulullah",
        translation: {
          tr: "Muhammed, Allah'ın elçisidir",
          en: "Muhammad is the Messenger of Allah",
          ar: "محمد رسول الله",
        },
        explanation: {
          tr: "Hz. Muhammed 40 yaşında Hira Mağarası'nda ilk vahyi aldı. 23 yıl boyunca Kuran-ı Kerim ona indirildi. O, 'Rahmet Peygamberi'dir.",
          en: "Prophet Muhammad received the first revelation at age 40 in the Cave of Hira. The Quran was revealed to him over 23 years. He is the 'Prophet of Mercy'.",
          ar: "تلقى النبي محمد الوحي الأول في سن 40 في غار حراء. نزل عليه القرآن على مدى 23 عامًا. إنه 'نبي الرحمة'.",
        },
        xpReward: 20,
      },
      {
        id: "muhammad_greatness",
        type: "read_translate",
        arabicText: "وَإِنَّكَ لَعَلَى خُلُقٍ عَظِيمٍ",
        transliteration: "Ve inneke le ala hulukin azim",
        translation: {
          tr: "Şüphesiz sen üstün bir ahlak üzeresin",
          en: "And indeed, you are of a great moral character",
          ar: "وإنك لعلى خلق عظيم",
        },
        explanation: {
          tr: "Allah, Kuran'da Hz. Muhammed'in ahlakını över. O, güzel ahlakın en mükemmel örneğidir.",
          en: "Allah praises the character of Prophet Muhammad in the Quran. He is the perfect example of beautiful character.",
          ar: "يمدح الله  أخلاق النبي محمد في القرآن. إنه المثال الكامل للأخلاق الج ميلة.",
        },
        xpReward: 25,
      },
    ],
  },
];

/**
 * ID ile prophet lesson bul
 */
export function getProphetLessonById(lessonId: string): Lesson | undefined {
  return prophetLessons.find((lesson) => lesson.id === lessonId);
}

/**
 * Tüm prophet lesson'ların toplam XP'si
 */
export function getTotalProphetXP(): number {
  return prophetLessons.reduce((total, lesson) => total + lesson.totalXP, 0);
}
