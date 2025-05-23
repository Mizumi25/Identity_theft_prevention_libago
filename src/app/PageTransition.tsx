'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

const PIXEL_ROWS = 10;
const PIXEL_COLS = 20;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayLocation, setDisplayLocation] = useState(pathname);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const squares = Array.from(grid.children) as HTMLDivElement[];

    const timeline = gsap.timeline({
      onComplete: () => setDisplayLocation(pathname),
    });

    // Fade-in animation in random pixel sequence
    timeline.to(squares, {
      opacity: 1,
      duration: 0.4,
      stagger: {
        each: 0.01,
        from: 'random',
      },
      ease: 'power2.out',
    });

    // Hold the screen for dramatic effect
    timeline.to({}, { duration: 0.4 });

    // Fade-out animation in reverse order
    timeline.to(squares, {
      opacity: 0,
      duration: 0.4,
      stagger: {
        each: 0.01,
        from: 'end',
      },
      ease: 'power2.in',
    });
  }, [pathname]);

  const renderPixelGrid = () => {
    const pixels = [];
    for (let row = 0; row < PIXEL_ROWS; row++) {
      for (let col = 0; col < PIXEL_COLS; col++) {
        pixels.push(
          <div
            key={`pixel-${row}-${col}`}
            className="w-[5vw] h-[10vh] bg-black opacity-0 transition-opacity duration-200"
          ></div>
        );
      }
    }
    return pixels;
  };

  return (
    <>
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        <div
          ref={gridRef}
          className="w-full h-full grid grid-cols-20 grid-rows-10"
          style={{ display: 'grid', gridTemplateColumns: `repeat(${PIXEL_COLS}, 1fr)`, gridTemplateRows: `repeat(${PIXEL_ROWS}, 1fr)` }}
        >
          {renderPixelGrid()}
        </div>
      </div>

      <div>{displayLocation === pathname && children}</div>
    </>
  );
}
