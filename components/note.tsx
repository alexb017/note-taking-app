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
import { updateBgColor, updateReminder } from '@/lib/actions';
import AddToArchiveButton from './add-to-archive-button';
import DeleteUndoNoteButton from './delete-undo-note-button';
import DeleteNoteButton from './delete-note-button';
import ClockIcon from './icons/clock';
import AddReminder from './add-reminder';
import EditNote from './edit-note';
import CloseIcon from './icons/close';

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
  //const [reminder, setReminder] = useState(note?.reminder);

  async function handleReminderClick(date: string) {
    //setReminder(date);
    await updateReminder(note?.uid, note?.id, date);
  }

  async function handleColorClick(color: string) {
    await updateBgColor(note?.uid, note?.id, color);
  }

  return (
    <Card className={`w-full max-w-[240px] mb-4 group ${note?.bgColor}`}>
      {note?.image.src ? (
        <CardHeader className="relative w-full max-w-[240px] p-0 rounded-b-none">
          <Image
            alt={note?.image.altname}
            src={note?.image.src}
            className="w-full h-auto rounded-b-none"
          />
        </CardHeader>
      ) : null}
      <CardBody className="overflow-visible py-2 px-5 cursor-default">
        <p className="text-lg">{note?.content}</p>
      </CardBody>

      {note?.reminder && (
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
            {note?.reminder}
          </Chip>
        </div>
      )}

      <CardFooter className="flex items-center justify-between pl-[2px] pb-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
        {!note?.isDeleted ? (
          <>
            <div className="flex items-center gap-2">
              <EditNote note={note} />
              <AddReminder
                reminder={note?.reminder}
                onReminderClick={handleReminderClick}
              />
              <AddColor
                color={note?.bgColor}
                onColorChange={handleColorClick}
              />
              <AddToArchiveButton uid={note?.uid} noteId={note?.id} />
              <DeleteUndoNoteButton
                uid={note?.uid}
                noteId={note?.id}
                type="delete"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between w-full">
              <DeleteNoteButton
                uid={note?.uid}
                noteId={note?.id}
                imageURL={note?.image.src}
              />
              <DeleteUndoNoteButton
                uid={note?.uid}
                noteId={note?.id}
                type="undo"
              />
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
