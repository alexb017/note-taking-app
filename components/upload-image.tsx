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
  onHandleImageUpload,
  uid,
}: {
  onHandleImageUpload: (data: ImageData) => void;
  uid: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
          className="w-8 h-8 rounded-full bg-transparent shadow-none hover:bg-zinc-900/10"
        >
          <Button
            onClick={() => {
              console.log('Upload image');
              console.log('uid', uid);
              // const input = document.createElement('input');
              // input.type = 'file';
              // input.accept = 'image/*';
              // input.onchange = async (e) => {
              //   const file = (e.target as HTMLInputElement).files?.[0];
              //   const filename = file?.name.split('.')[0] as string;
              //   const extension = file?.type.split('/')[1];

              //   if (!file) {
              //     return;
              //   }

              //   // Create a reference to the file
              //   const storage = getStorage();
              //   const storageRef = ref(
              //     storage,
              //     `notes/${uid}/${Date.now()}.${extension}`
              //   );

              //   // Upload file
              //   await uploadBytes(storageRef, file);

              //   // Get the download URL
              //   const url = await getDownloadURL(storageRef);

              //   // Handle image upload
              //   onHandleImageUpload({ src: url, altName: filename });
              // };
              // input.click();
            }}
          >
            <PhotoIcon className="w-4 h-4 text-gray-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add image</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
