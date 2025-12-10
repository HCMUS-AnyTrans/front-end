import Sidebar from '@/components/Layout/Sidebar/Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {children}
    </div>
  );
}
