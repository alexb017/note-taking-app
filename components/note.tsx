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
import { updateBgColor } from '@/lib/actions';

export default function Note({ note }: { note: any }) {
  const [bgColor, setBgColor] = useState(note?.bgColor);

  async function handleColorClick(color: string) {
    setBgColor(color);
    await updateBgColor(note.uid, note.id, color);
  }

  return (
    <Card className={`w-full max-w-[240px] mb-4 ${bgColor}`}>
      <CardHeader className="relative w-full max-w-[240px] p-0 rounded-b-none"></CardHeader>
      <CardBody className="overflow-visible py-2 cursor-default">
        <p>{note?.content}</p>
      </CardBody>
      <CardFooter className="flex items-center justify-between pl-[2px] pb-[2px]">
        <div className="flex items-center gap-2">
          <AddColor color={bgColor} onColorChange={handleColorClick} />
          <DeleteNote uid={note.uid} noteId={note.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
