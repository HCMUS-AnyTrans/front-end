'use client';

import React, { RefObject } from 'react';
import { Input } from '@/components/ui/input';

interface OTPInputDisplayProps {
  values: string[];
  length: number;
  focusedIndex: number;
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
  disabled: boolean;
  className: string;
  onInputChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

export function OTPInputDisplay({
  values,
  length,
  focusedIndex,
  inputRefs,
  disabled,
  className,
  onInputChange,
  onKeyDown,
  onFocus,
  onPaste,
}: OTPInputDisplayProps) {
  return (
    <div className={`flex gap-2 justify-center ${className}`}>
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={values[index]}
          onChange={(e) => onInputChange(index, e.target.value)}
          onKeyDown={(e) => onKeyDown(index, e)}
          onFocus={() => onFocus(index)}
          onPaste={onPaste}
          disabled={disabled}
          className={`
            w-12 h-12 text-center text-lg font-semibold
            border-2 transition-colors
            ${
              focusedIndex === index
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-input hover:border-primary/50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            focus:outline-none focus:ring-2 focus:ring-primary/20
          `}
          aria-label={`Digit ${index + 1} of ${length}`}
        />
      ))}
    </div>
  );
}
