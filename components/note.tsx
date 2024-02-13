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

export default function Note({ note }: { note: any }) {
  const [bgColor, setBgColor] = useState(note?.bgColor);

  return (
    <Card className={`w-full max-w-[240px] mb-4 ${bgColor}`}>
      <CardHeader className="relative w-full max-w-[240px] p-0 rounded-b-none"></CardHeader>
      <CardBody className="overflow-visible py-2 cursor-default">
        <p>{note?.content}</p>
      </CardBody>
      <CardFooter className="flex items-center justify-between pl-[2px] pb-[2px]">
        <div className="flex items-center gap-2">
          <DeleteNote uid={note.uid} noteId={note.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
