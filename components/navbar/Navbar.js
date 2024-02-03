'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import LogoIcon from '../icons/logo';
import styles from './navbar.module.css';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('isDarkTheme') === 'true';
    }
  });
  const [showModalSettings, setShowModalSettings] = useState(false);
  const modalRef = useRef(null);
  const btnRef = useRef(null);
  const session = useSession();

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
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <h1 className={styles.navTitle}>
          <LogoIcon classname={styles.iconWh} />
          NoteTaking
        </h1>
        <div className="nav-right">
          <div>{session?.data?.user?.name}</div>
          <button onClick={() => signOut()}>Logout</button>
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
