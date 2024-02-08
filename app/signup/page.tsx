'use client';

import Link from 'next/link';
import GoogleIcon from '../../components/icons/google';
import { useContext, useState } from 'react';
import { AuthContext } from '../auth-context';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@nextui-org/react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Signup() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const { googleSignIn } = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center items-center h-57px">
        <div className="flex flex-col gap-6 w-[320px]">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Create account</h1>
            <p className="font-medium">Get started on the NoteTaking.</p>
          </div>
          <div className="flex flex-col gap-4">
            <form
              className="flex flex-col gap-2"
              onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();

                if (password !== confirmPassword) {
                  setErrorConfirmPassword(true);
                  return;
                }

                try {
                  const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                  );

                  await updateProfile(user, { displayName });

                  if (user) {
                    router.push('/');
                  }

                  setDisplayName('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setErrorConfirmPassword(false);
                } catch (error: any) {
                  if (error.message) {
                    return;
                  }
                  console.error(error);
                }
              }}
            >
              <Input
                type="text"
                variant="bordered"
                label="Username"
                placeholder="Enter your username"
                radius="md"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setDisplayName(event.target.value)
                }
              />
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
              <Input
                type="password"
                variant="bordered"
                label="Confirm Password"
                placeholder="Confirm your password"
                radius="md"
                isInvalid={errorConfirmPassword ? true : false}
                errorMessage={
                  errorConfirmPassword ? "Passwords don't match" : null
                }
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(event.target.value)
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
                Sign Up
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
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
