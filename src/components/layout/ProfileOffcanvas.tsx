import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Award,
  Star,
  BookOpen,
  Heart,
  Trophy,
  Zap,
  Moon,
  Sun,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { usePersistedGameProgress } from "@/hooks/usePersistedGameProgress";

interface ProfileOffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
  inline?: boolean;
}

const ProfileOffcanvas: React.FC<ProfileOffcanvasProps> = ({
  isOpen,
  onClose,
  inline,
}) => {
  const { language } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { progress, learnedContent, resetProgress } =
    usePersistedGameProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  // Inline mode: rendered inside MobileLayoutWarm's flex row (no overlay, no fixed)
  if (inline) {
    return (
      <div className="h-full min-h-screen bg-card overflow-y-auto">
        <div className="p-6 pb-8 bg-primary rounded-bl-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white">
              {language === "tr" ? "Profil" : "Profile"}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex flex-row items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
            <div className="w-20 h-20 rounded-2xl bg-white/30 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <p className="text-lg font-black text-white">
                {language === "tr" ? "Kullanıcı" : "User"}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Trophy className="w-4 h-4 text-white/80" />
                <p className="text-sm font-bold text-white/90">
                  {language === "tr" ? "Seviye" : "Level"} {progress.level}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {/* <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
            {language === "tr" ? "İstatistikler" : "Statistics"}
          </p>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">
                  {language === "tr" ? "Toplam XP" : "Total XP"}
                </span>
              </div>
              <span className="text-2xl font-black text-primary">
                {progress.totalXP}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{
                  width: `${Math.min((progress.currentXP / progress.xpForNextLevel) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {progress.currentXP} / {progress.xpForNextLevel} XP{" "}
              {language === "tr" ? "sonraki seviyeye" : "to next level"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card p-4 rounded-2xl text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan mx-auto mb-2 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-2xl font-black text-brand-cyan mb-1">
                {learnedContent.surahs.length}
              </p>
              <p className="text-xs font-bold text-muted-foreground">
                {language === "tr" ? "Sureler" : "Surahs"}
              </p>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center">
              <div className="w-12 h-12 rounded-xl bg-secondary mx-auto mb-2 flex items-center justify-center">
                <Heart className="w-6 h-6 text-secondary-foreground" />
              </div>
              <p className="text-2xl font-black text-secondary mb-1">
                {learnedContent.duas.length}
              </p>
              <p className="text-xs font-bold text-muted-foreground">
                {language === "tr" ? "Dualar" : "Duas"}
              </p>
            </div>
          </div> */}
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-accent" />
              <span className="font-bold text-foreground">
                {language === "tr" ? "Başarılar" : "Achievements"}
              </span>
            </div>
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Star
                  className="w-12 h-12 text-accent mx-auto mb-2"
                  fill="currentColor"
                />
                <p className="text-sm text-muted-foreground">
                  {language === "tr" ? "Yakında gelecek!" : "Coming soon!"}
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3 mt-6">
            {language === "tr" ? "Ayarlar" : "Settings"}
          </p>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-3 rounded-2xl glass-card hover:bg-muted/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                {resolvedTheme === "dark" ? (
                  <Moon className="w-5 h-5 text-secondary-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-secondary-foreground" />
                )}
              </div>
              <span className="font-bold text-foreground">
                {language === "tr" ? "Karanlık Mod" : "Dark Mode"}
              </span>
            </div>
            <div
              className={`w-12 h-6 rounded-full transition-colors ${resolvedTheme === "dark" ? "bg-primary" : "bg-muted"}`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${resolvedTheme === "dark" ? "translate-x-6" : "translate-x-0.5"} mt-0.5`}
              />
            </div>
          </button>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-destructive/10 hover:bg-destructive/20 transition-all mt-3"
            >
              <RotateCcw className="w-5 h-5 text-destructive" />
              <span className="font-bold text-destructive">
                {language === "tr" ? "İlerlemeyi Sıfırla" : "Reset Progress"}
              </span>
            </button>
          ) : (
            <div className="mt-3 glass-card p-4 rounded-2xl border-2 border-destructive/30">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-bold text-destructive text-sm">
                    {language === "tr" ? "Emin misiniz?" : "Are you sure?"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === "tr"
                      ? "Tüm ilerlemeniz silinecek!"
                      : "All your progress will be deleted!"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 px-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                >
                  <span className="text-sm font-bold text-foreground">
                    {language === "tr" ? "İptal" : "Cancel"}
                  </span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 px-3 rounded-xl bg-destructive hover:bg-destructive/90 transition-colors"
                >
                  <span className="text-sm font-bold text-destructive-foreground">
                    {language === "tr" ? "Sıfırla" : "Reset"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-border/50">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {language === "tr" ? "Öğrenmeye devam edin!" : "Keep learning!"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Offcanvas */}
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 glass-card z-[60] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 pb-8 bg-primary rounded-bl-3xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white">
                  {language === "tr" ? "Profil" : "Profile"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* User Avatar */}
              <div className="flex flex-row items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <div className="w-20 h-20 rounded-2xl bg-white/30 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-black text-white">
                    {language === "tr" ? "Kullanıcı" : "User"}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Trophy className="w-4 h-4 text-white/80" />
                    <p className="text-sm font-bold text-white/90">
                      {language === "tr" ? "Seviye" : "Level"} {progress.level}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="p-6 space-y-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                {language === "tr" ? "İstatistikler" : "Statistics"}
              </p>

              {/* XP Card */}
              <div className="glass-card p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-foreground">
                      {language === "tr" ? "Toplam XP" : "Total XP"}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-primary">
                    {progress.totalXP}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{
                      width: `${Math.min((progress.currentXP / progress.xpForNextLevel) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {progress.currentXP} / {progress.xpForNextLevel} XP{" "}
                  {language === "tr" ? "sonraki seviyeye" : "to next level"}
                </p>
              </div>

              {/* Learned Content */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card p-4 rounded-2xl text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan mx-auto mb-2 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-2xl font-black text-brand-cyan mb-1">
                    {learnedContent.surahs.length}
                  </p>
                  <p className="text-xs font-bold text-muted-foreground">
                    {language === "tr" ? "Sureler" : "Surahs"}
                  </p>
                </div>

                <div className="glass-card p-4 rounded-2xl text-center">
                  <div className="w-12 h-12 rounded-xl bg-secondary mx-auto mb-2 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <p className="text-2xl font-black text-secondary mb-1">
                    {learnedContent.duas.length}
                  </p>
                  <p className="text-xs font-bold text-muted-foreground">
                    {language === "tr" ? "Dualar" : "Duas"}
                  </p>
                </div>
              </div>

              {/* Achievements Card */}
              <div className="glass-card p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="font-bold text-foreground">
                    {language === "tr" ? "Başarılar" : "Achievements"}
                  </span>
                </div>
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Star
                      className="w-12 h-12 text-accent mx-auto mb-2"
                      fill="currentColor"
                    />
                    <p className="text-sm text-muted-foreground">
                      {language === "tr" ? "Yakında gelecek!" : "Coming soon!"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3 mt-6">
                {language === "tr" ? "Ayarlar" : "Settings"}
              </p>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-3 rounded-2xl glass-card hover:bg-muted/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    {resolvedTheme === "dark" ? (
                      <Moon className="w-5 h-5 text-secondary-foreground" />
                    ) : (
                      <Sun className="w-5 h-5 text-secondary-foreground" />
                    )}
                  </div>
                  <span className="font-bold text-foreground">
                    {language === "tr" ? "Karanlık Mod" : "Dark Mode"}
                  </span>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    resolvedTheme === "dark" ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      resolvedTheme === "dark"
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    } mt-0.5`}
                  />
                </div>
              </button>

              {/* Reset Progress */}
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-destructive/10 hover:bg-destructive/20 transition-all mt-3"
                >
                  <RotateCcw className="w-5 h-5 text-destructive" />
                  <span className="font-bold text-destructive">
                    {language === "tr"
                      ? "İlerlemeyi Sıfırla"
                      : "Reset Progress"}
                  </span>
                </button>
              ) : (
                <div className="mt-3 glass-card p-4 rounded-2xl border-2 border-destructive/30">
                  <div className="flex items-start gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-bold text-destructive text-sm">
                        {language === "tr" ? "Emin misiniz?" : "Are you sure?"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {language === "tr"
                          ? "Tüm ilerlemeniz silinecek!"
                          : "All your progress will be deleted!"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="flex-1 py-2 px-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <span className="text-sm font-bold text-foreground">
                        {language === "tr" ? "İptal" : "Cancel"}
                      </span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 py-2 px-3 rounded-xl bg-destructive hover:bg-destructive/90 transition-colors"
                    >
                      <span className="text-sm font-bold text-destructive-foreground">
                        {language === "tr" ? "Sıfırla" : "Reset"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/50">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  {language === "tr"
                    ? "Öğrenmeye devam edin!"
                    : "Keep learning!"}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileOffcanvas;
