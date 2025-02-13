import { BellIcon } from '@heroicons/react/24/outline';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Timestamp } from 'firebase/firestore';
import { convertTimestampToDate } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function AddReminder({
  reminder,
  setReminder,
}: {
  reminder?: Timestamp;
  setReminder: (date: Timestamp) => void;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Check if reminder exists and convert it to Date
  const reminderDate = reminder ? convertTimestampToDate(reminder) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="p-0 w-[34px] h-[34px] [&_svg]:size-[18px] rounded-full bg-transparent shadow-none text-black/80 dark:text-white/80 hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
              >
                <BellIcon className="w-5" />
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
            Add reminder
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-auto p-0 rounded-xl shadow-lg dark:bg-zinc-800">
        <Calendar
          mode="single"
          selected={reminderDate}
          onSelect={(date) => {
            if (date) {
              setReminder(Timestamp.fromDate(date));
              toast({
                description: 'Reminder added',
              });
              setOpen(false);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
