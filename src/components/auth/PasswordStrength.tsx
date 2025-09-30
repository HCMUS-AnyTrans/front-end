'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

type StrengthLevel = 'very-weak' | 'weak' | 'fair' | 'good' | 'strong';

interface StrengthInfo {
  level: StrengthLevel;
  score: number;
  label: string;
  color: string;
  requirements: string[];
}

export function PasswordStrength({
  password,
  className = '',
}: PasswordStrengthProps) {
  const calculateStrength = (password: string): StrengthInfo => {
    if (!password) {
      return {
        level: 'very-weak',
        score: 0,
        label: 'Very Weak',
        color: 'bg-red-500',
        requirements: [],
      };
    }

    let score = 0;
    const requirements: string[] = [];

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      requirements.push('At least 8 characters');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      requirements.push('Lowercase letter');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      requirements.push('Uppercase letter');
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1;
    } else {
      requirements.push('Number');
    }

    // Special character check
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      score += 1;
    } else {
      requirements.push('Special character');
    }

    // Very strong check (12+ chars with all requirements)
    if (password.length >= 12 && score === 5) {
      score += 1;
    }

    const strengthLevels: Record<number, StrengthInfo> = {
      0: {
        level: 'very-weak',
        score: 0,
        label: 'Very Weak',
        color: 'bg-red-500',
        requirements,
      },
      1: {
        level: 'very-weak',
        score: 20,
        label: 'Very Weak',
        color: 'bg-red-500',
        requirements,
      },
      2: {
        level: 'weak',
        score: 40,
        label: 'Weak',
        color: 'bg-orange-500',
        requirements,
      },
      3: {
        level: 'fair',
        score: 60,
        label: 'Fair',
        color: 'bg-yellow-500',
        requirements,
      },
      4: {
        level: 'good',
        score: 80,
        label: 'Good',
        color: 'bg-blue-500',
        requirements,
      },
      5: {
        level: 'strong',
        score: 95,
        label: 'Strong',
        color: 'bg-green-500',
        requirements,
      },
      6: {
        level: 'strong',
        score: 100,
        label: 'Very Strong',
        color: 'bg-green-600',
        requirements: [],
      },
    };

    return strengthLevels[Math.min(score, 6)];
  };

  const strength = calculateStrength(password);

  if (!password) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Password strength:</span>
        <span
          className={`font-medium ${
            strength.level === 'very-weak'
              ? 'text-red-500'
              : strength.level === 'weak'
                ? 'text-orange-500'
                : strength.level === 'fair'
                  ? 'text-yellow-500'
                  : strength.level === 'good'
                    ? 'text-blue-500'
                    : 'text-green-500'
          }`}
        >
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
