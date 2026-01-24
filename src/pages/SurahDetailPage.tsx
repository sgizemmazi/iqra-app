import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Check, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSurahById } from '@/data/surahsData';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';

// Audio URLs from Al-Afasy recitation
const getAudioUrl = (surahId: string, ayahNumber: number): string => {
  const surahNum = parseInt(surahId);
  // Calculate verse number in Quran (simplified - assumes short surahs at the end)
  const audioMap: Record<string, number> = {
    '1': 1, // Fatiha starts at verse 1
    '108': 6206, // Kawthar
    '109': 6209, // Kafirun
    '110': 6215, // Nasr
    '111': 6218, // Masad
    '112': 6223, // Ikhlas
    '113': 6227, // Falaq
    '114': 6232, // Nas
  };
  const startVerse = audioMap[surahId] || 1;
  return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${startVerse + ayahNumber - 1}.mp3`;
};

const SurahDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { isSurahLearned, markSurahLearned, levelUpData, closeLevelUpCelebration } = usePersistedGameProgress();
  
  const surah = getSurahById(id || '1');
  const ayahs = surah?.ayahs || [];
  const isLearned = isSurahLearned(id || '1');
  
  const [currentAyah, setCurrentAyah] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!surah) return;
    
    audioRef.current = new Audio(getAudioUrl(id || '1', currentAyah + 1));
    audioRef.current.playbackRate = playbackSpeed;

    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
    };
  }, [id, currentAyah, surah]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    }
  };

  const handleMarkLearned = () => {
    if (!isLearned && surah) {
      const surahName = language === 'tr' ? surah.nameTr : surah.nameEn;
      markSurahLearned(id || '1', surahName);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  if (!surah) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{language === 'tr' ? 'Sure bulunamadı' : 'Surah not found'}</p>
      </div>
    );
  }

  const ayah = ayahs[currentAyah];
  const progress = ((currentAyah + 1) / ayahs.length) * 100;

  const goToPrev = () => {
    if (currentAyah > 0) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      setCurrentAyah(currentAyah - 1);
    }
  };

  const goToNext = () => {
    if (currentAyah < ayahs.length - 1) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      setCurrentAyah(currentAyah + 1);
    }
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
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-semibold">{language === 'tr' ? surah.nameTr : surah.nameEn}</h1>
            {isLearned && <CheckCircle2 className="w-5 h-5 text-sage" />}
          </div>
          <p className="text-xs text-muted-foreground">{surah.nameArabic}</p>
        </div>
        <div className="w-10" />
      </header>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{t('learn.ayah')} {currentAyah + 1} {t('learn.of')} {ayahs.length}</span>
          <span>%{Math.round(progress)} {t('learn.complete')}</span>
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
            {language === 'tr' ? ayah.translationTr : ayah.translationEn}
          </p>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="px-6 py-4">
        <div className="bg-card rounded-3xl p-4 border border-border/50 shadow-soft">
          {/* Speed Selector */}
          <div className="flex items-center justify-center gap-4 mb-4">
            {[0.5, 1, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  playbackSpeed === speed 
                    ? "bg-sage-light text-sage" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {speed}x
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
              onClick={handlePlayPause}
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
            <button 
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play();
                  setIsPlaying(true);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t('learn.repeatAyah')}
            </button>
          </div>
        </div>
      </div>

      {/* Mark as Learned */}
      <div className="px-6 py-4 pb-8">
        {isLearned ? (
          <div className="w-full py-4 rounded-2xl bg-sage/10 border border-sage/30 flex items-center justify-center gap-2 text-sage">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">
              {language === 'tr' ? 'Öğrenildi!' : 'Learned!'}
            </span>
          </div>
        ) : (
          <Button 
            onClick={handleMarkLearned}
            variant="sage" 
            className="w-full" 
            size="lg"
          >
            <Check className="w-5 h-5" />
            {t('learn.markLearned')}
          </Button>
        )}
        
        {showSuccess && (
          <div className="mt-3 text-center text-sm text-sage animate-fade-in">
            +50 XP {language === 'tr' ? 'kazandın!' : 'earned!'}
          </div>
        )}
      </div>

      <LevelUpCelebration
        newLevel={levelUpData.newLevel}
        isVisible={levelUpData.show}
        onClose={closeLevelUpCelebration}
      />
    </div>
  );
};

export default SurahDetailPage;