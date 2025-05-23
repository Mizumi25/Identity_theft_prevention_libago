'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Wifi, 
  Smartphone,
  Settings,
  Zap,
  Target,
  Bell
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Resources = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const toolkitRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLElement>(null);
  const watchlistRef = useRef<HTMLElement>(null);

  // Memoize static arrays to prevent unnecessary re-renders
  const resources = useMemo(() => [
    { title: 'Identity Protection Guide', icon: Shield, color: 'bg-blue-600' },
    { title: 'Secure Password Handbook', icon: Lock, color: 'bg-green-600' },
    { title: '2FA Setup Manual', icon: Key, color: 'bg-purple-600' },
    { title: 'Privacy Best Practices', icon: Eye, color: 'bg-red-600' },
    { title: 'Digital Security Toolkit', icon: Settings, color: 'bg-yellow-600' },
    { title: 'Fraud Prevention Tips', icon: AlertTriangle, color: 'bg-orange-600' }
  ], []);

  const tools = useMemo(() => [
    { name: 'VPN Service', icon: Wifi, description: 'Secure your connection' },
    { name: 'Password Manager', icon: Lock, description: 'Store passwords safely' },
    { name: '2FA Authenticator', icon: Smartphone, description: 'Two-factor authentication' },
    { name: 'Identity Monitor', icon: Eye, description: 'Track your data' }
  ], []);

  const alerts = useMemo(() => [
    'New phishing campaign targeting banking customers',
    'Data breach affects 2.5M users - check your accounts',
    'Social engineering scam using AI voice cloning',
    'Cryptocurrency wallet vulnerabilities discovered',
    'Identity theft reports increase 25% this quarter'
  ], []);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero - Library of Defense Animation
      const books = gsap.utils.toArray('.book-spine') as Element[];

      
      // Initial bookshelf parallax setup
      gsap.set('.bookshelf-container', { rotationY: -15, transformPerspective: 1000 });
      gsap.set(books, { rotationY: 5, z: 0 });
      
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to('.bookshelf-container', {
            x: -progress * 300,
            rotationY: -15 + progress * 30,
            duration: 0.3
          });
          
          // Animate individual books
          books.forEach((book, i) => {
            const delay = i * 0.1;
            const bookProgress = Math.max(0, progress - delay);
            gsap.to(book as Element, {
              z: bookProgress * 50,
              rotationY: 5 + bookProgress * 10,
              duration: 0.3
            });
          });
        }
      });

      // Book pull-out animation
      ScrollTrigger.create({
        trigger: '.hero-content',
        start: 'center center',
        end: 'bottom center',
        scrub: 2,
        onUpdate: (self) => {
          if (self.progress > 0.5) {
            gsap.to('.featured-book', {
              z: 200,
              rotationY: 25,
              scale: 1.2,
              x: 100,
              duration: 1
            });
          }
        }
      });

      // Digital Toolkit Animation
      const toolIcons = gsap.utils.toArray('.tool-icon') as Element[];
      
      ScrollTrigger.create({
        trigger: toolkitRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          toolIcons.forEach((icon, i) => {
            gsap.fromTo(icon as Element, {
              y: -200,
              rotation: Math.random() * 360,
              scale: 0
            }, {
              y: 0,
              rotation: 0,
              scale: 1,
              delay: i * 0.2,
              duration: 1.2,
              ease: 'bounce.out'
            });
          });
        }
      });

      // Tool morphing animation
      ScrollTrigger.create({
        trigger: '.toolkit-content',
        start: 'center center',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to('.tool-demo', {
            scale: 1 + progress * 0.3,
            rotation: progress * 15,
            duration: 0.3
          });
        }
      });

      // Secure vs Insecure Split Animation
      const leftSide = comparisonRef.current?.querySelector('.insecure-side') as HTMLElement;
      const rightSide = comparisonRef.current?.querySelector('.secure-side') as HTMLElement;
      
      if (leftSide && rightSide) {
        ScrollTrigger.create({
          trigger: comparisonRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Transition effect
            gsap.to(leftSide, {
              x: -progress * 100,
              opacity: 1 - progress * 0.5,
              filter: `blur(${progress * 5}px)`,
              duration: 0.3
            });
            
            gsap.to(rightSide, {
              x: progress * 100,
              opacity: 0.5 + progress * 0.5,
              filter: `blur(${(1 - progress) * 5}px)`,
              duration: 0.3
            });
          }
        });
      }
      
      // Continuous ticker animation
      gsap.to('.ticker-content', {
        x: '-100%',
        duration: 20,
        ease: 'none',
        repeat: -1
      });

      // Radar animation
      gsap.to('.radar-sweep', {
        rotation: 360,
        duration: 3,
        ease: 'none',
        repeat: -1
      });

      // Scroll-triggered radar pings
      ScrollTrigger.create({
        trigger: watchlistRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (Math.floor(progress * 10) % 2 === 0) {
            gsap.to('.radar-ping', {
              scale: 1.5,
              opacity: 0.8,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        }
      });

    }, containerRef.current); // Fixed: Pass the actual HTMLElement, not null

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-gray-900 text-white overflow-hidden">
      {/* Hero Section - Library of Defense */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900"></div>
        
        {/* 3D Bookshelf */}
        <div className="bookshelf-container absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-6xl h-96 perspective-1000">
            {resources.map((resource, index) => (
              <div key={index} className="book-spine absolute h-80 w-12 transform-gpu"
                   style={{ 
                     left: `${index * 120 + 100}px`,
                     transform: `translateZ(${index * 10}px)` 
                   }}>
                <div className={`h-full w-full ${resource.color} rounded-r-lg shadow-2xl border-l-4 border-white border-opacity-20 flex items-center justify-center transform rotate-90 origin-center`}>
                  <resource.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
            
            {/* Featured Book */}
            <div className="featured-book absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-2xl transform-gpu">
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <Shield className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-lg font-bold text-white">Identity Protection Master Guide</h3>
                </div>
                <div className="text-sm text-white opacity-80">
                  Complete Defense Strategies
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-content relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Defense Arsenal
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Comprehensive resources and tools to protect your digital identity
          </p>
        </div>
      </section>

      {/* Digital Toolkit Section */}
      <section ref={toolkitRef} className="relative min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="toolkit-content container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-white">Digital Toolkit</h2>
            <p className="text-xl text-gray-400">Essential tools for complete protection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <div key={index} className="tool-icon relative">
                <div className="tool-demo bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-center transform-gpu hover:scale-105 transition-transform duration-300">
                  <tool.icon className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-gray-200">{tool.description}</p>
                  
                  {/* Animated Demo Elements */}
                  <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secure vs Insecure Comparison */}
      <section ref={comparisonRef} className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-gray-900 to-green-900"></div>
        
        <div className="container mx-auto px-6 h-full flex items-center">
          <div className="w-full grid grid-cols-2 gap-0 h-96">
            {/* Insecure Side */}
            <div className="insecure-side bg-red-900 bg-opacity-50 p-8 flex flex-col justify-center items-center rounded-l-2xl">
              <XCircle className="w-16 h-16 text-red-400 mb-6" />
              <h3 className="text-3xl font-bold text-red-300 mb-6">Insecure Practices</h3>
              <div className="space-y-4 text-center">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-red-200">password123</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-red-200">Sticky note passwords</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-red-200">Public WiFi banking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-red-200">No backup codes</span>
                </div>
              </div>
            </div>

            {/* Secure Side */}
            <div className="secure-side bg-green-900 bg-opacity-50 p-8 flex flex-col justify-center items-center rounded-r-2xl">
              <CheckCircle className="w-16 h-16 text-green-400 mb-6" />
              <h3 className="text-3xl font-bold text-green-300 mb-6">Secure Practices</h3>
              <div className="space-y-4 text-center">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-green-200">Strong unique passwords</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-green-200">2FA enabled</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-green-200">Biometric locks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-green-200">Regular monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-1 h-96 bg-gradient-to-b from-transparent via-white to-transparent transform -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
        </div>
      </section>

      {/* Watchlist Updates Section */}
      <section ref={watchlistRef} className="relative min-h-screen bg-black py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-white">Threat Watchlist</h2>
            <p className="text-xl text-gray-400">Real-time security alerts and updates</p>
          </div>

          {/* Radar Display */}
          <div className="relative w-80 h-80 mx-auto mb-16">
            <div className="absolute inset-0 border-2 border-green-400 rounded-full opacity-30"></div>
            <div className="absolute inset-4 border border-green-400 rounded-full opacity-20"></div>
            <div className="absolute inset-8 border border-green-400 rounded-full opacity-10"></div>
            
            {/* Radar Sweep */}
            <div className="radar-sweep absolute inset-0 transform-gpu">
              <div className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-green-400 to-transparent transform -translate-y-1/2 origin-left"></div>
            </div>

            {/* Radar Pings */}
            <div className="radar-ping absolute top-20 right-24 w-3 h-3 bg-red-500 rounded-full transform-gpu"></div>
            <div className="radar-ping absolute bottom-16 left-20 w-3 h-3 bg-yellow-500 rounded-full transform-gpu"></div>
            <div className="radar-ping absolute top-32 left-32 w-3 h-3 bg-orange-500 rounded-full transform-gpu"></div>

            {/* Center Dot */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Ticker Tape */}
          <div className="relative bg-gray-800 py-4 rounded-lg overflow-hidden">
            <div className="ticker-content flex items-center space-x-8 whitespace-nowrap">
              {[...alerts, ...alerts].map((alert, index) => (
                <div key={index} className="ticker-item flex items-center space-x-4 text-red-300">
                  <Bell className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm">{alert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <Target className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Stay Vigilant</h3>
              <p className="text-gray-400">Monitor your accounts regularly for suspicious activity</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Act Quickly</h3>
              <p className="text-gray-400">Report any suspicious activity immediately</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <Shield className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Stay Protected</h3>
              <p className="text-gray-400">Keep your security measures up to date</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;