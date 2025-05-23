'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Mock data for reports
const reportData = [
  {
    id: 'RPT-001',
    title: 'Financial Account Breach',
    severity: 'CRITICAL',
    date: '2024-03-15',
    description: 'Unauthorized access detected on multiple financial accounts',
    details: 'Multiple login attempts from foreign IP addresses. Credit card transactions in suspicious locations.'
  },
  {
    id: 'RPT-002',
    title: 'Social Media Compromise',
    severity: 'HIGH',
    date: '2024-03-12',
    description: 'Identity impersonation across social platforms',
    details: 'Fake profiles created using stolen personal information. Messages sent to contacts requesting money.'
  },
  {
    id: 'RPT-003',
    title: 'Email Account Hijack',
    severity: 'MEDIUM',
    date: '2024-03-08',
    description: 'Email forwarding rules modified without authorization',
    details: 'All incoming emails redirected to unknown address. Password reset attempts on various services.'
  }
];

const terminalLines = [
  '> Scanning network for vulnerabilities...',
  '> Found 127 open ports',
  '> Attempting authentication bypass...',
  '> SUCCESS: Admin access granted',
  '> Extracting user database...',
  '> 50,000 records compromised',
  '> Initiating data exfiltration...',
  '> WARNING: Security breach detected',
  '> System lockdown initiated...',
  '> Connection terminated'
];

const recoveryStages = [
  { stage: 'Detection', status: 'complete', description: 'Breach identified and contained' },
  { stage: 'Assessment', status: 'complete', description: 'Damage evaluation completed' },
  { stage: 'Notification', status: 'complete', description: 'Authorities and users notified' },
  { stage: 'Recovery', status: 'progress', description: 'Restoring affected systems' },
  { stage: 'Prevention', status: 'pending', description: 'Implementing security measures' }
];

export default function ReportPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const magnifyingGlassRef = useRef(null);
  const filesRef = useRef(null);
  const terminalRef = useRef(null);
  const timelineRef = useRef(null);
  
  const [selectedReport, setSelectedReport] = useState(null);
  const [terminalText, setTerminalText] = useState('');
  const [isBreached, setIsBreached] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section - Zoom Investigation
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true
      }
    });

    tl1.to(magnifyingGlassRef.current, {
      scale: 15,
      rotation: 360,
      opacity: 0.3,
      duration: 1
    })
    .to('.desk-items', {
      scale: 0.5,
      opacity: 0,
      duration: 0.5
    }, 0)
    .to('.cyber-files', {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 0.8
    }, 0.3);

    // Case Files Animation
    gsap.set('.case-card', { 
      rotationX: -90, 
      opacity: 0, 
      y: 100,
      transformOrigin: 'center bottom'
    });

    ScrollTrigger.create({
      trigger: filesRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.case-card', {
          rotationX: 0,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        });
      }
    });

    // Terminal Breach Animation
    let terminalTl;
    ScrollTrigger.create({
      trigger: terminalRef.current,
      start: 'top 60%',
      onEnter: () => {
        terminalTl = gsap.timeline();
        let currentText = '';
        
        terminalLines.forEach((line, index) => {
          terminalTl.to({}, {
            duration: 0.5,
            onUpdate: function() {
              if (this.progress() === 1) {
                currentText += line + '\n';
                setTerminalText(currentText);
                
                if (index === 7) { // Breach detected line
                  setIsBreached(true);
                  gsap.to('.terminal-screen', {
                    backgroundColor: '#ff0000',
                    duration: 0.1,
                    yoyo: true,
                    repeat: 5
                  });
                }
              }
            }
          }).to({}, { duration: 0.3 });
        });
      }
    });

    // Recovery Timeline
    ScrollTrigger.create({
      trigger: timelineRef.current,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeStages = Math.floor(progress * recoveryStages.length);
        
        recoveryStages.forEach((stage, index) => {
          const element = document.querySelector(`[data-stage="${index}"]`);
          if (element) {
            if (index <= activeStages) {
              gsap.to(element, {
                backgroundColor: '#22c55e',
                color: '#000000',
                duration: 0.5
              });
            }
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleReportClick = (report) => {
    setSelectedReport(report);
    
    gsap.timeline()
      .to('.report-modal', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out'
      })
      .from('.modal-content', {
        y: 50,
        opacity: 0,
        duration: 0.3
      }, 0.2);
  };

  const closeModal = () => {
    gsap.to('.report-modal', {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => setSelectedReport(null)
    });
  };

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Hero Section - Detective's Desk */}
      <section ref={heroRef} className="h-screen relative bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="desk-items absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-8 opacity-70">
            <div className="w-16 h-24 bg-gray-700 rounded transform rotate-12"></div>
            <div className="w-20 h-16 bg-gray-600 rounded-lg"></div>
            <div className="w-12 h-20 bg-gray-800 rounded transform -rotate-6"></div>
            <div className="w-24 h-4 bg-gray-500 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
            <div className="w-20 h-8 bg-gray-600 rounded"></div>
          </div>
        </div>
        
        <div 
          ref={magnifyingGlassRef}
          className="w-32 h-32 border-4 border-gray-400 rounded-full relative cursor-pointer hover:border-white transition-colors"
        >
          <div className="absolute inset-4 border-2 border-gray-500 rounded-full"></div>
          <div className="absolute -bottom-6 -right-6 w-4 h-16 bg-gray-400 rounded-full transform rotate-45"></div>
        </div>

        <div className="cyber-files absolute inset-0 opacity-0 scale-2">
          <div className="h-full flex items-center justify-center">
            <div className="grid grid-cols-4 gap-4 transform-gpu">
              {[...Array(16)].map((_, i) => (
                <div 
                  key={i}
                  className="w-16 h-20 bg-gradient-to-b from-gray-700 to-gray-900 rounded border border-gray-500 transform hover:scale-110 transition-transform"
                  style={{ 
                    transform: `rotateY(${i * 15}deg) translateZ(${i * 10}px)`,
                    animation: `float ${2 + i * 0.1}s ease-in-out infinite alternate`
                  }}
                >
                  <div className="p-2 text-xs">RPT</div>
                  <div className="w-full h-1 bg-red-500 mt-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 tracking-wider">INVESTIGATION REPORTS</h1>
            <p className="text-gray-400">Scroll to enter the digital crime scene</p>
          </div>
        </div>
      </section>

      {/* Section 2 - Interactive Case Files */}
      <section ref={filesRef} className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-16 tracking-wider">
            <span className="border-b-2 border-red-500">CASE FILES</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reportData.map((report) => (
              <div 
                key={report.id}
                className="case-card bg-gray-800 border border-gray-600 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-all transform hover:scale-105"
                onClick={() => handleReportClick(report)}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-red-400 font-mono text-sm">{report.id}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    report.severity === 'CRITICAL' ? 'bg-red-600' :
                    report.severity === 'HIGH' ? 'bg-orange-600' : 'bg-yellow-600'
                  }`}>
                    {report.severity}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{report.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{report.description}</p>
                <div className="text-xs text-gray-500">{report.date}</div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-mono">
                    ANALYZE → 
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Data Breach Animation */}
      <section ref={terminalRef} className="min-h-screen bg-black py-20 flex items-center">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-16 tracking-wider text-red-500">
            LIVE BREACH SIMULATION
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className={`terminal-screen bg-gray-900 border-2 rounded-lg p-8 font-mono ${
              isBreached ? 'border-red-500 shadow-red-500/50 shadow-2xl' : 'border-gray-600'
            }`}>
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-gray-400">terminal@hackersim:~$</span>
              </div>
              
              <div className="h-96 overflow-hidden">
                <pre className={`text-sm leading-relaxed ${isBreached ? 'text-red-400' : 'text-green-400'}`}>
                  {terminalText}
                  <span className="animate-pulse">█</span>
                </pre>
              </div>
              
              {isBreached && (
                <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 font-bold">SECURITY BREACH DETECTED</span>
                  </div>
                  <p className="text-red-300 text-sm mt-2">
                    Unauthorized access to sensitive data. Immediate action required.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Recovery Timeline */}
      <section ref={timelineRef} className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-16 tracking-wider">
            RECOVERY PROTOCOL
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2"></div>
              
              {recoveryStages.map((stage, index) => (
                <div 
                  key={stage.stage}
                  data-stage={index}
                  className="relative z-10 bg-gray-800 border-2 border-gray-600 rounded-lg p-6 w-48 text-center transform hover:scale-105 transition-all"
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-600 rounded-full border-2 border-gray-800"></div>
                  
                  <h3 className="font-bold text-lg mb-2">{stage.stage}</h3>
                  <p className="text-sm text-gray-400 mb-3">{stage.description}</p>
                  
                  <div className={`text-xs px-2 py-1 rounded ${
                    stage.status === 'complete' ? 'bg-green-600' :
                    stage.status === 'progress' ? 'bg-yellow-600' : 'bg-gray-600'
                  }`}>
                    {stage.status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <div className="inline-block bg-gray-800 border border-gray-600 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">System Status</h3>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400">Recovery In Progress</span>
                  </div>
                  <div className="text-gray-400">|</div>
                  <div className="text-gray-400">ETA: 24:00:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Modal */}
      {selectedReport && (
        <div className="report-modal fixed inset-0 bg-black/80 flex items-center justify-center z-50 opacity-0 scale-75">
          <div className="modal-content bg-gray-900 border border-gray-600 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold">{selectedReport.title}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Report ID:</span>
                <span className="font-mono text-red-400">{selectedReport.id}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span>{selectedReport.date}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Severity:</span>
                <span className={`font-bold ${
                  selectedReport.severity === 'CRITICAL' ? 'text-red-400' :
                  selectedReport.severity === 'HIGH' ? 'text-orange-400' : 'text-yellow-400'
                }`}>
                  {selectedReport.severity}
                </span>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-2">Details</h4>
                <p className="text-gray-300 leading-relaxed">{selectedReport.details}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded transition-colors">
                  TAKE ACTION
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-10px); }
        }
        
        .terminal-screen {
          background: linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%);
        }
      `}</style>
    </div>
  );
}