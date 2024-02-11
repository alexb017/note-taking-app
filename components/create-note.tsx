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
import { useState } from 'react';
import AddColor from './add-color';
import AddReminder from './add-reminder';
import AddImage from './add-image';
import ClockIcon from './icons/clock';
import TrashIcon from './icons/trash';
import AddToArchive from './add-to-archive';

export default function CreateNote() {
  const [reminder, setReminder] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [color, setColor] = useState('bg-white');
  const [imageURL, setImageURL] = useState('');
  const [imageName, setImageName] = useState('');
  const [archiveNote, setArchiveNote] = useState(false);

  console.log(archiveNote);

  function handleReminderClick(date: string) {
    setReminder(date);
  }

  function handleStartDateClick(date: any) {
    setStartDate(date);
  }

  function handleColorClick(color: string) {
    setColor(color);
  }

  async function handleUploadImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {}

  async function handleDeleteImageClick(filename: string) {}

  function handleArchiveNoteClick() {
    if (!archiveNote) {
      setArchiveNote(true);
    } else {
      setArchiveNote(false);
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
            <Button
              isIconOnly
              aria-label="reminder"
              radius="full"
              className="absolute right-1 bottom-1 z-10 bg-transparent hover:bg-gray-900/10"
              onClick={() => handleDeleteImageClick(imageURL)}
            >
              <TrashIcon classname="h-5" />
            </Button>
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
          <AddImage onUploadImageChange={handleUploadImageChange} />
          <AddToArchive onArchiveNoteClick={handleArchiveNoteClick} />
        </div>
        <Button color="default" variant="light" className="font-medium">
          Save Note
        </Button>
      </CardFooter>
    </Card>
  );
}
