import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Image,
  Chip,
  Tooltip,
} from '@nextui-org/react';
import EditIcon from './icons/edit';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DeleteImageFromStorage from './detele-image';
import { updateBgColor, updateContent, updateReminder } from '@/lib/actions';
import ClockIcon from './icons/clock';
import AddReminder from './add-reminder';
import AddColor from './add-color';
import AddToArchiveButton from './add-to-archive-button';
import DeleteUndoNoteButton from './delete-undo-note-button';
import CloseIcon from './icons/close';
import UploadImageToStorage from './upload-image';
import { Notes, ImageData, BgColor } from '@/lib/types';
import AddToPinButton from './add-to-pin-button';

export default function EditNote({
  note,
  onReminderClick,
  onColorClick,
  onUploadImage,
  onContentChange,
}: {
  note: Notes;
  onReminderClick: (date: string) => void;
  onColorClick: (colors: BgColor) => void;
  onUploadImage: (img: ImageData) => void;
  onContentChange: (text: string) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Tooltip
        placement="bottom"
        radius="sm"
        size="sm"
        offset={0}
        delay={350}
        content="Edit note"
      >
        <div>
          <Button
            onPress={onOpen}
            isIconOnly
            aria-label="color"
            radius="full"
            className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
            onClick={() => router.push(`?=${note?.id}`)}
          >
            <EditIcon classname="h-4" />
          </Button>
        </div>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          router.push(`${pathname}`);
        }}
        placement="center"
        backdrop="blur"
        className={`${note?.bgColor.light} ${note?.bgColor.dark}`}
        classNames={{ closeButton: 'hidden' }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="absolute right-2 top-2 z-20">
                <AddToPinButton
                  uid={note?.uid}
                  noteId={note?.id}
                  isPinned={note?.isPinned}
                  hasImage={note?.image.src}
                />
              </div>

              {note?.image.src ? (
                <>
                  <ModalHeader className="relative w-full max-w-[512px] p-0 rounded-b-none">
                    <Image
                      alt={note?.image.altName}
                      src={note?.image.src}
                      className="w-full h-auto rounded-b-none"
                    />
                    <div className="absolute right-1 bottom-1 z-10">
                      <DeleteImageFromStorage
                        onHandleImageUpload={onUploadImage}
                        imageUrl={note?.image.src}
                      />
                    </div>
                  </ModalHeader>
                </>
              ) : null}
              <ModalBody className="p-0 py-2 px-2">
                <Textarea
                  placeholder="Description"
                  radius="none"
                  classNames={{
                    input: 'text-base',
                    inputWrapper: [
                      'bg-transparent',
                      'data-[hover=true]:bg-transparent',
                      'group-data-[focus=true]:bg-transparent',
                      'py-3',
                      'shadow-none',
                    ],
                  }}
                  value={note?.content}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    onContentChange(event.target.value)
                  }
                />
              </ModalBody>

              {note?.reminder && (
                <div className="flex items-center px-3">
                  <Chip
                    size="sm"
                    radius="full"
                    className="cursor-pointer group/chip bg-zinc-900/10 hover:bg-zinc-900/15 dark:bg-zinc-100/10 dark:hover:bg-zinc-100/15"
                    startContent={<ClockIcon classname="h-4" />}
                    onClose={() => onReminderClick('')}
                    endContent={<CloseIcon classname="h-6" />}
                    classNames={{
                      closeButton:
                        'absolute right-0 rounded-full text-zinc-900/60 bg-zinc-100 dark:text-zinc-100/80 dark:bg-zinc-700/95 opacity-0 group-hover/chip:opacity-100 transition-opacity ease-in-out',
                    }}
                  >
                    {note?.reminder}
                  </Chip>
                </div>
              )}

              <ModalFooter className="flex items-center justify-between px-[8px] pb-[4px]">
                <div className="flex items-center gap-2">
                  <AddReminder onReminderClick={onReminderClick} />
                  <AddColor
                    colors={note?.bgColor}
                    onColorChange={onColorClick}
                  />
                  <UploadImageToStorage
                    uid={note?.uid}
                    onHandleImageUpload={onUploadImage}
                  />
                  <AddToArchiveButton
                    uid={note?.uid}
                    noteId={note?.id}
                    isArchived={note?.isArchived}
                  />
                  <DeleteUndoNoteButton
                    uid={note?.uid}
                    noteId={note?.id}
                    isDeleted={note?.isDeleted}
                  />
                </div>
                <Button
                  className="font-medium bg-transparent hover:bg-zinc-900/5 dark:hover:bg-zinc-100/5"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
