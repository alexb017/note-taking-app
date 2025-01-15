'use client';

import { useState } from 'react';
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
    setSelectedDate(date);
  }

  return (
    <Chip
      size="sm"
      radius="full"
      className="cursor-pointer bg-zinc-900/10 hover:bg-zinc-900/15"
      startContent={<ClockIcon classname="h-4" />}
      onClose={() => onDateChange('')}
    >
      {reminder || 'Add reminder'}
    </Chip>
  );
}
