import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient:
          'bg-gradient-to-r from-gradient-from to-gradient-to hover:from-gradient-to hover:to-gradient-from disabled:from-gray-400 disabled:to-gray-500 text-white shadow-lg rounded-xl font-semibold',
        'gradient-primary':
          'bg-gradient-to-r from-gradient-from via-gradient-to to-gradient-from text-primary-foreground rounded-xl font-semibold hover:shadow-xl bg-[length:200%_100%] bg-[position:0%_0%] hover:bg-[position:100%_0%] transition-[background-position,box-shadow] duration-700 ease-in-out',
        'outline-gradient':
          'border-2 border-brand-primary-light text-brand-primary-light hover:bg-brand-primary-light hover:text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-500 ease-in-out',
      },
      size: {
        default: 'rounded-sm h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        xl: 'h-12 px-8 py-3 text-base',
        '2xl': 'h-14 px-8 py-4 text-lg',
        hero: 'h-[52px] w-[160px] text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
