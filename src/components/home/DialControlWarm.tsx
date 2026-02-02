import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserProgress } from '@/types/gamification';
import ModeControlsWarm from './ModeControlsWarm';

interface DialControlWarmProps {
  progress: UserProgress;
}

const DialControlWarm: React.FC<DialControlWarmProps> = ({ progress }) => {
  const { language } = useLanguage();
  const progressPercent = Math.min((progress.currentXP / progress.xpForNextLevel) * 100, 100);
  
  // Arc calculation
  const radius = 90;
  const startAngle = -225;
  const endAngle = 45;
  const totalAngle = endAngle - startAngle;
  const progressAngle = startAngle + (progressPercent / 100) * totalAngle;
  
  const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians)
    };
  };

  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  return (
    <div className="px-5 py-6">
      <motion.div 
        className="featured-card p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-center">
          <div className="relative">
            {/* Dial background */}
            <div className="dial-control">
              <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Background arc */}
                <path
                  d={describeArc(100, 100, radius, startAngle, endAngle)}
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Progress arc */}
                <motion.path
                  d={describeArc(100, 100, radius, startAngle, progressAngle)}
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
                {/* Tick marks */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const tickAngle = startAngle + (i / 10) * totalAngle;
                  const inner = polarToCartesian(100, 100, 65, tickAngle);
                  const outer = polarToCartesian(100, 100, 72, tickAngle);
                  return (
                    <line
                      key={i}
                      x1={inner.x}
                      y1={inner.y}
                      x2={outer.x}
                      y2={outer.y}
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={i % 5 === 0 ? 2 : 1}
                      opacity={0.3}
                    />
                  );
                })}
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-sage-dark">{progress.level}</span>
                <span className="text-sm text-muted-foreground mt-1">
                  {language === 'tr' ? 'Seviye' : 'Level'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress info */}
        <div className="text-center mt-4">
          <p className="text-cream/80 text-sm">
            {progress.currentXP} / {progress.xpForNextLevel} XP
          </p>
        </div>

        {/* Mode Controls */}
        <ModeControlsWarm />
      </motion.div>
    </div>
  );
};

export default DialControlWarm;
