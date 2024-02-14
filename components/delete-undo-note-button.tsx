import { Button } from '@nextui-org/react';
import TrashIcon from './icons/trash';
import UndoIcon from './icons/undo';
import { addNoteToTrash } from '@/lib/actions';

export default function DeleteUndoNoteButton({
  uid,
  noteId,
  type,
}: {
  uid: string;
  noteId: string;
  type: 'delete' | 'undo';
}) {
  return (
    <Button
      isIconOnly
      aria-label="color"
      radius="full"
      className="bg-transparent hover:bg-gray-900/10"
      onClick={async () => await addNoteToTrash(uid, noteId)}
    >
      {type === 'delete' ? (
        <TrashIcon classname="h-5" />
      ) : (
        <UndoIcon classname="h-5" />
      )}
    </Button>
  );
}
