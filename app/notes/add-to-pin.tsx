import PinIcon from '@/components/icons/pin';
import { updateIsPinned } from '@/lib/actions';
import PinBoldIcon from '@/components/icons/pin-bold';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function AddToPinButton({
  uid,
  noteId,
  isPinned,
  hasImage,
}: {
  uid: string;
  noteId: string;
  isPinned: boolean;
  hasImage: string;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger
          asChild
          className={cn(
            'p-0 w-8 h-8 rounded-full bg-transparent shadow-none text-black dark:text-white hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10',
            hasImage &&
              'backdrop-blur-lg text-white bg-zinc-900/50 hover:bg-zinc-900/60 dark:hover:bg-zinc-900/60'
          )}
        >
          <Button onClick={async () => await updateIsPinned(uid, noteId)}>
            {!isPinned ? (
              <PinIcon classname="w-4 h-4 -rotate-45" />
            ) : (
              <PinBoldIcon classname="w-4 h-4 -rotate-45" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
          {!isPinned ? 'Pinned' : 'Unpinned'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
