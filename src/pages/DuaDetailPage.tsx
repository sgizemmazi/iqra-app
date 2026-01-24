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
      <header className="flex items-center justify-between px-4 py-4 border-b border-border/50">
        <button 
          onClick={() => navigate('/learn')}
          className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-semibold">{language === 'tr' ? dua.nameTr : dua.nameEn}</h1>
            {isLearned && <CheckCircle2 className="w-5 h-5 text-sage" />}
          </div>
          <p className="text-xs text-muted-foreground">{dua.nameArabic}</p>
        </div>
        <div className="w-10" />
      </header>

      {/* Occasion Badge */}
      <div className="px-6 py-4">
        <div className="bg-sage-light rounded-2xl p-4 border border-sage/20">
          <div className="flex items-center gap-2 text-sage">
            <Volume2 className="w-5 h-5" />
            <span className="text-sm font-medium">
              {language === 'tr' ? dua.occasion : dua.occasionEn}
            </span>
          </div>
        </div>
      </div>

      {/* Dua Display */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Arabic Text */}
          <div className="py-8 px-4 bg-gradient-to-br from-card to-muted/30 rounded-3xl border border-border/50">
            <p className="font-arabic text-arabic-2xl leading-loose text-foreground">
              {dua.arabic}
            </p>
          </div>

          {/* Transliteration */}
          {showTransliteration && (
            <div className="space-y-2">
              <button 
                onClick={() => setShowTransliteration(!showTransliteration)}
                className="text-xs text-muted-foreground underline"
              >
                {language === 'tr' ? 'Okunuşu gizle' : 'Hide transliteration'}
              </button>
              <p className="text-lg text-sage italic font-medium">
                {dua.transliteration}
              </p>
            </div>
          )}

          {!showTransliteration && (
            <button 
              onClick={() => setShowTransliteration(true)}
              className="text-sm text-sage underline"
            >
              {language === 'tr' ? 'Okunuşu göster' : 'Show transliteration'}
            </button>
          )}

          {/* Translation */}
          <div className="bg-muted/30 rounded-2xl p-6">
            <p className="text-sm text-muted-foreground mb-2">
              {language === 'tr' ? 'Anlam' : 'Meaning'}
            </p>
            <p className="text-foreground text-body-lg leading-relaxed">
              {language === 'tr' ? dua.translationTr : dua.translationEn}
            </p>
          </div>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="px-6 py-4">
        <div className="bg-card rounded-3xl p-4 border border-border/50 shadow-soft">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-sage rounded-full transition-all"
                style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

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
              onClick={handleRestart}
              className="p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-muted-foreground" />
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

            <div className="w-11" />
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