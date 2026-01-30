'use client';

import React from 'react';
import { useOTPInput } from './useOTPInput';
import { OTPInputDisplay } from './OTPInputDisplay';

export interface OTPInputProps {
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
  const {
    values,
    focusedIndex,
    inputRefs,
    handleInputChange,
    handleKeyDown,
    handleFocus,
    handlePaste,
  } = useOTPInput({ value, onChange, length });

  return (
    <OTPInputDisplay
      values={values}
      length={length}
      focusedIndex={focusedIndex}
      inputRefs={inputRefs}
      disabled={disabled}
      className={className}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onPaste={handlePaste}
    />
  );
}
