import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';
import { updateIsArchived } from '@/lib/actions';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export default function AddToArchive({
  uid,
  noteId,
  isArchived,
}: {
  uid: string;
  noteId: string;
  isArchived: boolean;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger
          asChild
          className="p-0 w-9 h-9 [&_svg]:size-5 rounded-full bg-transparent shadow-none hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
        >
          <Button onClick={async () => await updateIsArchived(uid, noteId)}>
            {!isArchived ? (
              <ArchiveBoxArrowDownIcon className="h-5 w-5 text-black dark:text-white" />
            ) : (
              <ArchiveBoxXMarkIcon className="h-5 w-5 text-black dark:text-white" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
          {!isArchived ? 'Archive' : 'Unarchive'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
