"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

interface MenuContextType {
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && !(event.target as Element).closest(`[data-menu-id="${openMenuId}"]`)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  return (
    <MenuContext.Provider value={{ openMenuId, setOpenMenuId }}>
      {children}
    </MenuContext.Provider>
  );
};

export function useMenu () {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

