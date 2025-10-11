'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleSubmit = () => {
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A]">
      {/* Animated background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500 to-blue-600 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Dotted pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left section - Logo and newsletter */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Logo */}
              <div className="flex flex-col gap-4">
                <a
                  href="/"
                  className="group inline-flex items-center gap-3 w-fit transition-all duration-300 hover:opacity-80"
                  aria-label="AnyTrans - Go to homepage"
                >
                  {/* Logo Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                      <img src="/logo.svg" alt="" className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Logo Text */}
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white tracking-tight">
                      AnyTrans
                    </span>
                    <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                      Translation Services
                    </span>
                  </div>
                </a>

                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  Professional translation services for documents, subtitles,
                  and more. Empowering global communication with cutting-edge
                  technology.
                </p>
              </div>

              {/* Newsletter signup */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-white mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Subscribe to our newsletter for latest updates
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3.5 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  />
                  <button
                    onClick={handleSubmit}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right section - Links */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Our Link */}
              <div className="flex flex-col gap-6">
                <h3 className="font-bold text-lg text-white relative inline-block">
                  Quick Links
                  <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                </h3>
                <div className="flex flex-col gap-4">
                  {['Home', 'Features', 'Pricing', 'About Us'].map(
                    (link, index) => (
                      <a
                        key={index}
                        href={
                          link === 'Home'
                            ? '/'
                            : `/${link.toLowerCase().replace(' ', '-')}`
                        }
                        className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 text-[15px] font-medium group flex items-center gap-2"
                      >
                        <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-4 transition-all duration-300 rounded-full" />
                        {link}
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Our Service */}
              <div className="flex flex-col gap-6">
                <h3 className="font-bold text-lg text-white relative inline-block">
                  Services
                  <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      name: 'Document Translation',
                      href: '/features/document-translation',
                    },
                    {
                      name: 'Subtitle Translation',
                      href: '/features/subtitle-translation',
                    },
                  ].map((service, index) => (
                    <a
                      key={index}
                      href={service.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 text-[15px] font-medium group flex items-center gap-2"
                    >
                      <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-4 transition-all duration-300 rounded-full" />
                      {service.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="flex flex-col gap-6">
                <h3 className="font-bold text-lg text-white relative inline-block">
                  Connect
                  <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                </h3>
                <div className="flex items-center gap-3">
                  {[
                    { name: 'facebook', icon: Facebook, color: '#1877F2' },
                    { name: 'twitter', icon: Twitter, color: '#1DA1F2' },
                    { name: 'instagram', icon: Instagram, color: '#E4405F' },
                    { name: 'linkedin', icon: Linkedin, color: '#0A66C2' },
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <button
                        key={social.name}
                        onMouseEnter={() => setHoveredSocial(social.name)}
                        onMouseLeave={() => setHoveredSocial(null)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 hover:shadow-lg group relative overflow-hidden cursor-pointer"
                        style={{
                          backgroundColor:
                            hoveredSocial === social.name
                              ? `${social.color}20`
                              : undefined,
                        }}
                      >
                        <Icon
                          size={18}
                          className="text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10"
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${social.color}40, ${social.color}20)`,
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 text-sm">
              © 2025{' '}
              <span className="text-white font-semibold">AnyTrans Inc.</span>{' '}
              All rights reserved
            </p>

            <div className="flex items-center gap-6">
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                Terms & Conditions
              </a>
              <div className="w-1 h-1 bg-gray-600 rounded-full" />
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
