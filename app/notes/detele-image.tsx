import { TrashIcon } from '@heroicons/react/24/outline';
import { ImageData } from '@/lib/types';
import { deleteImageFromStorage } from '@/lib/actions';
import TooltipWrap from '@/components/tooltip-wrap';

export default function DeleteImageFromStorage({
  imageUrl,
  onSetImageUpload,
}: {
  imageUrl: string;
  onSetImageUpload: (data: ImageData) => void;
}) {
  return (
    <TooltipWrap
      content="Remove"
      events={{
        onClick: async () => {
          // Delete image from storage
          await deleteImageFromStorage(imageUrl);

          // Reset image data
          onSetImageUpload({ src: '', altName: '' });
        },
      }}
      classnames="text-white backdrop-blur bg-zinc-900/50 hover:bg-zinc-900/60 dark:hover:bg-zinc-900/60"
    >
      <TrashIcon className="w-5" />
    </TooltipWrap>
  );
}
