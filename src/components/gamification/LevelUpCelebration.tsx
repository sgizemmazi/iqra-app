import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Star, Sparkles } from 'lucide-react';

interface LevelUpCelebrationProps {
  newLevel: number;
  isVisible: boolean;
  onClose: () => void;
}

export function LevelUpCelebration({ newLevel, isVisible, onClose }: LevelUpCelebrationProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      // Initial burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      });

      frame();

      // Show content with delay
      setTimeout(() => setShowContent(true), 200);

      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className={`relative bg-gradient-to-br from-primary/20 via-background to-gold/20 rounded-3xl p-8 mx-6 max-w-sm w-full border border-primary/30 transition-all duration-500 ${
          showContent ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative stars */}
        <div className="absolute -top-4 -left-4 text-gold animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute -top-4 -right-4 text-gold animate-pulse delay-100">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-gold animate-pulse delay-200">
          <Sparkles className="w-8 h-8" />
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold via-primary to-gold flex items-center justify-center mx-auto animate-bounce">
              <Star className="w-12 h-12 text-white fill-white" />
            </div>
            <div className="absolute -inset-2 rounded-full bg-gold/20 animate-ping" />
          </div>

          <div className="space-y-2">
            <p className="text-lg text-muted-foreground font-medium">تهانينا</p>
            <h2 className="text-3xl font-bold text-foreground">
              Tebrikler! 🎉
            </h2>
            <p className="text-muted-foreground">
              Yeni bir seviyeye ulaştın!
            </p>
          </div>

          <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Yeni Seviye</p>
            <p className="text-5xl font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
              {newLevel}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}
