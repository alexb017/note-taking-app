import { Button } from '@nextui-org/react';
import TrashIcon from './icons/trash';
import { getStorage, ref, deleteObject } from 'firebase/storage';

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
      radius="sm"
      className="absolute right-1 bottom-1 z-10 min-w-unit-8 w-unit-8 h-8 text-white bg-gray-900/30 hover:bg-gray-900/35"
      onClick={async () => {
        // Create a reference to the file to delete
        const storage = getStorage();
        const storageRef = ref(storage, imageUrl);

        // Delete the file
        await deleteObject(storageRef);

        onHandleImageUpload({ src: '', altname: '' });
      }}
    >
      <TrashIcon classname="h-4" />
    </Button>
  );
}
