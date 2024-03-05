'use client';

import Link from 'next/link';
import GoogleIcon from '../../components/icons/google';
import { useContext, useState } from 'react';
import { AuthContext } from '../auth-context';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@nextui-org/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUserProfile } from '@/lib/actions';
import GithubIcon from '@/components/icons/github';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { googleSignIn, githubSignIn } = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center items-center h-[calc(100lvh-65px)]">
        <div className="flex flex-col gap-6 w-80">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Login</h1>
            <p>Welcome back!</p>
          </div>
          <div className="flex flex-col gap-2">
            <form
              className="flex flex-col gap-2"
              onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();

                try {
                  const res = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                  );

                  if (res) {
                    router.push('/notes');
                  }

                  setEmail('');
                  setPassword('');
                } catch (error: any) {
                  if (error.message) {
                    return;
                  }
                  console.error(error);
                }
              }}
            >
              <Input
                type="email"
                variant="bordered"
                label="Email Address"
                placeholder="Enter your email"
                radius="md"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
              />
              <Input
                type="password"
                variant="bordered"
                label="Password"
                placeholder="Enter your password"
                radius="md"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
              />
              <Button
                type="submit"
                color="default"
                variant="shadow"
                radius="md"
                size="lg"
                className="bg-blue-500 text-white font-medium"
              >
                Log In
              </Button>
            </form>
            <Button
              variant="bordered"
              radius="md"
              size="lg"
              className="font-medium text-sm"
              startContent={<GoogleIcon classname="h-5" />}
              onClick={async () => {
                try {
                  const res = await googleSignIn();

                  await createUserProfile(res.user, {});

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
            >
              Continue with Google
            </Button>
            <Button
              variant="bordered"
              radius="md"
              size="lg"
              className="font-medium text-sm"
              startContent={<GithubIcon classname="h-5" />}
              onClick={async () => {
                try {
                  const res = await githubSignIn();

                  console.log(res.user);

                  await createUserProfile(res.user, {});

                  if (res) {
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
              Continue with GitHub
            </Button>
          </div>
          <p className="text-center text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
