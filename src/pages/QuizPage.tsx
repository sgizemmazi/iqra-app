import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, X, Sparkles, ChevronRight, RotateCcw, CheckCircle2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';
import { quizSets, getQuizSetById, getNextQuizSet } from '@/data/quizSets';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import MobileLayoutWarm from '@/components/layout/MobileLayoutWarm';

// Category card icons
const categoryIcons: Record<string, string> = {
  surah: '📖',
  dua: '🤲',
  islamic_knowledge: '🕌',
  ramadan: '🌙',
  friday: '🕋',
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
      <MobileLayoutWarm hideNav>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <div className="detail-header">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => navigate('/')}
                className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center"
              >
                <Home className="w-5 h-5 text-cream" />
              </button>
              <h1 className="text-lg font-semibold text-cream">
                {language === 'tr' ? 'Quiz' : 'Quiz'}
              </h1>
              <div className="w-10" />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 py-2">
              <div className="text-center">
                <div className="dial-control w-14 h-14 mx-auto mb-1">
                  <span className="text-sm font-bold text-sage">{completedQuizSets.length}</span>
                </div>
                <span className="text-xs text-cream/80">
                  {language === 'tr' ? 'Tamamlanan' : 'Completed'}
                </span>
              </div>
              <div className="text-center">
                <div className="dial-control w-14 h-14 mx-auto mb-1">
                  <span className="text-sm font-bold text-sage">{quizSets.length}</span>
                </div>
                <span className="text-xs text-cream/80">
                  {language === 'tr' ? 'Toplam' : 'Total'}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 -mt-4 relative z-10">
            <motion.p 
              className="text-center text-muted-foreground text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {language === 'tr' ? 'Bilgini test et ve XP kazan' : 'Test your knowledge and earn XP'}
            </motion.p>

            {/* Quiz Cards Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-3 pb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {quizSets.map((set, index) => {
                const isCompleted = isQuizSetCompleted(set.id);
                const previousCompleted = index === 0 || isQuizSetCompleted(quizSets[index - 1].id);
                const isLocked = !previousCompleted && !isCompleted;
                
                return (
                  <motion.button
                    key={set.id}
                    onClick={() => !isLocked && handleSelectQuizSet(set.id)}
                    disabled={isLocked}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.03 }}
                    whileHover={{ scale: isLocked ? 1 : 1.02 }}
                    whileTap={{ scale: isLocked ? 1 : 0.98 }}
                    className={cn(
                      "room-card text-left relative",
                      isCompleted && "active",
                      isLocked && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {isCompleted && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                    
                    <div className="room-card-icon">
                      <span className="text-2xl">
                        {isLocked ? '🔒' : categoryIcons[set.category] || '📚'}
                      </span>
                    </div>
                    
                    <div className="text-center w-full">
                      <span className="text-sm font-semibold block truncate">
                        {language === 'tr' ? set.titleTr : set.titleEn}
                      </span>
                      <span className="text-xs opacity-60 block mt-1">
                        {set.questions.length} {language === 'tr' ? 'Soru' : 'Questions'}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          <LevelUpCelebration
            newLevel={levelUpData.newLevel}
            isVisible={levelUpData.show}
            onClose={closeLevelUpCelebration}
          />
        </div>
      </MobileLayoutWarm>
    );
  }

  // Quiz Complete Screen
  if (quizComplete && activeQuizSet) {
    const percentage = (score / activeQuizSet.questions.length) * 100;
    const nextSet = getNextQuizSet(completedQuizSets);
    
    return (
      <MobileLayoutWarm hideNav>
        <div className="min-h-screen bg-background relative overflow-hidden">
          {/* Confetti effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
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
                  i % 4 === 0 && "bg-sage",
                  i % 4 === 1 && "bg-gold",
                  i % 4 === 2 && "bg-teal",
                  i % 4 === 3 && "bg-sage-light"
                )}
                style={{ backgroundColor: i % 4 === 0 ? 'hsl(var(--sage))' : i % 4 === 1 ? 'hsl(var(--gold))' : i % 4 === 2 ? 'hsl(var(--teal))' : 'hsl(var(--sage-light))' }}
              />
            ))}
          </div>

          {/* Header */}
          <div className="detail-header">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setSelectedQuizSet(null)}
                className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-cream" />
              </button>
              <h1 className="text-lg font-semibold text-cream">
                {language === 'tr' ? activeQuizSet.titleTr : activeQuizSet.titleEn}
              </h1>
              <div className="w-10" />
            </div>
          </div>

          {/* Result Card */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-4 relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center w-full"
            >
              <h1 className="text-3xl font-bold text-gradient-sage mb-4">
                {language === 'tr' ? 'Tebrikler!' : 'Congrats!'}
              </h1>
              
              <div className="clean-card p-6 mb-6">
                <div className="dial-control w-32 h-32 mx-auto mb-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-sage">{Math.round(percentage)}</span>
                    <span className="text-sm text-muted-foreground block">%</span>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-center gap-6 py-4 border-t border-border">
                  <div className="text-center">
                    <span className="text-lg font-bold text-foreground">{activeQuizSet.questions.length}</span>
                    <span className="text-xs text-muted-foreground block">
                      {language === 'tr' ? 'Toplam' : 'Total'}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-lg font-bold text-sage">{score}</span>
                    <span className="text-xs text-muted-foreground block">
                      {language === 'tr' ? 'Doğru' : 'Correct'}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-lg font-bold text-destructive">{wrongAnswers}</span>
                    <span className="text-xs text-muted-foreground block">
                      {language === 'tr' ? 'Yanlış' : 'Wrong'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleRestart}
                  className="w-full bg-sage hover:bg-sage-dark text-cream rounded-2xl py-6 text-lg font-semibold"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  {language === 'tr' ? 'Tekrar Oyna' : 'Play Again'}
                </Button>
                
                {nextSet && (
                  <Button 
                    onClick={handleNextQuizSet}
                    variant="ghost"
                    className="w-full text-sage"
                  >
                    {language === 'tr' ? 'Sonraki Quiz' : 'Next Quiz'}: {language === 'tr' ? nextSet.titleTr : nextSet.titleEn}
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                )}
                
                <Button 
                  onClick={() => navigate('/')}
                  variant="ghost"
                  className="w-full text-muted-foreground"
                >
                  <Home className="w-4 h-4 mr-2" />
                  {language === 'tr' ? 'Ana Sayfa' : 'Home'}
                </Button>
              </div>
            </motion.div>
          </div>

          <LevelUpCelebration
            newLevel={levelUpData.newLevel}
            isVisible={levelUpData.show}
            onClose={closeLevelUpCelebration}
          />
        </div>
      </MobileLayoutWarm>
    );
  }

  if (!question || !activeQuizSet) return null;

  // Question Screen
  return (
    <MobileLayoutWarm hideNav>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="detail-header">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={() => setSelectedQuizSet(null)}
              className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-cream" />
            </button>
            <h1 className="text-sm font-medium text-cream/80">
              {language === 'tr' ? activeQuizSet.titleTr : activeQuizSet.titleEn}
            </h1>
            <div className="dial-control w-10 h-10">
              <span className="text-xs font-bold text-sage">
                {currentQuestion + 1}/{activeQuizSet.questions.length}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-cream/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / activeQuizSet.questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 px-5 py-4 -mt-2 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Question Text */}
              <div className="clean-card p-5 mb-5">
                {question.questionArabic && (
                  <p className="font-arabic text-xl text-center mb-3 text-foreground leading-loose">
                    {question.questionArabic}
                  </p>
                )}
                <h2 className="text-base font-semibold text-foreground text-center">
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
                        !isAnswered && "hover:border-sage hover:bg-sage-light active:scale-[0.98]",
                        isAnswered && isCorrectAnswer && "border-sage bg-sage-light",
                        isAnswered && isSelected && !isCorrectAnswer && "border-destructive bg-destructive/10",
                        !isAnswered && isSelected && "border-sage bg-sage-light",
                        !isAnswered && !isSelected && "border-border bg-card"
                      )}
                    >
                      {/* Option Letter */}
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
                        isAnswered && isCorrectAnswer && "bg-sage text-cream",
                        isAnswered && isSelected && !isCorrectAnswer && "bg-destructive text-cream",
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
              className="px-5 py-4 pb-8"
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
                    ? (language === 'tr' ? 'Doğru Cevap' : 'Correct!')
                    : (language === 'tr' ? 'Yanlış Cevap' : 'Wrong Answer')
                  }
                </span>
              </div>

              {/* Next Button */}
              <Button 
                onClick={handleNext}
                className="w-full bg-sage hover:bg-sage-dark text-cream rounded-2xl py-6 text-lg font-semibold"
              >
                {currentQuestion < activeQuizSet.questions.length - 1 
                  ? (language === 'tr' ? 'Sonraki Soru' : 'Next Question')
                  : (language === 'tr' ? 'Sonuçları Gör' : 'See Results')
                }
                <ChevronRight className="w-5 h-5 ml-2" />
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
    </MobileLayoutWarm>
  );
};

export default QuizPage;
