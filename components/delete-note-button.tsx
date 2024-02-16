import { Button } from '@nextui-org/react';
import TrashIcon from './icons/trash';
import { deleteNote } from '@/lib/actions';
import { deleteImageFromStorage } from '@/lib/utils';

export default function DeleteNoteButton({
  uid,
  noteId,
  imageURL,
}: {
  uid: string;
  noteId: string;
  imageURL?: string;
}) {
  return (
    <Button
      isIconOnly
      aria-label="color"
      radius="full"
      className="bg-transparent hover:bg-gray-900/10"
      onClick={async () => {
        await deleteNote(uid, noteId);

        if (imageURL) {
          await deleteImageFromStorage(imageURL);
        }
      }}
    >
      <TrashIcon classname="h-5" />
    </Button>
  );
}
