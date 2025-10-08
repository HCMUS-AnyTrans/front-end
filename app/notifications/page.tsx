import NotificationsClient from './notifications-client';

export default function Page() {
  // Server Component wrapper; all client state stays inside NotificationsClient
  return <NotificationsClient />;
}
