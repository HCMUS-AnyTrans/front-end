import { LanguageFlag } from './language-flag';

interface LanguageLabelProps {
  value: string;
}

export function LanguageLabel({ value }: LanguageLabelProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
      <LanguageFlag
        value={value}
        className="w-7 shrink-0 border border-border"
        fallbackClassName="h-4 w-5 shrink-0 rounded-sm"
      />
      <span>{value}</span>
    </span>
  );
}
