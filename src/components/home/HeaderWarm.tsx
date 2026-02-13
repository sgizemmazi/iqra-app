import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Menu, Settings, Sparkles, Flame } from 'lucide-react';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import Sidebar from '@/components/layout/Sidebar';
import SettingsModal from '@/components/layout/SettingsModal';

const HeaderWarm: React.FC = () => {
  const { language } = useLanguage();
  const { progress } = usePersistedGameProgress();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="px-5 pt-6 pb-4">
        {/* Top row with menu and settings */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            onClick={() => setSidebarOpen(true)}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5 text-white" />
          </motion.button>

          <h1 className="text-xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
            {language === 'tr' ? 'Kuran Rehberi' : 'Quran Guide'}
          </h1>

          <motion.button
            onClick={() => setSettingsOpen(true)}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5 text-white" />
          </motion.button>
        </motion.div>

        {/* Info cards row - Islamic style */}
        <motion.div
          className="flex items-center justify-between gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex-1 glass-card p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === 'tr' ? 'Seviye' : 'Level'}
                </p>
                <p className="text-base font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {progress.level}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 glass-card p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === 'tr' ? 'Seri' : 'Streak'}
                </p>
                <p className="text-base font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  {progress.streak}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

export default HeaderWarm;
