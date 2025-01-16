'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import LogoIcon from './icons/logo';
import { AuthContext } from '@/app/auth-context';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import SearchNote from './search-note';
import useUserProfile from '@/lib/use-user-profile';
import { UserProfile } from '@/lib/types';
import LoginIcon from './icons/login';
import DropdownUser from './dropdown-user';
import { ThemeSwitcher } from './theme-switcher';

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const userProfile = useUserProfile(user?.uid) as UserProfile;
  const router = useRouter();

  // console.log(user);
  // console.log(userProfile);

  return (
    <nav className="fixed top-0 left-0 z-50 shadow-sm bg-white border-b border-zinc-200 w-full dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center justify-between h-16 px-4 pl-3 w-full">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-zinc-600 text-xl md:text-2xl font-medium dark:text-zinc-200"
          >
            <LogoIcon classname="h-10 text-yellow-500" />
            NoteTaking
          </Link>
          {user && <SearchNote />}
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeSwitcher />
          {/* <Button
            isIconOnly
            size="sm"
            radius="md"
            className="bg-zinc-900/10 dark:bg-zinc-100/10"
            onPress={() => {
              if (theme === 'light') {
                setTheme('dark');
              } else {
                setTheme('light');
              }
            }}
          >
            {theme === 'light' ? (
              <SunIcon classname="h-4" />
            ) : (
              <MoonIcon classname="h-4" />
            )}
          </Button> */}
          {!user ? (
            <>
              <Button
                color="default"
                variant="flat"
                radius="md"
                size="sm"
                className="font-medium"
                startContent={<LoginIcon classname="h-4" />}
                onPress={() => router.push('/login')}
              >
                Log In
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
