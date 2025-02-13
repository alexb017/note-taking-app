import { TrashIcon } from '@heroicons/react/24/outline';
import { ImageData } from '@/lib/types';
import { deleteImageFromStorage } from '@/lib/actions';
import TooltipWrap from '@/components/tooltip-wrap';
import { useToast } from '@/hooks/use-toast';

export default function DeleteImageFromStorage({
  imageUrl,
  onSetImageUpload,
}: {
  imageUrl: string;
  onSetImageUpload: (data: ImageData) => void;
}) {
  const { toast } = useToast();

  return (
    <TooltipWrap
      content="Remove"
      events={{
        onClick: async () => {
          // Delete image from storage
          await deleteImageFromStorage(imageUrl);

          // Reset image data
          onSetImageUpload({ src: '', altName: '' });

          // Show toast message
          toast({
            description: 'Image deleted',
          });
        },
      }}
      classnames="text-white backdrop-blur bg-zinc-900/50 hover:bg-zinc-900/60 dark:hover:bg-zinc-900/60"
    >
      <TrashIcon className="w-5" />
    </TooltipWrap>
  );
}
