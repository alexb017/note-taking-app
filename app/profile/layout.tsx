import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteTaking - Profile',
  description: 'User profile',
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full h-[calc(100lvh-65px)] p-4">
      {children}
    </div>
  );
}
