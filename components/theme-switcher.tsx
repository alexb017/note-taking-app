'use client';

import * as React from 'react';
import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full focus-visible:ring-0"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-xl shadow-lg dark:bg-zinc-800"
        align="end"
      >
        <DropdownMenuItem
          className={`rounded-lg dark:hover:bg-zinc-700 ${
            theme === 'light' ? 'bg-zinc-100 dark:bg-zinc-700' : ''
          }`}
          onClick={() => setTheme('light')}
        >
          <SunIcon className="h-5 w-5 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`rounded-lg dark:hover:bg-zinc-700 ${
            theme === 'dark' ? 'bg-zinc-100 dark:bg-zinc-700' : ''
          }`}
          onClick={() => setTheme('dark')}
        >
          <MoonIcon className="h-5 w-5 mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`rounded-lg dark:hover:bg-zinc-700 ${
            theme === 'system' ? 'bg-zinc-100 dark:bg-zinc-700' : ''
          }`}
          onClick={() => setTheme('system')}
        >
          <ComputerDesktopIcon className="h-5 w-5 mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
