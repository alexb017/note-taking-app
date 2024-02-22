import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import GalleryIcon from './icons/gallery';
import { ImageData } from '@/lib/types';
import { Tooltip } from '@nextui-org/react';

export default function UploadImageToStorage({
  onHandleImageUpload,
  uid,
}: {
  onHandleImageUpload: (data: ImageData) => void;
  uid: string;
}) {
  return (
    <Tooltip
      placement="bottom"
      radius="sm"
      size="sm"
      offset={0}
      delay={350}
      closeDelay={0}
      content="Add image"
    >
      <div>
        <label className="flex items-center justify-center rounded-full w-8 h-8 hover:bg-zinc-900/10 cursor-pointer dark:hover:bg-zinc-100/10">
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
      </div>
    </Tooltip>
  );
}
