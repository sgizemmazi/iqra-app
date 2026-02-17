import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Minus, List, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import MobileLayoutWarm from "@/components/layout/MobileLayoutWarm";

const ZikirmatikPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [vibrate, setVibrate] = useState(false);
  const [flash, setFlash] = useState(false);
  const [turCount, setTurCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState<{
    ar?: string;
    tr?: string;
    en?: string;
  }>({});
  const [currentDhikrKey, setCurrentDhikrKey] = useState<string>("default");

  // Load saved counts from localStorage
  const loadDhikrCount = (key: string): number => {
    const saved = localStorage.getItem(`dhikr_count_${key}`);
    return saved ? parseInt(saved, 10) : 0;
  };

  // Load saved tur count from localStorage
  const loadTurCount = (key: string): number => {
    const saved = localStorage.getItem(`dhikr_tur_${key}`);
    return saved ? parseInt(saved, 10) : 0;
  };

  // Save count to localStorage
  const saveDhikrCount = (key: string, value: number) => {
    localStorage.setItem(`dhikr_count_${key}`, value.toString());
  };

  // Save tur count to localStorage
  const saveTurCount = (key: string, value: number) => {
    localStorage.setItem(`dhikr_tur_${key}`, value.toString());
  };

  useEffect(() => {
    if (location.state?.target) {
      // Create unique key from dhikr text
      const dhikrKey = location.state.dhikrAr || "default";
      setCurrentDhikrKey(dhikrKey);
      setTarget(location.state.target);
      setSelectedDhikr({
        ar: location.state.dhikrAr,
        tr: location.state.dhikrTr,
        en: location.state.dhikrEn,
      });

      // Load saved count and tur for this dhikr
      const savedCount = loadDhikrCount(dhikrKey);
      const savedTur = loadTurCount(dhikrKey);
      setCount(savedCount);
      setTurCount(savedTur);
    } else {
      // Load default dhikr count and tur
      const savedCount = loadDhikrCount("default");
      const savedTur = loadTurCount("default");
      setCount(savedCount);
      setTurCount(savedTur);
    }
  }, [location.state]);

  const handleIncrement = () => {
    const newCount = count + 1;
    const currentTarget = selectedDhikr.ar ? target : 99; // Ana zikirmatik için 99

    // Hedef sayıya ulaşıldı mı?
    if (newCount > currentTarget) {
      // Tur tamamlandı, yeni tura geç
      const newTur = turCount + 1;
      setTurCount(newTur);
      setCount(1); // 1'den başla
      saveTurCount(currentDhikrKey, newTur);
      saveDhikrCount(currentDhikrKey, 1);

      // Titreşim
      setVibrate(true);
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
      setTimeout(() => setVibrate(false), 600);
      return;
    }

    // Normal artırma
    setCount(newCount);
    saveDhikrCount(currentDhikrKey, newCount);

    // Flash animasyonu
    setFlash(true);
    setTimeout(() => setFlash(false), 250);

    // Hedefe tam ulaşıldığında titreşim (tur tamamlanacak)
    if (newCount === currentTarget) {
      setVibrate(true);
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      setTimeout(() => setVibrate(false), 400);
    }
  };

  const handleReset = () => {
    setCount(0);
    setTurCount(0);
    saveDhikrCount(currentDhikrKey, 0);
    saveTurCount(currentDhikrKey, 0);
  };

  const currentTarget = selectedDhikr.ar ? target : 99;
  const progress = Math.min((count / currentTarget) * 100, 100);

  return (
    <MobileLayoutWarm>
      <div className="px-5 py-6 space-y-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-2xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <div className="text-center">
            {selectedDhikr.ar ? (
              <>
                <h1 className="font-arabic text-3xl text-primary mb-1">
                  {selectedDhikr.ar}
                </h1>
                <p className="text-sm font-bold text-muted-foreground">
                  {language === "tr" ? selectedDhikr.tr : selectedDhikr.en}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-black text-primary mb-1">
                  {language === "tr" ? "Zikirmatik" : "Dhikr Counter"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {language === "tr" ? "Zikir sayacınız" : "Your dhikr counter"}
                </p>
              </>
            )}
          </div>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => navigate("/zikirmatik/list")}
              className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-all"
            >
              <List className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Counter Display */}
        <div className="flex flex-col justify-center items-center flex-1 py-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: vibrate ? 1.05 : 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Main counter circle */}
            <button
              onClick={handleIncrement}
              className="relative w-64 h-64 rounded-full bg-primary flex flex-col items-center justify-center active:scale-95 transition-transform cursor-pointer"
            >
              <span className="flex flex-row items-end">
                <span className="text-7xl font-black text-primary-foreground">
                  {count}
                </span>
                <span className="text-base font-bold text-primary-foreground mt-2 opacity-90">
                  / {selectedDhikr.ar ? target : 99}
                </span>
              </span>
              <div className="flex items-center gap-1.5 mt-4">
                <RotateCcw className="w-4 h-4 text-primary-foreground opacity-80" />
                <span className="text-lg font-bold text-primary-foreground opacity-90">
                  {turCount}
                </span>
              </div>
            </button>

            {/* Progress ring - Her zaman göster */}
            <svg className="absolute inset-0 w-64 h-64 -rotate-90 pointer-events-none">
              <circle
                cx="128"
                cy="128"
                r="124"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
                className="text-muted opacity-20"
              />
              <circle
                cx="128"
                cy="128"
                r="124"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 124}`}
                strokeDashoffset={`${2 * Math.PI * 124 * (1 - progress / 100)}`}
                className="text-accent transition-all duration-300"
                strokeLinecap="round"
                style={{
                  filter: flash ? "drop-shadow(0 0 8px hsl(45 90% 52%))" : "none",
                  opacity: flash ? 1 : 0.9,
                  transition: flash ? "filter 0.1s ease, opacity 0.1s ease, stroke-dashoffset 0.3s ease" : "filter 0.2s ease, opacity 0.2s ease, stroke-dashoffset 0.3s ease",
                }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="p-4 bg-muted rounded-2xl hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5 text-foreground" />
              <span className="font-bold text-foreground">
                {language === "tr" ? "Sıfırla" : "Reset"}
              </span>
            </div>
          </button>

          {/* Decrease Button */}
          <button
            onClick={() => {
              const currentTarget = selectedDhikr.ar ? target : 99;
              if (count === 0 && turCount > 0) {
                // Önceki tura dön
                const newTur = turCount - 1;
                setTurCount(newTur);
                setCount(currentTarget);
                saveTurCount(currentDhikrKey, newTur);
                saveDhikrCount(currentDhikrKey, currentTarget);
              } else if (count > 0) {
                // Normal azaltma
                const newCount = count - 1;
                setCount(newCount);
                saveDhikrCount(currentDhikrKey, newCount);
              }
            }}
            className="p-4 bg-muted rounded-2xl hover:bg-destructive/20 transition-colors"
            disabled={count === 0 && turCount === 0}
          >
            <div className="flex items-center justify-center gap-2">
              <Minus className="w-5 h-5 text-foreground" />
              <span className="font-bold text-foreground">
                {language === "tr" ? "Azalt" : "Decrease"}
              </span>
            </div>
          </button>
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-4" />
      </div>
    </MobileLayoutWarm>
  );
};

export default ZikirmatikPage;
