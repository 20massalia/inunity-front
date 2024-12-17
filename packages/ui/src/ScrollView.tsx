"use client";

import React, { useEffect } from "react";
import { useRef } from "react";
import { ScrollContext } from "./contexts/ScrollContext";

export type ScrollViewProps = {
  className?: string;
  onReachBottom?: (entry: IntersectionObserverEntry) => void;
};
export const ScrollView: React.FC<React.PropsWithChildren<ScrollViewProps>> = ({
  children,
  className,
  onReachBottom
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onReachBottom) return;
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onReachBottom?.call(this, entry);
      })
    })
    observer.observe(observerRef.current!);
    return () => {
      observer.disconnect()
    }
  }, [onReachBottom])

  return (
    <ScrollContext.Provider value={{ scrollContainerRef }}>
      <div
        ref={scrollContainerRef}
        className={`flex flex-col bg-gray-50 h-full overflow-y-scroll overscroll-contain ${className}`}
      >
        {children}
        <div className="h-1" ref={observerRef}></div>
      </div>
    </ScrollContext.Provider>
  );
};
