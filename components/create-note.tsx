'use client';

import { useContext, useState } from 'react';
import AddColor from './add-color';
import AddReminder from './add-reminder';
import UploadImageToStorage from './upload-image';
import ClockIcon from './icons/clock';
import { createNote } from '@/lib/actions';
import { AuthContext } from '@/app/auth-context';
import DeleteImageFromStorage from './detele-image';
import ArchiveIcon from './icons/archive';
import UpdateDatePickerButton from './update-date-picker-button';
import CloseIcon from './icons/close';
import { ImageData, BgColor } from '@/lib/types';
import PinIcon from './icons/pin';

export default function CreateNote() {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [reminder, setReminder] = useState('');
  const [backgroundColor, setBackgroundColor] = useState<BgColor>({
    light: 'bg-white',
    dark: 'dark:bg-zinc-900',
  });
  const [imageURL, setImageURL] = useState<ImageData>({ src: '', altName: '' });
  const [isArchived, setIsArchived] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  function handleReminderClick(date: string) {
    setReminder(date);
  }

  function handleColorClick(colors: BgColor) {
    setBackgroundColor(colors);
  }

  function handleImageUpload(data: ImageData) {
    setImageURL(data);
  }

  return <></>;
}
