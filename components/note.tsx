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
import { Notes, ImageData, BgColor } from '@/lib/types';
import AddToPinButton from './add-to-pin-button';

export default function Note({ note }: { note: Notes }) {
  const [noteData, setNoteData] = useState(note);

  async function handleContentChange(text: string) {
    setNoteData({ ...noteData, content: text });
    await updateContent(note?.uid, note?.id, text);
  }

  async function handleReminderClick(date: string) {
    setNoteData({ ...noteData, reminder: date });
    await updateReminder(noteData?.uid, noteData?.id, date);
  }

  async function handleColorClick(colors: BgColor) {
    setNoteData({ ...noteData, bgColor: colors });
    await updateBgColor(noteData?.uid, noteData?.id, colors);
  }

  async function handleImageUpload(img: ImageData) {
    setNoteData({ ...noteData, image: img });
    await updateImage(noteData?.uid, noteData?.id, img);
  }

  return (
    <Card
      className={`relative w-full md:w-[240px] mb-4 shadow group ${noteData?.bgColor.light} ${noteData?.bgColor.dark}`}
    >
      {!noteData?.isDeleted ? (
        <>
          <div className="absolute right-2 top-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
            <AddToPinButton
              uid={noteData?.uid}
              noteId={noteData?.id}
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
          />
          <div className="absolute right-1 bottom-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
            <DeleteImageFromStorage
              imageUrl={noteData?.image.src}
              onHandleImageUpload={handleImageUpload}
            />
          </div>
        </CardHeader>
      ) : null}
      <CardBody className="py-2 px-5 cursor-default">
        <p className="whitespace-pre-wrap text-base">{noteData?.content}</p>
      </CardBody>

      {noteData?.reminder && (
        <div className="flex items-center px-3">
          <Chip
            size="sm"
            radius="full"
            className="cursor-pointer group/chip bg-zinc-900/10 hover:bg-zinc-900/15 dark:bg-zinc-100/10 dark:hover:bg-zinc-100/15"
            startContent={<ClockIcon classname="h-4" />}
            onClose={() => handleReminderClick('')}
            endContent={<CloseIcon classname="h-4" />}
            classNames={{
              closeButton:
                'absolute right-0 rounded-full p-1 backdrop-blur-lg text-zinc-900/60 bg-gray-900/10 hover:bg-zinc-900/15 dark:text-white dark:bg-zinc-100/10 dark:hover:bg-zinc-100/20 opacity-0 group-hover/chip:opacity-100 transition-opacity ease-in-out',
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
                colors={noteData?.bgColor}
                onColorChange={handleColorClick}
              />
              <UploadImageToStorage
                uid={noteData?.uid}
                onHandleImageUpload={handleImageUpload}
              />
              <AddToArchiveButton
                uid={noteData?.uid}
                noteId={noteData?.id}
                isArchived={noteData?.isArchived}
              />
              <DeleteUndoNoteButton
                uid={noteData?.uid}
                noteId={noteData?.id}
                isDeleted={noteData?.isDeleted}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 w-full">
              <DeleteNoteButton
                uid={noteData?.uid}
                noteId={noteData?.id}
                imageURL={noteData?.image.src}
              />
              <DeleteUndoNoteButton
                uid={noteData?.uid}
                noteId={noteData?.id}
                isDeleted={noteData?.isDeleted}
              />
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
