import { useEffect } from "react";

// components/DevInsetsRestorer.tsx
const DevInsetsRestorer = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    const topInset = document.documentElement.style.getPropertyValue('--sat')

    const restoreInsets = () => {
      if (topInset) {
        document.documentElement.style.setProperty('--sat', `${topInset}px`);
      }
    };
    // MutationObserver로 style 태그 변경 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && 
            mutation.target.nodeName === 'HEAD') {
          restoreInsets();
        }
      });
    });

    observer.observe(document.head, { 
      childList: true,
      subtree: true 
    });

    return () => observer.disconnect();
  }, []);

  return null;
  
};

export default DevInsetsRestorer;