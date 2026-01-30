'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { calculatePasswordStrength, StrengthInfo } from './calculateStrength';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export function PasswordStrength({
  password,
  className = '',
}: PasswordStrengthProps) {
  const strength: StrengthInfo = calculatePasswordStrength(password);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'very-weak':
        return 'text-red-500';
      case 'weak':
        return 'text-orange-500';
      case 'fair':
        return 'text-yellow-500';
      case 'good':
        return 'text-blue-500';
      default:
        return 'text-green-500';
    }
  };

  if (!password) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Password strength:</span>
        <span className={`font-medium ${getLevelColor(strength.level)}`}>
          {strength.label}
        </span>
      </div>

      <Progress value={strength.score} className="h-2" />

      {strength.requirements.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Requirements:</p>
          <ul className="space-y-1">
            {strength.requirements.map((requirement, index) => (
              <li
                key={index}
                className="flex items-center text-xs text-muted-foreground"
              >
                <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2"></span>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
