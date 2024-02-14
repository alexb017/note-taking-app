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
import DeleteNote from './delete-note';
import AddColor from './add-color';
import { updateBgColor, updateIsArchived } from '@/lib/actions';
import AddToArchive from './add-to-archive';

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

  async function handleUpdateIsArchived() {
    await updateIsArchived(note.uid, note.id);
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
        <div className="flex items-center gap-2">
          <AddColor color={note.bgColor} onColorChange={handleColorClick} />
          <AddToArchive onArchiveNoteClick={handleUpdateIsArchived} />
          <DeleteNote uid={note.uid} noteId={note.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
