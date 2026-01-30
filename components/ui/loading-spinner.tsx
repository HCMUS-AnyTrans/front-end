import React from 'react';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const loadingSpinnerVariants = cva('animate-spin', {
  variants: {
    variant: {
      default: 'text-gray-500',
      primary: 'text-primary',
      secondary: 'text-gray-400',
      white: 'text-white',
    },
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingSpinnerVariants> {
  label?: string;
  showLabel?: boolean;
}

function LoadingSpinner({
  variant,
  size,
  label = 'Loading...',
  showLabel = false,
  className,
  ...props
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn('flex items-center justify-center gap-2', className)}
      role="status"
      aria-label={label}
      {...props}
    >
      <Loader2 className={cn(loadingSpinnerVariants({ variant, size }))} />
      {showLabel && <span className="text-sm text-gray-600">{label}</span>}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export { LoadingSpinner, loadingSpinnerVariants };
