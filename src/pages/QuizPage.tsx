import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, X, Sparkles, ChevronRight, RotateCcw, BookOpen, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';
import { quizSets, getQuizSetById, getNextQuizSet } from '@/data/quizSets';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const quizSetId = searchParams.get('set');
  
  const { 
    addXP, 
    recordQuizResult, 
    markQuizSetCompleted, 
    isQuizSetCompleted,
    completedQuizSets,
    levelUpData, 
    closeLevelUpCelebration,
    completeGoal
  } = usePersistedGameProgress();

  const [selectedQuizSet, setSelectedQuizSet] = useState<string | null>(quizSetId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const activeQuizSet = useMemo(() => {
    if (selectedQuizSet) {
      return getQuizSetById(selectedQuizSet);
    }
    return null;
  }, [selectedQuizSet]);

  const question = activeQuizSet?.questions[currentQuestion];
  const isCorrect = question && selectedAnswer === question.correctAnswer;

  const handleSelectQuizSet = (setId: string) => {
    setSelectedQuizSet(setId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setTotalXP(0);
    setQuizComplete(false);
    setCurrentStreak(0);
    setBestStreak(0);
  };

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered || !question) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === question.correctAnswer) {
      setScore(prev => prev + 1);
      setTotalXP(prev => prev + question.xpReward);
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
      addXP(question.xpReward);
    } else {
      setCurrentStreak(0);
    }
  };

  const handleNext = () => {
    if (!activeQuizSet) return;
    
    if (currentQuestion < activeQuizSet.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz complete
      recordQuizResult(score, activeQuizSet.questions.length, bestStreak, activeQuizSet.title);
      markQuizSetCompleted(activeQuizSet.id);
      
      // Add bonus XP for completing the quiz set
      addXP(activeQuizSet.xpBonus);
      setTotalXP(prev => prev + activeQuizSet.xpBonus);
      
      // Complete daily goal if exists
      completeGoal('quiz_complete');
      
      setQuizComplete(true);
    }
  };

  const handleNextQuizSet = () => {
    const nextSet = getNextQuizSet(completedQuizSets);
    if (nextSet) {
      handleSelectQuizSet(nextSet.id);
    } else {
      // All quizzes completed, go back to selection
      setSelectedQuizSet(null);
      setQuizComplete(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setTotalXP(0);
    setQuizComplete(false);
    setCurrentStreak(0);
    setBestStreak(0);
  };

  // Quiz Selection Screen
  if (!selectedQuizSet) {
    return (
      <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
        <header className="flex items-center justify-between px-4 py-4 border-b border-border/50">
          <button 
            onClick={() => navigate('/learn')}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold">Quiz Seç</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          <p className="text-muted-foreground text-sm mb-4">
            Bir quiz seçerek öğrenmeye başla. Tamamladığın quizler işaretlenecek.
          </p>
          
          {quizSets.map((set, index) => {
            const isCompleted = isQuizSetCompleted(set.id);
            const previousCompleted = index === 0 || isQuizSetCompleted(quizSets[index - 1].id);
            const isLocked = !previousCompleted && !isCompleted;
            
            return (
              <button
                key={set.id}
                onClick={() => !isLocked && handleSelectQuizSet(set.id)}
                disabled={isLocked}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-4",
                  isLocked && "opacity-50 cursor-not-allowed border-border bg-muted",
                  isCompleted && "border-sage bg-sage-light/30",
                  !isLocked && !isCompleted && "border-border bg-card hover:border-sage hover:bg-sage-light/20"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl",
                  isCompleted ? "bg-sage/20" : isLocked ? "bg-muted" : "bg-gold-light"
                )}>
                  {isLocked ? <Lock className="w-6 h-6 text-muted-foreground" /> : set.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{set.title}</h3>
                    {isCompleted && <CheckCircle2 className="w-5 h-5 text-sage" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{set.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      set.difficulty === 'easy' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                      set.difficulty === 'medium' && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                      set.difficulty === 'hard' && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    )}>
                      {set.difficulty === 'easy' ? 'Kolay' : set.difficulty === 'medium' ? 'Orta' : 'Zor'}
                    </span>
                    <span className="text-xs text-muted-foreground">{set.questions.length} soru</span>
                    <span className="text-xs text-gold font-medium">+{set.xpBonus} bonus XP</span>
                  </div>
                </div>
                
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        <LevelUpCelebration
          newLevel={levelUpData.newLevel}
          isVisible={levelUpData.show}
          onClose={closeLevelUpCelebration}
        />
      </div>
    );
  }

  // Quiz Complete Screen
  if (quizComplete && activeQuizSet) {
    const percentage = (score / activeQuizSet.questions.length) * 100;
    const nextSet = getNextQuizSet(completedQuizSets);
    
    return (
      <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
        <header className="flex items-center justify-between px-4 py-4 border-b border-border/50">
          <button 
            onClick={() => setSelectedQuizSet(null)}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold">Quiz Tamamlandı!</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center animate-fade-in">
            {/* Result Icon */}
            <div className={cn(
              "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
              percentage >= 80 
                ? "bg-gradient-to-br from-gold to-amber-500" 
                : percentage >= 50 
                  ? "bg-gradient-to-br from-sage to-teal-500"
                  : "bg-gradient-to-br from-orange-400 to-red-400"
            )}>
              <span className="text-5xl">
                {percentage >= 80 ? '🏆' : percentage >= 50 ? '👏' : '💪'}
              </span>
            </div>

            {/* Score */}
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {score}/{activeQuizSet.questions.length} Doğru
            </h2>
            <p className="text-muted-foreground mb-6">
              {percentage >= 80 
                ? 'Muhteşem! Harika iş çıkardın!' 
                : percentage >= 50 
                  ? 'İyi gidiyorsun! Devam et!'
                  : 'Her gün biraz daha iyi olacaksın!'}
            </p>

            {/* XP Earned */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gold-light rounded-2xl mb-2">
              <Sparkles className="w-6 h-6 text-gold" />
              <span className="text-2xl font-bold text-gold">+{totalXP} XP</span>
            </div>
            <p className="text-xs text-muted-foreground mb-8">
              ({activeQuizSet.xpBonus} bonus XP dahil)
            </p>

            {/* Actions */}
            <div className="space-y-3">
              {nextSet && (
                <Button onClick={handleNextQuizSet} variant="sage" size="lg" className="w-full">
                  <BookOpen className="w-5 h-5" />
                  Sonraki Quiz: {nextSet.title}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              )}
              <Button onClick={handleRestart} variant="outline" size="lg" className="w-full">
                <RotateCcw className="w-5 h-5" />
                Tekrar Dene
              </Button>
              <Button onClick={() => setSelectedQuizSet(null)} variant="ghost" size="lg" className="w-full">
                Tüm Quizlere Dön
              </Button>
            </div>
          </div>
        </div>

        <LevelUpCelebration
          newLevel={levelUpData.newLevel}
          isVisible={levelUpData.show}
          onClose={closeLevelUpCelebration}
        />
      </div>
    );
  }

  if (!question || !activeQuizSet) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-border/50">
        <button 
          onClick={() => setSelectedQuizSet(null)}
          className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="font-semibold text-sm">{activeQuizSet.title}</h1>
          <p className="text-xs text-muted-foreground">Soru {currentQuestion + 1}/{activeQuizSet.questions.length}</p>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 bg-gold-light rounded-xl">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm font-bold text-gold">{totalXP}</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-sage rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / activeQuizSet.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 py-4">
        <div className="animate-fade-in" key={currentQuestion}>
          {/* Question Text */}
          <div className="mb-8">
            {question.questionArabic && (
              <p className="font-arabic text-arabic-xl text-center mb-4 text-foreground">
                {question.questionArabic}
              </p>
            )}
            <h2 className="text-xl font-semibold text-foreground text-center">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3",
                    !isAnswered && "hover:border-sage hover:bg-sage-light/30 active:scale-[0.98]",
                    isAnswered && isCorrectAnswer && "border-sage bg-sage-light",
                    isAnswered && isSelected && !isCorrectAnswer && "border-destructive bg-red-50 dark:bg-red-900/20",
                    !isAnswered && isSelected && "border-sage bg-sage-light/50",
                    !isAnswered && !isSelected && "border-border bg-card"
                  )}
                >
                  {/* Option Letter */}
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                    isAnswered && isCorrectAnswer && "bg-sage text-white",
                    isAnswered && isSelected && !isCorrectAnswer && "bg-destructive text-white",
                    !isAnswered && "bg-muted text-muted-foreground"
                  )}>
                    {isAnswered && isCorrectAnswer ? (
                      <Check className="w-5 h-5" />
                    ) : isAnswered && isSelected && !isCorrectAnswer ? (
                      <X className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>

                  {/* Option Text */}
                  <span className={cn(
                    "flex-1 font-medium",
                    isAnswered && isCorrectAnswer && "text-sage",
                    isAnswered && isSelected && !isCorrectAnswer && "text-destructive"
                  )}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div className={cn(
              "mt-6 p-4 rounded-2xl animate-fade-in",
              isCorrect ? "bg-sage-light" : "bg-orange-50 dark:bg-orange-900/20"
            )}>
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  isCorrect ? "bg-sage/20" : "bg-orange-200 dark:bg-orange-800/50"
                )}>
                  {isCorrect ? (
                    <Check className="w-4 h-4 text-sage" />
                  ) : (
                    <span className="text-orange-600">💡</span>
                  )}
                </div>
                <div>
                  <p className={cn(
                    "font-medium mb-1",
                    isCorrect ? "text-sage" : "text-orange-700 dark:text-orange-400"
                  )}>
                    {isCorrect ? 'Doğru! +' + question.xpReward + ' XP' : 'Doğru cevap değil'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Button */}
      {isAnswered && (
        <div className="px-6 py-4 pb-8 animate-fade-in">
          <Button onClick={handleNext} variant="sage" size="lg" className="w-full">
            {currentQuestion < activeQuizSet.questions.length - 1 ? (
              <>
                Sonraki Soru
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              'Sonuçları Gör'
            )}
          </Button>
        </div>
      )}

      <LevelUpCelebration
        newLevel={levelUpData.newLevel}
        isVisible={levelUpData.show}
        onClose={closeLevelUpCelebration}
      />
    </div>
  );
};

export default QuizPage;
