import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export default function EditReminder({
  reminder,
  setReminder,
}: {
  reminder?: Timestamp;
  setReminder: (date: Timestamp | undefined) => void;
}) {
  const convertToDate = (timestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  };

  const reminderDate = reminder ? convertToDate(reminder) : undefined;

  console.log('reminderDate', reminderDate);

  return (
    <div className="ml-3 w-max">
      <div className="relative group/rr">
        <Popover>
          <PopoverTrigger
            asChild
            className="relative h-full p-0 px-1 pr-[8px] py-[2px] text-xs gap-1 rounded-full bg-zinc-900/10 dark:bg-zinc-100/10 hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
          >
            <Button variant="secondary">
              <ClockIcon className="h-4 w-4" />
              {reminderDate ? format(reminderDate, 'PPP') : ''}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-xl shadow-2xl dark:bg-zinc-800">
            <Calendar
              mode="single"
              selected={reminderDate}
              onSelect={(date) => date && setReminder(Timestamp.fromDate(date))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          size="icon"
          className="absolute top-0 right-0 z-20 p-0 w-5 h-5 opacity-0 group-hover/rr:opacity-100 dark:text-white bg-zinc-900/10 dark:bg-zinc-100/10 hover:bg-zinc-900/20 dark:hover:bg-zinc-100/20 backdrop-blur rounded-full transition-opacity duration-200 ease-in"
          onClick={() => setReminder(undefined)}
        >
          <XMarkIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
