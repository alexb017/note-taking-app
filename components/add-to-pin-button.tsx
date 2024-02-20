import { Button, Tooltip } from '@nextui-org/react';
import PinIcon from './icons/pin';
import { updateIsPinned } from '@/lib/actions';

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
    <Tooltip
      placement="bottom"
      radius="sm"
      size="sm"
      offset={0}
      delay={350}
      content={!isPinned ? 'Pin note' : 'Unpin note'}
    >
      <div>
        <Button
          isIconOnly
          aria-label="pin"
          radius="full"
          className={`min-w-unit-8 w-unit-8 h-8 ${
            !hasImage
              ? 'text-zinc-900 bg-transparent hover:bg-zinc-900/10 dark:text-white dark:hover:bg-zinc-100/10'
              : 'text-white bg-zinc-900/50 hover:bg-zinc-900/45'
          }`}
          onClick={async () => await updateIsPinned(uid, noteId)}
        >
          <PinIcon classname="h-4" />
        </Button>
      </div>
    </Tooltip>
  );
}
