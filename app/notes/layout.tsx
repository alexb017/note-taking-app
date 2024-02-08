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
    <div className="flex flex-row gap-12">
      <Sidebar />
      <div className="p-2">{children}</div>
    </div>
  );
}
