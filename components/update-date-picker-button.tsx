'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import ClockIcon from './icons/clock';
import { Chip } from '@nextui-org/react';

export default function UpdateDatePickerButton({
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
    <Chip
      size="sm"
      radius="full"
      className="cursor-pointer bg-zinc-900/10 hover:bg-zinc-900/15"
      startContent={<ClockIcon classname="h-4" />}
      onClose={() => onDateChange('')}
    >
      <DatePicker
        showTimeSelect
        selected={selectedDate}
        onChange={handleDateChange}
        showPopperArrow={false}
        timeFormat="HH:mm"
        timeCaption="time"
        dateFormat="MMM d, h:mm aa"
        id="updateDatePicker"
        name="updateDatePicker"
        placeholderText={reminder}
        className="h-10 placeholder:text-zinc-900 font-medium bg-transparent cursor-pointer focus-visible:outline-none"
      />
    </Chip>
  );
}
