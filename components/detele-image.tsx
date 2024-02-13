import { Button } from '@nextui-org/react';
import TrashIcon from './icons/trash';
import { deleteImageFromStorage } from '@/lib/utils';

type ImageData = {
  src: string;
  altname: string;
};

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
      radius="full"
      className="absolute right-1 bottom-1 z-10 text-white bg-gray-900/30 hover:bg-gray-900/35"
      onClick={async () => {
        await deleteImageFromStorage(imageUrl);
        onHandleImageUpload({ src: '', altname: '' });
      }}
    >
      <TrashIcon classname="h-5" />
    </Button>
  );
}
