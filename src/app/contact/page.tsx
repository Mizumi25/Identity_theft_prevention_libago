



'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Shield, MapPin, Lock, Send, User, Mail, MessageSquare, Globe, AlertTriangle } from 'lucide-react';

const ContactPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const mapRef = useRef(null);
  const messagesRef = useRef(null);
  const [formProgress, setFormProgress] = useState(0);
  const [mapProgress, setMapProgress] = useState(0);
  const [messageProgress, setMessageProgress] = useState(0);

  // Mock data for attack locations
  const attackLocations = [
    { id: 1, x: 15, y: 25, country: 'Russia', attacks: 1247 },
    { id: 2, x: 45, y: 35, country: 'China', attacks: 892 },
    { id: 3, x: 25, y: 60, country: 'Nigeria', attacks: 634 },
    { id: 4, x: 70, y: 45, country: 'Romania', attacks: 423 },
    { id: 5, x: 35, y: 75, country: 'Brazil', attacks: 318 }
  ];

  // Mock encrypted messages
  const encryptedMessages = [
    { 
      id: 1, 
      encrypted: 'X3D8K9L2M5N7P1Q4R6S9T2U5V8W1X4Y7Z0A3B6C9D2E5F8G1H4I7J0K3L6M9N2O5P8Q1R4S7T0U3V6W9X2Y5Z8',
      decrypted: 'Never share your SSN over unsecured channels',
      tip: 'Identity Protection Tip #1'
    },
    { 
      id: 2, 
      encrypted: 'B7C4D1E8F5G2H9I6J3K0L7M4N1O8P5Q2R9S6T3U0V7W4X1Y8Z5A2B9C6D3E0F7G4H1I8J5K2L9M6N3O0P7Q4R1S8T5U2V9W6',
      decrypted: 'Use two-factor authentication on all financial accounts',
      tip: 'Identity Protection Tip #2'
    },
    { 
      id: 3, 
      encrypted: 'Z9Y6X3W0V7U4T1S8R5Q2P9O6N3M0L7K4J1I8H5G2F9E6D3C0B7A4Z1Y8X5W2V9U6T3S0R7Q4P1O8N5M2L9K6J3I0H7G4F1E8D5C2',
      decrypted: 'Monitor your credit reports monthly for suspicious activity',
      tip: 'Identity Protection Tip #3'
    }
  ];

  useEffect(() => {
    // Simulate GSAP ScrollTrigger functionality
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Hero section progress
      const heroTop = heroRef.current?.offsetTop || 0;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const heroProgress = Math.max(0, Math.min(1, (scrollY - heroTop + windowHeight) / (heroHeight + windowHeight)));
      setFormProgress(heroProgress);
      
      // Map section progress
      const mapTop = mapRef.current?.offsetTop || 0;
      const mapHeight = mapRef.current?.offsetHeight || 0;
      const mapScrollProgress = Math.max(0, Math.min(1, (scrollY - mapTop + windowHeight) / (mapHeight + windowHeight)));
      setMapProgress(mapScrollProgress);
      
      // Messages section progress
      const messagesTop = messagesRef.current?.offsetTop || 0;
      const messagesHeight = messagesRef.current?.offsetHeight || 0;
      const messagesScrollProgress = Math.max(0, Math.min(1, (scrollY - messagesTop + windowHeight) / (messagesHeight + windowHeight)));
      setMessageProgress(messagesScrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Code lines animation for hero
  const codeLines = [
    'const identity = new SecureForm();',
    'identity.encrypt(userdata);',
    'identity.validate(credentials);',
    'identity.render(holographic);'
  ];

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden">
      {/* Hero Section - Glitch Glass Form */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        
        {/* Animated Code Background */}
        <div className="absolute left-0 top-0 w-full h-full opacity-20 font-mono text-sm">
          {codeLines.map((line, index) => (
            <div
              key={index}
              className="absolute text-green-400"
              style={{
                top: `${20 + index * 15}%`,
                left: `${10 + index * 5}%`,
                transform: `translateY(${(1 - formProgress) * 100}px)`,
                opacity: formProgress * 0.6,
                transition: 'all 0.3s ease-out'
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Glitch Glass Form */}
        <div 
          className="relative z-10 w-full max-w-lg"
          style={{
            transform: `translateY(${(1 - formProgress) * 50}px) scale(${0.8 + formProgress * 0.2})`,
            opacity: formProgress,
            transition: 'all 0.6s ease-out'
          }}
        >
          <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-8 shadow-2xl">
            {/* Holographic Glow Effect */}
            <div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl"
              style={{
                opacity: formProgress * 0.3,
                transform: `scale(${1 + formProgress * 0.1})`
              }}
            ></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Shield className="w-8 h-8 text-blue-400" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Secure Contact
                </h1>
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div 
                  className="relative"
                  style={{
                    opacity: formProgress > 0.3 ? 1 : 0,
                    transform: `translateX(${formProgress > 0.3 ? 0 : -20}px)`,
                    transition: 'all 0.4s ease-out'
                  }}
                >
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div 
                  className="relative"
                  style={{
                    opacity: formProgress > 0.5 ? 1 : 0,
                    transform: `translateX(${formProgress > 0.5 ? 0 : -20}px)`,
                    transition: 'all 0.4s ease-out'
                  }}
                >
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div 
                  className="relative"
                  style={{
                    opacity: formProgress > 0.7 ? 1 : 0,
                    transform: `translateX(${formProgress > 0.7 ? 0 : -20}px)`,
                    transition: 'all 0.4s ease-out'
                  }}
                >
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  style={{
                    opacity: formProgress > 0.8 ? 1 : 0,
                    transform: `translateY(${formProgress > 0.8 ? 0 : 20}px) scale(${formProgress > 0.8 ? 1 : 0.9})`,
                    transition: 'all 0.4s ease-out'
                  }}
                >
                  <Send className="w-5 h-5" />
                  Send Secure Message
                </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Attack Map */}
      <section ref={mapRef} className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Global Threat Intelligence
            </h2>
            <p className="text-gray-400 text-lg">
              Real-time identity theft attack origins detected worldwide
            </p>
          </div>

          {/* World Map Container */}
          <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
              {/* Simplified World Map SVG */}
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-40">
                <path
                  d="M150,200 Q200,180 250,200 L300,220 Q350,200 400,210 L450,200 Q500,190 550,200 L600,210 Q650,200 700,220 L750,200 Q800,190 850,200"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M100,250 Q200,230 300,250 L400,270 Q500,250 600,260 L700,250 Q800,240 900,250"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              {/* Attack Location Pins */}
              {attackLocations.map((location, index) => (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    opacity: mapProgress > (index * 0.15) ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${mapProgress > (index * 0.15) ? 1 : 0})`,
                    transition: 'all 0.6s ease-out'
                  }}
                >
                  {/* Glowing Pin */}
                  <div className="relative">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
                    
                    {/* Attack Count Tooltip */}
                    <div 
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                      style={{
                        opacity: mapProgress > (index * 0.15 + 0.3) ? 1 : 0,
                        transform: `translateX(-50%) translateY(${mapProgress > (index * 0.15 + 0.3) ? 0 : 10}px)`,
                        transition: 'all 0.4s ease-out'
                      }}
                    >
                      {location.country}: {location.attacks} attacks
                    </div>
                  </div>
                </div>
              ))}

              {/* Radar Sweep Effect */}
              <div 
                className="absolute inset-0 bg-gradient-conic from-transparent via-blue-500 to-transparent opacity-20 rounded-full"
                style={{
                  opacity: mapProgress * 0.3,
                  transform: `rotate(${mapProgress * 360}deg)`,
                  transition: 'all 0.1s linear'
                }}
              ></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {attackLocations.map((location, index) => (
                <div
                  key={location.id}
                  className="bg-gray-800 rounded-lg p-4 border border-red-500 border-opacity-30"
                  style={{
                    opacity: mapProgress > (index * 0.1 + 0.5) ? 1 : 0,
                    transform: `translateY(${mapProgress > (index * 0.1 + 0.5) ? 0 : 20}px)`,
                    transition: 'all 0.4s ease-out'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-semibold text-white">{location.country}</span>
                  </div>
                  <div className="text-red-400 font-bold text-lg">{location.attacks}</div>
                  <div className="text-gray-400 text-xs">Attacks Detected</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Encrypted Messages */}
      <section ref={messagesRef} className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Security Intelligence Feed
            </h2>
            <p className="text-gray-400 text-lg">
              Decrypting the latest identity protection insights
            </p>
          </div>

          <div className="space-y-8">
            {encryptedMessages.map((message, index) => (
              <div
                key={message.id}
                className="relative"
                style={{
                  opacity: messageProgress > (index * 0.2) ? 1 : 0,
                  transform: `translateY(${messageProgress > (index * 0.2) ? 0 : 50}px)`,
                  transition: 'all 0.6s ease-out'
                }}
              >
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 relative overflow-hidden">
                  {/* Cipher Animation Background */}
                  <div className="absolute inset-0 opacity-10">
                    <div 
                      className="font-mono text-xs text-green-400 whitespace-pre-wrap break-all leading-relaxed"
                      style={{
                        opacity: messageProgress > (index * 0.2 + 0.1) ? (messageProgress > (index * 0.2 + 0.3) ? 0.1 : 0.8) : 0,
                        transition: 'opacity 0.8s ease-out'
                      }}
                    >
                      {message.encrypted}
                    </div>
                  </div>

                  {/* Decrypted Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock 
                        className="w-6 h-6 text-green-400"
                        style={{
                          opacity: messageProgress > (index * 0.2 + 0.3) ? 1 : 0,
                          transform: `rotate(${messageProgress > (index * 0.2 + 0.3) ? 0 : 180}deg)`,
                          transition: 'all 0.6s ease-out'
                        }}
                      />
                      <span 
                        className="text-green-400 font-semibold"
                        style={{
                          opacity: messageProgress > (index * 0.2 + 0.3) ? 1 : 0,
                          transition: 'opacity 0.6s ease-out'
                        }}
                      >
                        {message.tip}
                      </span>
                    </div>
                    
                    <p 
                      className="text-white text-lg font-medium"
                      style={{
                        opacity: messageProgress > (index * 0.2 + 0.4) ? 1 : 0,
                        transform: `translateX(${messageProgress > (index * 0.2 + 0.4) ? 0 : -20}px)`,
                        transition: 'all 0.6s ease-out'
                      }}
                    >
                      {message.decrypted}
                    </p>
                  </div>

                  {/* Glitch Effect Border */}
                  <div 
                    className="absolute inset-0 border-2 border-green-400 rounded-xl opacity-50 animate-pulse"
                    style={{
                      opacity: messageProgress > (index * 0.2 + 0.2) ? 0.3 : 0,
                      transition: 'opacity 0.4s ease-out'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div 
            className="text-center mt-16"
            style={{
              opacity: messageProgress > 0.8 ? 1 : 0,
              transform: `translateY(${messageProgress > 0.8 ? 0 : 30}px)`,
              transition: 'all 0.6s ease-out'
            }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-full inline-flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Stay Protected. Stay Vigilant.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;