import { TrashIcon } from '@heroicons/react/24/outline';
import { ImageData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { deleteImageFromStorage } from '@/lib/actions';

export default function DeleteImageFromStorage({
  imageUrl,
  onSetImageUpload,
}: {
  imageUrl: string;
  onSetImageUpload: (data: ImageData) => void;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild className="p-0">
          <Button
            onClick={async () => {
              // Delete image from storage
              await deleteImageFromStorage(imageUrl);

              // Reset image data
              onSetImageUpload({ src: '', altName: '' });
            }}
            className="w-9 h-9 [&_svg]:size-5 bg-zinc-900/50 backdrop-blur-lg hover:bg-zinc-900/60"
          >
            <TrashIcon className="h-5 w-5 text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
          Remove
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
