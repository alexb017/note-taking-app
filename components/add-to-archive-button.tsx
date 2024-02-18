import { Button } from '@nextui-org/react';
import ArchiveIcon from './icons/archive';
import { updateIsArchived } from '@/lib/actions';

export default function AddToArchiveButton({
  uid,
  noteId,
}: {
  uid: string;
  noteId: string;
}) {
  return (
    <Button
      isIconOnly
      aria-label="archive"
      radius="full"
      className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-gray-900/10 dark:hover:bg-zinc-100/10"
      onClick={async () => await updateIsArchived(uid, noteId)}
    >
      <ArchiveIcon classname="h-4" />
    </Button>
  );
}
