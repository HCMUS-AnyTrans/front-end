'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FooterNewsletter() {
  const t = useTranslations('footer.newsletter');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-lg text-white mb-2">{t('title')}</h3>
        <p className="text-gray-400 text-sm">{t('description')}</p>
      </div>

      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3.5 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4169E1]/50 focus:border-[#4169E1]/50 transition-all duration-300"
        />
        <Button
          onClick={handleSubmit}
          variant="gradient-primary"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}
