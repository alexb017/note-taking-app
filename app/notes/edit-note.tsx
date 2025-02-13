import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import DeleteImageFromStorage from './detele-image';
import AddReminder from './add-reminder';
import AddColor from './add-color';
import AddToArchive from './add-to-archive';
import DeleteUndoNoteButton from './delete-undo-note';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import UploadImageToStorage from './upload-image';
import type { Note, ImageData, BgColor } from '@/lib/types';
import AddToPinButton from './add-to-pin';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import EditReminder from './edit-reminder';
import { useState, useEffect } from 'react';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import {
  useRouter,
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from 'next/navigation';
import { createUrl } from '@/lib/utils';

export default function EditNote({
  note,
  onReminderClick,
  onColorClick,
  onUploadImage,
  onContentChange,
  onTitleChange,
}: {
  note: Note;
  onReminderClick: (date: Timestamp | undefined) => void;
  onColorClick: (colors: BgColor) => void;
  onUploadImage: (img: ImageData) => void;
  onContentChange: (text: string) => void;
  onTitleChange: (text: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('id') === note.noteId;

  // Set and id in the URL when the dialog is open
  const openDialog = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('id', note.noteId);
    router.push(createUrl(pathname, newParams), { scroll: false });
  };

  // Remove the id from the URL when the dialog is closed
  const closeDialog = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('id');
    router.push(createUrl(pathname, newParams), { scroll: false });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? openDialog() : closeDialog())}
      modal={false}
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                onClick={openDialog}
                size="icon"
                className="p-0 w-[34px] h-[34px] [&_svg]:size-[18px] rounded-full bg-transparent shadow-none text-black/80 dark:text-white/80 hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
              >
                <PencilSquareIcon className="w-5" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
            Edit note
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogPortal>
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>
      </DialogPortal>
      <DialogContent
        aria-describedby={undefined}
        className={`max-w-[512px] p-0 border-0 sm:rounded-xl shadow-lg ${note?.bgColor.light} ${note?.bgColor.dark}`}
      >
        <div className="absolute top-2 right-2 z-50">
          <AddToPinButton
            uid={note?.userId}
            noteId={note?.noteId}
            isPinned={note?.isPinned}
            hasImage={note?.image.src}
          />
        </div>

        <DialogTitle className="hidden sr-only">Edit note</DialogTitle>

        {note?.image?.src && (
          <DialogHeader className="relative w-full max-h-max overflow-hidden p-0 rounded-t-xl rounded-b-none">
            <Image
              src={note?.image.src}
              alt={note?.image.altName}
              width={512}
              height={256}
              style={{ width: 'auto', height: 'auto' }}
            />
            <div className="absolute right-2 bottom-2 z-10">
              <DeleteImageFromStorage
                imageUrl={note?.image?.src}
                onSetImageUpload={onUploadImage}
              />
            </div>
          </DialogHeader>
        )}

        <div className="flex flex-col">
          <Input
            placeholder="Title"
            className="px-3 font-semibold text-black/70 dark:text-white/70 shadow-none border-0 rounded-none focus-visible:ring-0"
            value={note?.title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <Textarea
            placeholder="Take a note..."
            className="md:text-base text-black/90 dark:text-white/90 font-semibold p-0 px-3 min-h-[80px] shadow-none border-0 rounded-none resize-none focus-visible:ring-0"
            value={note?.content}
            onChange={(e) => onContentChange(e.target.value)}
          />
        </div>

        {note?.reminder && (
          <EditReminder
            reminder={note?.reminder}
            setReminder={onReminderClick}
          />
        )}

        <DialogFooter className="flex-row justify-between sm:justify-between p-0 px-[4px] pb-[2px] pr-4">
          <div className="flex items-center gap-4">
            <AddReminder
              reminder={note?.reminder ?? undefined}
              setReminder={onReminderClick}
            />
            <AddColor bg={note?.bgColor} onColorsChange={onColorClick} />
            <UploadImageToStorage
              onSetImageUpload={onUploadImage}
              uid={note?.userId}
            />
            <AddToArchive
              uid={note?.userId}
              noteId={note?.noteId}
              isArchived={note?.isArchived}
            />
            <DeleteUndoNoteButton
              uid={note?.userId}
              noteId={note?.noteId}
              isDeleted={note?.isDeleted}
            />
          </div>

          <Button
            variant="ghost"
            className="hover:bg-zinc-900/5 dark:hover:bg-zinc-100/5"
            onClick={closeDialog}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
