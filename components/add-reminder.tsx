import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@nextui-org/react';
import BellBingIcon from './icons/bell-pin';
import ClockIcon from './icons/clock';
import { useState } from 'react';

export default function AddReminder({
  reminder,
  onReminderClick,
}: {
  reminder?: string;
  onReminderClick: (date: any) => void;
}) {
  const now = new Date();

  return (
    <Popover placement="bottom" offset={0}>
      <Tooltip
        placement="bottom"
        radius="sm"
        size="sm"
        offset={0}
        delay={350}
        closeDelay={0}
        content="Remind me"
      >
        <div>
          <PopoverTrigger>
            <Button
              isIconOnly
              aria-label="reminder"
              radius="full"
              className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
            >
              <BellBingIcon classname="h-4" />
            </Button>
          </PopoverTrigger>
        </div>
      </Tooltip>
      <PopoverContent className="w-[240px] p-0 items-start justify-start">
        <div className="flex flex-col w-full">
          <div className="p-3">
            <p>Reminder:</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
