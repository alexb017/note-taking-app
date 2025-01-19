'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useState } from 'react';
import AddColor from './add-color';
import {
  updateBgColor,
  updateContent,
  updateImage,
  updateReminder,
} from '@/lib/actions';
import AddToArchiveButton from './add-to-archive';
import DeleteUndoNoteButton from './delete-undo-note';
import DeleteNoteButton from './delete-note';
import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AddReminder from './add-reminder';
import EditNote from './edit-note';
import UploadImageToStorage from './upload-image';
import DeleteImageFromStorage from './detele-image';
import type { Note, ImageData, BgColor } from '@/lib/types';
import AddToPinButton from './add-to-pin';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

export default function Note({ note }: { note: Note }) {
  const [noteData, setNoteData] = useState(note);
  //console.log(noteData);

  async function handleContentChange(text: string) {
    setNoteData({ ...noteData, content: text });
    await updateContent(note?.userId, note?.noteId, text);
  }

  async function handleReminderClick(date: Date) {
    setNoteData({ ...noteData, reminder: date });
    await updateReminder(noteData?.userId, noteData?.noteId, date);
  }

  async function handleColorClick(colors: BgColor) {
    setNoteData({ ...noteData, bgColor: colors });
    await updateBgColor(noteData?.userId, noteData?.noteId, colors);
  }

  async function handleImageUpload(img: ImageData) {
    setNoteData({ ...noteData, image: img });
    await updateImage(noteData?.userId, noteData?.noteId, img);
  }

  return (
    <Card
      className={`relative w-full md:w-[240px] mb-4 shadow group ${noteData?.bgColor.light} ${noteData?.bgColor.dark}`}
    >
      {!noteData?.isDeleted ? (
        <>
          <div className="absolute right-2 top-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
            <AddToPinButton
              uid={noteData?.userId}
              noteId={noteData?.noteId}
              isPinned={noteData?.isPinned}
              hasImage={noteData?.image.src}
            />
          </div>
        </>
      ) : null}

      {noteData?.image.src ? (
        <CardHeader className="relative w-full md:w-[240px] p-0 rounded-b-none">
          <Image
            alt={noteData?.image.altName}
            src={noteData?.image.src}
            className="w-full h-auto rounded-b-none"
            width={240}
            height={160}
          />
          <div className="absolute right-1 bottom-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
            <DeleteImageFromStorage
              imageUrl={noteData?.image.src}
              onSetImageUpload={handleImageUpload}
            />
          </div>
        </CardHeader>
      ) : null}
      <CardDescription className="py-2 px-5 cursor-default">
        <p className="whitespace-pre-wrap text-base">{noteData?.content}</p>
      </CardDescription>

      {noteData?.reminder && (
        <div className="flex items-center px-3">
          <Badge
            variant="secondary"
            className="relative ml-3 px-1 pr-[6px] text-zinc-400 gap-1 rounded-full dark:bg-zinc-700 group cursor-pointer"
          >
            <ClockIcon className="w-4 h-4" />
            {noteData?.reminder
              ? format(noteData?.reminder, 'PPP')
              : 'No date selected'}
            <Button
              variant="secondary"
              size="icon"
              className="opacity-0 group-hover:opacity-100 absolute top-0 right-0 p-0 w-[22px] h-[22px] rounded-full transition-opacity duration-200 ease-in"
              onClick={() => handleReminderClick(new Date())}
            >
              <XMarkIcon className="w-4 h-4" />
            </Button>
          </Badge>
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
                setReminder={handleReminderClick}
              />
              <AddColor
                bg={noteData?.bgColor}
                onColorsChange={handleColorClick}
              />
              <UploadImageToStorage
                uid={noteData?.userId}
                onSetImageUpload={handleImageUpload}
              />
              <AddToArchiveButton
                uid={noteData?.userId}
                noteId={noteData?.noteId}
                isArchived={noteData?.isArchived}
              />
              <DeleteUndoNoteButton
                uid={noteData?.userId}
                noteId={noteData?.noteId}
                isDeleted={noteData?.isDeleted}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 w-full">
              <DeleteNoteButton
                uid={noteData?.userId}
                noteId={noteData?.noteId}
                imageURL={noteData?.image.src}
              />
              <DeleteUndoNoteButton
                uid={noteData?.userId}
                noteId={noteData?.noteId}
                isDeleted={noteData?.isDeleted}
              />
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
