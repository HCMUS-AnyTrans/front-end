'use client';

import React, { useState, useEffect } from 'react';
import { OfficeLocations } from './OfficeLocations';
import { WorkingHours } from './WorkingHours';
import { WhyContactUs } from './WhyContactUs';
import { ContactInfoProps } from '@/types/contact';

export default function ContactInfo({ offices, reasons }: ContactInfoProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="gap-8 flex flex-col justify-between">
      <OfficeLocations offices={offices} isVisible={isVisible} />
      <WorkingHours isVisible={isVisible} />
      <WhyContactUs reasons={reasons} isVisible={isVisible} />
    </div>
  );
}
