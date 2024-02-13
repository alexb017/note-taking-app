import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import GalleryIcon from './icons/gallery';

export default function ImageUpload({
  onUploadImage,
  uid,
}: {
  onUploadImage: (url: string) => void;
  uid: string;
}) {
  async function handleUploadImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    // Get the file, with optional chaining to handle null
    const file = event.target.files?.[0];
    const extension = file?.type.split('/')[1];

    if (!file) {
      return;
    }

    // Create a reference to the file to create
    const storage = getStorage();
    const storageRef = ref(storage, `notes/${uid}/${Date.now()}.${extension}`);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const url = await getDownloadURL(storageRef);

    onUploadImage(url);
  }

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
        onChange={handleUploadImageChange}
      />
      <GalleryIcon classname="h-5" />
    </label>
  );
}
