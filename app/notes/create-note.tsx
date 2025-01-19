'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useContext, useState } from 'react';
import AddColor from './add-color';
import AddReminder from './add-reminder';
import UploadImageToStorage from './upload-image';
import {
  ClockIcon,
  ArchiveBoxIcon,
  XMarkIcon,
  StarIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import { createNote } from '@/lib/actions';
import { AuthContext } from '@/app/auth-context';
import DeleteImageFromStorage from './detele-image';
import UpdateDatePickerButton from '../../components/update-date-picker-button';
import { ImageData, BgColor } from '@/lib/types';
import { User } from 'firebase/auth';
import { format } from 'date-fns';

export default function CreateNote() {
  const { user } = useContext(AuthContext) as { user: User };
  const [content, setContent] = useState('');
  const [reminder, setReminder] = useState<Date>();
  const [backgroundColors, setBackgroundColors] = useState<BgColor>({
    light: 'bg-white',
    dark: 'dark:bg-zinc-900',
  });
  const [imageURL, setImageURL] = useState<ImageData>({ src: '', altName: '' });
  const [isArchived, setIsArchived] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  function handleReminderClick(date: Date) {
    setReminder(date);
  }

  function handleColorClick(colors: BgColor) {
    setBackgroundColors(colors);
  }

  function handleImageUpload(data: ImageData) {
    setImageURL(data);
  }

  return (
    <Card
      className={`w-full max-w-[512px] rounded-xl ${backgroundColors.light} ${backgroundColors.dark}`}
    >
      <CardContent className="p-0 py-2">
        <Label
          htmlFor="message"
          className="px-3 text-xs text-black/30 dark:text-white/30"
        >
          What would you like to do?
        </Label>
        <Textarea
          placeholder="Description"
          id="message"
          className="p-0 px-3 min-h-[80px] shadow-none border-0 rounded-none resize-none focus-visible:ring-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </CardContent>

      {reminder && (
        <Badge
          variant="secondary"
          className="relative ml-3 px-1 pr-[6px] text-zinc-400 gap-1 rounded-full dark:bg-zinc-700 group cursor-pointer"
        >
          <ClockIcon className="w-4 h-4" />
          {reminder ? format(reminder, 'PPP') : 'No date selected'}
          <Button
            variant="secondary"
            size="icon"
            className="opacity-0 group-hover:opacity-100 absolute top-0 right-0 p-0 w-[22px] h-[22px] rounded-full transition-opacity duration-200 ease-in"
            onClick={() => setReminder(undefined)}
          >
            <XMarkIcon className="w-4 h-4" />
          </Button>
        </Badge>
      )}

      <CardFooter className="p-0 px-[8px] pb-[2px]">
        <div className="flex items-center gap-4">
          <AddReminder reminder={reminder} setReminder={setReminder} />
          <AddColor
            bg={backgroundColors}
            onColorsChange={setBackgroundColors}
          />
          <UploadImageToStorage
            onHandleImageUpload={handleImageUpload}
            uid={user?.uid}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
