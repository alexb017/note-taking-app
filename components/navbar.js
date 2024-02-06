'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useContext } from 'react';
import LogoIcon from './icons/logo';
import { AuthContext } from '@/app/AuthContext';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('isDarkTheme') === 'true';
    }
  });
  const [showModalSettings, setShowModalSettings] = useState(false);
  const modalRef = useRef(null);
  const btnRef = useRef(null);
  const router = useRouter();

  const { user, googleSignOut } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setShowModalSettings(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalRef, showModalSettings, btnRef]);

  useEffect(() => {
    localStorage.setItem('isDarkTheme', isDarkTheme);

    if (isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkTheme]);

  function handleThemeClick() {
    setIsDarkTheme(!isDarkTheme);
    setShowModalSettings(false);
  }

  function toggleModalSettings() {
    setShowModalSettings(!showModalSettings);
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-14 px-4">
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
                color="primary"
                variant="shadow"
                radius="md"
                onClick={() => router.push('/signup')}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <p>{user?.displayName}</p>
              <button onClick={() => googleSignOut()}>signout</button>
            </>
          )}
          {/* <div className="nav-auth">
            <Link href="/login" className="auth-login">
              Login
            </Link>
            <Link href="/signup" className="auth-signup">
              Sign up
            </Link>
          </div> */}
          {/* <div className="notes-settings">
            <Button secondary onClick={toggleModalSettings} ref={btnRef}>
              <UserIcon classname="icon" />
              Settings
            </Button>
            {showModalSettings && (
              <div className="modal-settings" ref={modalRef}>
                <div className="settings-auth">
                  <p>Login</p>
                </div>
                <div className="settings-content">
                  <p>Settings</p>
                  <hr />
                  <Button className="btn-appearance" onClick={handleThemeClick}>
                    Switch appearance
                    <Icon iconName="iconMoon" />
                  </Button>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </nav>
  );
}
