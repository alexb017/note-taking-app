import { Button, Tooltip, Checkbox } from '@nextui-org/react';
import ArchiveIcon from './icons/archive';

export default function AddToArchive({
  isArchived,
  onArchiveNoteClick,
}: {
  isArchived: boolean;
  onArchiveNoteClick: () => void;
}) {
  return (
    <Button
      isIconOnly
      aria-label="archive"
      radius="full"
      className={`bg-transparent hover:bg-gray-900/10 ${
        isArchived ? 'text-white bg-gray-900 hover:bg-gray-900/90' : ''
      }`}
      onClick={() => onArchiveNoteClick()}
    >
      <ArchiveIcon classname="h-5" />
    </Button>
  );
}
