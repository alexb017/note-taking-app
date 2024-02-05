'use client';

import Link from 'next/link';
import GoogleIcon from '../../components/icons/google';
import styles from '../../styles/auth.module.css';
import ArrowLeftIcon from '@/components/icons/arrow-left';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const { googleSignIn } = useContext(AuthContext);
  const router = useRouter();
  return (
    <>
      <div className={styles.auth}>
        <div className={styles.authContent}>
          <div>
            <h1 className={styles.authTitleH1}>Create account</h1>
            <p className={styles.authTitleP}>Get started on the NoteTaking.</p>
          </div>
          <div className={styles.formAuthContent}>
            <form className={styles.formAuth}>
              <label htmlFor="email" className={styles.formLabel}>
                Email address
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={styles.formInput}
                  autoComplete="email"
                  placeholder="your@company.com"
                />
              </label>
              <label htmlFor="password" className={styles.formLabel}>
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={styles.formInput}
                  autoComplete="current-password"
                  placeholder="********"
                />
              </label>
              <input
                type="submit"
                value="Continue with Email"
                className={styles.formAuthSubmit}
              />
            </form>
            <button
              onClick={async () => {
                try {
                  const res = await googleSignIn();

                  if (res) {
                    router.push('/notes');
                  }
                } catch (error: any) {
                  if (error.code === 'auth/popup-closed-by-user') {
                    return;
                  }
                  throw new Error(error);
                }
              }}
              className={styles.authGoogle}
            >
              <GoogleIcon classname={styles.icon} />
              Continue with Google
            </button>
          </div>
          <p className={styles.loginTextSignup}>
            Already have an account? <Link href="/login">Log in</Link>
          </p>
          <Link href="/" className={styles.back}>
            <ArrowLeftIcon classname={styles.icon} />
            Back Home
          </Link>
        </div>
      </div>
    </>
  );
}
