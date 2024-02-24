'use client';

import useUserProfile from '@/lib/use-user-profile';
import { useContext } from 'react';
import { AuthContext } from '../auth-context';
import { UserProfile } from '@/lib/types';
import { Avatar, Button } from '@nextui-org/react';
import {
  deleteUserFromDatabase,
  deleteUserFromFirebase,
  deleteUserNotesFromDatabase,
} from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const userProfile = useUserProfile(user?.uid) as UserProfile;
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar src={userProfile?.photoURL} className="w-20 h-20" />
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-semibold">{userProfile?.displayName}</h3>
        <p className="text-base text-zinc-500">{userProfile?.email}</p>
      </div>
      <Button
        color="danger"
        variant="light"
        onClick={async () => {
          try {
            await deleteUserNotesFromDatabase(user?.uid);
            await deleteUserFromDatabase(user?.uid);
            await deleteUserFromFirebase(user);

            router.push('/');
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Delete account
      </Button>
    </div>
  );
}
