import { TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { addNoteToTrash } from '@/lib/actions';
import TooltipWrap from '@/components/tooltip-wrap';

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
    <TooltipWrap
      content={!isDeleted ? 'Delete note' : 'Restore'}
      events={{ onClick: async () => await addNoteToTrash(uid, noteId) }}
    >
      {isDeleted ? (
        <ArrowUturnLeftIcon className="w-5" />
      ) : (
        <TrashIcon className="w-5" />
      )}
    </TooltipWrap>
  );
}
