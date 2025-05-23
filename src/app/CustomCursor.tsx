


'use client';

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const glitch = glitchRef.current;

    if (!cursor || !dot || !ring || !glitch) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let moveTimeout: NodeJS.Timeout;

    // GSAP timeline for continuous animations
    const tl = gsap.timeline({ repeat: -1 });
    
    // Breathing animation for the ring
    tl.to(ring, {
      scale: 1.2,
      duration: 2,
      ease: "power2.inOut"
    })
    .to(ring, {
      scale: 1,
      duration: 2,
      ease: "power2.inOut"
    });

    // Glitch animation
    const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    glitchTl.to(glitch, {
      opacity: 1,
      duration: 0.1,
      ease: "none"
    })
    .to(glitch, {
      x: 2,
      duration: 0.05,
      ease: "none"
    })
    .to(glitch, {
      x: -2,
      duration: 0.05,
      ease: "none"
    })
    .to(glitch, {
      x: 0,
      opacity: 0,
      duration: 0.1,
      ease: "none"
    });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;

      if (clientX !== undefined && clientY !== undefined) {
        mouseX = clientX;
        mouseY = clientY;

        // Animate cursor position
        gsap.to(cursor, {
          x: mouseX - 25,
          y: mouseY - 25,
          duration: 0.3,
          ease: "power3.out"
        });

        // Animate dot with slight delay for trail effect
        gsap.to(dot, {
          x: mouseX - 3,
          y: mouseY - 3,
          duration: 0.1,
          ease: "power2.out"
        });

        // Movement detection for scaling effect
        if (!isMoving) {
          isMoving = true;
          gsap.to(ring, {
            scale: 1.5,
            duration: 0.2,
            ease: "power2.out"
          });
        }

        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
          isMoving = false;
          gsap.to(ring, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }, 150);
      }
    };

    // Hover effects for interactive elements
    const handleMouseEnter = () => {
      gsap.to(ring, {
        scale: 2,
        borderWidth: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(dot, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Activate glitch effect on hover
      gsap.to(glitch, {
        opacity: 0.3,
        duration: 0.1
      });
    };

    const handleMouseLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderWidth: 2,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(glitch, {
        opacity: 0,
        duration: 0.2
      });
    };

    // Click effect
    const handleClick = () => {
      gsap.to(ring, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });

      // Ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'fixed pointer-events-none rounded-full border-2 border-white opacity-50';
      ripple.style.left = `${mouseX - 10}px`;
      ripple.style.top = `${mouseY - 10}px`;
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.zIndex = '9998';
      document.body.appendChild(ripple);

      gsap.to(ripple, {
        scale: 3,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          document.body.removeChild(ripple);
        }
      });
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleMouseMove, { passive: true });
    document.addEventListener('touchstart', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchstart', handleMouseMove);
      document.removeEventListener('click', handleClick);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      tl.kill();
      glitchTl.kill();
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <>
      {/* Main cursor container */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ width: '50px', height: '50px' }}
      >
        {/* Outer ring */}
        <div
          ref={cursorRingRef}
          className="absolute inset-0 rounded-full border-2 border-white"
          style={{
            width: '50px',
            height: '50px',
          }}
        />
        
        {/* Glitch effect ring */}
        <div
          ref={glitchRef}
          className="absolute inset-0 rounded-full border-2 border-white opacity-0"
          style={{
            width: '50px',
            height: '50px',
            filter: 'blur(1px)',
          }}
        />

        {/* Scanner lines */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-px bg-white opacity-30 animate-pulse" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-white opacity-20 animate-pulse" />
        </div>

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white opacity-60" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-white opacity-60" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-white opacity-60" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white opacity-60" />
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{ width: '6px', height: '6px' }}
      >
        <div className="w-full h-full bg-white rounded-full shadow-lg" />
      </div>

      {/* CSS for additional effects */}
      <style jsx>{`
        @keyframes scanner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .scanner-line {
          animation: scanner 4s linear infinite;
        }

        /* Hide cursor on touch devices when not needed */
        @media (hover: none) and (pointer: coarse) {
          .cursor-container {
            opacity: 0.7;
          }
        }

        /* Ensure cursor is visible on all backgrounds */
        body {
          cursor: none !important;
        }
        
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;