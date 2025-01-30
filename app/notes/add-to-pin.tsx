import PinIcon from '@/components/icons/pin';
import { updateIsPinned } from '@/lib/actions';
import PinBoldIcon from '@/components/icons/pin-bold';
import { cn } from '@/lib/utils';
import TooltipWrap from '@/components/tooltip-wrap';

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
    <TooltipWrap
      content={!isPinned ? 'Pinned' : 'Unpinned'}
      events={{ onClick: async () => await updateIsPinned(uid, noteId) }}
      classnames={cn(
        hasImage &&
          'backdrop-blur text-white bg-zinc-900/50 hover:bg-zinc-900/60 dark:hover:bg-zinc-900/60'
      )}
    >
      {!isPinned ? (
        <PinIcon classname="w-6 -rotate-45" />
      ) : (
        <PinBoldIcon classname="w-5 -rotate-45" />
      )}
    </TooltipWrap>
  );
}
