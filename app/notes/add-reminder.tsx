import { BellIcon } from '@heroicons/react/24/outline';
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
import { Timestamp } from 'firebase/firestore';

export default function AddReminder({
  reminder,
  setReminder,
}: {
  reminder?: Timestamp;
  setReminder: (date: Timestamp) => void;
}) {
  const convertToDate = (timestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  };

  const reminderDate = reminder ? convertToDate(reminder) : undefined;

  return (
    <Popover>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild className="p-0">
            <PopoverTrigger asChild>
              <Button className="w-8 h-8 rounded-full bg-transparent shadow-none hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10">
                <BellIcon className="h-4 w-4 text-black dark:text-white" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
            Add Reminder
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-auto p-0 rounded-xl shadow-2xl dark:bg-zinc-800">
        <Calendar
          mode="single"
          selected={reminderDate}
          onSelect={(date) => date && setReminder(Timestamp.fromDate(date))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
