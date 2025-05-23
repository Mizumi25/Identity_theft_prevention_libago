'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  CreditCard, 
  Heart, 
  Baby, 
  Camera, 
  AlertTriangle,
  Lock,
  Eye,
  Zap,
  Target,
  Users,
  FileText,
  Activity
} from 'lucide-react';
import * as THREE from 'three';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Types = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const maskRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  const revealRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  const threeJsContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const faceMeshRef = useRef<THREE.Mesh | null>(null);

  // Identity theft types data
  const theftTypes = [
    {
      title: "FINANCIAL THEFT",
      description: "Credit cards, bank accounts, and financial data exploitation",
      icon: CreditCard,
      color: "#3b82f6" // blue-500
    },
    {
      title: "MEDICAL THEFT",
      description: "Stolen medical information for fraudulent treatments",
      icon: Heart,
      color: "#ef4444" // red-500
    },
    {
      title: "CHILD THEFT",
      description: "Children&apos;s clean credit histories targeted for fraud",
      icon: Baby,
      color: "#8b5cf6" // violet-500
    },
    {
      title: "CRIMINAL THEFT",
      description: "Using your identity during arrests and investigations",
      icon: AlertTriangle,
      color: "#f59e0b" // amber-500
    }
  ];

  useEffect(() => {
    // Initialize Three.js scene
    const initThreeJs = () => {
      const container = threeJsContainerRef.current;
      if (!container) return;

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111827); // gray-900
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // Add face geometry
      const geometry = new THREE.SphereGeometry(2, 64, 64);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const faceMesh = new THREE.Mesh(geometry, material);
      scene.add(faceMesh);

      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      faceMeshRef.current = faceMesh;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        if (faceMeshRef.current) {
          faceMeshRef.current.rotation.y += 0.005;
        }
        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;
        cameraRef.current.aspect = container.clientWidth / container.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    initThreeJs();

    // GSAP animations
    const ctx = gsap.context(() => {
      // Set initial state for masks
      gsap.set(maskRefs.map(ref => ref.current), {
        scaleY: 0,
        transformOrigin: "bottom center"
      });

      // Set initial state for reveals
      gsap.set(revealRefs.map(ref => ref.current), {
        opacity: 0,
        y: 50
      });

      // Create scroll timeline for mask reveals
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Animate each mask section
      maskRefs.forEach((ref, i) => {
        if (!ref.current) return;
        
        scrollTl.to(ref.current, {
          scaleY: 1,
          duration: 0.5,
          ease: "power2.out"
        }, i * 0.2);

        // Animate the corresponding reveal content
        if (revealRefs[i].current) {
          scrollTl.to(revealRefs[i].current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
          }, i * 0.2 + 0.3);
        }
      });

      // Add cursor parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!faceMeshRef.current) return;
        
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        
        gsap.to(faceMeshRef.current.rotation, {
          x: y * 0.2,
          y: x * 0.4,
          duration: 1,
          ease: "power2.out"
        });
      };

      heroRef.current?.addEventListener('mousemove', handleMouseMove);

      // Add hover distortion effect to masks
      maskRefs.forEach(ref => {
        const el = ref.current;
        if (!el) return;

        const handleMouseEnter = () => {
          gsap.to(el, {
            scaleX: 1.05,
            filter: "brightness(1.2)",
            duration: 0.3
          });
        };

        const handleMouseLeave = () => {
          gsap.to(el, {
            scaleX: 1,
            filter: "brightness(1)",
            duration: 0.3
          });
        };

        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        };
      });

      return () => {
        heroRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => {
      ctx.revert();
      // Clean up Three.js
      const container = threeJsContainerRef.current;
      if (container && rendererRef.current?.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, [maskRefs, revealRefs]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Hero Section - Masked Face Reveal */}
      <section ref={heroRef} className="hero-section relative h-screen w-full overflow-hidden">
        {/* Three.js Container - Background Face */}
        <div 
          ref={threeJsContainerRef} 
          className="absolute inset-0 w-full h-full opacity-50"
        />
        
        {/* Masked Face Sections */}
        <div className="absolute inset-0 w-full h-full flex">
          {maskRefs.map((ref, i) => {
            const TheftTypeIcon = theftTypes[i].icon;
            return (
              <div 
                key={i}
                ref={ref}
                className="h-full w-1/4 relative overflow-hidden"
                style={{
                  backgroundColor: `rgba(17, 24, 39, 0.8)`, // gray-900 with opacity
                  backdropFilter: 'blur(4px)'
                }}
              >
                {/* Reveal Content */}
                <div 
                  ref={revealRefs[i]}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                  style={{ color: theftTypes[i].color }}
                >
                  <TheftTypeIcon className="w-16 h-16 mb-6" />
                  <h2 className="text-3xl font-bold mb-4">{theftTypes[i].title}</h2>
                  <p className="text-xl opacity-90">{theftTypes[i].description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Hero Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              IDENTITY THEFT
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Scroll to reveal the threats
            </p>
          </div>
        </div>
      </section>

    
      {/* Financial Theft Section */}
      <section className="financial-section min-h-screen flex items-center justify-center bg-gray-900 relative py-20">
             {/* Financial Theft Section */}
      
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8">FINANCIAL THEFT</h2>
              <p className="text-xl text-gray-400 mb-6">
                Credit cards, bank accounts, and financial data are prime targets for identity thieves.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                  <span>Credit card fraud affects millions annually</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-gray-400" />
                  <span>Average loss: $1,343 per victim</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="w-6 h-6 text-gray-400" />
                  <span>Monitor accounts regularly</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image 
                src="/api/placeholder/400/250" 
                alt="Financial Security" 
                width={400}
                height={250}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="credit-card bg-gray-700 p-4 rounded-lg w-20 h-12 flex items-center justify-center">
                      <CreditCard className="w-6 h-6" />
                    </div>
                  ))}
                </div>
                <Lock className="vault-icon absolute w-16 h-16 opacity-0 scale-75" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Theft Section */}
      <section className="medical-section min-h-screen flex items-center justify-center bg-gray-800 relative py-20">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div className="relative h-96">
              <Image 
                src="/api/placeholder/450/300" 
                alt="Medical Records" 
                width={450}
                height={300}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-4">
                  {[1,2,3].map((i) => (
                    <div key={i} className="medical-doc bg-gray-700 p-6 rounded-lg flex items-center space-x-4">
                      <FileText className="w-8 h-8" />
                      <div className="flex-1 h-2 bg-gray-600 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="heartbeat-line absolute bottom-4 left-0 right-0 h-1 bg-white"></div>
            </div>
            
            <div>
              <h2 className="text-5xl font-bold mb-8">MEDICAL IDENTITY THEFT</h2>
              <p className="text-xl text-gray-400 mb-6">
                Stolen medical information can lead to fraudulent treatments and insurance claims.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-gray-400" />
                  <span>Medical records worth 10x more than credit cards</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-gray-400" />
                  <span>Can take years to detect and resolve</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-gray-400" />
                  <span>Guard your insurance information</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Child Identity Theft Section */}
      <section className="child-section min-h-screen flex items-center justify-center bg-gray-900 relative py-20 transition-colors duration-1000">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8">CHILD IDENTITY THEFT</h2>
              <p className="text-xl text-gray-400 mb-6">
                Children&apos;s clean credit histories make them attractive targets for long-term fraud.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Baby className="w-6 h-6 text-gray-400" />
                  <span>Can go undetected for years</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-gray-400" />
                  <span>Often committed by family members</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-gray-400" />
                  <span>Monitor children&apos;s personal information</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image 
                src="/api/placeholder/400/300" 
                alt="Child Protection" 
                width={400}
                height={300}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="toy-block bg-blue-600 w-12 h-12 rounded flex items-center justify-center">
                      <Baby className="w-6 h-6" />
                    </div>
                  ))}
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="phishing-icon absolute scale-0 opacity-0">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Criminal Identity Theft Section */}
      <section className="criminal-section min-h-screen flex items-center justify-center bg-gray-800 relative py-20">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div className="relative h-96">
              <div className="cctv-overlay absolute inset-0 border-4 border-red-500 opacity-0 rounded-lg"></div>
              <div className="absolute top-4 left-4 flex items-center space-x-2 text-red-500">
                <Camera className="w-6 h-6" />
                <span className="font-mono">REC</span>
              </div>
              <Image 
                src="/api/placeholder/400/300" 
                alt="Innocent Person" 
                width={400}
                height={300}
                className="face-innocent absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              />
              <Image 
                src="/api/placeholder/400/300" 
                alt="Criminal Mugshot" 
                width={400}
                height={300}
                className="face-criminal absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-0"
              />
            </div>
            
            <div>
              <h2 className="text-5xl font-bold mb-8">CRIMINAL IDENTITY THEFT</h2>
              <p className="text-xl text-gray-400 mb-6">
                When criminals use your identity during arrests, creating a false criminal record.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-gray-400" />
                  <span>Hardest type to detect and clear</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-gray-400" />
                  <span>Affects employment and housing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-gray-400" />
                  <span>Regular background checks recommended</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="min-h-screen flex items-center justify-center bg-gray-900 relative">
        <div className="text-center">
          <Shield className="w-32 h-32 mx-auto mb-8 text-white" />
          <h2 className="text-6xl font-bold mb-8">STAY PROTECTED</h2>
          <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Understanding these threats is your first line of defense. Take proactive steps to protect your identity.
          </p>
          <div className="flex space-x-6 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Learn Prevention
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              Report Theft
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Types;