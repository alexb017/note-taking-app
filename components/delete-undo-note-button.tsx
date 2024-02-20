import { Button, Tooltip } from '@nextui-org/react';
import TrashIcon from './icons/trash';
import UndoIcon from './icons/undo';
import { addNoteToTrash } from '@/lib/actions';

export default function DeleteUndoNoteButton({
  uid,
  noteId,
  isDeleted,
}: {
  uid: string;
  noteId: string;
  isDeleted: boolean;
}) {
  return (
    <Tooltip
      placement="bottom"
      radius="sm"
      size="sm"
      offset={0}
      delay={350}
      content={!isDeleted ? 'Delete note' : 'Restore'}
    >
      <div>
        <Button
          isIconOnly
          aria-label={!isDeleted ? 'delete note' : 'restore'}
          radius="full"
          className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
          onClick={async () => await addNoteToTrash(uid, noteId)}
        >
          {!isDeleted ? (
            <TrashIcon classname="h-4" />
          ) : (
            <UndoIcon classname="h-4" />
          )}
        </Button>
      </div>
    </Tooltip>
  );
}
