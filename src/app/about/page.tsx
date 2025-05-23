



'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function About() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const usbRef = useRef<THREE.Group | null>(null);
  const laptopRef = useRef<THREE.Group | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera - dynamic starting position
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-8, 15, 12);
    camera.lookAt(-4, 2, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Blue accent light for USB
    const blueLight = new THREE.PointLight(0x4A90E2, 1.2, 100);
    blueLight.position.set(-2, 8, 3);
    scene.add(blueLight);

    // Warm light for laptop
    const warmLight = new THREE.PointLight(0xffa500, 0.8, 50);
    warmLight.position.set(-4, 2, 4);
    scene.add(warmLight);

    // Create USB Flash Drive (horizontal, modern)
    const usbGroup = new THREE.Group();
    
    // USB Body - modern black with blue accents (horizontal)
    const usbBodyGeometry = new THREE.BoxGeometry(2.5, 0.6, 0.3);
    const usbBodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a,
      shininess: 120,
      specular: 0x333333
    });
    const usbBody = new THREE.Mesh(usbBodyGeometry, usbBodyMaterial);
    usbGroup.add(usbBody);

    // USB Cap - metallic silver (at the back)
    const usbCapGeometry = new THREE.BoxGeometry(0.8, 0.65, 0.35);
    const usbCapMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xc0c0c0,
      shininess: 200,
      specular: 0xffffff
    });
    const usbCap = new THREE.Mesh(usbCapGeometry, usbCapMaterial);
    usbCap.position.x = -1.65;
    usbGroup.add(usbCap);

    // USB Connector - gold plated (at the front)
    const usbConnectorGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.15);
    const usbConnectorMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffd700,
      shininess: 300,
      specular: 0xffffff
    });
    const usbConnector = new THREE.Mesh(usbConnectorGeometry, usbConnectorMaterial);
    usbConnector.position.x = 1.55;
    usbGroup.add(usbConnector);

    // Blue accent stripe
    const stripeGeometry = new THREE.BoxGeometry(0.1, 0.61, 0.31);
    const stripeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4A90E2,
      shininess: 150,
      emissive: 0x001144,
      emissiveIntensity: 0.2
    });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.x = -0.5;
    usbGroup.add(stripe);

    // LED indicator - bright blue
    const ledGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const ledMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00aaff,
      emissive: 0x0066cc,
      emissiveIntensity: 0.8,
      shininess: 300
    });
    const led = new THREE.Mesh(ledGeometry, ledMaterial);
    led.position.set(-0.8, 0.25, 0.16);
    usbGroup.add(led);

    // Position USB horizontally above left side
    usbGroup.position.set(-6, 8, 2);
    usbGroup.rotation.y = Math.PI / 2; // Point toward laptop
    scene.add(usbGroup);
    usbRef.current = usbGroup;

    // Create Laptop (modern, detailed)
    const laptopGroup = new THREE.Group();
    
    // Laptop base - dark aluminum
    const laptopBaseGeometry = new THREE.BoxGeometry(8, 0.4, 6);
    const laptopBaseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2a2a2a,
      shininess: 150,
      specular: 0x444444
    });
    const laptopBase = new THREE.Mesh(laptopBaseGeometry, laptopBaseMaterial);
    laptopGroup.add(laptopBase);

    // Laptop screen bezel
    const laptopScreenGeometry = new THREE.BoxGeometry(7.8, 5.2, 0.3);
    const laptopScreenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a,
      shininess: 100
    });
    const laptopScreen = new THREE.Mesh(laptopScreenGeometry, laptopScreenMaterial);
    laptopScreen.position.set(0, 2.8, -2.85);
    laptopScreen.rotation.x = -Math.PI * 0.08;
    laptopGroup.add(laptopScreen);

    // Screen display with coding content
    const screenDisplayGeometry = new THREE.PlaneGeometry(7, 4.5);
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    
    // Draw terminal/coding background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add terminal header
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, canvas.width, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Monaco, monospace';
    ctx.fillText('Terminal - Identity Protection System', 20, 25);
    
    // Add terminal dots
    ctx.fillStyle = '#ff5f56';
    ctx.beginPath();
    ctx.arc(canvas.width - 60, 20, 6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffbd2e';
    ctx.beginPath();
    ctx.arc(canvas.width - 40, 20, 6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#27ca3f';
    ctx.beginPath();
    ctx.arc(canvas.width - 20, 20, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Add code content
    const codeLines = [
      '> identity-shield --monitor --verbose',
      '',
      'Scanning for identity threats...',
      'Dark web monitoring: ACTIVE',
      'Credit monitoring: ENABLED',
      'Social media scanning: RUNNING',
      '',
      'class IdentityProtector {',
      '  constructor() {',
      '    this.threats = [];',
      '    this.shields = new Map();',
      '  }',
      '',
      '  async scanForThreats() {',
      '    const darkWebData = await this.scanDarkWeb();',
      '    const breachData = await this.checkBreaches();',
      '    return this.analyzeRisk(darkWebData, breachData);',
      '  }',
      '}'
    ];
    
    ctx.fillStyle = '#00ff00';
    ctx.font = '12px Monaco, monospace';
    let y = 70;
    codeLines.forEach(line => {
      if (line.includes('class') || line.includes('async')) {
        ctx.fillStyle = '#ff6b9d';
      } else if (line.includes('this.') || line.includes('await')) {
        ctx.fillStyle = '#4ecdc4';
      } else if (line.startsWith('>')) {
        ctx.fillStyle = '#ffd93d';
      } else if (line.includes('ACTIVE') || line.includes('ENABLED') || line.includes('RUNNING')) {
        ctx.fillStyle = '#6bcf7f';
      } else {
        ctx.fillStyle = '#ffffff';
      }
      ctx.fillText(line, 20, y);
      y += 20;
    });
    
    // Add blinking cursor
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(20, y, 10, 16);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    const screenDisplayMaterial = new THREE.MeshPhongMaterial({ 
      map: texture,
      shininess: 300,
      specular: 0x333333,
      emissive: 0x001122,
      emissiveIntensity: 0.1
    });
    const screenDisplay = new THREE.Mesh(screenDisplayGeometry, screenDisplayMaterial);
    screenDisplay.position.set(0, 2.8, -2.7);
    screenDisplay.rotation.x = -Math.PI * 0.08;
    laptopGroup.add(screenDisplay);

    // Keyboard area - darker
    const keyboardGeometry = new THREE.PlaneGeometry(6.5, 4);
    const keyboardMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0a0a0a,
      shininess: 50
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.21, -0.5);
    keyboard.rotation.x = -Math.PI * 0.5;
    laptopGroup.add(keyboard);

    // USB Port on left side - realistic positioning
    const usbPortGeometry = new THREE.BoxGeometry(0.45, 0.65, 0.25);
    const usbPortMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000,
      shininess: 50
    });
    const usbPort = new THREE.Mesh(usbPortGeometry, usbPortMaterial);
    usbPort.position.set(-3.8, 0.2, 1.2);
    laptopGroup.add(usbPort);

    // USB port interior
    const portInteriorGeometry = new THREE.BoxGeometry(0.42, 0.62, 0.2);
    const portInteriorMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x111111
    });
    const portInterior = new THREE.Mesh(portInteriorGeometry, portInteriorMaterial);
    portInterior.position.set(-3.8, 0.2, 1.15);
    laptopGroup.add(portInterior);

    laptopGroup.position.set(0, -2, 0);
    scene.add(laptopGroup);
    laptopRef.current = laptopGroup;

    // Animation loop
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (usbRef.current && laptopRef.current) {
        const progress = Math.min(scrollY / (window.innerHeight * 3), 1);
        
        // Horizontal USB movement - from left side toward laptop port
        const startY = 8;
        const endY = 0.2;
        const startX = -6;
        const endX = -3.8;
        const startZ = 2;
        const endZ = 1.2;
        
        // Smooth easing for cinematic feel
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        usbRef.current.position.y = startY - (easeProgress * (startY - endY));
        usbRef.current.position.x = startX + (easeProgress * (endX - startX));
        usbRef.current.position.z = startZ - (easeProgress * (startZ - endZ));
        
        // Subtle floating motion
        usbRef.current.position.y += Math.sin(Date.now() * 0.002) * 0.1;
        usbRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.02;
        
        // Dynamic cinematic camera work
        if (progress < 0.2) {
          // Extreme wide shot - bird's eye view
          camera.position.set(-8, 18, 15);
          camera.lookAt(-4, 2, 0);
        } else if (progress < 0.4) {
          // Tracking shot - following USB
          const trackProgress = (progress - 0.2) / 0.2;
          camera.position.x = -8 + (trackProgress * 2);
          camera.position.y = 18 - (trackProgress * 6);
          camera.position.z = 15 - (trackProgress * 5);
          camera.lookAt(usbRef.current.position.x, usbRef.current.position.y, usbRef.current.position.z);
        } else if (progress < 0.6) {
          // Side angle - dramatic perspective
          const sideProgress = (progress - 0.4) / 0.2;
          camera.position.set(
            -6 + (sideProgress * -2),
            12 - (sideProgress * 4),
            10 - (sideProgress * 2)
          );
          camera.lookAt(-4, 1, 1);
        } else if (progress < 0.8) {
          // Over-shoulder view of laptop
          const shoulderProgress = (progress - 0.6) / 0.2;
          camera.position.set(
            -8 + (shoulderProgress * 4),
            8 - (shoulderProgress * 2),
            8 - (shoulderProgress * 4)
          );
          camera.lookAt(0, 2, -2);
        } else {
          // Extreme close-up on connection point
          const zoomProgress = (progress - 0.8) / 0.2;
          camera.position.set(
            -4 + (zoomProgress * 0.2),
            6 - (zoomProgress * 3),
            4 - (zoomProgress * 1.5)
          );
          camera.lookAt(-3.8, 0.2, 1.2);
        }
        
        // Check if USB is connected
        if (easeProgress > 0.85 && !isConnected) {
          setIsConnected(true);
          
          // Find screen and enhance it
          const screenDisplay = laptopRef.current.children.find(child => 
            child.material && child.material.map
          );
          if (screenDisplay) {
            screenDisplay.material.emissive.setHex(0x0044ff);
            screenDisplay.material.emissiveIntensity = 0.3;
          }
          
          // LED becomes brighter when connected
          const ledMesh = usbRef.current.children.find(child => 
            child.material && child.material.emissive && child.geometry.type === 'SphereGeometry'
          );
          if (ledMesh) {
            ledMesh.material.emissiveIntensity = 1.5;
            ledMesh.material.emissive.setHex(0x00ffff);
          }
        }
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);

    // Handle resize
    const handleResize = () => {
      if (cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mount && rendererRef.current?.domElement) {
        mount.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [scrollY, isConnected]);

  return (
    <div className="bg-black text-white relative">
      {/* Glassmorphism background elements - moved FIRST in DOM order */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-900/20 backdrop-blur-3xl filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-cyan-500/10 backdrop-blur-3xl filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-900/15 backdrop-blur-3xl filter blur-3xl"></div>
      </div>

      {/* 3D Hero Section - now with higher z-index */}
      <div className="fixed inset-0 z-10">
        <div ref={mountRef} className="w-full h-full" />
      </div>

      {/* Hero Content */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-extralight mb-8 tracking-tighter">
            About Us
          </h1>
          <div className="p-8 bg-black/30 backdrop-blur-lg rounded-xl">
            <p className="text-xl md:text-2xl leading-relaxed font-light">
              Protecting digital identities through advanced technology and human expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Connection Message */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className={`text-center transition-all duration-2000 ${isConnected ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              <h2 className="text-4xl md:text-6xl font-extralight mb-4 tracking-tighter">
                Connection Established
              </h2>
            </div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-8"></div>
          </div>
          <h3 className="text-3xl md:text-4xl font-extralight mb-8 text-white tracking-tight">
            Our Story Begins Here
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Every digital connection carries risk. Every data breach changes lives. 
            We&apos;re here to ensure your digital identity remains secure in an increasingly connected world.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl">
              <div className="text-2xl font-extralight text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-gray-400 tracking-wider">MONITORING</div>
            </div>
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl">
              <div className="text-2xl font-extralight text-cyan-400 mb-2">Real-time</div>
              <div className="text-sm text-gray-400 tracking-wider">ALERTS</div>
            </div>
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl">
              <div className="text-2xl font-extralight text-blue-300 mb-2">Advanced</div>
              <div className="text-sm text-gray-400 tracking-wider">PROTECTION</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-white tracking-tighter">
                Our Mission
              </h2>
              <div className="space-y-6 text-lg font-light">
                <p className="text-gray-200 leading-relaxed">
                  In an era where digital identity theft affects millions annually, we stand as guardians of personal data integrity.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  Our mission is simple: eliminate identity theft through prevention, education, and cutting-edge monitoring technology.
                </p>
              </div>
            </div>
            <div className="bg-gray-900/40 backdrop-blur-lg p-8 rounded-xl">
              <h3 className="text-2xl font-extralight mb-6 text-white tracking-tight">By The Numbers</h3>
              <div className="space-y-4 text-sm font-mono">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Annual Victims:</span>
                  <span className="text-white">14.4M+</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Financial Impact:</span>
                  <span className="text-white">$56B+</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Recovery Time:</span>
                  <span className="text-white">6+ months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 min-h-screen flex items-center px-4 py-20 bg-gradient-to-b from-gray-900/50 to-black/70">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extralight mb-16 text-center text-white tracking-tighter">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/30 backdrop-blur-lg p-8 rounded-xl hover:bg-gray-900/50 transition-all">
              <h3 className="text-2xl font-extralight mb-4 text-white tracking-tight">Security Analysts</h3>
              <p className="text-gray-300 leading-relaxed mb-4 font-light">
                Former government cybersecurity specialists with deep knowledge of threat landscapes and criminal methodologies.
              </p>
              <div className="text-sm text-gray-400 space-y-1">
                <p>• Threat Intelligence</p>
                <p>• Digital Forensics</p>
                <p>• Risk Assessment</p>
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-lg p-8 rounded-xl hover:bg-gray-900/50 transition-all">
              <h3 className="text-2xl font-extralight mb-4 text-white tracking-tight">Data Scientists</h3>
              <p className="text-gray-300 leading-relaxed mb-4 font-light">
                Machine learning experts developing predictive models to identify and prevent identity theft before it occurs.
              </p>
              <div className="text-sm text-gray-400 space-y-1">
                <p>• Anomaly Detection</p>
                <p>• Predictive Analytics</p>
                <p>• Pattern Recognition</p>
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-lg p-8 rounded-xl hover:bg-gray-900/50 transition-all">
              <h3 className="text-2xl font-extralight mb-4 text-white tracking-tight">Legal Advisors</h3>
              <p className="text-gray-300 leading-relaxed mb-4 font-light">
                Privacy law specialists and victim advocates ensuring comprehensive protection and recovery support.
              </p>
              <div className="text-sm text-gray-400 space-y-1">
                <p>• Privacy Law</p>
                <p>• Victim Support</p>
                <p>• Legal Recovery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative z-10 min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extralight mb-16 text-center text-white tracking-tighter">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-gray-900/40 backdrop-blur-lg p-6 rounded-xl">
                <h3 className="text-2xl font-extralight mb-4 text-white tracking-tight">AI Monitoring</h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  24/7 artificial intelligence systems continuously scan for compromised data across dark web networks and breach databases.
                </p>
              </div>
              <div className="bg-gray-900/40 backdrop-blur-lg p-6 rounded-xl">
                <h3 className="text-2xl font-extralight mb-4 text-white tracking-tight">Real-time Alerts</h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  Instant notification systems that alert you the moment your personal information appears in suspicious contexts.
                </p>
              </div>
            </div>
            <div className="bg-gray-900/40 backdrop-blur-lg p-8 rounded-xl">
              <h3 className="text-2xl font-extralight mb-6 text-white tracking-tight">System Status</h3>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Threat Detection:</span>
                  <span className="text-green-400">● Active</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">AI Monitoring:</span>
                  <span className="text-green-400">● Running</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Alert System:</span>
                  <span className="text-green-400">● Online</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-400">Encryption:</span>
                  <span className="text-green-400">● AES-256</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 min-h-screen flex items-center px-4 py-20 bg-gradient-to-b from-black/70 to-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight mb-16 text-white tracking-tighter">
            Our Values
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-black/30 backdrop-blur-lg p-6 rounded-xl hover:bg-gray-900/50 transition-all">
              <h3 className="text-xl font-extralight mb-4 text-white tracking-tight">Vigilance</h3>
              <p className="text-gray-300 text-sm font-light">
                Constant monitoring and proactive threat detection to stay ahead of cybercriminals.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-lg p-6 rounded-xl hover:bg-gray-900/50 transition-all">
              <h3 className="text-xl font-extralight mb-4 text-white tracking-tight">Transparency</h3>
              <p className="text-gray-300 text-sm font-light">
                Clear, honest communication about threats, risks, and protection methods.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-lg p-6 rounded-xl hover:bg-gray-900/50 transition-all">
              <h3 className="text-xl font-extralight mb-4 text-white tracking-tight">Innovation</h3>
              <p className="text-gray-300 text-sm font-light">
                Cutting-edge technology to outpace evolving criminal tactics and methods.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-lg p-6 rounded-xl hover:bg-gray-900/50 transition-all">
              <h3 className="text-xl font-extralight mb-4 text-white tracking-tight">Empowerment</h3>
              <p className="text-gray-300 text-sm font-light">
                Education and tools to make individuals their own first line of defense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-screen"></div>
    </div>
  );
}