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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import { createUrl } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import EditReminder from './edit-reminder';
import { useState } from 'react';

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
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // console.log(searchParams.get('q'));
  // console.log(pathname);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild className="p-0">
            <DialogTrigger asChild>
              <Button className="w-9 h-9 [&_svg]:size-5 rounded-full bg-transparent shadow-none hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10">
                <PencilSquareIcon className="h-5 w-5 text-black dark:text-white" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
            Edit note
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
            className="px-3 font-semibold text-black/30 dark:text-white/30 shadow-none border-0 rounded-none focus-visible:ring-0"
            value={note?.title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <Textarea
            placeholder="Take a note..."
            className="md:text-base font-semibold p-0 px-3 min-h-[80px] shadow-none border-0 rounded-none resize-none focus-visible:ring-0"
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

        <DialogFooter className="flex-row justify-between sm:justify-between p-0 px-[4px] pb-[2px]">
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
            className="rounded-xl hover:bg-zinc-900/10 hover:dark:bg-zinc-100/10"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
