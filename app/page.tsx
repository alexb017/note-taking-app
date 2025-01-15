import Image from 'next/image';
import { Link, Button } from '@nextui-org/react';

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center px-4 py-24">
        <div className="flex flex-col gap-24 w-full max-w-4xl">
          <div className="flex flex-col lg:flex-row lg:items-center gap-16">
            <div className="flex flex-col items-center gap-4 lg:w-1/2">
              <p>Welcome to NoteTaking!</p>
              <h1 className="text-5xl md:text-6xl font-semibold leading-none tracking-tighter text-center">
                Bring <span className=" text-red-500">i</span>
                <span className="text-yellow-500">d</span>
                <span className="text-green-500">e</span>
                <span className="text-blue-500">a</span>
                <span className="text-violet-500">s</span>✨<br></br> to life
              </h1>
              <p className="text-center">
                A simple note-taking app to help you keep track of your ideas,
                thoughts, and tasks.
              </p>
              <Button
                showAnchorIcon
                as={Link}
                color="primary"
                variant="flat"
                radius="md"
                size="md"
                href="/login"
              >
                Get Started
              </Button>
            </div>

            <div className="lg:w-1/2 flex items-center justify-center">
              <div className="overflow-hidden rounded-3xl rotate-3">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/note-taking-app-8432a.appspot.com/o/NoteTaking-Notes-01-06-2025_03_08_PM.jpg?alt=media&token=8cec0273-e6aa-401b-bad8-ce997d294856"
                  width={300}
                  height={600}
                  alt="Note Taking App Image"
                  quality={80}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row md:items-center lg:justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500">
              &copy; 2025 NoteTakingApp, Made with ❤️ by{' '}
              <a
                href="https://alexb017.github.io"
                className="underline text-neutral-500 hover:text-black"
                target="_blank"
              >
                Alex
              </a>
              .
            </p>
            <p className="text-sm text-zinc-500">A Google Keep clone.</p>
          </div>
        </div>
      </div>
    </>
  );
}
