import { ResetPasswordClient } from './reset-password-client';

interface ResetPasswordPageProps {
  searchParams: {
    token?: string;
  };
}

export default function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  return <ResetPasswordClient token={searchParams.token} />;
}
