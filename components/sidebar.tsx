'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DocumentTextIcon,
  TrashIcon,
  BellIcon,
  ArchiveBoxArrowDownIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed flex flex-col justify-between w-14 xl:w-64 h-[calc(100lvh-65px)] py-4 pl-2 xl:pl-0">
      <ul className="flex flex-col">
        <li className="flex">
          <Link
            href="/notes"
            className={`flex items-center justify-center xl:justify-start gap-6 rounded-full xl:rounded-l-none w-12 xl:w-full h-12 xl:px-4 text-sm font-medium ${
              pathname === '/notes' || pathname === '/notes/search'
                ? 'bg-yellow-100 dark:bg-yellow-950'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <DocumentTextIcon className="w-5 h-5" />
            <div className="hidden xl:block">Notes</div>
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/notes/reminders"
            className={`flex items-center justify-center xl:justify-start gap-6 rounded-full xl:rounded-l-none w-12 xl:w-full h-12 xl:px-4 text-sm font-medium ${
              pathname === '/notes/reminders'
                ? 'bg-yellow-100 dark:bg-yellow-950 '
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <BellIcon className="w-5 h-5" />
            <div className="hidden xl:block">Reminders</div>
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/notes/archive"
            className={`flex items-center justify-center xl:justify-start gap-6 rounded-full xl:rounded-l-none w-12 xl:w-full h-12 xl:px-4 text-sm font-medium ${
              pathname === '/notes/archive'
                ? 'bg-yellow-100 dark:bg-yellow-950'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <ArchiveBoxArrowDownIcon className="w-5 h-5" />
            <div className="hidden xl:block">Archive</div>
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/notes/trash"
            className={`flex items-center justify-center xl:justify-start gap-6 rounded-full xl:rounded-l-none w-12 xl:w-full h-12 xl:px-4 text-sm font-medium ${
              pathname === '/notes/trash'
                ? 'bg-yellow-100 dark:bg-yellow-950'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <TrashIcon className="w-5 h-5" />
            <div className="hidden xl:block">Trash</div>
          </Link>
        </li>
      </ul>
      <div className="p-4 pb-0 hidden xl:block">
        <p className="text-sm text-zinc-500">&copy; 2025 NoteTaking</p>
      </div>
    </nav>
  );
}
