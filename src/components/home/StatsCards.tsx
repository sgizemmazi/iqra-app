import React from 'react';
import { Sparkles, Flame, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserProgress } from '@/types/gamification';
import { cn } from '@/lib/utils';

interface StatsCardsProps {
  progress: UserProgress;
  quizStats: {
    totalQuizzes: number;
    correctAnswers: number;
    totalQuestions: number;
    bestStreak: number;
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({ progress, quizStats }) => {
  const stats = [
    {
      icon: Sparkles,
      label: 'Seviye',
      value: progress.level,
      gradient: 'bg-accent',
      bgColor: 'bg-gold-light',
      iconColor: 'text-gold',
    },
    {
      icon: Flame,
      label: 'Gün Serisi',
      value: progress.streak,
      gradient: 'bg-brand-copper',
      bgColor: 'bg-streak-light',
      iconColor: 'text-streak',
    },
    {
      icon: Target,
      label: 'Toplam XP',
      value: progress.totalXP,
      gradient: 'bg-secondary',
      bgColor: 'bg-xp-light',
      iconColor: 'text-xp',
    },
    {
      icon: Trophy,
      label: 'Quiz',
      value: quizStats.totalQuizzes,
      gradient: 'from-badge to-purple-600',
      bgColor: 'bg-badge-light',
      iconColor: 'text-badge',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <div className="px-6">
      <motion.div 
        className="grid grid-cols-4 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="depth-card p-4 flex flex-col items-center text-center"
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-2",
                stat.bgColor
              )}>
                <Icon className={cn("w-5 h-5", stat.iconColor)} />
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default StatsCards;
