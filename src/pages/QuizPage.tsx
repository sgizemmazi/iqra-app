import React, { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  X,
  Sparkles,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Home,
  BookOpen,
  HandHeart,
  Landmark,
  Moon,
  Building2,
  Lock,
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePersistedGameProgress } from "@/hooks/usePersistedGameProgress";
import { LevelUpCelebration } from "@/components/gamification/LevelUpCelebration";
import { quizSets, getQuizSetById, getNextQuizSet } from "@/data/quizSets";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayoutWarm from "@/components/layout/MobileLayoutWarm";

// Category card icons
const categoryIcons: Record<string, React.ElementType> = {
  surah: BookOpen,
  dua: HandHeart,
  islamic_knowledge: Landmark,
  ramadan: Moon,
  friday: Building2,
};

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const quizSetId = searchParams.get("set");

  const {
    addXP,
    recordQuizResult,
    markQuizSetCompleted,
    isQuizSetCompleted,
    completedQuizSets,
    levelUpData,
    closeLevelUpCelebration,
    completeGoal,
  } = usePersistedGameProgress();

  const [selectedQuizSet, setSelectedQuizSet] = useState<string | null>(
    quizSetId,
  );
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
      setScore((prev) => prev + 1);
      setTotalXP((prev) => prev + question.xpReward);
      setCurrentStreak((prev) => {
        const newStreak = prev + 1;
        setBestStreak((current) => Math.max(current, newStreak));
        return newStreak;
      });
      addXP(question.xpReward);
    } else {
      setCurrentStreak(0);
      setWrongAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!activeQuizSet) return;

    if (currentQuestion < activeQuizSet.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      recordQuizResult(
        score,
        activeQuizSet.questions.length,
        bestStreak,
        language === "tr" ? activeQuizSet.titleTr : activeQuizSet.titleEn,
      );

      // Sadece 2'den az yanlış yapıldıysa quiz'i tamamlanmış say
      if (wrongAnswers < 2) {
        markQuizSetCompleted(activeQuizSet.id);
        addXP(activeQuizSet.xpBonus);
        setTotalXP((prev) => prev + activeQuizSet.xpBonus);
      }

      completeGoal("quiz_complete");
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
          <div className="p-5 pb-8 bg-primary rounded-b-3xl">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate("/")}
                className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Home className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-xl font-black text-white">
                {language === "tr" ? "Quiz" : "Quiz"}
              </h1>
              <div className="w-11" />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-black text-white">
                    {completedQuizSets.length}/{quizSets.length}
                  </span>
                </div>
                <span className="text-xs font-bold text-white/90">
                  {language === "tr" ? "Tamamlanan" : "Completed"}
                </span>
              </div>
              <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-black text-white">
                    {quizSets.length}
                  </span>
                </div>
                <span className="text-xs font-bold text-white/90">
                  {language === "tr" ? "Toplam" : "Total"}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 -mt-4 relative z-10">
            {/* <motion.p
              className="text-center text-muted-foreground text-sm mb-5 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {language === 'tr' ? 'Bilgini test et ve XP kazan' : 'Test your knowledge and earn XP'}
            </motion.p> */}

            {/* Quiz Cards Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 pb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {quizSets.map((set, index) => {
                const isCompleted = isQuizSetCompleted(set.id);
                const previousCompleted =
                  index === 0 || isQuizSetCompleted(quizSets[index - 1].id);
                const isLocked = !previousCompleted && !isCompleted;
                const gradients = [
                  "bg-primary",
                  "bg-brand-cyan",
                  "bg-secondary",
                  "bg-accent",
                ];
                const gradient = gradients[index % gradients.length];

                return (
                  <motion.button
                    key={set.id}
                    onClick={() => !isLocked && handleSelectQuizSet(set.id)}
                    disabled={isLocked}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.03 }}
                    whileHover={{ scale: isLocked ? 1 : 1.03 }}
                    whileTap={{ scale: isLocked ? 1 : 0.97 }}
                    className={cn(
                      "relative glass-card p-5 rounded-2xl overflow-hidden group text-left",
                      isLocked && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    {/* Gradient glow on hover */}
                    {!isLocked && (
                      <div
                        className={cn(
                          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity",
                          gradient,
                        )}
                      />
                    )}

                    {isCompleted && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                    )}

                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center group-hover:shadow-xl transition-all",
                          isLocked
                            ? "bg-muted"
                            : isCompleted
                              ? "bg-primary"
                              : `${gradient}`,
                        )}
                      >
                        {isLocked ? (
                          <Lock className="w-6 h-6 text-muted-foreground" />
                        ) : (
                          (() => {
                            const IconComponent =
                              categoryIcons[set.category] || Book;
                            return (
                              <IconComponent className="w-6 h-6 text-primary-foreground" />
                            );
                          })()
                        )}
                      </div>

                      <div className="text-center w-full">
                        <span className="text-sm font-black block truncate text-foreground">
                          {language === "tr" ? set.titleTr : set.titleEn}
                        </span>
                        <span className="text-xs text-muted-foreground block mt-1 font-semibold">
                          {set.questions.length}{" "}
                          {language === "tr" ? "Soru" : "Questions"}
                        </span>
                      </div>
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
    const isPassed = wrongAnswers < 2;
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
                  opacity: 1,
                }}
                animate={{
                  y: 800,
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                  opacity: 0,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className={cn(
                  "absolute w-3 h-3 rounded-sm",
                  i % 4 === 0 && "bg-primary",
                  i % 4 === 1 && "bg-accent",
                  i % 4 === 2 && "bg-brand-cyan",
                  i % 4 === 3 && "bg-secondary",
                )}
                style={{
                  backgroundColor:
                    i % 4 === 0
                      ? "hsl(var(--primary))"
                      : i % 4 === 1
                        ? "hsl(var(--accent))"
                        : i % 4 === 2
                          ? "hsl(var(--brand-cyan))"
                          : "hsl(var(--secondary))",
                }}
              />
            ))}
          </div>

          {/* Header */}
          <div className="p-5 pb-6 bg-primary rounded-b-3xl">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedQuizSet(null)}
                className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-lg font-bold text-white">
                {language === "tr"
                  ? activeQuizSet.titleTr
                  : activeQuizSet.titleEn}
              </h1>
              <div className="w-11" />
            </div>
          </div>

          {/* Result Card */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pt-4 relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center w-full"
            >
              <h1
                className={cn(
                  "text-3xl font-black mb-2",
                  isPassed ? "text-primary" : "text-destructive",
                )}
              >
                {isPassed
                  ? language === "tr"
                    ? "Tebrikler!"
                    : "Congrats!"
                  : language === "tr"
                    ? "Başarısız!"
                    : "Failed!"}
              </h1>

              {!isPassed && (
                <p className="text-sm font-bold text-muted-foreground mb-4">
                  {language === "tr"
                    ? "2'den fazla yanlış yaptınız. Devam etmek için tekrar deneyin."
                    : "You made 2 or more mistakes. Try again to continue."}
                </p>
              )}

              <div className="glass-card p-6 mb-6">
                <div
                  className={cn(
                    "w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center",
                    isPassed ? "bg-primary" : "bg-destructive",
                  )}
                >
                  <div className="text-center">
                    <span className="text-4xl font-black text-white">
                      {Math.round(percentage)}
                    </span>
                    <span className="text-sm text-white/80 block font-bold">
                      %
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center gap-6 py-4 border-t border-border">
                  <div className="text-center">
                    <span className="text-lg font-black text-foreground">
                      {activeQuizSet.questions.length}
                    </span>
                    <span className="text-xs text-muted-foreground block font-bold">
                      {language === "tr" ? "Toplam" : "Total"}
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="text-lg font-black text-primary">
                      {score}
                    </span>
                    <span className="text-xs text-muted-foreground block font-bold">
                      {language === "tr" ? "Doğru" : "Correct"}
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="text-lg font-black text-destructive">
                      {wrongAnswers}
                    </span>
                    <span className="text-xs text-muted-foreground block font-bold">
                      {language === "tr" ? "Yanlış" : "Wrong"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {isPassed ? (
                  <>
                    {nextSet && (
                      <Button
                        onClick={handleNextQuizSet}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-6 text-lg font-bold"
                      >
                        {language === "tr" ? nextSet.titleTr : nextSet.titleEn}
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    )}

                    <Button
                      onClick={handleRestart}
                      variant="ghost"
                      className="w-full text-primary font-bold"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      {language === "tr" ? "Tekrar Oyna" : "Play Again"}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleRestart}
                    className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-2xl py-6 text-lg font-bold"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    {language === "tr" ? "Tekrar Dene" : "Try Again"}
                  </Button>
                )}

                <Button
                  onClick={() => navigate("/")}
                  variant="ghost"
                  className="w-full text-muted-foreground font-bold"
                >
                  <Home className="w-4 h-4 mr-2" />
                  {language === "tr" ? "Ana Sayfa" : "Home"}
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
        <div className="p-5 pb-6 bg-primary rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedQuizSet(null)}
              className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-sm font-bold text-white">
              {language === "tr"
                ? activeQuizSet.titleTr
                : activeQuizSet.titleEn}
            </h1>
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {currentQuestion + 1}/{activeQuizSet.questions.length}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestion + 1) / activeQuizSet.questions.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 px-5 py-6 -mt-2 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Question Text */}
              <div className="glass-card p-5 mb-5">
                {question.verseAr && (
                  <p className="font-arabic text-xl text-center mb-3 text-foreground leading-loose">
                    {question.verseAr}
                  </p>
                )}
                <h2 className="text-base font-bold text-foreground text-center">
                  {language === "en"
                    ? question.questionEn
                    : question.questionTr}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {(language === "en"
                  ? question.optionsEn
                  : question.optionsTr
                )?.map((option, index) => {
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
                        !isAnswered &&
                          "hover:border-primary hover:bg-primary/10 active:scale-[0.98]",
                        isAnswered &&
                          isCorrectAnswer &&
                          "border-primary bg-primary/10",
                        isAnswered &&
                          isSelected &&
                          !isCorrectAnswer &&
                          "border-destructive bg-destructive/10",
                        !isAnswered &&
                          isSelected &&
                          "border-primary bg-primary/10",
                        !isAnswered && !isSelected && "border-border bg-card",
                      )}
                    >
                      {/* Option Letter */}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
                          isAnswered &&
                            isCorrectAnswer &&
                            "bg-primary text-primary-foreground",
                          isAnswered &&
                            isSelected &&
                            !isCorrectAnswer &&
                            "bg-destructive text-destructive-foreground",
                          !isAnswered && "bg-muted text-muted-foreground",
                        )}
                      >
                        {letter}
                      </div>

                      {/* Option Text */}
                      <span
                        className={cn(
                          "flex-1 font-bold",
                          isAnswered && isCorrectAnswer && "text-primary",
                          isAnswered &&
                            isSelected &&
                            !isCorrectAnswer &&
                            "text-destructive",
                        )}
                      >
                        {option}
                      </span>

                      {/* Result Icon */}
                      {isAnswered && isCorrectAnswer && (
                        <Check className="w-5 h-5 text-primary" />
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
              <div
                className={cn(
                  "flex items-center justify-center gap-3 py-4 rounded-2xl mb-4",
                  isCorrect ? "bg-primary/10" : "bg-muted",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    isCorrect ? "bg-primary" : "bg-muted-foreground/20",
                  )}
                >
                  {isCorrect ? (
                    <Check className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <span
                  className={cn(
                    "font-bold",
                    isCorrect ? "text-primary" : "text-foreground",
                  )}
                >
                  {isCorrect
                    ? language === "tr"
                      ? "Doğru Cevap"
                      : "Correct!"
                    : language === "tr"
                      ? "Yanlış Cevap"
                      : "Wrong Answer"}
                </span>
              </div>

              {/* Next Button */}
              <Button
                onClick={handleNext}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-6 text-lg font-bold"
              >
                {currentQuestion < activeQuizSet.questions.length - 1
                  ? language === "tr"
                    ? "Sonraki Soru"
                    : "Next Question"
                  : language === "tr"
                    ? "Sonuçları Gör"
                    : "See Results"}
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
