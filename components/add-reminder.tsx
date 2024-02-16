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
    <label
      htmlFor="datePicker"
      className="flex items-center gap-1 w-full h-10 px-3 hover:bg-gray-100 rounded-b-[14px] cursor-pointer"
    >
      <ClockIcon classname="h-4" />
      <DatePicker
        showTimeSelect
        selected={selectedDate}
        onChange={handleDateChange}
        showPopperArrow={false}
        timeFormat="HH:mm"
        timeCaption="time"
        dateFormat="MMM d, h:mm a"
        id="datePicker"
        name="datePicker"
        placeholderText="Pick date & time"
        className="h-10 w-full placeholder:text-black font-medium bg-transparent"
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
      className="bg-white hover:bg-gray-100 justify-between px-3 font-medium"
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
      className="bg-white hover:bg-gray-100 rounded-t-none justify-between px-3 font-medium"
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
          <SetTodayDate date={now} handle={onReminderClick} />
          <SetTomorrowDate date={now} handle={onReminderClick} />
          <DateTimePicker onDateChange={onReminderClick} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
