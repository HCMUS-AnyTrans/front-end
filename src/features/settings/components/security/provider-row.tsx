'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Check, Link as LinkIcon, Loader2, Unlink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { AuthIdentity, AuthProvider } from '../../types';

interface SecurityProviderRowProps {
  provider: (typeof import('../../data').authProviderOptions)[number];
  identity?: AuthIdentity;
  isLinking: boolean;
  isUnlinking: boolean;
  onLink: (provider: AuthProvider) => void;
  onUnlink: (identityId: string) => void;
}

export function SecurityProviderRow({
  provider,
  identity,
  isLinking,
  isUnlinking,
  onLink,
  onUnlink,
}: SecurityProviderRowProps) {
  const t = useTranslations('settings.security');
  const isLinked = Boolean(identity);

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${provider.color}15` }}
        >
          <Image
            src={provider.icon}
            alt={`${provider.name} icon`}
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
        </div>
        <div>
          <p className="font-medium text-foreground">{provider.name}</p>
          {isLinked && identity?.email && (
            <p className="text-sm text-muted-foreground">{identity.email}</p>
          )}
        </div>
      </div>

      {isLinked ? (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Check className="size-3" />
            {t('linked')}
          </Badge>
          {identity?.canUnlink && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => onUnlink(identity.id)}
              disabled={isUnlinking}
            >
              <Unlink className="size-4" />
            </Button>
          )}
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onLink(provider.id as AuthProvider)}
          disabled={isLinking}
        >
          {isLinking ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <LinkIcon className="size-4" />
          )}
          {t('link')}
        </Button>
      )}
    </div>
  );
}
