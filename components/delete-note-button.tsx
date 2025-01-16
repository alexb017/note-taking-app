import { Button, Tooltip } from '@nextui-org/react';
import TrashIcon from './icons/trash';
import { deleteNote } from '@/lib/actions';
import { deleteImageFromStorage } from '@/lib/utils';

export default function DeleteNoteButton({
  uid,
  noteId,
  imageURL,
}: {
  uid: string;
  noteId: string;
  imageURL?: string;
}) {
  return (
    <Tooltip
      placement="bottom"
      radius="sm"
      size="sm"
      offset={0}
      delay={350}
      closeDelay={0}
      content="Delete forever"
    >
      <div>
        <Button
          isIconOnly
          aria-label="color"
          radius="full"
          className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
          onPress={async () => {
            await deleteNote(uid, noteId);

            if (imageURL) {
              await deleteImageFromStorage(imageURL);
            }
          }}
        >
          <TrashIcon classname="h-4" />
        </Button>
      </div>
    </Tooltip>
  );
}
