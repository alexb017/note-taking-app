import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { ImageData } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export default function UploadImageToStorage({
  onSetImageUpload,
  uid,
}: {
  onSetImageUpload: (data: ImageData) => void;
  uid: string;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger
          asChild
          className="p-0 w-9 h-9 [&_svg]:size-5 rounded-full bg-transparent shadow-none hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
        >
          <Button
            onClick={() => {
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
            }}
          >
            <PhotoIcon className="w-5 h-5 text-black dark:text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
          Add image
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
