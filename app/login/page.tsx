'use client';

import Link from 'next/link';
import GoogleIcon from '../../components/icons/google';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@nextui-org/react';

export default function Login() {
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
            <form className="flex flex-col gap-2">
              <Input
                type="email"
                variant="bordered"
                label="Email"
                placeholder="Enter your email"
                radius="md"
              />
              <Input
                isClearable
                type="password"
                variant="bordered"
                label="Password"
                placeholder="Enter your password"
                radius="md"
              />
              <Button
                type="submit"
                color="primary"
                variant="shadow"
                radius="md"
                size="lg"
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
