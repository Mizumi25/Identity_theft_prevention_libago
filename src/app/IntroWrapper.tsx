


'use client';

import React, { useState, useEffect } from 'react';
import IntroAnimation from './IntroAnimation';

const IntroWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showIntro, setShowIntro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is a fresh page load (not navigation)
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const isReload = navigationEntries.length > 0 && 
      (navigationEntries[0].type === 'reload' || navigationEntries[0].type === 'navigate');

    // Also check if there's no previous page in session storage (fresh load indicator)
    const hasShownIntro = sessionStorage.getItem('introShown');
    
    if (isReload && !hasShownIntro) {
      setShowIntro(true);
      sessionStorage.setItem('introShown', 'true');
    }
    
    setIsLoading(false);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Don't render anything until we've checked
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      {children}
    </>
  );
};

export default IntroWrapper;