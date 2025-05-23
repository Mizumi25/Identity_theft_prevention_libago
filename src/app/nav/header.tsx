'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Github, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';

const HackerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { 
      name: 'HOME', 
      image: 'https://picsum.photos/400/600?random=1',
      desc: 'Digital Fortress - Your secure digital identity sanctuary',
      path: '/'
    },
    { 
      name: 'REPORT', 
      image: 'https://picsum.photos/400/600?random=2',
      desc: 'Data Breach Analytics - Visual threat intelligence report',
      path: '/report'
    },
    { 
      name: 'TYPES', 
      image: 'https://picsum.photos/400/600?random=3',
      desc: 'Threat Taxonomy - Classification of digital predators',
      path: '/types'
    },
    { 
      name: 'ABOUT', 
      image: 'https://picsum.photos/400/600?random=4',
      desc: 'Mission Control - Digital guardians behind the firewall',
      path: '/about'
    },
    { 
      name: 'CONTACT', 
      image: 'https://picsum.photos/400/600?random=5',
      desc: 'Secure Channel - Encrypted communication portal',
      path: '/contact'
    },
    { 
      name: 'PREVENTION', 
      image: 'https://picsum.photos/400/600?random=6',
      desc: 'Defense Matrix - Advanced protection protocols',
      path: '/prevention'
    },
    { 
      name: 'RESOURCES', 
      image: 'https://picsum.photos/400/600?random=7',
      desc: 'Knowledge Vault - Classified intel and tools arsenal',
      path: '/resources'
    }
  ];

  const socialIcons = [
    { icon: Github, url: 'https://github.com' },
    { icon: Twitter, url: 'https://twitter.com' },
    { icon: Linkedin, url: 'https://linkedin.com' },
    { icon: Instagram, url: 'https://instagram.com' },
    { icon: Facebook, url: 'https://facebook.com' }
  ];

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    setDragStart({
      x: clientX || 0,
      y: clientY || 0
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    const currentX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    
    if (currentY !== undefined && currentX !== undefined) {
      const deltaY = currentY - dragStart.y;
      const rotationDelta = deltaY * 0.5;
      
      setRotation(prev => prev + rotationDelta);
      setDragStart({
        x: currentX,
        y: currentY
      });
    }
  }, [isDragging, dragStart.y]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const calculateItemPosition = (index: number) => {
    const angle = (index * (360 / menuItems.length)) + rotation;
    const radius = 140;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y, angle };
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string) => {
    // Navigate to the actual path
    window.location.href = path;
    setIsOpen(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const itemName = menuItems[selectedIndex]?.name || 'IMAGE';
    target.src = `https://via.placeholder.com/400x600/1a1a1a/00f5ff?text=${itemName}`;
  };

  return (
    <div className="relative">
      {/* Mizumi Logo - Japanese Style SVG */}
      <div className="fixed top-6 left-6 z-50">
        <svg width="120" height="40" viewBox="0 0 120 40" className="transition-all duration-300">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#00f5ff', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background circle */}
          <circle cx="20" cy="20" r="16" fill="none" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.3"/>
          
          {/* Japanese-inspired symbol */}
          <path d="M12 12 L20 8 L28 12 L20 32 Z" fill="url(#logoGradient)" opacity="0.8"/>
          <path d="M16 16 L24 16 M12 20 L28 20 M14 24 L26 24" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Text MIZUMI */}
          <text x="45" y="15" fontFamily="monospace" fontSize="12" fill="url(#logoGradient)" filter="url(#glow)">
            MIZUMI
          </text>
          <text x="45" y="28" fontFamily="monospace" fontSize="8" fill="#ffffff" opacity="0.7">
            水組 DIGITAL
          </text>
          
          {/* Decorative elements */}
          <circle cx="105" cy="10" r="2" fill="#00f5ff" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="110" cy="15" r="1.5" fill="#8b5cf6" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="115" cy="12" r="1" fill="#00f5ff" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      {/* Custom Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 p-3 hover:bg-white/10 transition-all duration-300 group rounded-lg"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="flex flex-col space-y-1.5">
              <div className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-cyan-400"></div>
              <div className="w-4 h-0.5 bg-white transition-all duration-300 group-hover:bg-cyan-400"></div>
              <div className="w-3 h-0.5 bg-white transition-all duration-300 group-hover:bg-cyan-400"></div>
            </div>
          )}
        </div>
      </button>

      {/* Floating Social Media Icons - Hidden when menu is open */}
      <div className={`fixed left-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 transition-all duration-500 ${
        isOpen ? 'z-30 opacity-0 pointer-events-none' : 'z-50 opacity-100'
      }`}>
        {socialIcons.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 transition-all duration-300 group hover:scale-110 rounded-lg"
              style={{
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <Icon className="w-5 h-5 text-white group-hover:text-cyan-400 transition-colors duration-300" />
            </a>
          );
        })}
      </div>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-700 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Background with moving glassmorphism blur */}
        <div className="absolute inset-0 bg-black/90">
          {/* Moving blur effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
                 style={{
                   left: '10%',
                   top: '20%',
                   animation: 'float 6s ease-in-out infinite'
                 }} />
            <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                 style={{
                   right: '15%',
                   bottom: '25%',
                   animation: 'float 8s ease-in-out infinite reverse'
                 }} />
            <div className="absolute w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
                 style={{
                   left: '60%',
                   top: '60%',
                   animation: 'float 10s ease-in-out infinite'
                 }} />
          </div>
          
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-black/50 via-gray-900/30 to-black/70" />
        </div>

        {/* Menu Content */}
        <div ref={menuRef} className="relative h-full flex">
          {/* Left Side - Image Gallery */}
          <div className="w-1/2 h-full flex items-center justify-center p-8">
            <div className="relative w-80 h-96 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl" />
              <div className="relative w-full h-full bg-black/40 backdrop-blur-md rounded-lg overflow-hidden">
                <Image 
                  src={menuItems[selectedIndex]?.image || menuItems[0].image}
                  alt={menuItems[selectedIndex]?.name || menuItems[0].name}
                  fill
                  className="object-cover opacity-80"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 font-mono tracking-wider">
                    {menuItems[selectedIndex]?.name || menuItems[0].name}
                  </h3>
                  <p className="text-cyan-400 text-sm font-light">
                    {menuItems[selectedIndex]?.desc || menuItems[0].desc}
                  </p>
                </div>
                
                {/* Glitch effect overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="w-full h-1 bg-cyan-400 animate-pulse" style={{top: '20%'}} />
                  <div className="w-full h-px bg-red-400 animate-pulse" style={{top: '40%'}} />
                  <div className="w-full h-px bg-green-400 animate-pulse" style={{top: '80%'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Ferris Wheel Navigation */}
          <div className="w-1/2 h-full relative overflow-hidden">
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
              <div 
                ref={carouselRef}
                className="relative w-80 h-80 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                style={{ userSelect: 'none' }}
              >
                {/* Ferris wheel structure */}
                <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
                <div className="absolute inset-4 border border-white/10 rounded-full" />
                
                {/* Center hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-500/30 border-2 border-cyan-400 rounded-full backdrop-blur-sm" />
                
                {/* Menu items as ferris wheel cars */}
                {menuItems.map((item, index) => {
                  const { x, y } = calculateItemPosition(index);
                  const isSelected = selectedIndex === index;
                  
                  return (
                    <div
                      key={item.name}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        isSelected ? 'scale-110 z-10' : 'scale-100'
                      }`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <div className={`relative group cursor-pointer ${
                        isSelected ? 'animate-pulse' : ''
                      }`}>
                        {/* Text container */}
                        <div className={`px-4 py-2 bg-gradient-to-br from-gray-900/80 to-black/90 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                          isSelected 
                            ? 'shadow-lg shadow-cyan-400/30' 
                            : 'hover:shadow-lg hover:shadow-purple-400/30'
                        }`}>
                          <span className={`text-sm font-mono font-bold transition-colors duration-300 whitespace-nowrap ${
                            isSelected ? 'text-cyan-400' : 'text-white group-hover:text-purple-400'
                          }`}>
                            {item.name}
                          </span>
                          
                          {/* Glitch lines for selected item */}
                          {isSelected && (
                            <>
                              <div className="absolute top-0 left-0 w-full h-px bg-cyan-400 animate-pulse" />
                              <div className="absolute bottom-0 left-0 w-full h-px bg-cyan-400 animate-pulse" />
                            </>
                          )}
                        </div>
                        
                        {/* Connection line to center */}
                        <div 
                          className={`absolute top-1/2 left-1/2 origin-left h-px transition-colors duration-300 ${
                            isSelected ? 'bg-cyan-400/60' : 'bg-white/20'
                          }`}
                          style={{
                            width: '140px',
                            transform: `translateY(-0.5px) rotate(${Math.atan2(-y, -x) * 180 / Math.PI}deg)`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center justify-between text-white/60 text-sm font-mono">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>SECURE CONNECTION</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span>IDENTITY SHIELD ACTIVE</span>
              </div>
            </div>
            <div className="text-cyan-400">
              [{selectedIndex + 1}/{menuItems.length}] {menuItems[selectedIndex]?.name}
            </div>
          </div>
        </div>

        {/* Particle effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        
        .cursor-grab {
          cursor: grab;
        }
        
        .cursor-grab:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default HackerMenu;