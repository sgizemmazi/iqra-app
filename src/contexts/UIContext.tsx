import React, { createContext, useContext, useState } from "react";

interface UIContextType {
  profileOpen: boolean;
  setProfileOpen: (v: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const UIContext = createContext<UIContextType>({
  profileOpen: false,
  setProfileOpen: () => {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <UIContext.Provider value={{ profileOpen, setProfileOpen, sidebarOpen, setSidebarOpen }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
