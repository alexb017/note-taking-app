import { TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { addNoteToTrash } from '@/lib/actions';
import TooltipWrap from '@/components/tooltip-wrap';
import { useToast } from '@/hooks/use-toast';

export default function DeleteUndoNoteButton({
  uid,
  noteId,
  isDeleted,
}: {
  uid: string;
  noteId: string;
  isDeleted: boolean;
}) {
  const { toast } = useToast();

  return (
    <TooltipWrap
      content={!isDeleted ? 'Delete note' : 'Restore'}
      events={{
        onClick: async () => {
          await addNoteToTrash(uid, noteId);
          toast({
            description: !isDeleted ? 'Note deleted' : 'Note restored',
          });
        },
      }}
    >
      {isDeleted ? (
        <ArrowUturnLeftIcon className="w-5" />
      ) : (
        <TrashIcon className="w-5" />
      )}
    </TooltipWrap>
  );
}
