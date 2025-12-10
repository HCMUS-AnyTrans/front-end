export type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type SidebarProps = {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
};

export type SidebarNavProps = {
  items: NavItem[];
  isActive: (href: string) => boolean;
  isCollapsed?: boolean;
};

export type SecondaryNavProps = {
  items: NavItem[];
  isActive: (href: string) => boolean;
  isCollapsed?: boolean;
};

export type MobileHeaderProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export type MobileOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type UserProfileButtonProps = {
  planLabel: string;
  onOpenAccount: () => void;
  isCollapsed?: boolean;
};
