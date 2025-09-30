import { CheckEmailClient } from './check-email-client';

interface CheckEmailPageProps {
  searchParams: {
    email?: string;
  };
}

export default function CheckEmailPage({ searchParams }: CheckEmailPageProps) {
  return <CheckEmailClient email={searchParams.email} />;
}
