import LoginForm from './login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteTaking - SignIn',
  description: 'SignIn into NoteTaking app',
};

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-[calc(100lvh-65px)]">
      <div className="flex flex-col gap-6 w-80">
        <h2 className="text-3xl font-semibold tracking-tight text-center">
          Welcome back!
        </h2>
        <LoginForm />
        <p className="text-sm text-zinc-400 text-center">
          Sign in to access your notes.
        </p>
      </div>
    </div>
  );
}
