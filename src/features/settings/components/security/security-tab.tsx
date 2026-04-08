'use client';

import { useSearchParams } from 'next/navigation';
import { SecurityLoginMethodsSection } from './login-methods-section';
import { SecurityOauthBanner } from './oauth-banner';
import { SecurityPasswordSection } from './password-section';
import { SecurityTabFallback } from './tab.fallback';
import {
  useIdentities,
  useUnlinkIdentity,
  useLinkIdentity,
  useChangePassword,
} from '../../hooks/use-security';
import { useSecurityOauthCallback } from '../../hooks/use-security-oauth-callback';
import { useSecurityPasswordForm } from '../../hooks/use-security-password-form';

export function SecurityTab() {
  const searchParams = useSearchParams();
  const { identities, isLoading: isLoadingIdentities } = useIdentities();
  const { unlinkIdentity, isUnlinking } = useUnlinkIdentity();
  const { linkIdentity, isLinking } = useLinkIdentity();
  const {
    changePassword,
    isChanging,
    isError: isPasswordError,
    error: passwordError,
    reset: resetPassword,
  } = useChangePassword();

  const { linkSuccess } = useSecurityOauthCallback({ searchParams });
  const passwordForm = useSecurityPasswordForm({
    changePassword,
    resetPassword,
  });

  if (isLoadingIdentities) {
    return <SecurityTabFallback />;
  }

  return (
    <div className="space-y-6">
      <SecurityOauthBanner linkSuccess={linkSuccess} />

      <SecurityPasswordSection
        showPasswordDialog={passwordForm.showPasswordDialog}
        passwordForm={passwordForm.passwordForm}
        isChanging={isChanging}
        isPasswordError={isPasswordError}
        passwordError={passwordError}
        onOpenChange={passwordForm.handleOpenPasswordDialog}
        onFormChange={passwordForm.setPasswordForm}
        onSubmit={passwordForm.handleChangePassword}
      />

      <SecurityLoginMethodsSection
        identities={identities ?? []}
        isLinking={isLinking}
        isUnlinking={isUnlinking}
        onLink={linkIdentity}
        onUnlink={unlinkIdentity}
      />
    </div>
  );
}
