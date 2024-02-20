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
    <div className="grid grid-cols-[56px,1fr] xl:grid-cols-[256px,1fr] gap-2 md:gap-4">
      <div className="w-14 xl:w-64 h-[calc(100lvh-65px)]">
        <Sidebar />
      </div>
      <div className="p-4 w-full">{children}</div>
    </div>
  );
}
