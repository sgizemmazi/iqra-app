import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, Globe, Bell, Volume2, Palette, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [sound, setSound] = React.useState(true);

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto glass-card rounded-3xl z-50 overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            {/* Header with gradient */}
            <div className="p-6 pb-8 bg-gradient-to-br from-emerald-600 via-teal-600 to-amber-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-white">
                    {language === 'tr' ? 'Ayarlar' : 'Settings'}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Settings List */}
            <div className="p-6 space-y-4">
              {/* Appearance Section */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Palette className="w-3 h-3" />
                  {language === 'tr' ? 'Görünüm' : 'Appearance'}
                </p>

                {/* Theme */}
                <div className="glass-card p-4 rounded-2xl mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-lg">
                        {resolvedTheme === 'dark' ? (
                          <Moon className="w-6 h-6 text-white" />
                        ) : (
                          <Sun className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          {language === 'tr' ? 'Karanlık Mod' : 'Dark Mode'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {resolvedTheme === 'dark'
                            ? (language === 'tr' ? 'Aktif' : 'Active')
                            : (language === 'tr' ? 'Kapalı' : 'Off')
                          }
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={resolvedTheme === 'dark'}
                      onCheckedChange={toggleTheme}
                    />
                  </div>
                </div>

                {/* Language */}
                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center shadow-lg">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          {language === 'tr' ? 'Dil' : 'Language'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'tr' ? 'Türkçe' : 'English'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleLanguage}
                      className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      {language === 'tr' ? 'TR' : 'EN'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Notifications Section */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Bell className="w-3 h-3" />
                  {language === 'tr' ? 'Bildirimler' : 'Notifications'}
                </p>

                {/* Notifications Toggle */}
                <div className="glass-card p-4 rounded-2xl mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                        <Bell className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          {language === 'tr' ? 'Bildirimler' : 'Notifications'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'tr' ? 'Namaz vakti hatırlatıcıları' : 'Prayer time reminders'}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                </div>

                {/* Sound */}
                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                        <Volume2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          {language === 'tr' ? 'Ses' : 'Sound'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'tr' ? 'Ezan ve bildirim sesleri' : 'Adhan and notification sounds'}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={sound}
                      onCheckedChange={setSound}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/50">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                {language === 'tr' ? 'Kapat' : 'Close'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
