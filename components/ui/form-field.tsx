import React, { forwardRef, ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  labelClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      hint,
      labelClassName,
      inputClassName,
      wrapperClassName,
      required,
      leftIcon,
      rightIcon,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={cn('space-y-1.5', wrapperClassName)}>
        <Label
          htmlFor={inputId}
          className={cn(
            'text-sm font-medium text-gray-700',
            required && "after:content-['*'] after:ml-0.5 after:text-red-500",
            labelClassName
          )}
        >
          {label}
        </Label>
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <Input
            ref={ref}
            id={inputId}
            className={cn(
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus-visible:ring-red-500',
              inputClassName,
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-600 mt-1"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-gray-500 mt-1">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField };
