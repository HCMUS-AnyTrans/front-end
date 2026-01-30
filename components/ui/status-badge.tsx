import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-50 text-gray-700 border-gray-200',
        success: 'bg-green-50 text-green-700 border-green-200',
        warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        error: 'bg-red-50 text-red-700 border-red-200',
        info: 'bg-blue-50 text-blue-700 border-blue-200',
        processing: 'bg-purple-50 text-purple-700 border-purple-200',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const iconSizeMap = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
};

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  label: string;
  icon?: LucideIcon;
  iconClassName?: string;
  spinning?: boolean;
}

function StatusBadge({
  label,
  icon: Icon,
  iconClassName,
  spinning = false,
  variant,
  size = 'md',
  className,
  ...props
}: StatusBadgeProps) {
  const iconSize = iconSizeMap[size || 'md'];

  return (
    <div
      className={cn(statusBadgeVariants({ variant, size }), className)}
      {...props}
    >
      {Icon && (
        <Icon
          className={cn(iconSize, spinning && 'animate-spin', iconClassName)}
        />
      )}
      <span>{label}</span>
    </div>
  );
}

export { StatusBadge, statusBadgeVariants };
