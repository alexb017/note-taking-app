import { Button } from '@nextui-org/react';
import TrashIcon from './icons/trash';
import { getStorage, ref, deleteObject } from 'firebase/storage';

export default function RemoveImage({
  imageUrl,
  onHandleImageUpload,
}: {
  imageUrl: string;
  onHandleImageUpload: (url: string) => void;
}) {
  async function deleteImage(filename: string) {
    onHandleImageUpload('');

    // Create a reference to the file to delete
    const storage = getStorage();
    const storageRef = ref(storage, filename);

    // Delete the file
    await deleteObject(storageRef);
  }

  return (
    <Button
      isIconOnly
      aria-label="delete-image"
      radius="full"
      className="absolute right-1 bottom-1 z-10 text-white bg-gray-900/30 hover:bg-gray-900/35"
      onClick={async () => await deleteImage(imageUrl)}
    >
      <TrashIcon classname="h-5" />
    </Button>
  );
}
