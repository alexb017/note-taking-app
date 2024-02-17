'use client';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Chip,
} from '@nextui-org/react';
import { useState } from 'react';
import AddColor from './add-color';
import {
  updateBgColor,
  updateContent,
  updateImage,
  updateReminder,
} from '@/lib/actions';
import AddToArchiveButton from './add-to-archive-button';
import DeleteUndoNoteButton from './delete-undo-note-button';
import DeleteNoteButton from './delete-note-button';
import ClockIcon from './icons/clock';
import AddReminder from './add-reminder';
import EditNote from './edit-note';
import CloseIcon from './icons/close';
import UploadImageToStorage from './upload-image';
import DeleteImageFromStorage from './detele-image';

type Note = {
  id: string;
  content: string;
  bgColor: string;
  image: {
    src: string;
    altname: string;
  };
  reminder: string;
  isArchived: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  uid: string;
};

type ImageData = {
  src: string;
  altname: string;
};

export default function Note({ note }: { note: Note }) {
  const [noteData, setNoteData] = useState(note);

  async function handleContentChange(text: string) {
    setNoteData({ ...noteData, content: text });
    await updateContent(note?.uid, note?.id, text);
  }

  async function handleReminderClick(date: string) {
    setNoteData({ ...noteData, reminder: date });
    await updateReminder(noteData?.uid, noteData?.id, date);
  }

  async function handleColorClick(color: string) {
    setNoteData({ ...noteData, bgColor: color });
    await updateBgColor(noteData?.uid, noteData?.id, color);
  }

  async function handleImageUpload(img: ImageData) {
    setNoteData({ ...noteData, image: img });
    await updateImage(noteData?.uid, noteData?.id, img);
  }

  return (
    <Card
      className={`w-full max-w-[240px] mb-4 shadow group ${noteData?.bgColor}`}
    >
      {noteData?.image.src ? (
        <CardHeader className="relative w-full max-w-[240px] p-0 rounded-b-none">
          <Image
            alt={noteData?.image.altname}
            src={noteData?.image.src}
            className="w-full h-auto rounded-b-none"
          />
          <DeleteImageFromStorage
            imageUrl={noteData?.image.src}
            onHandleImageUpload={handleImageUpload}
          />
        </CardHeader>
      ) : null}
      <CardBody className="overflow-visible py-2 px-5 cursor-default">
        <p className="text-lg">{noteData?.content}</p>
      </CardBody>

      {noteData?.reminder && (
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
                'absolute right-0 rounded-full text-gray-900/80 bg-gray-100 opacity-0 group-hover/chip:opacity-100 transition-opacity ease-in-out',
            }}
          >
            {noteData?.reminder}
          </Chip>
        </div>
      )}

      <CardFooter className="flex items-center justify-between pl-[4px] pb-[4px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
        {!noteData?.isDeleted ? (
          <>
            <div className="flex items-center gap-2">
              <EditNote
                note={noteData}
                onReminderClick={handleReminderClick}
                onColorClick={handleColorClick}
                onUploadImage={handleImageUpload}
                onContentChange={handleContentChange}
              />
              <AddReminder
                reminder={noteData?.reminder}
                onReminderClick={handleReminderClick}
              />
              <AddColor
                color={noteData?.bgColor}
                onColorChange={handleColorClick}
              />
              <UploadImageToStorage
                uid={noteData?.uid}
                onHandleImageUpload={handleImageUpload}
              />
              <AddToArchiveButton uid={noteData?.uid} noteId={noteData?.id} />
              <DeleteUndoNoteButton
                uid={noteData?.uid}
                noteId={noteData?.id}
                type="delete"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between w-full">
              <DeleteNoteButton
                uid={noteData?.uid}
                noteId={noteData?.id}
                imageURL={noteData?.image.src}
              />
              <DeleteUndoNoteButton
                uid={noteData?.uid}
                noteId={noteData?.id}
                type="undo"
              />
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
