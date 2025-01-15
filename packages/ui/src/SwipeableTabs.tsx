"use client";

import React, {
  useState,
  useRef,
  useEffect,
  TouchEvent,
  MouseEvent,
} from "react";

export type Tab = {
  title: string;
  id: number;
  content: React.ReactNode;
};

export const SwipeableTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (tab: ((prev: number) => number) | number ) => void;
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const tabContainerRef = useRef(null);

  // 최소 스와이프 거리
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeTab < tabs.length - 1) {
      setActiveTab((prev: number) => prev + 1);
    }
    if (isRightSwipe && activeTab > 0) {
      setActiveTab((prev) => prev - 1);
    }
  };

  // 마우스 이벤트 처리
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const onMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.pageX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (!startX || !touchEnd) return;
    const distance = startX - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeTab < tabs.length - 1) {
      setActiveTab((prev) => prev + 1);
    }
    if (isRightSwipe && activeTab > 0) {
      setActiveTab((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* 탭 헤더 */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-4 text-sm font-medium text-center transition-colors duration-200
              ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* 탭 컨텐츠 */}
      <div
        ref={tabContainerRef}
        className="relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${activeTab * 100}%)`,
          }}
        >
          {tabs.map((tab) => (
            <div key={tab.id} className="w-full flex-shrink-0">
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
