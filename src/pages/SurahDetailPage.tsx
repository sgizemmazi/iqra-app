import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Volume2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Ayah {
  number: number;
  arabic: string;
  translation: string;
  transliteration: string;
  isLearned: boolean;
}

const ayahs: Ayah[] = [
  { 
    number: 1, 
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
    transliteration: 'Bismillah ir-Rahman ir-Raheem',
    isLearned: true 
  },
  { 
    number: 2, 
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', 
    translation: 'All praise is due to Allah, Lord of all the worlds',
    transliteration: 'Alhamdu lillahi Rabbil aalameen',
    isLearned: true 
  },
  { 
    number: 3, 
    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', 
    translation: 'The Most Gracious, the Most Merciful',
    transliteration: 'Ar-Rahman ir-Raheem',
    isLearned: false 
  },
  { 
    number: 4, 
    arabic: 'مَالِكِ يَوْمِ الدِّينِ', 
    translation: 'Master of the Day of Judgment',
    transliteration: 'Maliki yawm id-Deen',
    isLearned: false 
  },
  { 
    number: 5, 
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', 
    translation: 'You alone we worship, and You alone we ask for help',
    transliteration: "Iyyaka na'budu wa iyyaka nasta'een",
    isLearned: false 
  },
  { 
    number: 6, 
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', 
    translation: 'Guide us to the straight path',
    transliteration: 'Ihdinas siratal mustaqeem',
    isLearned: false 
  },
  { 
    number: 7, 
    arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', 
    translation: 'The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray',
    transliteration: "Siratal lazeena an'amta alayhim, ghayril maghdubi alayhim wa lad-daalleen",
    isLearned: false 
  },
];

const SurahDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentAyah, setCurrentAyah] = useState(2); // 0-indexed, start at ayah 3
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);

  const ayah = ayahs[currentAyah];
  const progress = ((currentAyah + 1) / ayahs.length) * 100;

  const goToPrev = () => {
    if (currentAyah > 0) setCurrentAyah(currentAyah - 1);
  };

  const goToNext = () => {
    if (currentAyah < ayahs.length - 1) setCurrentAyah(currentAyah + 1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-border/50">
        <button 
          onClick={() => navigate('/learn')}
          className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="font-semibold">Al-Fatiha</h1>
          <p className="text-xs text-muted-foreground">الفاتحة</p>
        </div>
        <div className="w-10" />
      </header>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Ayah {currentAyah + 1} of {ayahs.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-sage rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Ayah Display */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="text-center space-y-8 animate-fade-in" key={currentAyah}>
          {/* Ayah Number Badge */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-gold-light border-2 border-gold/30 flex items-center justify-center">
              <span className="font-arabic text-lg text-gold">{ayah.number}</span>
            </div>
          </div>

          {/* Arabic Text */}
          <div className="py-8">
            <p className="font-arabic text-arabic-2xl leading-loose text-foreground">
              {ayah.arabic}
            </p>
          </div>

          {/* Transliteration */}
          {showTransliteration && (
            <p className="text-lg text-sage italic">
              {ayah.transliteration}
            </p>
          )}

          {/* Translation */}
          <p className="text-muted-foreground text-body-lg leading-relaxed max-w-sm mx-auto">
            {ayah.translation}
          </p>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="px-6 py-4">
        <div className="bg-card rounded-3xl p-4 border border-border/50 shadow-soft">
          {/* Speed Selector */}
          <div className="flex items-center justify-center gap-4 mb-4">
            {['0.5x', '1x', '1.5x'].map((speed) => (
              <button
                key={speed}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  speed === '1x' 
                    ? "bg-sage-light text-sage" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {speed}
              </button>
            ))}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-6">
            <button 
              onClick={goToPrev}
              disabled={currentAyah === 0}
              className="p-3 rounded-xl hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-sage text-cream flex items-center justify-center shadow-prayer hover:bg-sage-dark transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 ml-1" />
              )}
            </button>

            <button 
              onClick={goToNext}
              disabled={currentAyah === ayahs.length - 1}
              className="p-3 rounded-xl hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Repeat Button */}
          <div className="flex justify-center mt-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="w-4 h-4" />
              Repeat this ayah
            </button>
          </div>
        </div>
      </div>

      {/* Mark as Learned */}
      <div className="px-6 py-4 pb-8">
        <Button variant="sage" className="w-full" size="lg">
          <Check className="w-5 h-5" />
          Mark as Learned
        </Button>
      </div>
    </div>
  );
};

export default SurahDetailPage;
