import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, X, Sparkles, ChevronRight, RotateCcw, Lock, CheckCircle2, Moon, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';
import { quizSets, getQuizSetById, getNextQuizSet } from '@/data/quizSets';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

// Wave decoration component
const WaveDecoration = () => (
  <div className="absolute top-0 left-0 right-0 h-48 overflow-hidden">
    <svg 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none" 
      className="absolute bottom-0 w-full h-24 fill-primary"
    >
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-transparent" />
    
    {/* Decorative dots */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-4 left-8 w-2 h-2 bg-primary-foreground rounded-full" />
      <div className="absolute top-12 left-20 w-1.5 h-1.5 bg-primary-foreground rounded-full" />
      <div className="absolute top-6 right-12 w-2 h-2 bg-primary-foreground rounded-full" />
      <div className="absolute top-16 right-24 w-1 h-1 bg-primary-foreground rounded-full" />
    </div>
  </div>
);

// Islamic emblem component
const IslamicEmblem = ({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };
  
  return (
    <div className={cn("relative flex items-center justify-center", sizes[size])}>
      <div className="absolute inset-0 bg-primary/20 rounded-full" />
      <div className="absolute inset-2 bg-gradient-to-br from-teal-light to-card rounded-full border-4 border-primary/30" />
      <div className="relative text-4xl">🕌</div>
    </div>
  );
};

// Category card colors
const categoryColors: Record<string, { bg: string; icon: string }> = {
  surah: { bg: 'bg-gradient-to-br from-primary to-secondary', icon: '📖' },
  dua: { bg: 'bg-gradient-to-br from-accent to-primary', icon: '🤲' },
  islamic_knowledge: { bg: 'bg-gradient-to-br from-secondary to-primary', icon: '🕌' },
  ramadan: { bg: 'bg-gradient-to-br from-gold to-accent', icon: '🌙' },
  friday: { bg: 'bg-gradient-to-br from-primary to-teal-dark', icon: '🕋' },
};

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
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
  const [wrongAnswers, setWrongAnswers] = useState(0);

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
    setWrongAnswers(0);
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
      setWrongAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (!activeQuizSet) return;
    
    if (currentQuestion < activeQuizSet.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      recordQuizResult(score, activeQuizSet.questions.length, bestStreak, language === 'tr' ? activeQuizSet.titleTr : activeQuizSet.titleEn);
      markQuizSetCompleted(activeQuizSet.id);
      addXP(activeQuizSet.xpBonus);
      setTotalXP(prev => prev + activeQuizSet.xpBonus);
      completeGoal('quiz_complete');
      setQuizComplete(true);
    }
  };

  const handleNextQuizSet = () => {
    const nextSet = getNextQuizSet(completedQuizSets);
    if (nextSet) {
      handleSelectQuizSet(nextSet.id);
    } else {
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
    setWrongAnswers(0);
  };

  // Quiz Selection Screen
  if (!selectedQuizSet) {
    return (
      <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto relative">
        {/* Header with wave */}
        <div className="relative h-32 bg-primary">
          <WaveDecoration />
          <div className="relative z-10 flex items-center justify-between px-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-primary-foreground font-semibold">🕌 QUIZ APP</span>
            </div>
            <button className="p-2 rounded-full bg-primary-foreground/20 text-primary-foreground">
              <Moon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 -mt-4 relative z-10">
          <div className="bg-card rounded-2xl shadow-lg p-6 mb-4">
            <h1 className="text-xl font-bold text-center text-foreground mb-1">
              {language === 'tr' ? 'Quiz Seç & Oyna!' : 'Choose a Quiz & Play!'}
            </h1>
            <p className="text-center text-muted-foreground text-sm">
              {language === 'tr' ? 'Bilgini test et ve XP kazan' : 'Test your knowledge and earn XP'}
            </p>
          </div>

          {/* Quiz Cards Grid */}
          <div className="grid grid-cols-2 gap-3 pb-24">
            {quizSets.map((set, index) => {
              const isCompleted = isQuizSetCompleted(set.id);
              const previousCompleted = index === 0 || isQuizSetCompleted(quizSets[index - 1].id);
              const isLocked = !previousCompleted && !isCompleted;
              const colors = categoryColors[set.category] || categoryColors.islamic_knowledge;
              
              return (
                <motion.button
                  key={set.id}
                  onClick={() => !isLocked && handleSelectQuizSet(set.id)}
                  disabled={isLocked}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "relative p-4 rounded-2xl text-left transition-all overflow-hidden",
                    isLocked ? "opacity-50 cursor-not-allowed bg-muted" : colors.bg,
                    "hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  {isCompleted && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div className="text-3xl mb-2">
                    {isLocked ? '🔒' : colors.icon}
                  </div>
                  
                  <h3 className={cn(
                    "font-bold text-sm mb-1",
                    isLocked ? "text-muted-foreground" : "text-primary-foreground"
                  )}>
                    {language === 'tr' ? set.titleTr : set.titleEn}
                  </h3>
                  
                  <p className={cn(
                    "text-xs mb-2",
                    isLocked ? "text-muted-foreground" : "text-primary-foreground/80"
                  )}>
                    {set.questions.length} {language === 'tr' ? 'Soru' : 'Questions'}
                  </p>
                  
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    isLocked ? "text-muted-foreground" : "text-primary-foreground"
                  )}>
                    {language === 'tr' ? "Başla" : "Let's Start"} 
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="max-w-lg mx-auto flex items-center justify-around py-3">
            <button 
              onClick={() => navigate('/history')}
              className="flex flex-col items-center gap-1 text-muted-foreground"
            >
              <History className="w-6 h-6" />
              <span className="text-xs">{language === 'tr' ? 'Geçmiş' : 'History'}</span>
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex flex-col items-center gap-1 text-primary"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center -mt-6 shadow-lg">
                <span className="text-xl">🏠</span>
              </div>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center gap-1 text-muted-foreground"
            >
              <span className="text-xl">👤</span>
              <span className="text-xs">{language === 'tr' ? 'Profil' : 'Profile'}</span>
            </button>
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

  // Quiz Complete Screen
  if (quizComplete && activeQuizSet) {
    const percentage = (score / activeQuizSet.questions.length) * 100;
    const nextSet = getNextQuizSet(completedQuizSets);
    
    return (
      <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto relative overflow-hidden">
        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: -20, 
                x: Math.random() * 400, 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                y: 800, 
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                opacity: 0
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                delay: Math.random() * 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className={cn(
                "absolute w-3 h-3 rounded-sm",
                i % 4 === 0 && "bg-primary",
                i % 4 === 1 && "bg-gold",
                i % 4 === 2 && "bg-accent",
                i % 4 === 3 && "bg-secondary"
              )}
            />
          ))}
        </div>

        {/* Header */}
        <div className="relative pt-8 pb-4 text-center">
          <button 
            onClick={() => setSelectedQuizSet(null)}
            className="absolute left-4 top-4 p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <p className="text-muted-foreground text-sm mb-2">
            {language === 'tr' ? activeQuizSet.titleTr : activeQuizSet.titleEn}
          </p>
          
          <IslamicEmblem size="md" />
        </div>

        {/* Result Card */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
              {language === 'tr' ? 'Tebrikler!' : 'Congrats!'}
            </h1>
            
            <div className="bg-card rounded-3xl shadow-xl p-8 mb-6">
              <p className="text-muted-foreground mb-2">
                {language === 'tr' ? 'Quiz Sonucu' : 'Quiz Result'}
              </p>
              
              <div className="flex items-center justify-center gap-1 mb-4">
                <Sparkles className="w-6 h-6 text-gold" />
                <span className="text-sm text-muted-foreground">{language === 'tr' ? 'Skor' : 'Score'}</span>
              </div>
              
              <div className="text-6xl font-bold text-primary mb-6">
                {Math.round(percentage)}
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-center gap-8 py-4 border-t border-border">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <span className="text-xs">Q</span>
                    <span className="text-sm">{language === 'tr' ? 'Toplam' : 'Total'}</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">{activeQuizSet.questions.length}</span>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center gap-1 text-sage mb-1">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">{language === 'tr' ? 'Doğru' : 'Right'}</span>
                  </div>
                  <span className="text-xl font-bold text-sage">{score}</span>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center gap-1 text-destructive mb-1">
                    <X className="w-4 h-4" />
                    <span className="text-sm">{language === 'tr' ? 'Yanlış' : 'Wrong'}</span>
                  </div>
                  <span className="text-xl font-bold text-destructive">{wrongAnswers}</span>
                </div>
              </div>
            </div>

            {/* Play Again Button */}
            <Button 
              onClick={handleRestart}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg font-semibold shadow-lg"
            >
              {language === 'tr' ? 'Tekrar Oyna' : 'Play Again'}
            </Button>
            
            {nextSet && (
              <Button 
                onClick={handleNextQuizSet}
                variant="ghost"
                className="w-full mt-3 text-primary"
              >
                {language === 'tr' ? 'Sonraki Quiz' : 'Next Quiz'}: {language === 'tr' ? nextSet.titleTr : nextSet.titleEn}
                <ChevronRight className="w-5 h-5" />
              </Button>
            )}
          </motion.div>
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

  // Question Screen
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4">
        <button 
          onClick={() => setSelectedQuizSet(null)}
          className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <p className="text-muted-foreground text-xs">
            {language === 'tr' ? activeQuizSet.titleTr : activeQuizSet.titleEn}
          </p>
        </div>
        <IslamicEmblem size="sm" />
      </header>

      {/* Progress */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} {language === 'tr' ? 'soru' : 'question of'} {activeQuizSet.questions.length}
          </span>
          <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary">
              {Math.round(((currentQuestion + 1) / activeQuizSet.questions.length) * 10)}
            </span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 py-4">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Question Text */}
            <div className="mb-8">
              {question.questionArabic && (
                <p className="font-arabic text-2xl text-center mb-4 text-foreground leading-loose">
                  {question.questionArabic}
                </p>
              )}
              <h2 className="text-lg font-semibold text-foreground">
                {question.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options?.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                const letter = String.fromCharCode(65 + index);
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3",
                      !isAnswered && "hover:border-primary hover:bg-primary/5 active:scale-[0.98]",
                      isAnswered && isCorrectAnswer && "border-sage bg-sage-light",
                      isAnswered && isSelected && !isCorrectAnswer && "border-destructive bg-destructive/10",
                      !isAnswered && isSelected && "border-primary bg-primary/10",
                      !isAnswered && !isSelected && "border-border bg-card"
                    )}
                  >
                    {/* Option Letter */}
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                      isAnswered && isCorrectAnswer && "bg-sage text-primary-foreground",
                      isAnswered && isSelected && !isCorrectAnswer && "bg-destructive text-primary-foreground",
                      !isAnswered && "bg-muted text-muted-foreground"
                    )}>
                      {letter}
                    </div>

                    {/* Option Text */}
                    <span className={cn(
                      "flex-1 font-medium",
                      isAnswered && isCorrectAnswer && "text-sage",
                      isAnswered && isSelected && !isCorrectAnswer && "text-destructive"
                    )}>
                      {option}
                    </span>

                    {/* Result Icon */}
                    {isAnswered && isCorrectAnswer && (
                      <Check className="w-5 h-5 text-sage" />
                    )}
                    {isAnswered && isSelected && !isCorrectAnswer && (
                      <X className="w-5 h-5 text-destructive" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Answer Feedback & Next Button */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="px-6 py-4 pb-8"
          >
            {/* Feedback Message */}
            <div className={cn(
              "flex items-center justify-center gap-3 py-4 rounded-2xl mb-4",
              isCorrect ? "bg-sage-light" : "bg-muted"
            )}>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                isCorrect ? "bg-sage" : "bg-muted-foreground/20"
              )}>
                {isCorrect ? (
                  <span className="text-xl">😊</span>
                ) : (
                  <span className="text-xl">😔</span>
                )}
              </div>
              <span className={cn(
                "font-semibold",
                isCorrect ? "text-sage" : "text-foreground"
              )}>
                {isCorrect 
                  ? (language === 'tr' ? 'Doğru Cevap' : 'Right Answer')
                  : (language === 'tr' ? 'Yanlış Cevap' : 'Wrong Answer')
                }
              </span>
            </div>

            {/* Next Button */}
            <Button 
              onClick={handleNext}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg font-semibold"
            >
              {currentQuestion < activeQuizSet.questions.length - 1 
                ? (language === 'tr' ? 'Sonraki Soru' : 'Next Question')
                : (language === 'tr' ? 'Sonuçları Gör' : 'See Results')
              }
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <LevelUpCelebration
        newLevel={levelUpData.newLevel}
        isVisible={levelUpData.show}
        onClose={closeLevelUpCelebration}
      />
    </div>
  );
};

export default QuizPage;
