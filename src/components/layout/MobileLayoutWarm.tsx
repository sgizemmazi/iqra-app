import React from "react";
import { cn } from "@/lib/utils";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";
import ProfileOffcanvas from "./ProfileOffcanvas";
import { useUI } from "@/contexts/UIContext";
import { motion } from "framer-motion";

interface MobileLayoutWarmProps {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
}

const DRAWER_WIDTH = 280;
const SWIPE_THRESHOLD = 60;
const VELOCITY_THRESHOLD = 300;

const MobileLayoutWarm: React.FC<MobileLayoutWarmProps> = ({
  children,
  className,
  hideNav = false,
}) => {
  const { profileOpen, setProfileOpen, sidebarOpen, setSidebarOpen } = useUI();

  const translateX = sidebarOpen
    ? 0
    : profileOpen
      ? -DRAWER_WIDTH * 2
      : -DRAWER_WIDTH;

  const handlePanEnd = (
    _e: never,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const { offset, velocity } = info;
    if (sidebarOpen) {
      if (offset.x < -SWIPE_THRESHOLD || velocity.x < -VELOCITY_THRESHOLD) {
        setSidebarOpen(false);
      }
    } else if (profileOpen) {
      if (offset.x > SWIPE_THRESHOLD || velocity.x > VELOCITY_THRESHOLD) {
        setProfileOpen(false);
      }
    } else {
      if (offset.x > SWIPE_THRESHOLD || velocity.x > VELOCITY_THRESHOLD) {
        setSidebarOpen(true);
      } else if (
        offset.x < -SWIPE_THRESHOLD ||
        velocity.x < -VELOCITY_THRESHOLD
      ) {
        setProfileOpen(true);
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background max-w-lg mx-auto overflow-hidden relative"
      onPanEnd={handlePanEnd}
    >
      <motion.div
        className="flex min-h-screen"
        style={{ width: `calc(100% + ${DRAWER_WIDTH * 2}px)` }}
        animate={{ x: translateX }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
      >
        {/* Left Sidebar — always rendered, slides in from left */}
        <div style={{ width: DRAWER_WIDTH, flexShrink: 0 }}>
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            inline
          />
        </div>

        {/* Main Content */}
        <div
          className="flex flex-col flex-1 min-h-screen bg-background"
          style={{ width: "100%", flexShrink: 0 }}
        >
          <main
            className={cn("flex-1 overflow-y-auto relative", className)}
            style={
              !hideNav
                ? {
                    paddingBottom: "calc(8rem + env(safe-area-inset-bottom))",
                  }
                : undefined
            }
          >
            {children}
          </main>
        </div>

        {/* Right Profile Panel — always rendered, slides in from right */}
        <div style={{ width: DRAWER_WIDTH, flexShrink: 0 }}>
          <ProfileOffcanvas
            isOpen={profileOpen}
            onClose={() => setProfileOpen(false)}
            inline
          />
        </div>
      </motion.div>

      {/* BottomNav outside the transforming div so fixed positioning works correctly */}
      {!hideNav && <BottomNav />}
    </motion.div>
  );
};

export default MobileLayoutWarm;
