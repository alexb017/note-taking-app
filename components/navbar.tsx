'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '@/app/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import SearchNote from './search-note';
import useUserProfile from '@/lib/use-user-profile';
import { type UserProfile } from '@/lib/types';
import DropdownUser from './dropdown-user';
import { ThemeSwitcher } from './theme-switcher';
import { User } from 'firebase/auth';

export default function Navbar() {
  const { user, userSignOut } = useContext(AuthContext) as {
    user: User;
    userSignOut: () => Promise<void>;
  };
  const router = useRouter();

  console.log('user uid', user?.uid);

  return (
    <nav className="fixed top-0 left-0 z-50 shadow-sm bg-white border-b border-zinc-200 w-full dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center justify-between h-16 px-4 pl-3 w-full">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-zinc-600 text-xl font-medium tracking-tighter dark:text-zinc-200"
          >
            <DocumentTextIcon className="h-8 text-yellow-500" />
            NoteTaking
          </Link>
          {user && <SearchNote />}
        </div>
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Button asChild className="rounded-full">
                <Link href="/auth">Sign In</Link>
              </Button>
            </>
          ) : (
            <>
              <ThemeSwitcher />
              <DropdownUser uid={user?.uid} onUserSignOut={userSignOut} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
