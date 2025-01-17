import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center h-[calc(100lvh-65px)]">
        <div className="flex flex-col items-center gap-24">
          <div className="flex flex-col items-center gap-4">
            <p className="text-zinc-400">Welcome to NoteTakingApp!</p>

            <h1 className="text-6xl md:text-8xl font-semibold leading-none tracking-tighter text-center">
              Bring <span className=" text-red-500">i</span>
              <span className="text-yellow-500">d</span>
              <span className="text-green-500">e</span>
              <span className="text-blue-500">a</span>
              <span className="text-violet-500">s</span>✨<br></br> to life
            </h1>

            <p className="text-zinc-400 text-center max-w-96">
              NoteTakingApp is a simple note-taking app that helps you organize
              your thoughts and ideas.
            </p>

            <div className="flex items-center gap-2">
              <Button asChild className="rounded-full">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-full">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
          <p className="text-sm text-zinc-400">
            &copy; 2025 NoteTakingApp. A Google Keep Clone. ✌️
          </p>
        </div>
      </div>
    </>
  );
}
