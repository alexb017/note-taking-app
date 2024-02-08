'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useContext } from 'react';
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

export default function Navbar() {
  const { user, userSignOut } = useContext(AuthContext);
  const router = useRouter();
  const username = user?.email.slice(0, user?.email.indexOf('@'));
  console.log(user);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <Link
          href="/"
          className="flex items-center gap-1 text-gray-500 text-2xl font-medium"
        >
          <LogoIcon classname="h-10 text-yellow-500" />
          NoteTaking
        </Link>
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
                  <DropdownItem key="profile_page" textValue="profile_page">
                    My Profile
                  </DropdownItem>
                  <DropdownItem key="dark_theme" textValue="dark_theme">
                    Switch to Dark Theme
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    textValue="logout"
                    onClick={() => userSignOut()}
                  >
                    Log Out
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
