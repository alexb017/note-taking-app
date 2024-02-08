'use client';

import Link from 'next/link';
import GoogleIcon from '../../components/icons/google';
import { useContext, useState } from 'react';
import { AuthContext } from '../auth-context';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@nextui-org/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { googleSignIn } = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center items-center h-57px">
        <div className="flex flex-col gap-6 w-[320px]">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Login</h1>
            <p className="font-medium">
              Welcome back! Please enter your details.
            </p>
          </div>
          <div className="flex flex-col gap-4">
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
                    router.push('/');
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
                className="bg-black text-white"
              >
                Log In
              </Button>
            </form>
            <Button
              variant="bordered"
              radius="md"
              size="lg"
              className="font-medium"
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
            >
              <GoogleIcon classname="h-5" />
              Continue with Google
            </Button>
          </div>
          <p className="text-center">
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
