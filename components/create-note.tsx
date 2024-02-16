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

type ImageData = {
  src: string;
  altname: string;
};

export default function CreateNote() {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [reminder, setReminder] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  const [imageURL, setImageURL] = useState<ImageData>({ src: '', altname: '' });
  const [isArchived, setIsArchived] = useState(false);

  console.log({
    content: content,
    bgColor: backgroundColor,
    image: imageURL,
    reminder: reminder,
    isArchived: false,
    isPinned: false,
    isDeleted: false,
    uid: user?.uid,
  });

  function handleReminderClick(date: string) {
    setReminder(date);
  }

  function handleColorClick(color: string) {
    setBackgroundColor(color);
  }

  function handleImageUpload(data: ImageData) {
    setImageURL(data);
  }

  return (
    <Card
      className={`w-full max-w-[512px] overflow-visible ${backgroundColor}`}
    >
      {imageURL?.src ? (
        <>
          <CardHeader className="relative w-full max-w-[512px] p-0 rounded-b-none">
            <Image
              alt={imageURL?.altname}
              src={imageURL?.src}
              className="w-full h-auto rounded-b-none"
            />
            <DeleteImageFromStorage
              onHandleImageUpload={handleImageUpload}
              imageUrl={imageURL?.src}
            />
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
            className="cursor-pointer group/chip bg-gray-900/10 hover:bg-gray-900/15"
            startContent={<ClockIcon classname="h-4" />}
            onClose={() => handleReminderClick('')}
            endContent={<CloseIcon classname="h-6" />}
            classNames={{
              closeButton:
                'absolute right-0 rounded-full text-gray-900/60 bg-gray-100 opacity-0 group-hover/chip:opacity-100 transition-opacity ease-in-out',
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

      <CardFooter className="flex items-center justify-between pl-[2px] pb-[2px]">
        <div className="flex items-center gap-2">
          <AddReminder onReminderClick={handleReminderClick} />
          <AddColor color={backgroundColor} onColorChange={handleColorClick} />
          <UploadImageToStorage
            uid={user?.uid}
            onHandleImageUpload={handleImageUpload}
          />
          <Button
            isIconOnly
            aria-label="archive"
            radius="full"
            className="bg-transparent hover:bg-gray-900/10"
            onClick={async () => {
              await createNote(
                {
                  content: content,
                  bgColor: backgroundColor,
                  image: imageURL,
                  reminder: reminder,
                  isArchived: true,
                  isPinned: false,
                  isDeleted: false,
                  uid: user?.uid,
                },
                user?.uid
              );

              setContent('');
              setBackgroundColor('bg-white');
              setImageURL({ src: '', altname: '' });
              setReminder('');
              setIsArchived(false);
            }}
          >
            <ArchiveIcon classname="h-5" />
          </Button>
        </div>
        <Button
          className="font-medium bg-transparent hover:bg-gray-900/10"
          onClick={async () => {
            await createNote(
              {
                content: content,
                bgColor: backgroundColor,
                image: imageURL,
                reminder: reminder,
                isArchived: isArchived,
                isPinned: false,
                isDeleted: false,
                uid: user?.uid,
              },
              user?.uid
            );

            setContent('');
            setBackgroundColor('bg-white');
            setImageURL({ src: '', altname: '' });
            setReminder('');
            setIsArchived(false);
          }}
        >
          Save Note
        </Button>
      </CardFooter>
    </Card>
  );
}
