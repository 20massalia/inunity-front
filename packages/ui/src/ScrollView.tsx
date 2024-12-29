"use client";

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ScrollContext } from "./contexts/ScrollContext";

export type ScrollViewProps = {
  className?: string;
  spinner?: React.ReactNode;
  onRefresh?: () => void;
  onReachBottom?: (entry: IntersectionObserverEntry) => void;
};
export const ScrollView: React.FC<React.PropsWithChildren<ScrollViewProps>> = ({
  children,
  className,
  spinner,
  onRefresh,
  onReachBottom,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onReachBottom) return;
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onReachBottom?.call(this, entry);
      });
    });
    observer.observe(observerRef.current!);
    return () => {
      observer.disconnect();
    };
  }, [onReachBottom]);

  const [refreshing, setRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setStartY(event.touches[0].clientY);
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (!scrollContainerRef.current) return;
    const moveY = event.touches[0].clientY;
    const pullDistance = moveY - startY;

    if (pullDistance > 0) {
      event.stopPropagation();
      console.log(scrollContainerRef.current.scrollTop);
      if (pullDistance > 80 && !refreshing && scrollContainerRef.current.scrollTop <= 10) {
        scrollContainerRef.current.style.transform = "translate(0, 28px)";
        scrollContainerRef.current.style.transition = "0.3s";
        setRefreshing(true);
        onRefresh?.();
      }
    }
  }

  function handleTouchEnd() {
    if (refreshing) {
      setTimeout(() => {
        if (!scrollContainerRef.current) return;
        setRefreshing(false);
        scrollContainerRef.current.style.transform = "translate(0,0)";
      }, 1000);
    }
  }

  return (
    <ScrollContext.Provider value={{ scrollContainerRef }}>
      <div
        ref={scrollContainerRef}
        className={`flex flex-col h-full bg-gray-50  overflow-y-scroll overscroll-contain ${className}`}
        onTouchStart={onRefresh ? handleTouchStart : undefined}
        onTouchMove={onRefresh ? handleTouchMove : undefined}
        onTouchEnd={onRefresh ? handleTouchEnd : undefined}
      >
        {children}
        <div className="h-1" ref={observerRef}></div>
      </div>
    </ScrollContext.Provider>
  );
};
