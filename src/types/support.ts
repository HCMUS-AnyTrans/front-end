export interface FAQ {
  category: string;
  question: string;
  answer: string;
}

export interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  hoverColor: string;
  bgColor: string;
  hoverBgColor: string;
  textColor: string;
  actionText: string;
  onClick: () => void;
}

export interface AdditionalResource {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgGradient: string;
  borderColor: string;
  iconBg: string;
  textColor: string;
  hoverTextColor: string;
  actionText: string;
  onClick: () => void;
}
