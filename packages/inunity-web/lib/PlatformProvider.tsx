'use client';

import { createContext, ReactNode, useContext } from "react";
import { Platform } from "./PlatformResolver";

export const PlatformContext = createContext({} as Platform);
export const PlatformProvider = ({
  children,
  platform,
}: {
  children: ReactNode;
  platform: Platform;
}) => {
  return (
    <PlatformContext.Provider value={platform}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  return useContext(PlatformContext);
};
