import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Timestamp } from 'firebase/firestore';
import { convertTimestampToDate, dateToString } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function EditReminder({
  reminder,
  setReminder,
}: {
  reminder?: Timestamp;
  setReminder: (date: Timestamp | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Check if reminder exists and convert it to Date
  const reminderDate = reminder ? convertTimestampToDate(reminder) : undefined;

  return (
    <div className="ml-3 w-max">
      <div className="relative group/rr">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            asChild
            className="relative h-full p-0 px-1 pr-[8px] py-[2px] text-xs gap-1 shadow-none rounded-full text-black/80 dark:text-white/80 bg-zinc-900/10 dark:bg-zinc-100/10 hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
          >
            <Button variant="secondary">
              <ClockIcon className="h-4 w-4" />
              {reminderDate ? dateToString(reminderDate) : ''}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-xl shadow-2xl dark:bg-zinc-800">
            <Calendar
              mode="single"
              selected={reminderDate}
              onSelect={(date) => {
                if (date) {
                  setReminder(Timestamp.fromDate(date));
                  setOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
        <Button
          size="icon"
          className="absolute top-0 right-0 z-20 p-0 w-5 h-5 shadow-none opacity-0 group-hover/rr:opacity-100 dark:text-white/80 bg-zinc-900/10 dark:bg-zinc-100/10 hover:bg-zinc-900/20 dark:hover:bg-zinc-100/20 backdrop-blur rounded-full transition-opacity duration-200 ease-in"
          onClick={() => {
            setReminder(undefined);
            toast({ description: 'Reminder removed' });
          }}
        >
          <XMarkIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
