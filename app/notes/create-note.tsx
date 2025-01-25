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
import { Input } from '@/components/ui/input';
import { useContext, useState } from 'react';
import AddColor from './add-color';
import AddReminder from './add-reminder';
import EditReminder from './edit-reminder';
import UploadImageToStorage from './upload-image';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';
import { createNote } from '@/lib/actions';
import { AuthContext } from '@/app/auth-context';
import DeleteImageFromStorage from './detele-image';
import { ImageData, BgColor } from '@/lib/types';
import { User } from 'firebase/auth';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import { Timestamp } from 'firebase/firestore';
import PinIcon from '@/components/icons/pin';
import { cn } from '@/lib/utils';

export default function CreateNote() {
  const { user } = useContext(AuthContext) as { user: User };
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [reminder, setReminder] = useState<Timestamp>();
  const [backgroundColors, setBackgroundColors] = useState<BgColor>({
    light: 'bg-white',
    dark: 'dark:bg-zinc-900',
    tooltip: 'Default',
  });
  const [imageURL, setImageURL] = useState<ImageData>({ src: '', altName: '' });

  async function handleCreateNote(archive: boolean, pinned: boolean) {
    await createNote(
      {
        userId: user?.uid,
        title,
        content,
        bgColor: backgroundColors,
        reminder: reminder || null,
        image: imageURL,
        isArchived: archive,
        isPinned: pinned,
        isDeleted: false,
      },
      user?.uid
    );

    setTitle('');
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
      className={`relative w-full max-w-[512px] rounded-xl shadow-lg ${backgroundColors.light} ${backgroundColors.dark}`}
    >
      <div className="absolute top-2 right-2 z-50">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger
              asChild
              className={cn(
                'p-0 w-10 h-10 [&_svg]:size-6 rounded-full bg-transparent shadow-none text-black dark:text-white hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10',
                imageURL.src &&
                  'backdrop-blur-lg text-white bg-zinc-900/50 hover:bg-zinc-900/60 dark:hover:bg-zinc-900/60'
              )}
            >
              <Button onClick={async () => await handleCreateNote(false, true)}>
                <PinIcon classname="w-6 h-6 -rotate-45" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-zinc-600 dark:text-white"
            >
              Pinned
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

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
        <Input
          placeholder="Title"
          className="px-3 font-semibold text-black/30 dark:text-white/30 shadow-none border-0 rounded-none focus-visible:ring-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Take a note..."
          id="message"
          className="md:text-base font-semibold p-0 px-3 min-h-[80px] shadow-none border-0 rounded-none resize-none focus-visible:ring-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </CardContent>

      {reminder && (
        <EditReminder reminder={reminder} setReminder={setReminder} />
      )}

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
                className="p-0 w-9 h-9 [&_svg]:size-5 rounded-full bg-transparent shadow-none hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
              >
                <Button
                  onClick={async () => await handleCreateNote(true, false)}
                >
                  <ArchiveBoxArrowDownIcon className="h-5 w-5 text-black dark:text-white" />
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
          className="rounded-xl hover:bg-zinc-900/10 hover:dark:bg-zinc-100/10"
          onClick={() => handleCreateNote(false, false)}
        >
          Save note
        </Button>
      </CardFooter>
    </Card>
  );
}
