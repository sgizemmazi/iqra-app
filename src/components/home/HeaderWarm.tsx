import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Menu, User, Sparkles, Flame } from 'lucide-react';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import Sidebar from '@/components/layout/Sidebar';
import ProfileOffcanvas from '@/components/layout/ProfileOffcanvas';

const HeaderWarm: React.FC = () => {
  const { language } = useLanguage();
  const { progress } = usePersistedGameProgress();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
            className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5 text-primary-foreground" />
          </motion.button>

          <h1 className="text-xl font-black text-primary">
            {language === 'tr' ? 'Kuran Rehberi' : 'Quran Guide'}
          </h1>

          <motion.button
            onClick={() => setProfileOpen(true)}
            className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5 text-accent-foreground" />
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
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === 'tr' ? 'Seviye' : 'Level'}
                </p>
                <p className="text-base font-black text-primary">
                  {progress.level}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 glass-card p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Flame className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === 'tr' ? 'Seri' : 'Streak'}
                </p>
                <p className="text-base font-black text-accent">
                  {progress.streak}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Profile Offcanvas */}
      <ProfileOffcanvas isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
};

export default HeaderWarm;
