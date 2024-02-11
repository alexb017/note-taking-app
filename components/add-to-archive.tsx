import { Button, Tooltip, Checkbox } from '@nextui-org/react';
import ArchiveIcon from './icons/archive';

export default function AddToArchive({
  onArchiveNoteClick,
}: {
  onArchiveNoteClick: () => void;
}) {
  return (
    // <Button
    //   isIconOnly
    //   aria-label="archive"
    //   radius="full"
    //   className="bg-transparent hover:bg-gray-900/10"
    // >
    //   <ArchiveIcon classname="h-5" />
    // </Button>
    <Checkbox
      color="default"
      className="px-5"
      onClick={() => onArchiveNoteClick()}
    >
      Archive
    </Checkbox>
  );
}
