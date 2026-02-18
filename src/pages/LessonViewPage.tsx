import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import MobileLayoutWarm from "@/components/layout/MobileLayoutWarm";
import { lessons } from "@/data/lessonsData";
import { prophetLessons } from "@/data/prophetLessons";
import { Lesson, LessonStep } from "@/types/gamification";
import { usePersistedGameProgress } from "@/hooks/usePersistedGameProgress";
import { cn } from "@/lib/utils";

const LessonViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completeLesson } = usePersistedGameProgress();

  // Lesson'ı bul (sureler ve peygamberler)
  const lesson = useMemo((): Lesson | undefined => {
    const allLessons = [...lessons, ...prophetLessons];
    return allLessons.find((l) => l.id === id);
  }, [id]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  if (!lesson) {
    return (
      <MobileLayoutWarm hideNav>
        <div className="flex flex-col items-center justify-center h-full p-8">
          <h1 className="text-xl font-bold mb-4">Ders Bulunamadı</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </MobileLayoutWarm>
    );
  }

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;
  const totalSteps = lesson.steps.length;

  // Step tamamla
  const handleStepComplete = (isCorrect: boolean = true) => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
      } else {
        const newWrongAnswers = wrongAnswers + 1;
        setWrongAnswers(newWrongAnswers);

        // 2'den fazla yanlış yapıldı mı?
        if (newWrongAnswers > 2) {
          // Ders başarısız - progress kaydetme, ana sayfaya dön
          navigate('/', {
            state: {
              lessonFailed: true,
              lessonTitle: lesson.title.tr,
              wrongCount: newWrongAnswers
            }
          });
          return;
        }
      }
    }

    if (isLastStep) {
      // Ders bitti - completion percentage hesapla
      const totalCorrect = isCorrect ? correctAnswers + 1 : correctAnswers;
      const completionPercentage = Math.round((totalCorrect / totalSteps) * 100);

      // Checkpoint kontrolü
      const isCheckpoint = lesson.contentType === 'checkpoint';
      const passed = isCheckpoint
        ? completionPercentage >= (lesson.passThreshold || 45)
        : true;

      console.log('🎯 DERS TAMAMLANDI!', {
        lessonId: lesson.id,
        completionPercentage,
        totalCorrect,
        totalSteps
      });

      // Progress kaydet
      completeLesson(lesson.id, completedSteps.length + 1, completionPercentage);

      console.log('✅ completeLesson çağrıldı');

      // 500ms bekle - state update için
      setTimeout(() => {
        // Sonuç sayfasına yönlendir
        navigate('/', {
          state: {
            lessonCompleted: true,
            stars: completionPercentage >= 90 ? 3 : completionPercentage >= 70 ? 2 : 1,
            passed,
            isCheckpoint
          }
        });
      }, 500);
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <MobileLayoutWarm hideNav>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="p-5 bg-primary">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/")}
              className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="text-center flex-1">
              <h1 className="text-lg font-bold text-white">
                {lesson.title.tr}
              </h1>
              <p className="text-xs text-white/80">{lesson.description.tr}</p>
            </div>
            <div className="w-11" />
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{
                width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-white/80 text-center mt-2">
            {currentStepIndex + 1} / {totalSteps}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          {currentStep && (
            <StepRenderer
              key={currentStep.id}
              step={currentStep}
              onComplete={handleStepComplete}
            />
          )}
        </div>
      </div>
    </MobileLayoutWarm>
  );
};

// Step Renderer Component
interface StepRendererProps {
  step: LessonStep;
  onComplete: (isCorrect?: boolean) => void;
}

const StepRenderer: React.FC<StepRendererProps> = ({ step, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    // Check if correct
    const isCorrect =
      step.type === "read_translate"
        ? answer === step.translation?.tr
        : step.type === "fill_blank"
          ? answer === step.blankWord
          : true;

    setTimeout(() => {
      onComplete(isCorrect);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 1500);
  };

  // Intro step
  if (step.type === "intro") {
    return (
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-3xl border border-border">
          <p className="text-3xl font-arabic text-center mb-4 leading-relaxed">
            {step.arabicText}
          </p>
          <p className="text-lg text-center text-muted-foreground mb-2">
            {step.transliteration}
          </p>
          <p className="text-base text-center font-semibold">
            {step.translation?.tr}
          </p>
        </div>

        {step.explanation && (
          <div className="bg-accent/20 p-5 rounded-2xl">
            <p className="text-sm text-foreground">{step.explanation.tr}</p>
          </div>
        )}

        <button
          onClick={() => onComplete(true)}
          className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:shadow-lg transition-all"
        >
          Devam Et
        </button>
      </div>
    );
  }

  // Read & Translate step
  if (step.type === "read_translate" || step.type === "review") {
    const options = [
      step.translation?.tr,
      ...(step.wrongOptions?.map((o) => o.tr) || []),
    ]
      .filter(Boolean)
      .sort(() => Math.random() - 0.5);

    return (
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-3xl border border-border">
          <p className="text-3xl font-arabic text-center mb-4 leading-relaxed">
            {step.arabicText}
          </p>
          <p className="text-lg text-center text-muted-foreground">
            {step.transliteration}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-center text-muted-foreground">
            Doğru çeviriyi seçin:
          </p>
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === step.translation?.tr;
            const showFeedback = showResult && isSelected;

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(option!)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-left transition-all",
                  !showResult && "hover:border-primary hover:bg-primary/5",
                  showFeedback && isCorrect && "bg-green-100 border-green-500",
                  showFeedback && !isCorrect && "bg-red-100 border-red-500",
                  !showFeedback && "bg-card border-border",
                )}
              >
                <span className="text-sm">{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Fill blank step
  if (step.type === "fill_blank") {
    const options = [step.blankWord, ...(step.wrongWords || [])].sort(
      () => Math.random() - 0.5,
    );

    return (
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-3xl border border-border">
          <p className="text-2xl font-arabic text-center mb-4 leading-relaxed">
            {step.arabicText.replace("{BLANK}", "___")}
          </p>
          <p className="text-base text-center text-muted-foreground">
            {step.transliteration?.replace("___", "___")}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-center text-muted-foreground">
            Boşluğu doldurun:
          </p>
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === step.blankWord;
            const showFeedback = showResult && isSelected;

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-center transition-all font-arabic text-lg",
                  !showResult && "hover:border-primary hover:bg-primary/5",
                  showFeedback && isCorrect && "bg-green-100 border-green-500",
                  showFeedback && !isCorrect && "bg-red-100 border-red-500",
                  !showFeedback && "bg-card border-border",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>

        {step.explanation && showResult && (
          <div className="bg-accent/20 p-4 rounded-2xl">
            <p className="text-xs text-foreground">{step.explanation.tr}</p>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default LessonViewPage;
