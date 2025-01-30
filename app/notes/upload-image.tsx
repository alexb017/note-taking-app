import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { ImageData } from '@/lib/types';
import TooltipWrap from '@/components/tooltip-wrap';

export default function UploadImageToStorage({
  onSetImageUpload,
  uid,
}: {
  onSetImageUpload: (data: ImageData) => void;
  uid: string;
}) {
  function handleUploadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      const filename = file?.name.split('.')[0] as string;
      const extension = file?.type.split('/')[1];

      if (!file) {
        return;
      }

      // Create a reference to the file
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `users/${uid}/${Date.now()}.${extension}`
      );

      // Upload file
      await uploadBytes(storageRef, file);

      // Get the download URL
      const url = await getDownloadURL(storageRef);

      // Handle image upload
      onSetImageUpload({ src: url, altName: filename });
    };
    input.click();
  }

  return (
    <TooltipWrap content="Add image" events={{ onClick: handleUploadImage }}>
      <PhotoIcon className="w-5" />
    </TooltipWrap>
  );
}
