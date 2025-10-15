import { CheckEmailClient } from './check-email-client';

interface CheckEmailPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function CheckEmailPage({
  searchParams,
}: CheckEmailPageProps) {
  const params = await searchParams;
  return <CheckEmailClient email={params.email} />;
}
