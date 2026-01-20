import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { QuizQuestion } from '@/types/gamification';

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    type: 'multiple_choice',
    question: 'Fatiha Suresi kaç ayettir?',
    options: ['5 ayet', '6 ayet', '7 ayet', '8 ayet'],
    correctAnswer: 2,
    explanation: 'Fatiha Suresi 7 ayetten oluşur ve Kuran\'ın ilk suresidir.',
    xpReward: 10,
    category: 'surah',
  },
  {
    id: '2',
    type: 'true_false',
    question: '"Bismillahirrahmanirrahim" yemek yemeden önce okunur.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Evet, yemeğe başlamadan önce Besmele çekilir.',
    xpReward: 10,
    category: 'dua',
  },
  {
    id: '3',
    type: 'multiple_choice',
    question: '"الحمد لله رب العالمين" ayetinin anlamı nedir?',
    questionArabic: 'الحمد لله رب العالمين',
    options: [
      'Rahman ve Rahim olan Allah\'ın adıyla',
      'Hamd, alemlerin Rabbi Allah\'a mahsustur',
      'Din gününün sahibi',
      'Yalnız sana kulluk ederiz'
    ],
    correctAnswer: 1,
    explanation: 'Bu ayet "Hamd, alemlerin Rabbi Allah\'a mahsustur" anlamına gelir.',
    xpReward: 15,
    category: 'surah',
  },
  {
    id: '4',
    type: 'multiple_choice',
    question: 'İhlas Suresi kaç ayettir?',
    options: ['3 ayet', '4 ayet', '5 ayet', '6 ayet'],
    correctAnswer: 1,
    explanation: 'İhlas Suresi 4 ayetten oluşur.',
    xpReward: 10,
    category: 'surah',
  },
  {
    id: '5',
    type: 'true_false',
    question: 'Sabah namazı 4 rekattır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 1,
    explanation: 'Sabah namazı 2 rekat sünneti ve 2 rekat farzı olmak üzere toplam 4 rekattır, ancak farz kısmı 2 rekattır.',
    xpReward: 10,
    category: 'islamic_knowledge',
  },
];

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === question.correctAnswer) {
      setScore(prev => prev + 1);
      setTotalXP(prev => prev + question.xpReward);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setTotalXP(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
        <header className="flex items-center justify-between px-4 py-4 border-b border-border/50">
          <button 
            onClick={() => navigate('/learn')}
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
              {score}/{quizQuestions.length} Doğru
            </h2>
            <p className="text-muted-foreground mb-6">
              {percentage >= 80 
                ? 'Muhteşem! Harika iş çıkardın!' 
                : percentage >= 50 
                  ? 'İyi gidiyorsun! Devam et!'
                  : 'Her gün biraz daha iyi olacaksın!'}
            </p>

            {/* XP Earned */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gold-light rounded-2xl mb-8">
              <Sparkles className="w-6 h-6 text-gold" />
              <span className="text-2xl font-bold text-gold">+{totalXP} XP</span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={handleRestart} variant="sage" size="lg" className="w-full">
                <RotateCcw className="w-5 h-5" />
                Tekrar Dene
              </Button>
              <Button onClick={() => navigate('/learn')} variant="outline" size="lg" className="w-full">
                Öğrenmeye Dön
              </Button>
            </div>
          </div>
        </div>
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
          <h1 className="font-semibold">Quiz</h1>
          <p className="text-xs text-muted-foreground">Soru {currentQuestion + 1}/{quizQuestions.length}</p>
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
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
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
            {currentQuestion < quizQuestions.length - 1 ? (
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
    </div>
  );
};

export default QuizPage;
