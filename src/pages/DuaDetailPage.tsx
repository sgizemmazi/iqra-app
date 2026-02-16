import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Check, Volume2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDuaById } from '@/data/duasData';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';

// Audio URLs from Islamic Network CDN
const getAudioUrl = (duaId: string): string => {
  const audioMap: Record<string, string> = {
    'd1': 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    'd2': 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3',
    'd3': 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/255.mp3',
    'd4': 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/286.mp3',
    'd5': 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/112.mp3',
    'd6': 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/113.mp3',
    'd7': 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/114.mp3',
    'd8': 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    'd9': 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3',
    'd10': 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3',
  };
  return audioMap[duaId] || audioMap['d1'];
};

const DuaDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { isDuaLearned, markDuaLearned, levelUpData, closeLevelUpCelebration } = usePersistedGameProgress();
  
  const dua = getDuaById(id || 'd1');
  const isLearned = isDuaLearned(id || 'd1');
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(getAudioUrl(id || 'd1'));
    audioRef.current.playbackRate = playbackSpeed;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [id]);

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

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleMarkLearned = () => {
    if (!isLearned && dua) {
      const duaName = language === 'tr' ? dua.nameTr : dua.nameEn;
      markDuaLearned(id || 'd1', duaName);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!dua) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{language === 'tr' ? 'Dua bulunamadı' : 'Dua not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <header className="p-5 pb-8 bg-primary rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/learn')}
            className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl font-black text-white">{language === 'tr' ? dua.nameTr : dua.nameEn}</h1>
              {isLearned && <CheckCircle2 className="w-5 h-5 text-accent" />}
            </div>
            <p className="text-sm text-white/90 font-arabic">{dua.nameArabic}</p>
          </div>
          <div className="w-11" />
        </div>

        {/* Occasion Badge */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-center gap-2 text-white">
            <Volume2 className="w-5 h-5" />
            <span className="text-sm font-bold">
              {language === 'tr' ? dua.occasion : dua.occasionEn}
            </span>
          </div>
        </div>
      </header>

      {/* Dua Display */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Arabic Text */}
          <div className="py-8 px-4 glass-card rounded-3xl">
            <p className="font-arabic text-4xl leading-loose text-foreground">
              {dua.arabic}
            </p>
          </div>

          {/* Transliteration */}
          {showTransliteration && (
            <div className="space-y-2">
              <button
                onClick={() => setShowTransliteration(!showTransliteration)}
                className="text-xs text-muted-foreground underline font-medium"
              >
                {language === 'tr' ? 'Okunuşu gizle' : 'Hide transliteration'}
              </button>
              <p className="text-lg text-primary italic font-medium">
                {dua.transliteration}
              </p>
            </div>
          )}

          {!showTransliteration && (
            <button
              onClick={() => setShowTransliteration(true)}
              className="text-sm text-primary underline font-medium"
            >
              {language === 'tr' ? 'Okunuşu göster' : 'Show transliteration'}
            </button>
          )}

          {/* Translation */}
          <div className="bg-muted rounded-2xl p-6">
            <p className="text-sm font-bold text-muted-foreground mb-2">
              {language === 'tr' ? 'Anlam' : 'Meaning'}
            </p>
            <p className="text-foreground text-lg leading-relaxed">
              {language === 'tr' ? dua.translationTr : dua.translationEn}
            </p>
          </div>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="px-6 py-4">
        <div className="glass-card rounded-2xl p-5">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
              />
            </div>
            <div className="flex justify-between text-xs font-bold text-muted-foreground mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

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
            <button
              onClick={handleRestart}
              className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-muted-foreground" />
            </button>

            <button
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 ml-1" />
              )}
            </button>

            <div className="w-11" />
          </div>
        </div>
      </div>

      {/* Mark as Learned */}
      <div className="px-6 py-4 pb-8">
        {isLearned ? (
          <div className="w-full py-4 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center gap-2 text-primary">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">
              {language === 'tr' ? 'Öğrenildi!' : 'Learned!'}
            </span>
          </div>
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
          <div className="mt-3 text-center text-sm font-bold text-primary animate-fade-in">
            +30 XP {language === 'tr' ? 'kazandın!' : 'earned!'}
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

export default DuaDetailPage;