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

type Note = {
  id: string;
  content: string;
  bgColor: string;
  image: {
    src: string;
    altname: string;
  };
  reminder: string;
  isArchived: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  uid: string;
};

type ImageData = {
  src: string;
  altname: string;
};

export default function EditNote({ note }: { note: Note }) {
  const [imageURL, setImageURL] = useState<ImageData>({ src: '', altname: '' });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  async function handleContentChange(text: string) {
    await updateContent(note?.uid, note?.id, text);
  }

  function handleImageUpload(data: ImageData) {
    setImageURL(data);
  }

  async function handleReminderClick(date: string) {
    await updateReminder(note?.uid, note?.id, date);
  }

  async function handleColorClick(color: string) {
    await updateBgColor(note.uid, note.id, color);
  }

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        aria-label="color"
        radius="full"
        className="bg-transparent hover:bg-gray-900/10"
        onClick={() => router.push(`?=${note?.id}`)}
      >
        <EditIcon classname="h-5" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          router.push(`${pathname}`);
        }}
        placement="center"
        backdrop="blur"
        className={`${note?.bgColor}`}
        classNames={{ closeButton: 'hidden' }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {imageURL?.src ? (
                <>
                  <ModalHeader className="relative w-full max-w-[512px] p-0 rounded-b-none">
                    <Image
                      alt={imageURL?.altname}
                      src={imageURL?.src}
                      className="w-full h-auto rounded-b-none"
                    />
                    <DeleteImageFromStorage
                      onHandleImageUpload={handleImageUpload}
                      imageUrl={imageURL?.src}
                    />
                  </ModalHeader>
                </>
              ) : null}
              <ModalBody className="p-0">
                <Textarea
                  placeholder="Description"
                  radius="none"
                  classNames={{
                    input: 'text-lg',
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
                    handleContentChange(event.target.value)
                  }
                />
              </ModalBody>

              {note?.reminder && (
                <div className="flex items-center px-3">
                  <Chip
                    size="sm"
                    radius="full"
                    className="cursor-pointer group/chip bg-gray-900/10 hover:bg-gray-900/15"
                    startContent={<ClockIcon classname="h-4" />}
                    onClose={() => handleReminderClick('')}
                    endContent={<CloseIcon classname="h-6" />}
                    classNames={{
                      closeButton:
                        'absolute right-0 rounded-full text-gray-900/60 bg-gray-100 opacity-0 group-hover/chip:opacity-100 transition-opacity ease-in-out',
                    }}
                  >
                    {note?.reminder}
                  </Chip>
                </div>
              )}

              <ModalFooter className="flex items-center justify-between pr-[12px] pl-[2px] pb-[2px]">
                <div className="flex items-center gap-2">
                  <AddReminder onReminderClick={handleReminderClick} />
                  <AddColor
                    color={note?.bgColor}
                    onColorChange={handleColorClick}
                  />
                  <AddToArchiveButton uid={note?.uid} noteId={note?.id} />
                  <DeleteUndoNoteButton
                    uid={note?.uid}
                    noteId={note?.id}
                    type="delete"
                  />
                </div>
                <Button
                  className="font-medium bg-transparent hover:bg-gray-900/10"
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
