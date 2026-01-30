import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconContainerVariants = cva(
  'rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-primary-light/10 text-brand-primary-light hover:bg-brand-primary-light/20',
        'primary-dark':
          'bg-brand-primary-dark/10 text-brand-primary-dark hover:bg-brand-primary-dark/20',
        secondary: 'bg-muted text-muted-foreground hover:bg-muted/80',
        success: 'bg-green-100 text-green-600 hover:bg-green-200',
        warning: 'bg-amber-100 text-amber-600 hover:bg-amber-200',
        danger: 'bg-red-100 text-red-600 hover:bg-red-200',
        purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
        indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200',
        rose: 'bg-rose-100 text-rose-600 hover:bg-rose-200',
      },
      size: {
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-14 h-14',
        xl: 'w-16 h-16',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface IconContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconContainerVariants> {
  icon?: React.ReactNode;
}

const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <div
        className={cn(iconContainerVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon || children}
      </div>
    );
  }
);
IconContainer.displayName = 'IconContainer';

export { IconContainer, iconContainerVariants };
