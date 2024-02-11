import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@nextui-org/react';
import { format, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BellBingIcon from './icons/bell-pin';
import ClockIcon from './icons/clock';

export default function AddReminder({
  startDate,
  onReminderChange,
  onStartDateChange,
}: {
  startDate: any;
  onReminderChange: (date: string) => void;
  onStartDateChange: (date: string) => void;
}) {
  const now = new Date();

  // Set to 8:00 PM today
  const targetTimeToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    20,
    0,
    0
  );
  // Format as "8:00 PM"
  const formattedTimeToday = format(targetTimeToday, 'h:mm a');

  // Get tomorrow's date
  const tomorrow = addDays(now, 1);
  // Set to 8:00 AM tomorrow
  const targetTimeTomorrow = new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate(),
    8,
    0,
    0
  );
  // Format as "8:00 AM"
  const formattedTimeTomorrow = format(targetTimeTomorrow, 'h:mm a');

  return (
    <Popover placement="bottom" offset={0}>
      <PopoverTrigger>
        <Button
          isIconOnly
          aria-label="reminder"
          radius="full"
          className="bg-transparent hover:bg-gray-900/10"
        >
          <BellBingIcon classname="h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0 items-start justify-start">
        <div className="flex flex-col w-full">
          <div className="p-3">
            <p>Reminder:</p>
          </div>
          <Divider />
          <Button
            radius="none"
            className="bg-white hover:bg-gray-100 justify-between px-3 font-medium"
            onClick={() => onReminderChange(`Today, ${formattedTimeToday}`)}
          >
            <span>Later today</span>
            <span>{formattedTimeToday}</span>
          </Button>
          <Button
            className="bg-white hover:bg-gray-100 rounded-t-none justify-between px-3 font-medium"
            onClick={() =>
              onReminderChange(`Tomorrow, ${formattedTimeTomorrow}`)
            }
          >
            <span>Tomorrow</span>
            <span>{formattedTimeTomorrow}</span>
          </Button>
          <DatePicker
            showTimeSelect
            selected={startDate}
            timeFormat="HH:mm"
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Pick date & time"
            onChange={(date: any) => onStartDateChange(date)}
            className="h-10 w-full px-3 placeholder:text-black font-medium bg-transparent cursor-pointer hover:bg-gray-100"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
