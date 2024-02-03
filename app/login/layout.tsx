import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteTaking - Login',
  description: 'Login into NoteTaking app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
