import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteTaking - Profile',
  description: 'User profile',
};

export default function ProfilePage() {
  return (
    <div className="flex justify-center w-full h-[calc(100lvh-65px)] p-4">
      <div className="flex flex-col items-center gap-2">
        <h1>Profile</h1>
      </div>
    </div>
  );
}
