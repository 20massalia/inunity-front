"use client";

import React from "react";
import { useRef } from "react";
import { ScrollContext } from "./contexts/ScrollContext";

export type ScrollViewProps = {
  className?: string;
  
};
export const ScrollView: React.FC<React.PropsWithChildren<ScrollViewProps>> = ({
  children,
  className
}) => {
  const scrollContainerRef = useRef(null);
  return (
    <ScrollContext.Provider value={{ scrollContainerRef }}>
      <div
        ref={scrollContainerRef}
        className={`flex flex-col bg-gray-50 h-full overflow-y-scroll overscroll-contain ${className}`}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
};
