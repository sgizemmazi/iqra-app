import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, BookOpen, Clock, User, HelpCircle, Settings, Moon, Sun, Globe, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const menuItems = [
    {
      icon: Home,
      label: language === 'tr' ? 'Ana Sayfa' : 'Home',
      path: '/',
      gradient: 'from-emerald-600 to-teal-600',
    },
    {
      icon: BookOpen,
      label: language === 'tr' ? 'Öğren' : 'Learn',
      path: '/learn',
      gradient: 'from-teal-600 to-cyan-600',
    },
    {
      icon: Clock,
      label: language === 'tr' ? 'Namaz Vakitleri' : 'Prayer Times',
      path: '/prayer',
      gradient: 'from-blue-700 to-blue-500',
    },
    {
      icon: User,
      label: language === 'tr' ? 'Profil' : 'Profile',
      path: '/profile',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: HelpCircle,
      label: 'Quiz',
      path: '/quiz',
      gradient: 'from-emerald-600 to-teal-600',
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 glass-card z-50 overflow-y-auto"
          >
            {/* Header with gradient */}
            <div className="p-6 pb-8 bg-gradient-to-br from-emerald-600 via-teal-600 to-amber-600 rounded-br-3xl">
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
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {language === 'tr' ? 'Kullanıcı' : 'User'}
                  </p>
                  <p className="text-xs text-white/80">
                    {language === 'tr' ? 'Hoş geldiniz' : 'Welcome'}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                {language === 'tr' ? 'Gezinme' : 'Navigation'}
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
                    {/* Gradient background on hover */}
                    <div
                      className={cn(
                        'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity',
                        item.gradient
                      )}
                    />

                    <div className="relative flex items-center gap-3 p-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md',
                          item.gradient
                        )}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-foreground">{item.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Settings Section */}
            <div className="p-6 border-t border-border/50 space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                {language === 'tr' ? 'Ayarlar' : 'Settings'}
              </p>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-3 rounded-2xl glass-card hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center">
                    {resolvedTheme === 'dark' ? (
                      <Moon className="w-5 h-5 text-white" />
                    ) : (
                      <Sun className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="font-bold text-foreground">
                    {language === 'tr' ? 'Tema' : 'Theme'}
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl">
                  <span className="text-xs font-bold text-white">
                    {resolvedTheme === 'dark' ? '🌙' : '☀️'}
                  </span>
                </div>
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center justify-between p-3 rounded-2xl glass-card hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-foreground">
                    {language === 'tr' ? 'Dil' : 'Language'}
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl">
                  <span className="text-xs font-bold text-white">
                    {language === 'tr' ? 'TR' : 'EN'}
                  </span>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/50">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                  {language === 'tr' ? 'Sevgiyle yapıldı' : 'Made with'} <Heart className="w-3 h-3 text-amber-500" fill="currentColor" />
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
