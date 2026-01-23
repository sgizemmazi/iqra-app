import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Check, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDuaById } from '@/data/duasData';

const DuaDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, language } = useLanguage();
  
  const dua = getDuaById(id || 'd1');
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);

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
          <h1 className="font-semibold">{language === 'tr' ? dua.nameTr : dua.nameEn}</h1>
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
            <button className="p-3 rounded-xl hover:bg-muted transition-colors">
              <RotateCcw className="w-5 h-5 text-muted-foreground" />
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

            <div className="w-11" /> {/* Spacer for symmetry */}
          </div>
        </div>
      </div>

      {/* Mark as Learned */}
      <div className="px-6 py-4 pb-8">
        <Button variant="sage" className="w-full" size="lg">
          <Check className="w-5 h-5" />
          {t('learn.markLearned')}
        </Button>
      </div>
    </div>
  );
};

export default DuaDetailPage;
