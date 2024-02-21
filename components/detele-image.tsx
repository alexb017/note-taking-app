import { Button, Tooltip } from '@nextui-org/react';
import TrashIcon from './icons/trash';
import { ImageData } from '@/lib/types';
import { deleteImageFromStorage } from '@/lib/utils';

export default function DeleteImageFromStorage({
  imageUrl,
  onHandleImageUpload,
}: {
  imageUrl: string;
  onHandleImageUpload: (data: ImageData) => void;
}) {
  return (
    <Tooltip
      placement="bottom"
      radius="sm"
      size="sm"
      offset={0}
      delay={350}
      content="Remove"
    >
      <div>
        <Button
          isIconOnly
          aria-label="delete-image"
          radius="sm"
          className="min-w-unit-8 w-unit-8 h-8 backdrop-blur-lg text-white bg-zinc-900/50 hover:bg-zinc-900/60"
          onClick={async () => {
            await deleteImageFromStorage(imageUrl);

            onHandleImageUpload({ src: '', altName: '' });
          }}
        >
          <TrashIcon classname="h-4" />
        </Button>
      </div>
    </Tooltip>
  );
}
