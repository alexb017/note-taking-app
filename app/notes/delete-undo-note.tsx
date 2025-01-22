import { TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { addNoteToTrash } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger
          asChild
          className="p-0 w-8 h-8 rounded-full bg-transparent shadow-none hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
        >
          <Button onClick={async () => await addNoteToTrash(uid, noteId)}>
            {!isDeleted ? (
              <TrashIcon className="h-4 w-4 text-black dark:text-white" />
            ) : (
              <ArrowUturnLeftIcon className="h-4 w-4 text-black dark:text-white" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
          {!isDeleted ? 'Delete note' : 'Restore'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
