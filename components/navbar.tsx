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
  Avatar,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import UserIcon from './icons/user';
import SunIcon from './icons/sun';
import MoonIcon from './icons/moon';
import LogoutIcon from './icons/logout';
import SearchNote from './search-note';
import useUserProfile from '@/lib/use-user-profile';
import { UserProfile } from '@/lib/types';
import NotesIcon from './icons/notes';
import BellIcon from './icons/bell';
import ArchiveIcon from './icons/archive';
import TrashIcon from './icons/trash';
import LoginIcon from './icons/login';

export default function Navbar() {
  const { user, userSignOut } = useContext(AuthContext);
  const userProfile = useUserProfile(user?.uid) as UserProfile;
  const router = useRouter();

  console.log(user);
  console.log(userProfile);

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
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            isIconOnly
            size="sm"
            radius="md"
            className="bg-zinc-900/10 dark:bg-zinc-100/10"
            onClick={() => {
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
          </Button>
          {!user ? (
            <>
              <Button
                color="default"
                variant="flat"
                radius="md"
                size="sm"
                className="font-medium"
                startContent={<LoginIcon classname="h-4" />}
                onClick={() => router.push('/login')}
              >
                Log In
              </Button>
              {/* <Button
                color="warning"
                variant="flat"
                radius="md"
                className="font-medium"
                onClick={() => router.push('/signup')}
              >
                Sign Up
              </Button> */}
            </>
          ) : (
            <>
              <div className="hidden md:flex">
                <Dropdown placement="bottom-start">
                  <DropdownTrigger>
                    <User
                      as="button"
                      avatarProps={{
                        isBordered: true,
                        src: `${userProfile?.photoURL}`,
                      }}
                      className="transition-transform"
                      description={userProfile?.email}
                      name={userProfile?.displayName}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem
                      key="profile"
                      className="h-14 gap-2"
                      textValue="profile"
                    >
                      <p className="font-bold">Signed in as</p>
                      <p className="font-bold">{`${userProfile?.email}`}</p>
                    </DropdownItem>
                    <DropdownItem
                      key="profile_page"
                      textValue="profile_page"
                      onClick={() => router.push('/profile')}
                      startContent={<UserIcon classname="h-4" />}
                    >
                      My Profile
                    </DropdownItem>
                    <DropdownItem
                      key="my_notes"
                      textValue="my_notes"
                      onClick={() => router.push('/notes')}
                      startContent={<NotesIcon classname="h-4" />}
                    >
                      Notes
                    </DropdownItem>
                    <DropdownItem
                      key="my_reminders"
                      textValue="my_reminders"
                      onClick={() => router.push('/notes/reminders')}
                      startContent={<BellIcon classname="h-4" />}
                    >
                      Reminders
                    </DropdownItem>
                    <DropdownItem
                      key="my_archive"
                      textValue="my_archive"
                      onClick={() => router.push('/notes/archive')}
                      startContent={<ArchiveIcon classname="h-4" />}
                    >
                      Archive
                    </DropdownItem>
                    <DropdownItem
                      key="my_trash"
                      textValue="my_trash"
                      onClick={() => router.push('/notes/trash')}
                      startContent={<TrashIcon classname="h-4" />}
                    >
                      Trash
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
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="flex md:hidden">
                <Dropdown placement="bottom-start">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      src={userProfile?.photoURL}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem
                      key="profile"
                      className="h-14 gap-2"
                      textValue="profile"
                    >
                      <p className="font-bold">Signed in as</p>
                      <p className="font-bold">{`${userProfile?.email}`}</p>
                    </DropdownItem>
                    <DropdownItem
                      key="profile_page"
                      textValue="profile_page"
                      onClick={() => router.push('/profile')}
                      startContent={<UserIcon classname="h-4" />}
                    >
                      My Profile
                    </DropdownItem>
                    <DropdownItem
                      key="my_notes"
                      textValue="my_notes"
                      onClick={() => router.push('/notes')}
                      startContent={<NotesIcon classname="h-4" />}
                    >
                      Notes
                    </DropdownItem>
                    <DropdownItem
                      key="my_reminders"
                      textValue="my_reminders"
                      onClick={() => router.push('/notes/reminders')}
                      startContent={<BellIcon classname="h-4" />}
                    >
                      Reminders
                    </DropdownItem>
                    <DropdownItem
                      key="my_archive"
                      textValue="my_archive"
                      onClick={() => router.push('/notes/archive')}
                      startContent={<ArchiveIcon classname="h-4" />}
                    >
                      Archive
                    </DropdownItem>
                    <DropdownItem
                      key="my_trash"
                      textValue="my_trash"
                      onClick={() => router.push('/notes/trash')}
                      startContent={<TrashIcon classname="h-4" />}
                    >
                      Trash
                    </DropdownItem>
                    {/* <DropdownItem
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
                      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                    </DropdownItem> */}
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
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
