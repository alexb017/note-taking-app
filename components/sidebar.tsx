'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LampIcon from './icons/lamp';
import ArchiveIcon from './icons/archive';
import BellIcon from './icons/bell';
import TrashIcon from './icons/trash';
import { Button } from '@nextui-org/react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="sticky flex flex-col justify-between w-14 md:w-72 h-65px py-2 pl-2 md:pl-0">
      <ul className="flex flex-col">
        <li className="flex">
          <Link
            href="/notes"
            className={`flex items-center justify-center md:justify-start gap-6 rounded-full md:rounded-l-none w-12 md:w-full h-12 md:px-4 text-sm font-semibold ${
              pathname === '/notes' ? 'bg-yellow-100' : 'hover:bg-gray-100'
            }`}
          >
            <LampIcon classname="h-6" />
            <div className="hidden md:block">Notes</div>
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/notes/reminders"
            className={`flex items-center justify-center md:justify-start gap-6 rounded-full md:rounded-l-none w-12 md:w-full h-12 md:px-4 text-sm font-semibold ${
              pathname === '/notes/reminders'
                ? 'bg-yellow-100 '
                : 'hover:bg-gray-100'
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
                ? 'bg-yellow-100'
                : 'hover:bg-gray-100'
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
                ? 'bg-yellow-100'
                : 'hover:bg-gray-100'
            }`}
          >
            <TrashIcon classname="h-6" />
            <div className="hidden md:block">Trash</div>
          </Link>
        </li>
      </ul>
      <div className="p-4 hidden md:block">
        <p className="text-sm text-gray-500">&copy; 2024 NoteTaking ✌️</p>
      </div>
    </nav>
  );
}
