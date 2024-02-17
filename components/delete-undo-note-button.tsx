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
    <>
      {type === 'delete' ? (
        <>
          <Button
            isIconOnly
            aria-label="delete"
            radius="full"
            className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-gray-900/10"
            onClick={async () => await addNoteToTrash(uid, noteId)}
          >
            <TrashIcon classname="h-4" />
          </Button>
        </>
      ) : (
        <>
          <Button
            aria-label="undo"
            radius="full"
            className="gap-1 h-8 bg-transparent hover:bg-gray-900/10"
            onClick={async () => await addNoteToTrash(uid, noteId)}
          >
            <UndoIcon classname="h-4" />
            Restore
          </Button>
        </>
      )}
    </>
  );
}
