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
import ImageUpload from './image-upload';
import ClockIcon from './icons/clock';
import AddToArchive from './add-to-archive';
import { createNote } from '@/lib/actions';
import { AuthContext } from '@/app/auth-context';
import RemoveImage from './remove-image';

export default function CreateNote() {
  const { user } = useContext(AuthContext);
  const [contentNote, setContentNote] = useState('');
  const [reminder, setReminder] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [color, setColor] = useState('bg-white');
  const [imageURL, setImageURL] = useState('');
  const [isArchived, setIsArchived] = useState(false);

  function handleReminderClick(date: string) {
    setReminder(date);
  }

  function handleStartDateClick(date: any) {
    setStartDate(date);
  }

  function handleColorClick(color: string) {
    setColor(color);
  }

  function handleImageUpload(url: string) {
    setImageURL(url);
  }

  function handleArchiveNoteClick() {
    if (!isArchived) {
      setIsArchived(true);
    } else {
      setIsArchived(false);
    }
  }

  return (
    <Card className={`w-full max-w-[512px] ${color}`}>
      {imageURL ? (
        <>
          <CardHeader className="relative w-full max-w-[512px] p-0 rounded-b-none">
            <Image
              alt="Picture note"
              src={imageURL}
              className="w-full h-auto rounded-b-none"
            />
            <RemoveImage
              onHandleImageUpload={handleImageUpload}
              imageUrl={imageURL}
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
            inputWrapper: [
              'bg-transparent',
              'data-[hover=true]:bg-transparent',
              'group-data-[focus=true]:bg-transparent',
              'py-3',
            ],
          }}
          value={contentNote}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setContentNote(event.target.value)
          }
        />
      </CardBody>
      <div className="flex items-center px-3">
        {reminder && (
          <Chip
            size="sm"
            radius="full"
            variant="flat"
            startContent={<ClockIcon classname="h-4" />}
            onClose={() => handleReminderClick('')}
          >
            {reminder}
          </Chip>
        )}
      </div>
      <CardFooter className="flex items-center justify-between pl-[2px] pb-[2px]">
        <div className="flex items-center gap-2">
          <AddReminder
            startDate={startDate}
            onReminderChange={handleReminderClick}
            onStartDateChange={handleStartDateClick}
          />
          <AddColor color={color} onColorChange={handleColorClick} />
          <ImageUpload uid={user?.uid} onUploadImage={handleImageUpload} />
          <AddToArchive
            isArchived={isArchived}
            onArchiveNoteClick={handleArchiveNoteClick}
          />
        </div>
        <Button
          className="font-medium bg-transparent hover:bg-gray-900/10"
          onClick={async () => {
            await createNote(
              {
                content: contentNote,
                bgColor: color,
                imageURL: imageURL,
                isArchived: isArchived,
                isPinned: false,
                isDeleted: false,
                uid: user?.uid,
              },
              user?.uid
            );

            setContentNote('');
            setColor('bg-white');
            setImageURL('');
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
