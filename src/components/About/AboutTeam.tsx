'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { AboutTeamProps } from '@/types/about';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AboutTeam({ team }: AboutTeamProps) {
  const t = useTranslations('about.sections.team');
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
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('title')}</h2>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {team.map((member) => (
          <Card
            key={member.name}
            className={`overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="bg-gradient-to-br from-brand-primary-light via-brand-primary-dark to-brand-primary-light h-48 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="object-cover"
                  fill
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-brand-primary-light font-medium mb-3">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-gray-100 hover:bg-brand-primary-light/10 rounded-lg"
                >
                  <Linkedin className="w-4 h-4 text-gray-600 group-hover:text-brand-primary-light" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-gray-100 hover:bg-brand-primary-light/10 rounded-lg"
                >
                  <Twitter className="w-4 h-4 text-gray-600 group-hover:text-brand-primary-light" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-gray-100 hover:bg-brand-primary-light/10 rounded-lg"
                >
                  <Mail className="w-4 h-4 text-gray-600 group-hover:text-brand-primary-light" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
