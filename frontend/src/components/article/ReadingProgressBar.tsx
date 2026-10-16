import React, { useEffect, useState } from 'react';

/**
 * ReadingProgressBar:
 * Tracks user scroll progress through the article and displays a subtle top progress bar.
 */
export const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const current = (window.scrollY / totalHeight) * 100;
            setProgress(Math.min(100, Math.max(0, current)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (progress <= 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-blue-600 dark:bg-blue-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
