import GalleryIcon from './icons/gallery';
import { uploadImageToStorage } from '@/lib/utils';

type ImageData = {
  src: string;
  altname: string;
};

export default function UploadImageToStorage({
  onHandleImageUpload,
  uid,
}: {
  onHandleImageUpload: (data: ImageData) => void;
  uid: string;
}) {
  return (
    <label
      htmlFor="image"
      className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-gray-900/10 cursor-pointer"
    >
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={async (e) => {
          const imageData = await uploadImageToStorage(e, uid);
          onHandleImageUpload(imageData as ImageData);
        }}
      />
      <GalleryIcon classname="h-5" />
    </label>
  );
}
