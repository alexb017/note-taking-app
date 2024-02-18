import { Button } from '@nextui-org/react';
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
    <Button
      isIconOnly
      aria-label="delete-image"
      radius="sm"
      className="min-w-unit-8 w-unit-8 h-8 text-white bg-zinc-900/40 hover:bg-zinc-900/35 dark:hover:bg-zinc-100/10"
      onClick={async () => {
        await deleteImageFromStorage(imageUrl);

        onHandleImageUpload({ src: '', altName: '' });
      }}
    >
      <TrashIcon classname="h-4" />
    </Button>
  );
}
