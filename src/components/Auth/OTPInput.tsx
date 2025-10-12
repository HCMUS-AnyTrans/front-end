'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  className = '',
}: OTPInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split value into array and pad with empty strings
  const values = value.split('').concat(Array(length - value.length).fill(''));

  const handleInputChange = (index: number, inputValue: string) => {
    // Only allow numeric input
    const numericValue = inputValue.replace(/\D/g, '');

    if (numericValue.length > 1) {
      // Handle paste - distribute digits across inputs
      const digits = numericValue.slice(0, length);
      onChange(digits);

      // Focus the next empty input or the last input
      const nextIndex = Math.min(digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      setFocusedIndex(nextIndex);
      return;
    }

    // Single digit input
    const newValues = [...values];
    newValues[index] = numericValue;
    const newValue = newValues.join('');

    onChange(newValue);

    // Auto-advance to next input
    if (numericValue && index < length - 1) {
      const nextInput = inputRefs.current[index + 1];
      nextInput?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (values[index]) {
        // Clear current input
        const newValues = [...values];
        newValues[index] = '';
        onChange(newValues.join(''));
      } else if (index > 0) {
        // Move to previous input and clear it
        const prevInput = inputRefs.current[index - 1];
        prevInput?.focus();
        setFocusedIndex(index - 1);

        const newValues = [...values];
        newValues[index - 1] = '';
        onChange(newValues.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');

    if (pastedData.length <= length) {
      onChange(pastedData);

      // Focus the next empty input or the last input
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      setFocusedIndex(nextIndex);
    }
  };

  // Auto-focus first empty input when component mounts
  useEffect(() => {
    const firstEmptyIndex = values.findIndex((val) => val === '');
    const indexToFocus = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
    inputRefs.current[indexToFocus]?.focus();
    setFocusedIndex(indexToFocus);
  }, []);

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
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          onPaste={handlePaste}
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
