import React, { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import EditIcon from './icons/edit';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import DeleteImageFromStorage from './detele-image';
import { updateBgColor, updateContent, updateReminder } from '@/lib/actions';
import ClockIcon from './icons/clock';
import AddReminder from './add-reminder';
import AddColor from './add-color';
import AddToArchiveButton from './add-to-archive-button';
import DeleteUndoNoteButton from './delete-undo-note-button';
import CloseIcon from './icons/close';
import UploadImageToStorage from './upload-image';
import { Note, ImageData, BgColor } from '@/lib/types';
import AddToPinButton from './add-to-pin-button';

export default function EditNote({
  note,
  onReminderClick,
  onColorClick,
  onUploadImage,
  onContentChange,
}: {
  note: Note;
  onReminderClick: (date: string) => void;
  onColorClick: (colors: BgColor) => void;
  onUploadImage: (img: ImageData) => void;
  onContentChange: (text: string) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // console.log(searchParams.get('q'));
  // console.log(pathname);

  function createUrl(
    pathname: string,
    params: URLSearchParams | ReadonlyURLSearchParams
  ) {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
  }

  return <></>;
}
