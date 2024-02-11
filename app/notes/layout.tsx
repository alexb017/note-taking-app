import Sidebar from '@/components/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteTaking - Notes',
  description: 'List of the notes',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[56px,1fr] md:grid-cols-[288px,1fr] gap-2 md:gap-12">
      <Sidebar />
      <div className="p-4 w-full">{children}</div>
    </div>
  );
}
