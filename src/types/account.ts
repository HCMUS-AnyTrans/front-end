export type UserData = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  avatar: string | null;
};

export type Plan = {
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  credits: { used: number; total: number };
  renewalDate: string;
  status: 'active' | 'canceled' | 'past_due';
};

export type PaymentMethod = {
  id: string;
  type: 'visa' | 'mastercard';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
};

export type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'refunded';
};

export type Session = {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
};

export type Preferences = {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'vi' | 'es' | 'fr';
  emailNotifications: boolean;
  pushNotifications: boolean;
  translationAlerts: boolean;
};
