'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { type UserProfile } from '@/lib/types';
import {
  deleteUserFromDatabase,
  deleteUserFromFirebase,
  deleteUserNotesFromDatabase,
} from '@/lib/actions';
import { useContext } from 'react';
import { AuthContext } from '../auth-context';
import { User } from 'firebase/auth';
import useUserProfile from '@/lib/use-user-profile';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogOverlay,
} from '@/components/ui/alert-dialog';

export default function Profile() {
  const { user, userSignOut } = useContext(AuthContext) as {
    user: User;
    userSignOut: () => Promise<void>;
  };
  const [userProfile] = useUserProfile(user?.uid) as [UserProfile];
  const router = useRouter();

  async function handleDeleteAccount(userId: string) {
    try {
      const res = await fetch('/api/delete_user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar>
        <AvatarImage
          src={userProfile?.photoURL}
          alt={userProfile?.displayName}
        />
        <AvatarFallback>{userProfile?.displayName}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold tracking-tighter">
          {userProfile?.displayName}
        </h2>
        <p className="text-zinc-400">{userProfile?.email}</p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="rounded-full">
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-0 shadow-lg sm:rounded-xl dark:bg-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full dark:bg-zinc-700 dark:hover:bg-zinc-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full"
              onClick={async () => {
                try {
                  await handleDeleteAccount(user?.uid);
                  await userSignOut();

                  router.push('/');
                } catch (error: any) {
                  throw new Error(error.message);
                }
              }}
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
