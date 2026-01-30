'use client';

import React, { useRef, useState, useEffect } from 'react';

interface UseOTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length: number;
}

export function useOTPInput({ value, onChange, length }: UseOTPInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const values = value.split('').concat(Array(length - value.length).fill(''));

  const handleInputChange = (index: number, inputValue: string) => {
    const numericValue = inputValue.replace(/\D/g, '');

    if (numericValue.length > 1) {
      const digits = numericValue.slice(0, length);
      onChange(digits);

      const nextIndex = Math.min(digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      setFocusedIndex(nextIndex);
      return;
    }

    const newValues = [...values];
    newValues[index] = numericValue;
    const newValue = newValues.join('');

    onChange(newValue);

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
        const newValues = [...values];
        newValues[index] = '';
        onChange(newValues.join(''));
      } else if (index > 0) {
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

      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      setFocusedIndex(nextIndex);
    }
  };

  // biome-ignore lint: run only once on mount
  useEffect(() => {
    const firstEmptyIndex = values.findIndex((val) => val === '');
    const indexToFocus = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
    inputRefs.current[indexToFocus]?.focus();
    setFocusedIndex(indexToFocus);
  }, []);

  return {
    values,
    focusedIndex,
    inputRefs,
    handleInputChange,
    handleKeyDown,
    handleFocus,
    handlePaste,
  };
}
