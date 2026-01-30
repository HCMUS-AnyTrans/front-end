export type StrengthLevel = 'very-weak' | 'weak' | 'fair' | 'good' | 'strong';

export interface StrengthInfo {
  level: StrengthLevel;
  score: number;
  label: string;
  color: string;
  requirements: string[];
}

export function calculatePasswordStrength(password: string): StrengthInfo {
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

  if (password.length >= 8) {
    score += 1;
  } else {
    requirements.push('At least 8 characters');
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    requirements.push('Lowercase letter');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    requirements.push('Uppercase letter');
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    requirements.push('Number');
  }

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
  } else {
    requirements.push('Special character');
  }

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
}
