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
import EditReminder from './edit-reminder';
import AddToArchive from './add-to-archive';
import UploadImageToStorage from './upload-image';
import {
  ClockIcon,
  ArchiveBoxArrowDownIcon,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import { Timestamp } from 'firebase/firestore';

export default function CreateNote() {
  const { user } = useContext(AuthContext) as { user: User };
  const [content, setContent] = useState('');
  const [reminder, setReminder] = useState<Timestamp>();
  const [backgroundColors, setBackgroundColors] = useState<BgColor>({
    light: 'bg-white',
    dark: 'dark:bg-zinc-900',
    tooltip: 'Default',
  });
  const [imageURL, setImageURL] = useState<ImageData>({ src: '', altName: '' });

  async function handleCreateNote(archive: boolean, pinned: boolean) {
    console.log('Create note', {
      userId: user?.uid,
      content: content || 'Empty note',
      reminder,
      bgColor: backgroundColors,
      image: imageURL,
      isArchived: archive,
      isPinned: pinned,
      isDeleted: false,
    });

    console.log('typeof reminder', typeof reminder);

    await createNote(
      {
        userId: user?.uid,
        content: content || 'Empty note',
        bgColor: backgroundColors,
        reminder,
        image: imageURL,
        isArchived: archive,
        isPinned: pinned,
        isDeleted: false,
      },
      user?.uid
    );

    setContent('');
    setReminder(undefined);
    setBackgroundColors({
      light: 'bg-white',
      dark: 'dark:bg-zinc-900',
      tooltip: 'Default',
    });
    setImageURL({ src: '', altName: '' });
  }

  return (
    <Card
      className={`relative w-full max-w-[512px] rounded-xl ${backgroundColors.light} ${backgroundColors.dark}`}
    >
      {imageURL?.src && (
        <CardHeader className="relative w-full max-h-max overflow-hidden p-0 rounded-t-xl rounded-b-none">
          <Image
            src={imageURL?.src}
            alt={imageURL?.altName}
            width={512}
            height={256}
            className="w-full h-auto rounded-b-none"
          />
          <div className="absolute right-2 bottom-2 z-10">
            <DeleteImageFromStorage
              imageUrl={imageURL?.src}
              onSetImageUpload={setImageURL}
            />
          </div>
        </CardHeader>
      )}

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
        <EditReminder reminder={reminder} setReminder={setReminder} />
      )}

      {/* {reminder && (
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
      )} */}

      <CardFooter className="justify-between p-0 px-[4px] pb-[2px]">
        <div className="flex items-center gap-4">
          <AddReminder reminder={reminder} setReminder={setReminder} />
          <AddColor
            bg={backgroundColors}
            onColorsChange={setBackgroundColors}
          />
          <UploadImageToStorage
            onSetImageUpload={setImageURL}
            uid={user?.uid}
          />
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger
                asChild
                className="p-0 w-8 h-8 rounded-full bg-transparent shadow-none hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
              >
                <Button
                  onClick={async () => await handleCreateNote(true, false)}
                >
                  <ArchiveBoxArrowDownIcon className="h-4 w-4 text-black dark:text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-zinc-600 dark:text-white"
              >
                Archive
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          variant="ghost"
          className="rounded-xl"
          onClick={() => handleCreateNote(false, false)}
        >
          Save note
        </Button>
      </CardFooter>
    </Card>
  );
}
