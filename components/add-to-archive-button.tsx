import { Button, Tooltip } from '@nextui-org/react';
import ArchiveIcon from './icons/archive';
import { updateIsArchived } from '@/lib/actions';
import UnarchiveIcon from './icons/unarchive';

export default function AddToArchiveButton({
  uid,
  noteId,
  isArchived,
}: {
  uid: string;
  noteId: string;
  isArchived: boolean;
}) {
  return (
    <>
      <Tooltip
        placement="bottom"
        radius="sm"
        size="sm"
        offset={0}
        delay={350}
        closeDelay={0}
        content={!isArchived ? 'Archive' : 'Unarchive'}
      >
        <div>
          <Button
            isIconOnly
            aria-label="archive"
            radius="full"
            className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-gray-900/10 dark:hover:bg-zinc-100/10"
            onPress={async () => await updateIsArchived(uid, noteId)}
          >
            {!isArchived ? (
              <ArchiveIcon classname="h-4" />
            ) : (
              <UnarchiveIcon classname="h-4" />
            )}
          </Button>
        </div>
      </Tooltip>
    </>
  );
}
