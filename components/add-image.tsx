import { Button, Input, Tooltip } from '@nextui-org/react';
import GalleryIcon from './icons/gallery';

export default function AddImage({
  onUploadImageChange,
}: {
  onUploadImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onUploadImageChange(event)
        }
      />
      <GalleryIcon classname="h-5" />
    </label>
  );
}
