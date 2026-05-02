import type { LucideIcon } from 'lucide-react';

export interface Domain {
  id: string;
  key: string;
  name: {
    en: string;
    vi: string;
  };
}

export interface DomainWithIcon extends Domain {
  icon: LucideIcon;
}
