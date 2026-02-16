import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Check, CheckCircle2, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSurahById } from '@/data/surahsData';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';
import { motion } from 'framer-motion';

// Audio URLs from Al-Afasy recitation
const getAudioUrl = (surahId: string, ayahNumber: number): string => {
  const audioMap: Record<string, number> = {
    '1': 1,
    '108': 6206,
    '109': 6209,
    '110': 6215,
    '111': 6218,
    '112': 6223,
    '113': 6227,
    '114': 6232,
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
      <motion.div
        className="p-5 pb-8 bg-primary rounded-b-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/learn')}
            className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl font-black text-white">{language === 'tr' ? surah.nameTr : surah.nameEn}</h1>
              {isLearned && <CheckCircle2 className="w-5 h-5 text-accent" />}
            </div>
            <p className="text-sm text-white/90 font-arabic">{surah.nameArabic}</p>
          </div>
          <div className="w-11" />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setShowTransliteration(!showTransliteration)}
            className={cn(
              "px-4 py-2.5 rounded-xl flex flex-col items-center gap-1 transition-all",
              showTransliteration
                ? "bg-white text-primary"
                : "bg-white/20 text-white hover:bg-white/30"
            )}
          >
            <span className="text-lg font-bold">Aa</span>
            <span className="text-[10px] font-semibold">
              {language === 'tr' ? 'Okunuş' : 'Trans'}
            </span>
          </button>

          <button className="px-4 py-2.5 rounded-xl flex flex-col items-center gap-1 bg-white/20 text-white hover:bg-white/30 transition-all">
            <Timer className="w-5 h-5" />
            <span className="text-[10px] font-semibold">
              {language === 'tr' ? 'Zaman' : 'Timer'}
            </span>
          </button>

          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
                setIsPlaying(true);
              }
            }}
            className="px-4 py-2.5 rounded-xl flex flex-col items-center gap-1 bg-white/20 text-white hover:bg-white/30 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="text-[10px] font-semibold">
              {language === 'tr' ? 'Tekrar' : 'Repeat'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Progress indicator */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span className="font-bold">{t('learn.ayah')} {currentAyah + 1} / {ayahs.length}</span>
          <span className="flex items-center gap-1 font-bold">
            <Zap className="w-4 h-4 text-accent" />
            +50 XP
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Ayah Display */}
      <div className="flex-1 flex flex-col justify-center px-6 py-4">
        <motion.div 
          className="text-center space-y-6"
          key={currentAyah}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Ayah Number Badge */}
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
              <span className="font-arabic text-xl font-bold text-accent">{ayah.number}</span>
            </div>
          </div>

          {/* Arabic Text */}
          <div className="py-6">
            <p className="font-arabic text-4xl leading-loose text-foreground">
              {ayah.arabic}
            </p>
          </div>

          {/* Transliteration */}
          {showTransliteration && (
            <motion.p
              className="text-lg text-primary italic font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {ayah.transliteration}
            </motion.p>
          )}

          {/* Translation */}
          <p className="text-muted-foreground text-body-lg leading-relaxed max-w-sm mx-auto">
            {language === 'tr' ? ayah.translationTr : ayah.translationEn}
          </p>
        </motion.div>
      </div>

      {/* Audio Controls Card */}
      <div className="px-6 py-4">
        <motion.div
          className="glass-card p-5 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Speed Selector */}
          <div className="flex items-center justify-center gap-3 mb-5">
            {[0.5, 1, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-bold transition-all",
                  playbackSpeed === speed
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                )}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-8">
            <motion.button
              onClick={goToPrev}
              disabled={currentAyah === 0}
              className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors disabled:opacity-30"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 ml-1" />
              )}
            </motion.button>

            <motion.button
              onClick={goToNext}
              disabled={currentAyah === ayahs.length - 1}
              className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors disabled:opacity-30"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Mark as Learned */}
      <div className="px-6 py-4 pb-8">
        {isLearned ? (
          <motion.div
            className="w-full py-4 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center gap-2 text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">
              {language === 'tr' ? 'Öğrenildi!' : 'Learned!'}
            </span>
          </motion.div>
        ) : (
          <Button
            onClick={handleMarkLearned}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-6 font-bold"
            size="lg"
          >
            <Check className="w-5 h-5 mr-2" />
            {t('learn.markLearned')}
          </Button>
        )}

        {showSuccess && (
          <motion.div
            className="mt-3 text-center text-sm font-bold text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            +50 XP {language === 'tr' ? 'kazandın!' : 'earned!'}
          </motion.div>
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