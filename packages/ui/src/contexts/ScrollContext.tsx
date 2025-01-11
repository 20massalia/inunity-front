"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

interface ScrollContextType {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export const ScrollContext = createContext<ScrollContextType | undefined>(
  undefined
);



export function useScrollView(safe?: boolean) {
  if (safe === undefined) safe = true;
  const context = useContext(ScrollContext);
  if (context === undefined && safe) {
    throw new Error("useScrollView must be used within a ScrollView");
  }
  return context;
}
