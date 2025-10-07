import React from 'react';
import type { Metadata } from 'next';
import AccountPageClient from '@/app/account/account-client';

export const metadata: Metadata = {
  title: 'Account Settings - AnyTrans',
  description:
    'Manage your AnyTrans account settings, profile information, billing details, and preferences. Update your personal information and subscription plans.',
};

export default function AccountPage() {
  return <AccountPageClient />;
}
