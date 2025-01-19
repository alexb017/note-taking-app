import { BellIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AddReminder({
  reminder,
  setReminder,
}: {
  reminder?: Date;
  setReminder: (date: Date) => void;
}) {
  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="p-0">
            <PopoverTrigger asChild>
              <Button className="w-8 h-8 rounded-full bg-transparent shadow-none hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10">
                <BellIcon className="h-4 w-4 text-black dark:text-white" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Add Reminder</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-auto p-0 rounded-xl shadow-2xl dark:bg-zinc-800">
        <Calendar
          mode="single"
          selected={reminder}
          onSelect={(date) => date && setReminder(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
