import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Menu, User, Sparkles, Flame } from "lucide-react";
import { usePersistedGameProgress } from "@/hooks/usePersistedGameProgress";
import Sidebar from "@/components/layout/Sidebar";
import ProfileOffcanvas from "@/components/layout/ProfileOffcanvas";

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
          className="flex items-center justify-between "
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
            {language === "tr" ? "Iqra App" : "Iqra App"}
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
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Profile Offcanvas */}
      <ProfileOffcanvas
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
};

export default HeaderWarm;
