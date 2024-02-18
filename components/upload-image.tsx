import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import GalleryIcon from './icons/gallery';
import { ImageData } from '@/lib/types';

export default function UploadImageToStorage({
  onHandleImageUpload,
  uid,
}: {
  onHandleImageUpload: (data: ImageData) => void;
  uid: string;
}) {
  return (
    <label className="flex items-center justify-center rounded-full w-8 h-8 hover:bg-gray-900/10 cursor-pointer">
      <input
        type="file"
        accept="image/*"
        onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
          // Get the file, with optional chaining to handle null
          const file = event.target.files?.[0];
          const filename = file?.name.split('.')[0] as string;
          const extension = file?.type.split('/')[1];

          if (!file) {
            return;
          }

          // Create a reference to the file to create
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `notes/${uid}/${Date.now()}.${extension}`
          );

          // Upload the file
          await uploadBytes(storageRef, file);

          // Get the download URL
          const url = await getDownloadURL(storageRef);

          onHandleImageUpload({ src: url, altName: filename });
        }}
      />
      <GalleryIcon classname="h-4" />
    </label>
  );
}
