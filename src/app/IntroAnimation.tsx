'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Eye, Zap, Lock } from 'lucide-react';

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<'scanning' | 'verification' | 'challenge' | 'complete'>('scanning');
  const [progress, setProgress] = useState(0);
  const [isRobot, setIsRobot] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [glitchText, setGlitchText] = useState('INITIALIZING...');

  const glitchTexts = useCallback(() => [
    'INITIALIZING...',
    'SCANNING BIOMETRICS...',
    'ANALYZING NEURAL PATTERNS...',
    'VERIFYING IDENTITY...',
    'CHECKING THREAT LEVEL...',
    'AUTHENTICATING USER...'
  ], []);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          if (stage === 'scanning') {
            setTimeout(() => setStage('verification'), 500);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Glitch text animation
    const textInterval = setInterval(() => {
      setGlitchText(glitchTexts()[Math.floor(Math.random() * glitchTexts().length)]);
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [stage, glitchTexts]);

  useEffect(() => {
    if (stage === 'verification') {
      setTimeout(() => {
        setStage('challenge');
        setShowChallenge(true);
      }, 1500);
    }
  }, [stage]);

  const handleRobotCheck = useCallback((robotStatus: boolean) => {
    setIsRobot(robotStatus);
    setTimeout(() => {
      setStage('complete');
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 1000);
  }, [onComplete]);

  if (stage === 'complete') {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-mono text-green-400 mb-4 animate-pulse">
            {isRobot ? 'ACCESS DENIED' : 'ACCESS GRANTED'}
          </div>
          <div className="text-xl text-white/60">
            {isRobot ? 'ROBOT DETECTED - SECURITY BREACH' : 'WELCOME TO MIZUMI DIGITAL'}
          </div>
          <div className="mt-8 w-64 h-1 bg-gray-800 mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-green-400 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white font-mono overflow-hidden">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {Math.random().toString(36).substring(7)}
          </div>
        ))}
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-pulse"></div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-cyan-400/30"
            style={{
              top: `${20 + (i * 15)}%`,
              animation: `scanline ${2 + i * 0.5}s linear infinite`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-4xl font-bold mb-2 text-cyan-400 tracking-wider">
            MIZUMI SECURITY PROTOCOL
          </div>
          <div className="text-lg text-white/60">
            ADVANCED IDENTITY VERIFICATION SYSTEM
          </div>
        </div>

        {/* Main Content */}
        {stage === 'scanning' && (
          <div className="text-center max-w-2xl">
            {/* Scanning Animation */}
            <div className="relative mb-8">
              <div className="w-64 h-64 mx-auto border-2 border-cyan-400/30 rounded-full relative">
                <div className="absolute inset-4 border border-cyan-400/20 rounded-full"></div>
                <div className="absolute inset-8 border border-cyan-400/10 rounded-full"></div>
                
                {/* Center Scanner */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Eye className="w-12 h-12 text-cyan-400 animate-pulse" />
                </div>
                
                {/* Rotating Scanner Line */}
                <div 
                  className="absolute top-1/2 left-1/2 origin-left w-32 h-px bg-gradient-to-r from-cyan-400 to-transparent"
                  style={{
                    transform: 'translateX(-50%) translateY(-0.5px)',
                    animation: 'rotate 2s linear infinite'
                  }}
                />
                
                {/* Corner Elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400"></div>
              </div>
            </div>

            {/* Status Text */}
            <div className="text-2xl mb-4 h-8">
              <span className="animate-pulse">{glitchText}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-96 h-2 bg-gray-800 mx-auto mb-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-cyan-400">{progress}% COMPLETE</div>
          </div>
        )}

        {stage === 'verification' && (
          <div className="text-center">
            <Shield className="w-24 h-24 text-green-400 mx-auto mb-6 animate-pulse" />
            <div className="text-3xl mb-4 text-green-400">BIOMETRIC SCAN COMPLETE</div>
            <div className="text-lg text-white/60">HUMAN SIGNATURE DETECTED</div>
            <div className="mt-6 flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-green-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {stage === 'challenge' && showChallenge && (
          <div className="text-center max-w-lg">
            <Lock className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <div className="text-3xl mb-8 text-yellow-400">FINAL VERIFICATION</div>
            
            <div className="bg-gray-900/50 p-8 rounded-lg border border-cyan-400/30 mb-8">
              <div className="text-xl mb-6 text-white">
                TO PROCEED, CONFIRM YOUR STATUS:
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleRobotCheck(false)}
                  className="w-full p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 group"
                >
                  <Zap className="w-6 h-6 group-hover:animate-pulse" />
                  <span className="text-lg font-semibold">I AM HUMAN</span>
                </button>
                
                <button
                  onClick={() => handleRobotCheck(true)}
                  className="w-full p-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 group"
                >
                  <Eye className="w-6 h-6 group-hover:animate-spin" />
                  <span className="text-lg font-semibold">I AM A ROBOT</span>
                </button>
              </div>
            </div>
            
            <div className="text-sm text-white/40">
              * This verification helps protect against automated threats
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex justify-between items-center text-sm text-white/40">
            <div>MIZUMI DIGITAL SECURITY v2.1.7</div>
            <div>ENCRYPTION: AES-256 | STATUS: ACTIVE</div>
            <div>{new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes rotate {
          from { transform: translateX(-50%) translateY(-0.5px) rotate(0deg); }
          to { transform: translateX(-50%) translateY(-0.5px) rotate(360deg); }
        }
        
        @keyframes scanline {
          0% { opacity: 0; transform: translateY(-10px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(10px); }
        }
        
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;