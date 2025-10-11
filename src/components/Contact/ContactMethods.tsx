'use client';

import React, { useState, useEffect } from 'react';
import { BaseCard } from '@/components/Common';
import { ContactMethodsProps } from '@/types/contact';

export default function ContactMethods({ methods }: ContactMethodsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {methods.map((method, index) => {
          const Icon = method.icon;
          return (
            <div
              key={method.title}
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <BaseCard
                variant="contact"
                icon={<Icon className="w-7 h-7" />}
                title={method.title}
                description={method.description}
                contact={method.contact}
                color={method.color}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
