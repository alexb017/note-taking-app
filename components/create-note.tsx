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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import AddColor from './add-color';
import AddReminder from './add-reminder';
import AddImage from './add-image';
import ClockIcon from './icons/clock';
import TrashIcon from './icons/trash';
import AddToArchive from './add-to-archive';
import { createNote } from '@/lib/actions';
import { AuthContext } from '@/app/auth-context';

export default function CreateNote() {
  const { user } = useContext(AuthContext);
  const [contentNote, setContentNote] = useState('');
  const [reminder, setReminder] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [color, setColor] = useState('bg-white');
  const [imageURL, setImageURL] = useState('');
  const [imageName, setImageName] = useState('');
  const [isArchived, setIsArchived] = useState(false);

  console.log(isArchived);

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
  ) {
    // Get the file, with optional chaining to handle null
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Get name of the image without the extention
    const fileName = file.name.split('.')[0];
    setImageName(fileName);

    // Create a reference to the file to create
    const storage = getStorage();
    const storageRef = ref(storage, `/${fileName}`);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const url = await getDownloadURL(storageRef);

    setImageURL(url);
  }

  async function handleDeleteImageClick(filename: string) {
    setImageURL('');

    // Create a reference to the file to delete
    const storage = getStorage();
    const storageRef = ref(storage, filename);

    // Delete the file
    await deleteObject(storageRef);
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
          <AddImage onUploadImageChange={handleUploadImageChange} />
          <AddToArchive
            isArchived={isArchived}
            onArchiveNoteClick={handleArchiveNoteClick}
          />
        </div>
        <Button color="default" variant="light" className="font-medium">
          Save Note
        </Button>
      </CardFooter>
    </Card>
  );
}
