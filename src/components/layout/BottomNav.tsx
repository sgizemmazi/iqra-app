import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Clock, Hand, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const navItems = [
    {
      icon: Home,
      label: language === "tr" ? "Ana Sayfa" : "Home",
      path: "/",
      color: "bg-primary",
    },
    {
      icon: BookOpen,
      label: language === "tr" ? "Öğren" : "Learn",
      path: "/learn",
      color: "bg-brand-cyan",
    },
    {
      icon: Clock,
      label: language === "tr" ? "Namaz" : "Prayer",
      path: "/prayer",
      color: "bg-secondary",
    },
    {
      icon: Hand,
      label: language === "tr" ? "Zikirmatik" : "Dhikr",
      path: "/zikirmatik",
      color: "bg-accent",
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="max-w-lg mx-auto px-4 pb-3 relative">
        {/* Glass-morphic nav */}
        <div className="relative mb-3">
          {/* Main nav container */}
          <nav className="relative flex items-center justify-around py-3 px-2 glass-card rounded-3xl border-2 border-primary/20">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "relative flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all min-w-[70px]",
                  )}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Icon */}
                  <div className="relative z-10">
                    <Icon
                      className={cn(
                        "w-6 h-6 transition-colors text-primary",
                        !isActive && "opacity-50",
                      )}
                    />

                    {/* Sparkle decoration for active */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 180 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Sparkles
                          className="w-3 h-3 text-accent"
                          fill="currentColor"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-[10px] font-bold relative z-10 transition-colors text-primary",
                      !isActive && "opacity-50",
                    )}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
