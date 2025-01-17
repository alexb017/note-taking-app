'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '@/app/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import SearchNote from './search-note';
import useUserProfile from '@/lib/use-user-profile';
import { UserProfile } from '@/lib/types';
import DropdownUser from './dropdown-user';
import { ThemeSwitcher } from './theme-switcher';

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const userProfile = useUserProfile(user?.uid) as UserProfile;
  const router = useRouter();

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
          <ThemeSwitcher />
          {!user ? (
            <>
              <Button asChild className="rounded-full">
                <Link href="/login">Sign in</Link>
              </Button>
            </>
          ) : (
            <>
              <div className="hidden md:flex">
                <DropdownUser user={userProfile} screen="desktop" />
              </div>
              <div className="flex md:hidden">
                <DropdownUser user={userProfile} screen="mobile" />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
