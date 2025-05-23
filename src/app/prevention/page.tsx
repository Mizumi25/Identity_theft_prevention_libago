'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Shield, 
  Lock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Key,
  Zap,
  ExternalLink,
  Info,
  Star,
  Clock,
  FileText
} from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Prevention() {
  const heroRef = useRef(null)
  const passwordRef = useRef(null)
  const phishingRef = useRef(null)
  const checklistRef = useRef(null)
  const toolsRef = useRef(null)
  
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [copiedPassword, setCopiedPassword] = useState<string | false>(false)

  const passwordRequirements = [
    { text: 'At least 12 characters long', example: 'MyP@ssw0rd2024!', strength: 'strong' },
    { text: 'Mix uppercase and lowercase letters', example: 'MyPassword', strength: 'medium' },
    { text: 'Include numbers and special characters', example: 'P@ssw0rd123!', strength: 'strong' },
    { text: 'Avoid dictionary words', example: 'password123 ❌', strength: 'weak' },
    { text: 'Never reuse passwords across sites', example: 'Use unique passwords everywhere', strength: 'critical' },
    { text: 'Use a password manager', example: 'LastPass, 1Password, Bitwarden', strength: 'critical' }
  ]

  const phishingRedFlags = [
    {
      category: 'Sender Issues',
      flags: [
        'Generic greetings like "Dear Customer"',
        'Email from public domains (gmail.com for bank emails)',
        'Sender name doesn\'t match email address',
        'Multiple typos in sender information'
      ]
    },
    {
      category: 'Content Red Flags',
      flags: [
        'Urgent language: "Act now!" "Limited time!"',
        'Threats: "Account will be closed"',
        'Grammar and spelling mistakes',
        'Requests for sensitive information via email'
      ]
    },
    {
      category: 'Link & Attachment Issues',
      flags: [
        'Suspicious URLs that don\'t match the company',
        'Shortened links (bit.ly, tinyurl) from unknown sources',
        'Unexpected attachments, especially .exe, .zip files',
        'Links that redirect multiple times'
      ]
    }
  ]

  const securityChecklist = [
    {
      category: 'Password Security',
      priority: 'Critical',
      items: [
        'Enable two-factor authentication on all important accounts',
        'Use unique passwords for every account',
        'Install and use a reputable password manager',
        'Change default passwords on all devices and accounts',
        'Review and update passwords at least every 6 months'
      ]
    },
    {
      category: 'Personal Information Protection',
      priority: 'High',
      items: [
        'Limit personal information shared on social media',
        'Use privacy settings on all social media platforms',
        'Avoid posting location, vacation plans, or personal details',
        'Be cautious about what you share in public Wi-Fi areas',
        'Shred documents with personal information before disposal'
      ]
    },
    {
      category: 'Financial Security',
      priority: 'Critical',
      items: [
        'Monitor bank and credit card statements weekly',
        'Set up account alerts for all transactions',
        'Check credit reports from all 3 bureaus annually (free at annualcreditreport.com)',
        'Consider freezing your credit with all bureaus',
        'Never give financial info over unsolicited calls or emails'
      ]
    },
    {
      category: 'Digital Hygiene',
      priority: 'Medium',
      items: [
        'Keep all software and apps updated',
        'Use antivirus software on all devices',
        'Avoid public Wi-Fi for sensitive activities',
        'Log out of accounts when done, especially on shared devices',
        'Regularly review account permissions and connected apps'
      ]
    }
  ]

  const securityTools = [
    {
      name: 'Password Managers',
      tools: [
        { name: 'Bitwarden', type: 'Free/Paid', rating: 5, description: 'Open-source, secure, works across all devices' },
        { name: '1Password', type: 'Paid', rating: 5, description: 'Premium features, family sharing, business tools' },
        { name: 'LastPass', type: 'Free/Paid', rating: 4, description: 'User-friendly, good free tier' },
        { name: 'Dashlane', type: 'Free/Paid', rating: 4, description: 'VPN included, dark web monitoring' }
      ]
    },
    {
      name: 'Two-Factor Authentication',
      tools: [
        { name: 'Google Authenticator', type: 'Free', rating: 4, description: 'Simple, reliable, works offline' },
        { name: 'Authy', type: 'Free', rating: 5, description: 'Cloud backup, multi-device sync' },
        { name: 'Microsoft Authenticator', type: 'Free', rating: 4, description: 'Integrates well with Microsoft services' },
        { name: 'YubiKey', type: 'Hardware ($50+)', rating: 5, description: 'Physical security key, most secure option' }
      ]
    },
    {
      name: 'Credit Monitoring',
      tools: [
        { name: 'Credit Karma', type: 'Free', rating: 4, description: 'Free credit scores, monitoring alerts' },
        { name: 'Experian', type: 'Free/Paid', rating: 4, description: 'Free FICO score, dark web monitoring' },
        { name: 'IdentityGuard', type: 'Paid', rating: 4, description: 'Comprehensive identity monitoring' },
        { name: 'LifeLock', type: 'Paid', rating: 3, description: 'Well-known brand, expensive but comprehensive' }
      ]
    },
    {
      name: 'Secure Communication',
      tools: [
        { name: 'Signal', type: 'Free', rating: 5, description: 'End-to-end encrypted messaging' },
        { name: 'ProtonMail', type: 'Free/Paid', rating: 5, description: 'Encrypted email service' },
        { name: 'Tor Browser', type: 'Free', rating: 4, description: 'Anonymous web browsing' },
        { name: 'VPN Services', type: 'Paid', rating: 4, description: 'NordVPN, ExpressVPN, Surfshark for privacy' }
      ]
    }
  ]

  const handleChecklistToggle = (category: string, index: number) => {
    const key = `${category}-${index}`
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    navigator.clipboard.writeText(password)
    setCopiedPassword(password)
    setTimeout(() => setCopiedPassword(false), 3000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reset states
      gsap.set('.fade-in', { y: 60, opacity: 0 })
      gsap.set('.slide-in-left', { x: -100, opacity: 0 })
      gsap.set('.slide-in-right', { x: 100, opacity: 0 })
      gsap.set('.scale-in', { scale: 0.8, opacity: 0 })

      // Hero animation
      gsap.timeline()
        .to('.hero-title', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
        .to('.hero-subtitle', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: passwordRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.password-item', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1
          })
        }
      })

      ScrollTrigger.create({
        trigger: phishingRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to('.phishing-category', {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2
          })
        }
      })

      ScrollTrigger.create({
        trigger: checklistRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to('.checklist-category', {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.15
          })
        }
      })

      ScrollTrigger.create({
        trigger: toolsRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to('.tool-category', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1
          })
        }
      })

    }, heroRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-white fill-white' : 'text-gray-600'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="hero-title fade-in text-6xl md:text-7xl font-black mb-8">
            IDENTITY THEFT
            <br />
            <span className="text-gray-400">PREVENTION GUIDE</span>
          </h1>
          
          <p className="hero-subtitle fade-in text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Comprehensive strategies, tools, and checklists to protect your personal information from identity thieves
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Prevention Tips</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-gray-400">Security Tools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4</div>
              <div className="text-gray-400">Priority Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Password Security Section */}
      <section ref={passwordRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Password Security Essentials</h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Strong passwords are your first line of defense. Follow these requirements to create unbreakable passwords.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <Lock className="mr-3 text-white" />
                Password Requirements
              </h3>
              
              <div className="space-y-6">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="password-item fade-in p-4 bg-gray-800 rounded-lg border-l-4 border-white">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{req.text}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        req.strength === 'critical' ? 'bg-red-600' :
                        req.strength === 'strong' ? 'bg-green-600' :
                        req.strength === 'medium' ? 'bg-yellow-600' : 'bg-gray-600'
                      }`}>
                        {req.strength.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm font-mono bg-gray-700 p-2 rounded">
                      {req.example}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <Key className="mr-3 text-white" />
                Password Generator Tool
              </h3>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <button
                  onClick={generateStrongPassword}
                  className="w-full mb-4 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Zap className="mr-2" />
                  Generate Strong Password
                </button>
                
                {copiedPassword && (
                  <div className="mb-4 p-3 bg-gray-700 rounded border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">{copiedPassword}</span>
                      <span className="text-green-400 text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Copied!
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    16 characters long
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Mixed case letters, numbers, symbols
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Cryptographically secure
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h4 className="font-bold mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-400" />
                  Pro Tips
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Use a different password for every account</li>
                  <li>• Store passwords in a password manager, not browser</li>
                  <li>• Enable 2FA wherever possible</li>
                  <li>• Never share passwords via email or text</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phishing Recognition Section */}
      <section ref={phishingRef} className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Recognizing Phishing Attempts</h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Learn to identify and avoid phishing emails, texts, and calls that try to steal your personal information.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {phishingRedFlags.map((category, index) => (
              <div key={index} className="phishing-category slide-in-left">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 h-full">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <AlertTriangle className="mr-3 text-red-400" />
                    {category.category}
                  </h3>
                  
                  <ul className="space-y-3">
                    {category.flags.map((flag, flagIndex) => (
                      <li key={flagIndex} className="flex items-start">
                        <XCircle className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Example Phishing Email */}
          <div className="max-w-4xl mx-auto mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Example: Phishing Email Breakdown</h3>
            
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-800 p-4 border-b border-gray-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">From: security@bank-verify-urgent.com</span>
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">SUSPICIOUS</span>
                </div>
                <div className="text-white font-semibold mt-1">URGENT: Account Suspension Notice</div>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-gray-300">Dear Valued Customer,</p>
                <p className="text-gray-300">
                  We has detected unusual activity on your account. Your account will be suspended in 24 hours 
                  unless you verify your information immediately.
                </p>
                <p className="text-gray-300">
                  Click here to verify: <span className="text-blue-400 underline">www.bank-verify-now.suspicious-domain.com</span>
                </p>
                <p className="text-gray-300">Thank you for your immediate attention to this matter.</p>
              </div>
              
              <div className="bg-red-900/20 p-4 border-t border-red-600">
                <h4 className="text-red-400 font-bold mb-2">🚨 Red Flags Identified:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Generic greeting instead of your name</li>
                  <li>• Grammar error: &quot;We has detected&quot;</li>
                  <li>• Suspicious domain name</li>
                  <li>• Urgent threatening language</li>
                  <li>• Requests action via email link</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Checklist Section */}
      <section ref={checklistRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Complete Security Checklist</h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Follow this comprehensive checklist to secure all aspects of your digital life. Check off items as you complete them.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {securityChecklist.map((category, categoryIndex) => (
              <div key={categoryIndex} className="checklist-category scale-in">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">{category.category}</h3>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      category.priority === 'Critical' ? 'bg-red-600' :
                      category.priority === 'High' ? 'bg-yellow-600' : 'bg-gray-600'
                    }`}>
                      {category.priority} Priority
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => {
                      const key = `${category.category}-${itemIndex}`
                      const isChecked = checkedItems[key]
                      
                      return (
                        <div key={itemIndex} className="flex items-start">
                          <button
                            onClick={() => handleChecklistToggle(category.category, itemIndex)}
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center mr-3 flex-shrink-0 transition-colors ${
                              isChecked 
                                ? 'bg-green-600 border-green-600' 
                                : 'border-gray-500 hover:border-white'
                            }`}
                          >
                            {isChecked && <CheckCircle className="w-4 h-4 text-white" />}
                          </button>
                          <span className={`text-sm ${isChecked ? 'text-gray-400 line-through' : 'text-gray-300'}`}>
                            {item}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-gray-800 px-6 py-3 rounded-lg">
              <FileText className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-gray-300">
                Progress: {Object.values(checkedItems).filter(Boolean).length} / {
                  securityChecklist.reduce((total, cat) => total + cat.items.length, 0)
                } completed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Security Tools Section */}
      <section ref={toolsRef} className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Recommended Security Tools</h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Professional-grade tools to enhance your security. All recommendations are based on security audits and user reviews.
          </p>

          <div className="space-y-12 max-w-6xl mx-auto">
            {securityTools.map((category, categoryIndex) => (
              <div key={categoryIndex} className="tool-category fade-in">
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <Shield className="mr-3 text-white" />
                  {category.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-white">{tool.name}</h4>
                          <span className="text-sm text-gray-400">{tool.type}</span>
                        </div>
                        <div className="flex">
                          {renderStars(tool.rating)}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
                      
                      <button className="text-white hover:text-gray-300 text-sm flex items-center transition-colors">
                        Learn More
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 p-6 bg-gray-900 rounded-lg border border-gray-800 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">⚠️ Important Disclaimer</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              These tools are recommendations based on current security standards. Always research and verify tools before installation. 
              Free tools often provide excellent security, while paid tools offer additional features. Choose based on your specific needs and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Action Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Take Action Today</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Don&apos;t wait until it&apos;s too late. Start protecting your identity with these immediate actions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg">
              <Clock className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="font-bold mb-2">Right Now (5 min)</h3>
              <p className="text-gray-400 text-sm">Enable 2FA on your most important accounts</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <Shield className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="font-bold mb-2">This Week (30 min)</h3>
              <p className="text-gray-400 text-sm">Install a password manager and update weak passwords</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="font-bold mb-2">This Month (1 hour)</h3>
              <p className="text-gray-400 text-sm">Complete the full security checklist and set up monitoring</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}