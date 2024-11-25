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



export function useScrollView() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
