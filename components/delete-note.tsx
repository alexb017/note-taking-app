import { Button } from '@nextui-org/react';
import TrashIcon from './icons/trash';
import { deleteNote } from '@/lib/actions';

export default function DeleteNote({
  uid,
  noteId,
}: {
  uid: string;
  noteId: string;
}) {
  return (
    <Button
      isIconOnly
      aria-label="color"
      radius="full"
      className="bg-transparent hover:bg-gray-900/10"
      onClick={async () => await deleteNote(uid, noteId)}
    >
      <TrashIcon classname="h-5" />
    </Button>
  );
}
