import { TrashIcon } from '@heroicons/react/24/outline';
import { ImageData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getStorage, ref, deleteObject } from 'firebase/storage';

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
              // Get a reference to the file
              const storage = getStorage();
              const storageRef = ref(storage, imageUrl);

              // Delete the file
              await deleteObject(storageRef);

              // Handle image upload
              onSetImageUpload({ src: '', altName: '' });
            }}
            className="w-8 h-8 bg-zinc-900/50 backdrop-blur-lg hover:bg-zinc-900/60"
          >
            <TrashIcon className="h-4 w-4 text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Remove</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
