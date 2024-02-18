'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotesIcon from './icons/notes';
import ArchiveIcon from './icons/archive';
import BellIcon from './icons/bell';
import TrashIcon from './icons/trash';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col justify-between w-14 md:w-72 h-[calc(100lvh-65px)] py-4 pl-2 md:pl-0">
      <ul className="flex flex-col">
        <li className="flex">
          <Link
            href="/notes"
            className={`flex items-center justify-center md:justify-start gap-6 rounded-full md:rounded-l-none w-12 md:w-full h-12 md:px-4 text-sm font-semibold ${
              pathname === '/notes'
                ? 'bg-yellow-100 dark:bg-yellow-950'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <NotesIcon classname="h-6" />
            <div className="hidden md:block">Notes</div>
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/notes/reminders"
            className={`flex items-center justify-center md:justify-start gap-6 rounded-full md:rounded-l-none w-12 md:w-full h-12 md:px-4 text-sm font-semibold ${
              pathname === '/notes/reminders'
                ? 'bg-yellow-100 dark:bg-yellow-950 '
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <BellIcon classname="h-6" />
            <div className="hidden md:block">Reminders</div>
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/notes/archive"
            className={`flex items-center justify-center md:justify-start gap-6 rounded-full md:rounded-l-none w-12 md:w-full h-12 md:px-4 text-sm font-semibold ${
              pathname === '/notes/archive'
                ? 'bg-yellow-100 dark:bg-yellow-950'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <ArchiveIcon classname="h-6" />
            <div className="hidden md:block">Archive</div>
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/notes/trash"
            className={`flex items-center justify-center md:justify-start gap-6 rounded-full md:rounded-l-none w-12 md:w-full h-12 md:px-4 text-sm font-semibold ${
              pathname === '/notes/trash'
                ? 'bg-yellow-100 dark:bg-yellow-950'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <TrashIcon classname="h-6" />
            <div className="hidden md:block">Trash</div>
          </Link>
        </li>
      </ul>
      <div className="p-4 pb-0 hidden md:block">
        <p className="text-sm text-gray-500">&copy; 2024 NoteTaking ✌️</p>
      </div>
    </nav>
  );
}
