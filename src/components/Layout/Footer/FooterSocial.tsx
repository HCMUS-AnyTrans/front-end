'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const socialLinks = [
  { name: 'facebook', icon: Facebook, color: '#1877F2' },
  { name: 'twitter', icon: Twitter, color: '#1DA1F2' },
  { name: 'instagram', icon: Instagram, color: '#E4405F' },
  { name: 'linkedin', icon: Linkedin, color: '#0A66C2' },
];

export default function FooterSocial() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-lg text-white relative inline-block">
        Connect
        <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full" />
      </h3>
      <div className="flex items-center gap-3">
        {socialLinks.map((social) => {
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
  );
}
