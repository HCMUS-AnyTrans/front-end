import {
  LayoutDashboard,
  FileText,
  BookOpen,
  History,
  Settings,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';
import { type SharedLanguageOption } from '@/shared/data';
export { supportedLanguages, languageCodeMap } from '@/shared/data';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Dịch tài liệu',
    href: '/documents',
    icon: FileText,
  },
  {
    title: 'Từ điển thuật ngữ',
    href: '/glossary',
    icon: BookOpen,
  },
  {
    title: 'Lịch sử',
    href: '/history',
    icon: History,
  },
];

export const secondaryNavItems: NavItem[] = [
  {
    title: 'Cài đặt',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'Trợ giúp',
    href: '/help',
    icon: HelpCircle,
  },
];

export const navGroups: NavGroup[] = [
  {
    label: 'Menu chính',
    items: mainNavItems,
  },
  {
    label: 'Khác',
    items: secondaryNavItems,
  },
];

export const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/documents': 'Dịch tài liệu',
  '/glossary': 'Từ điển thuật ngữ',
  '/history': 'Lịch sử',
  '/settings': 'Cài đặt',
  '/help': 'Trợ giúp',
};

export type Language = SharedLanguageOption;
