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
import { useState } from 'react';

function DateTimePicker({
  reminder,
  onDateChange,
}: {
  reminder?: string;
  onDateChange: (date: any) => void;
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  function handleDateChange(date: any) {
    const dateFormatted = format(date, 'MMM d, h:mm a');
    setSelectedDate(date);
    onDateChange(dateFormatted);
  }

  return (
    <label className="flex items-center gap-1 w-full h-10 px-3 bg-white hover:bg-zinc-100 rounded-b-[14px] cursor-pointer dark:bg-zinc-900 dark:hover:bg-zinc-800">
      <ClockIcon classname="h-4" />
      <DatePicker
        showTimeSelect
        selected={selectedDate}
        onChange={handleDateChange}
        showPopperArrow={false}
        timeFormat="HH:mm"
        timeCaption="time"
        dateFormat="MMM d, h:mm a"
        placeholderText="Pick date & time"
        className="h-10 w-full placeholder:text-zinc-900 font-medium bg-transparent dark:placeholder:text-white"
      />
    </label>
  );
}

function SetTodayDate({
  date,
  handle,
}: {
  date: Date;
  handle: (arg: string) => void;
}) {
  // Set to 8:00 PM today
  const targetTimeToday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    20,
    0,
    0
  );
  // Format as "8:00 PM"
  const formattedTimeToday = format(targetTimeToday, 'h:mm a');

  return (
    <Button
      radius="none"
      className="bg-white hover:bg-zinc-100 justify-between px-3 font-medium dark:bg-zinc-900 dark:hover:bg-zinc-800"
      onClick={() => handle(`Today, ${formattedTimeToday}`)}
    >
      <span>Today</span>
      <span>{formattedTimeToday}</span>
    </Button>
  );
}

function SetTomorrowDate({
  date,
  handle,
}: {
  date: Date;
  handle: (arg: string) => void;
}) {
  // Get tomorrow's date
  const tomorrow = addDays(date, 1);

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
    <Button
      className="bg-white hover:bg-zinc-100 rounded-none justify-between px-3 font-medium dark:bg-zinc-900 dark:hover:bg-zinc-800"
      onClick={() => handle(`Tomorrow, ${formattedTimeTomorrow}`)}
    >
      <span>Tomorrow</span>
      <span>{formattedTimeTomorrow}</span>
    </Button>
  );
}

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
      <PopoverContent className="w-[240px] p-0 items-start justify-start">
        <div className="flex flex-col w-full">
          <div className="p-3">
            <p>Reminder:</p>
          </div>
          <Divider />
          <SetTodayDate date={now} handle={onReminderClick} />
          <SetTomorrowDate date={now} handle={onReminderClick} />
          <DateTimePicker onDateChange={onReminderClick} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
