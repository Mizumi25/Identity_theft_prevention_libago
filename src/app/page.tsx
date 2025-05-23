'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const statsCounterRef = useRef<HTMLDivElement[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    
    // Video scroll control
    if (video) {
      video.pause();
      
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          if (video.duration) {
            video.currentTime = video.duration * progress;
          }
        }
      });
    }

    // Matrix-style text animation
    const createMatrixEffect = () => {
      const canvas = document.getElementById('matrix-bg') as HTMLCanvasElement;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
      const columns = canvas.width / 20;
      const drops = Array(Math.floor(columns)).fill(1);
      
      const drawMatrix = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#6b7280';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * 20, drops[i] * 20);
          
          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };
      
      const matrixInterval = setInterval(drawMatrix, 50);
      return () => clearInterval(matrixInterval);
    };

    const matrixCleanup = createMatrixEffect();

    // Hero animations
    gsap.fromTo(".hero-title-1", 
      { x: -200, opacity: 0, rotationX: 90 },
      { 
        x: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1.5, 
        ease: "power3.out",
        delay: 0.3
      }
    );

    gsap.fromTo(".hero-title-2", 
      { x: 200, opacity: 0, rotationX: -90 },
      { 
        x: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1.5, 
        ease: "power3.out",
        delay: 0.6
      }
    );

    gsap.fromTo(".hero-subtitle", 
      { y: 100, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.2, 
        delay: 1,
        ease: "back.out(1.7)"
      }
    );

    gsap.fromTo(".hero-cta", 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        delay: 1.3,
        stagger: 0.2,
        ease: "power2.out"
      }
    );

    // Floating elements animation
    gsap.to(".float-1", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".float-2", {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });

    gsap.to(".float-3", {
      y: -25,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });

    // Section animations
    sectionsRef.current.forEach((section) => {
      if (section) {
        const elements = section.querySelectorAll('.animate-on-scroll');
        
        gsap.fromTo(elements,
          { 
            y: 100, 
            opacity: 0,
            scale: 0.9,
            rotationX: 45
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "bottom 25%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Counter animation
    statsCounterRef.current.forEach((counter) => {
      if (counter) {
        const target = parseInt(counter.dataset.target || '0');
        const suffix = counter.dataset.suffix || '';
        
        ScrollTrigger.create({
          trigger: counter,
          start: "top 80%",
          onEnter: () => {
            gsap.to(counter, {
              innerText: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 },
              onUpdate: function() {
                if (counter) {
                  counter.innerText = Math.ceil(Number(counter.innerText)) + suffix;
                }
              }
            });
          }
        });
      }
    });
    
    // Section animations
    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.fromTo(section.querySelectorAll('.animate-element'),
          { 
            y: 80, 
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Glitch effect
    gsap.set(".glitch-text", { 
      textShadow: "2px 0 #9ca3af, -2px 0 #4b5563" 
    });

    gsap.to(".glitch-text", {
      textShadow: "2px 0 #4b5563, -2px 0 #9ca3af",
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "none"
    });

    // Parallax scrolling
    gsap.utils.toArray(".parallax-element").forEach((element) => {
      gsap.to(element as Element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element as Element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    // Cleanup
    return () => {
      if (matrixCleanup) matrixCleanup();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addToCounterRefs = (el: HTMLDivElement | null) => {
    if (el && !statsCounterRef.current.includes(el)) {
      statsCounterRef.current.push(el);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      {/* Matrix Background */}
      <canvas id="matrix-bg" className="fixed inset-0 z-0 opacity-20"></canvas>
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 z-10">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          muted
          playsInline
        >
          <source src="/lottie/istockphoto-1139630778-640_adpp_is.mp4_1747896850263.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-gray-500 rotate-45 float-1 opacity-30"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-gray-400 float-2 opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border-2 border-gray-600 rotate-12 float-3 opacity-25"></div>
        
        <div className="relative z-20 text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="hero-title-1 text-5xl md:text-8xl font-black mb-4 tracking-tight">
              IDENTITY
            </h1>
            <h1 className="hero-title-2 text-5xl md:text-8xl font-black mb-6 tracking-tight glitch-text">
              FORTRESS
            </h1>
          </div>
          
          <p className="hero-subtitle text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            In the digital battlefield where your identity is currency, we are your shield against the invisible war of data theft and cybercrime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/prevention">
              <button className="hero-cta px-10 py-4 bg-gray-600 text-white font-bold text-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25">
                SECURE NOW
              </button>
            </Link>
            <Link href="/types">
              <button className="hero-cta px-10 py-4 border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:shadow-lg">
                LEARN THREATS
              </button>
            </Link>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center animate-pulse">
            <div className="w-1 h-4 bg-gray-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Threat Landscape Section */}
      <section ref={addToRefs} className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="animate-on-scroll text-4xl md:text-6xl font-bold mb-8 text-gray-300">
              THREAT LANDSCAPE
            </h2>
            <p className="animate-on-scroll text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Every 14 seconds, someone becomes a victim of identity theft. The digital predators are evolving faster than ever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="animate-on-scroll bg-gray-900 border border-gray-600/30 p-8 text-center hover:border-gray-500 transition-all duration-300 transform hover:scale-105 hover:bg-gray-800/50">
              <div className="text-5xl font-bold text-gray-400 mb-4" ref={addToCounterRefs} data-target="2300" data-suffix="/day">0/day</div>
              <div className="text-gray-400 text-lg font-medium">New Victims Daily</div>
            </div>
            
            <div className="animate-on-scroll bg-gray-900 border border-gray-500/30 p-8 text-center hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:bg-gray-800/50">
              <div className="text-5xl font-bold text-gray-400 mb-4" ref={addToCounterRefs} data-target="56" data-suffix="B">0B</div>
              <div className="text-gray-400 text-lg font-medium">Annual Losses</div>
            </div>
            
            <div className="animate-on-scroll bg-gray-900 border border-gray-600/30 p-8 text-center hover:border-gray-500 transition-all duration-300 transform hover:scale-105 hover:bg-gray-800/50">
              <div className="text-5xl font-bold text-gray-400 mb-4" ref={addToCounterRefs} data-target="200" data-suffix="hrs">0hrs</div>
              <div className="text-gray-400 text-lg font-medium">Recovery Time</div>
            </div>
            
            <div className="animate-on-scroll bg-gray-900 border border-gray-500/30 p-8 text-center hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:bg-gray-800/50">
              <div className="text-5xl font-bold text-gray-400 mb-4" ref={addToCounterRefs} data-target="25" data-suffix="%">0%</div>
              <div className="text-gray-400 text-lg font-medium">Adults Affected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News/Breaches Section */}
      <section ref={addToRefs} className="py-24 px-4 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="animate-on-scroll text-4xl md:text-6xl font-bold mb-8 glitch-text">
              RECENT BREACHES
            </h2>
            <p className="animate-on-scroll text-xl text-gray-400 max-w-4xl mx-auto">
              Stay informed about the latest security incidents that could affect your digital identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-on-scroll group">
              <div className="bg-black border border-gray-700 overflow-hidden hover:border-gray-500 transition-all duration-500 transform hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop" 
                    alt="Cybersecurity threat" 
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">CRITICAL</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-400 transition-colors">
                    Major Healthcare System Breach
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Over 3.2 million patient records exposed including SSNs, medical histories, and financial data.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">2 days ago</span>
                    <span className="text-xs text-gray-400 font-bold">3.2M AFFECTED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-on-scroll group">
              <div className="bg-black border border-gray-700 overflow-hidden hover:border-gray-500 transition-all duration-500 transform hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop" 
                    alt="Financial security" 
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-gray-500 text-white text-xs px-2 py-1 rounded">HIGH</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-400 transition-colors">
                    Financial Services Attack
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Ransomware attack on major credit union exposes customer banking information and loan details.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">5 days ago</span>
                    <span className="text-xs text-gray-400 font-bold">890K AFFECTED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-on-scroll group">
              <div className="bg-black border border-gray-700 overflow-hidden hover:border-gray-500 transition-all duration-500 transform hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop" 
                    alt="E-commerce security" 
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">MEDIUM</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-400 transition-colors">
                    E-commerce Platform Hack
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Popular shopping site compromised, exposing payment cards and personal shopping data.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">1 week ago</span>
                    <span className="text-xs text-gray-400 font-bold">1.5M AFFECTED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protection Preview Section */}
      <section ref={addToRefs} className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold mb-8 text-gray-300">
                YOUR DIGITAL ARMOR
              </h2>
              <p className="animate-on-scroll text-xl text-gray-300 mb-8 leading-relaxed">
                Don&apos;t be another statistic. Our comprehensive protection strategies are your weapon against identity thieves and cybercriminals.
              </p>
              
              <div className="space-y-6">
                <div className="animate-on-scroll flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Real-time Monitoring</h4>
                    <p className="text-gray-400">Advanced systems that watch your digital footprint 24/7</p>
                  </div>
                </div>
                
                <div className="animate-on-scroll flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Military-grade Encryption</h4>
                    <p className="text-gray-400">Protect your data with unbreakable security protocols</p>
                  </div>
                </div>
                
                <div className="animate-on-scroll flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Instant Threat Response</h4>
                    <p className="text-gray-400">Immediate action when suspicious activity is detected</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Link href="/prevention">
                  <button className="animate-on-scroll px-8 py-4 bg-gray-600 text-white font-bold text-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25">
                    EXPLORE PROTECTION →
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="animate-on-scroll parallax-element">
                <Image
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=400&fit=crop" 
                  alt="Digital security shield" 
                  width={500}
                  height={400}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-gray-900/90 p-6 border border-gray-600 backdrop-blur-sm">
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
                    <h3 className="text-2xl font-bold text-white mb-4">PROTECTED STATUS</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Identity Monitoring</span>
                        <span className="text-gray-300 font-bold">ACTIVE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Credit Alerts</span>
                        <span className="text-gray-300 font-bold">ENABLED</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Dark Web Scan</span>
                        <span className="text-gray-300 font-bold">SECURE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bank Account Watch</span>
                        <span className="text-gray-300 font-bold">MONITORED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Navigation */}
      <section ref={addToRefs} className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold mb-8 text-white">
              MISSION CONTROL
            </h2>
            <p className="animate-on-scroll text-xl text-gray-400 max-w-3xl mx-auto">
              Navigate to critical intel and protection protocols. Every second counts in the war against identity theft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/types">
              <div className="animate-on-scroll group cursor-pointer">
                <div className="bg-black border border-gray-600/30 p-8 text-center hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl mb-4 group-hover:animate-pulse">⚠️</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-400">THREAT TYPES</h3>
                  <p className="text-gray-400 text-sm">Identify and understand different attack vectors</p>
                </div>
              </div>
            </Link>

            <Link href="/prevention">
              <div className="animate-on-scroll group cursor-pointer">
                <div className="bg-black border border-gray-600/30 p-8 text-center hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl mb-4 group-hover:animate-pulse">🛡️</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-400">PREVENTION</h3>
                  <p className="text-gray-400 text-sm">Advanced protection strategies and tools</p>
                </div>
              </div>
            </Link>

            <Link href="/resources">
              <div className="animate-on-scroll group cursor-pointer">
                <div className="bg-black border border-gray-600/30 p-8 text-center hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl mb-4 group-hover:animate-pulse">📚</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-400">RESOURCES</h3>
                  <p className="text-gray-400 text-sm">Tools, guides, and emergency contacts</p>
                </div>
              </div>
            </Link>

            <Link href="/report">
              <div className="animate-on-scroll group cursor-pointer">
                <div className="bg-black border border-gray-600/30 p-8 text-center hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl mb-4 group-hover:animate-pulse">🚨</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-400">REPORT</h3>
                  <p className="text-gray-400 text-sm">Report identity theft incidents immediately</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

   {/* Final CTA Section */}
      <section ref={addToRefs} className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll border border-indigo-700 bg-indigo-900/10 p-12 rounded-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glitch-text text-indigo-500">
              THE CHOICE IS YOURS
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Become a victim or become invisible. Your digital identity is under attack right now.
              Every moment you wait, the threats multiply. Act now or face the consequences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/prevention">
                <button className="px-10 py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25">
                  SECURE MY IDENTITY
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-10 py-4 border-2 border-indigo-500 text-indigo-500 font-bold text-lg rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300">
                  GET HELP NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-lg mb-4">
            Your digital identity is your most valuable asset. Guard it with your life.
          </p>
          <p className="text-gray-600 text-sm">
            © 2024 Identity Fortress. All rights reserved. Stay vigilant. Stay protected.
          </p>
        </div>
      </footer>
    </div>
  );
}