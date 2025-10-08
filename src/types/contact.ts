import { LucideIcon } from 'lucide-react';

export interface ContactMethod {
  icon: LucideIcon;
  title: string;
  description: string;
  contact: string;
  color: string;
}

export interface Office {
  city: string;
  country: string;
  address: string;
  zipcode: string;
}

export interface SocialLink {
  icon: LucideIcon;
  name: string;
  url: string;
  color: string;
}

export interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMethodsProps {
  methods: ContactMethod[];
}

export interface ContactFormProps {
  onSubmit: (formData: ContactFormData) => void;
}

export interface ContactInfoProps {
  offices: Office[];
  reasons: Reason[];
}

export interface ContactSocialProps {
  socialLinks: SocialLink[];
}
