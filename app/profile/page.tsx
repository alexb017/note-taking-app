import type { Metadata } from 'next';
import Profile from './profile';

export const metadata: Metadata = {
  title: 'NoteTaking - Profile',
  description: 'User profile',
};

export default function ProfilePage() {
  return (
    <div className="flex justify-center w-full h-[calc(100lvh-65px)] p-4">
      <div className="flex flex-col items-center gap-2">
        <p>Profile</p>
        <Profile />
      </div>
    </div>
  );
}
