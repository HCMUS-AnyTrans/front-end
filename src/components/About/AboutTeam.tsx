'use client';

import React, { useState, useEffect } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { AboutTeamProps } from '@/src/types/about';

export default function AboutTeam({ team }: AboutTeamProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section>
      <div
        className={`text-center mb-10 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Meet Our Team</h2>
        <p className="text-lg text-gray-600">
          The passionate people behind AnyTrans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {team.map((member, idx) => (
          <div
            key={member.name}
            className={`bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-700 shadow-lg ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: `${idx * 200}ms`,
            }}
          >
            <div className="bg-gradient-to-br from-[#4169E1] via-[#1e3a8a] to-[#4169E1] h-48 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-[#4169E1] font-medium mb-3">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 bg-gray-100 hover:bg-[#4169E1]/10 rounded-lg flex items-center justify-center transition-all group">
                  <Linkedin className="w-4 h-4 text-gray-600 group-hover:text-[#4169E1]" />
                </button>
                <button className="w-8 h-8 bg-gray-100 hover:bg-[#4169E1]/10 rounded-lg flex items-center justify-center transition-all group">
                  <Twitter className="w-4 h-4 text-gray-600 group-hover:text-[#4169E1]" />
                </button>
                <button className="w-8 h-8 bg-gray-100 hover:bg-[#4169E1]/10 rounded-lg flex items-center justify-center transition-all group">
                  <Mail className="w-4 h-4 text-gray-600 group-hover:text-[#4169E1]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
