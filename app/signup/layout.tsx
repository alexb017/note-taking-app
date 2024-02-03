import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteTaking - Sign up',
  description: 'Create account for NoteTaking app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
