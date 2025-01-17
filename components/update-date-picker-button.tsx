'use client';

import { useState } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

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

  return <Badge>{reminder || 'Add reminder'}</Badge>;
}
