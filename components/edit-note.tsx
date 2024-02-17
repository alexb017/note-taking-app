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
import UploadImageToStorage from './upload-image';

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

export default function EditNote({
  note,
  onReminderClick,
  onColorClick,
  onUploadImage,
  onContentChange,
}: {
  note: Note;
  onReminderClick: (date: string) => void;
  onColorClick: (color: string) => void;
  onUploadImage: (img: ImageData) => void;
  onContentChange: (text: string) => void;
}) {
  const [noteData, setNoteData] = useState(note);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  async function handleContentChange(text: string) {
    setNoteData({ ...noteData, content: text });
    onContentChange(text);
  }

  function handleReminderClick(date: string) {
    setNoteData({ ...noteData, reminder: date });
    onReminderClick(date);
  }

  function handleColorClick(color: string) {
    setNoteData({ ...noteData, bgColor: color });
    onColorClick(color);
  }

  function handleImageUpload(img: ImageData) {
    setNoteData({ ...noteData, image: img });
    onUploadImage(img);
  }

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        aria-label="color"
        radius="full"
        className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-gray-900/10"
        onClick={() => router.push(`?=${noteData?.id}`)}
      >
        <EditIcon classname="h-4" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          router.push(`${pathname}`);
        }}
        placement="center"
        backdrop="blur"
        className={`${noteData?.bgColor}`}
        classNames={{ closeButton: 'hidden' }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {noteData?.image.src ? (
                <>
                  <ModalHeader className="relative w-full max-w-[512px] p-0 rounded-b-none">
                    <Image
                      alt={noteData?.image.altname}
                      src={noteData?.image.src}
                      className="w-full h-auto rounded-b-none"
                    />
                    <DeleteImageFromStorage
                      onHandleImageUpload={handleImageUpload}
                      imageUrl={noteData?.image.src}
                    />
                  </ModalHeader>
                </>
              ) : null}
              <ModalBody className="p-0 py-2 px-2">
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
                  value={noteData?.content}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleContentChange(event.target.value)
                  }
                />
              </ModalBody>

              {noteData?.reminder && (
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
                    {noteData?.reminder}
                  </Chip>
                </div>
              )}

              <ModalFooter className="flex items-center justify-between px-[8px] pb-[4px]">
                <div className="flex items-center gap-2">
                  <AddReminder onReminderClick={handleReminderClick} />
                  <AddColor
                    color={noteData?.bgColor}
                    onColorChange={handleColorClick}
                  />
                  <UploadImageToStorage
                    uid={noteData?.uid}
                    onHandleImageUpload={handleImageUpload}
                  />
                  <AddToArchiveButton
                    uid={noteData?.uid}
                    noteId={noteData?.id}
                  />
                  <DeleteUndoNoteButton
                    uid={noteData?.uid}
                    noteId={noteData?.id}
                    type="delete"
                  />
                </div>
                <Button
                  className="font-medium bg-transparent hover:bg-gray-900/5"
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
