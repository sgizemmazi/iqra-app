import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
  BookOpen,
  Clock,
  Hand,
  HelpCircle,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const menuItems = [
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
      label: language === "tr" ? "Namaz Vakitleri" : "Prayer Times",
      path: "/prayer",
      color: "bg-secondary",
    },
    {
      icon: Hand,
      label: language === "tr" ? "Zikirmatik" : "Dhikr Counter",
      path: "/zikirmatik",
      color: "bg-accent",
    },
    {
      icon: HelpCircle,
      label: "Quiz",
      path: "/quiz",
      color: "bg-primary",
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

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

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 glass-card z-[60] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 pb-8 bg-primary rounded-br-3xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white">Menü</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* User info */}
              <div className="flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center">
                  <Hand className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {language === "tr" ? "Hoş geldiniz" : "Welcome"}
                  </p>
                  <p className="text-xs text-white/80">
                    {language === "tr" ? "Iqra App" : "Iqra App"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                {language === "tr" ? "Gezinme" : "Navigation"}
              </p>
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className="w-full relative group overflow-hidden rounded-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background on hover */}
                    <div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity",
                        item.color,
                      )}
                    />

                    <div className="relative flex items-center gap-3 p-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          item.color,
                        )}
                      >
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="font-bold text-foreground">
                        {item.label}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/50">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                  {language === "tr" ? "Sevgiyle yapıldı" : "Made with"}{" "}
                  <Heart className="w-3 h-3 text-accent" fill="currentColor" />
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
