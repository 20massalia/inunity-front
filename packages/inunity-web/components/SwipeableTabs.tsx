"use client";

import React, { useState, useRef, useEffect } from 'react';

const SwipeableTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [touchStart, setTouchStart] = useState<number|null>(null);
  const [touchEnd, setTouchEnd] = useState<number|null>(null);
  const tabContainerRef = useRef(null);

  // 샘플 탭 데이터
  const tabs = [
    { id: 0, title: '첫 번째 탭', content: '첫 번째 탭의 내용입니다.' },
    { id: 1, title: '두 번째 탭', content: '두 번째 탭의 내용입니다.' },
    { id: 2, title: '세 번째 탭', content: '세 번째 탭의 내용입니다.' },
  ];

  // 최소 스와이프 거리
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeTab < tabs.length - 1) {
      setActiveTab(prev => prev + 1);
    }
    if (isRightSwipe && activeTab > 0) {
      setActiveTab(prev => prev - 1);
    }
  };

  // 마우스 이벤트 처리
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
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
      setActiveTab(prev => prev + 1);
    }
    if (isRightSwipe && activeTab > 0) {
      setActiveTab(prev => prev - 1);
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
              ${activeTab === tab.id 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
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
            <div
              key={tab.id}
              className="w-full flex-shrink-0 p-4"
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwipeableTabs;