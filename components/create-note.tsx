'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Input,
  Textarea,
  Image,
  Tooltip,
} from '@nextui-org/react';
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

  return (
    <Card
      className={`relative w-full max-w-[512px] overflow-visible ${backgroundColor.light} ${backgroundColor.dark}`}
    >
      <div className="absolute right-2 top-2 z-20">
        <Tooltip
          placement="bottom"
          radius="sm"
          size="sm"
          offset={0}
          delay={350}
          closeDelay={0}
          content="Pin note"
        >
          <div>
            <Button
              isIconOnly
              aria-label="pin"
              radius="full"
              className="min-w-unit-8 w-unit-8 h-8 text-zinc-900 bg-transparent hover:bg-zinc-900/10 dark:text-white dark:hover:bg-zinc-100/10"
              onClick={async () => {
                await createNote(
                  {
                    content: content || 'Empty note',
                    bgColor: backgroundColor,
                    image: imageURL,
                    reminder: reminder,
                    isArchived: false,
                    isPinned: true,
                    isDeleted: false,
                    uid: user?.uid,
                  },
                  user?.uid
                );

                setContent('');
                setBackgroundColor({
                  light: 'bg-white',
                  dark: 'dark:bg-zinc-900',
                });
                setImageURL({ src: '', altName: '' });
                setReminder('');
                setIsPinned(false);
              }}
            >
              <PinIcon classname="h-4" />
            </Button>
          </div>
        </Tooltip>
      </div>

      {imageURL?.src ? (
        <>
          <CardHeader className="relative w-full max-w-[512px] p-0 rounded-b-none">
            <Image
              alt={imageURL?.altName}
              src={imageURL?.src}
              className="w-full h-auto rounded-b-none"
            />
            <div className="absolute right-1 bottom-1 z-10">
              <DeleteImageFromStorage
                onHandleImageUpload={handleImageUpload}
                imageUrl={imageURL?.src}
              />
            </div>
          </CardHeader>
        </>
      ) : null}
      <CardBody className="flex flex-col p-0">
        {/* <Input
          type="text"
          label="Title"
          radius="none"
          classNames={{
            inputWrapper: ['bg-white', 'data-[hover=true]:bg-white'],
          }}
        /> */}
        <Textarea
          label="What would you like to do?"
          placeholder="Description"
          radius="none"
          classNames={{
            input: 'text-base',
            inputWrapper: [
              'bg-transparent',
              'data-[hover=true]:bg-transparent',
              'group-data-[focus=true]:bg-transparent',
              'py-3',
            ],
          }}
          value={content}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setContent(event.target.value)
          }
        />
      </CardBody>

      {reminder && (
        <div className="flex items-center px-3">
          <Chip
            size="sm"
            radius="full"
            className="cursor-pointer group/chip bg-zinc-900/10 hover:bg-zinc-900/15 dark:bg-zinc-100/10 dark:hover:bg-zinc-100/15"
            startContent={<ClockIcon classname="h-4" />}
            onClose={() => handleReminderClick('')}
            endContent={<CloseIcon classname="h-4" />}
            classNames={{
              closeButton:
                'absolute right-0 rounded-full p-1 backdrop-blur-lg text-zinc-900/60 bg-gray-900/10 hover:bg-zinc-900/15 dark:text-white dark:bg-zinc-100/10 dark:hover:bg-zinc-100/20 opacity-0 group-hover/chip:opacity-100 transition-opacity ease-in-out',
            }}
          >
            {reminder}
          </Chip>
          {/* <UpdateDatePickerButton
            reminder={reminder}
            onDateChange={handleReminderClick}
          /> */}
        </div>
      )}

      <CardFooter className="flex items-center justify-between px-[8px] pb-[2px]">
        <div className="flex items-center gap-2">
          <AddReminder onReminderClick={handleReminderClick} />
          <AddColor colors={backgroundColor} onColorChange={handleColorClick} />
          <UploadImageToStorage
            uid={user?.uid}
            onHandleImageUpload={handleImageUpload}
          />
          <Tooltip
            placement="bottom"
            radius="sm"
            size="sm"
            offset={0}
            delay={350}
            closeDelay={0}
            content="Archive"
          >
            <div>
              <Button
                isIconOnly
                aria-label="archive"
                radius="full"
                className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
                onClick={async () => {
                  await createNote(
                    {
                      content: content || 'Empty note',
                      bgColor: backgroundColor,
                      image: imageURL,
                      reminder: reminder,
                      isArchived: true,
                      isPinned: isPinned,
                      isDeleted: false,
                      uid: user?.uid,
                    },
                    user?.uid
                  );

                  setContent('');
                  setBackgroundColor({
                    light: 'bg-white',
                    dark: 'dark:bg-zinc-900',
                  });
                  setImageURL({ src: '', altName: '' });
                  setReminder('');
                  setIsArchived(false);
                }}
              >
                <ArchiveIcon classname="h-4" />
              </Button>
            </div>
          </Tooltip>
        </div>
        <Button
          className="font-medium bg-transparent hover:bg-zinc-900/5 dark:hover:bg-zinc-100/5"
          onClick={async () => {
            await createNote(
              {
                content: content || 'Empty note',
                bgColor: backgroundColor,
                image: imageURL,
                reminder: reminder,
                isArchived: isArchived,
                isPinned: isPinned,
                isDeleted: false,
                uid: user?.uid,
              },
              user?.uid
            );

            setContent('');
            setBackgroundColor({ light: 'bg-white', dark: 'dark:bg-zinc-900' });
            setImageURL({ src: '', altName: '' });
            setReminder('');
            setIsArchived(false);
            setIsPinned(false);
          }}
        >
          Save Note
        </Button>
      </CardFooter>
    </Card>
  );
}
