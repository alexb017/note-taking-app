'use client';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from '@nextui-org/react';
import { useState } from 'react';
import AddColor from './add-color';
import { updateBgColor } from '@/lib/actions';
import AddToArchiveButton from './add-to-archive-button';
import DeleteUndoNoteButton from './delete-undo-note-button';
import DeleteNoteButton from './delete-note-button';

type Note = {
  id: string;
  content: string;
  bgColor: string;
  image: {
    src: string;
    altname: string;
  };
  hasReminder: string;
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
  async function handleColorClick(color: string) {
    await updateBgColor(note.uid, note.id, color);
  }

  return (
    <Card className={`w-full max-w-[240px] mb-4 ${note.bgColor}`}>
      {note.image.src ? (
        <CardHeader className="relative w-full max-w-[240px] p-0 rounded-b-none">
          <Image
            alt={note.image.altname}
            src={note.image.src}
            className="w-full h-auto rounded-b-none"
          />
        </CardHeader>
      ) : null}
      <CardBody className="overflow-visible py-2 cursor-default">
        <p>{note?.content}</p>
      </CardBody>
      <CardFooter className="flex items-center justify-between pl-[2px] pb-[2px]">
        {!note?.isDeleted ? (
          <>
            <div className="flex items-center gap-2">
              <AddColor color={note.bgColor} onColorChange={handleColorClick} />
              <AddToArchiveButton uid={note?.uid} noteId={note?.id} />
              <DeleteUndoNoteButton
                uid={note?.uid}
                noteId={note.id}
                type="delete"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <DeleteNoteButton uid={note?.uid} noteId={note?.id} />
              <DeleteUndoNoteButton
                uid={note?.uid}
                noteId={note.id}
                type="undo"
              />
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
