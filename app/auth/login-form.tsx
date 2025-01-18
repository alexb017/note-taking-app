'use client';

import { Button } from '@/components/ui/button';
import { AuthContext } from '../auth-context';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { createUserProfile } from '@/lib/actions';
import GoogleIcon from '@/components/icons/google';
import GithubIcon from '@/components/icons/github';
import { User } from 'firebase/auth';

export default function LoginForm() {
  const { googleSignIn, githubSignIn } = useContext(AuthContext) as {
    googleSignIn: () => Promise<User | null>;
    githubSignIn: () => Promise<User | null>;
  };
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="rounded-full h-11"
        onClick={async () => {
          try {
            const res = await githubSignIn();

            if (res) {
              await createUserProfile(res, {});
              router.push('/notes');
            }
          } catch (error: any) {
            if (error.code === 'auth/user-cancelled') {
              return;
            }
            throw new Error(error);
          }
        }}
      >
        <GithubIcon classname="w-5 h-5" />
        Sign In with Github
      </Button>
      <Button
        variant="secondary"
        className="rounded-full h-11"
        onClick={async () => {
          try {
            const res = await googleSignIn();

            if (res) {
              await createUserProfile(res, {});
              router.push('/notes');
            }
          } catch (error: any) {
            if (error.code === 'auth/popup-closed-by-user') {
              return;
            }
            throw new Error(error);
          }
        }}
      >
        <GoogleIcon classname="w-5 h-5" />
        Sign In with Google
      </Button>
    </div>
  );
}
