import React from 'react';
import { BookOpen, Brain, Target, Zap } from 'lucide-react';
import { QuizStats } from '@/hooks/useGameProgress';

interface ProgressOverviewProps {
  quizStats: QuizStats;
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ quizStats }) => {
  const accuracy = quizStats.totalQuestions > 0 
    ? Math.round((quizStats.correctAnswers / quizStats.totalQuestions) * 100) 
    : 0;

  return (
    <div className="pb-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        📊 Senin Yolculuğun
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Quiz Count */}
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{quizStats.totalQuizzes}</p>
          <p className="text-sm text-muted-foreground">Quiz Tamamlandı</p>
        </div>

        {/* Correct Answers */}
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{quizStats.correctAnswers}</p>
          <p className="text-sm text-muted-foreground">Doğru Cevap</p>
        </div>

        {/* Accuracy */}
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gold-light flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">%{accuracy}</p>
          <p className="text-sm text-muted-foreground">Başarı Oranı</p>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold rounded-full transition-all duration-500"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>

        {/* Best Streak */}
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-sage" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{quizStats.bestStreak}</p>
          <p className="text-sm text-muted-foreground">En İyi Seri</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
