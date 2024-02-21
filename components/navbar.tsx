'use client';

import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import LogoIcon from './icons/logo';
import { AuthContext } from '@/app/auth-context';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import UserIcon from './icons/user';
import SunIcon from './icons/sun';
import MoonIcon from './icons/moon';
import LogoutIcon from './icons/logout';
import SearchNote from './search-note';

export default function Navbar() {
  const { user, userSignOut } = useContext(AuthContext);
  const router = useRouter();
  const username = user?.email.slice(0, user?.email.indexOf('@'));

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Button
                color="default"
                variant="light"
                radius="md"
                className="font-medium"
                onClick={() => router.push('/login')}
              >
                Log In
              </Button>
              <Button
                color="warning"
                variant="flat"
                radius="md"
                className="font-medium"
                onClick={() => router.push('/signup')}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: `${user?.photoURL}`,
                    }}
                    className="transition-transform"
                    description={`@${username}`}
                    name={`${user?.displayName}`}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="h-14 gap-2"
                    textValue="profile"
                  >
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">{`@${username}`}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="profile_page"
                    textValue="profile_page"
                    startContent={<UserIcon classname="h-4" />}
                  >
                    My profile
                  </DropdownItem>
                  <DropdownItem
                    key="dark_theme"
                    textValue="dark_theme"
                    startContent={
                      theme === 'light' ? (
                        <SunIcon classname="h-4" />
                      ) : (
                        <MoonIcon classname="h-4" />
                      )
                    }
                    onClick={() => {
                      if (theme === 'light') {
                        setTheme('dark');
                      } else {
                        setTheme('light');
                      }
                    }}
                  >
                    Switch to {theme === 'light' ? 'dark' : 'light'} theme
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    textValue="logout"
                    startContent={<LogoutIcon classname="h-4" />}
                    onClick={() => {
                      userSignOut();
                      router.push('/');
                    }}
                  >
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
