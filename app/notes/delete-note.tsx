import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteNote, deleteImageFromStorage } from '@/lib/actions';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
  Tooltip,
} from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function DeleteNoteButton({
  uid,
  noteId,
  imageURL,
}: {
  uid: string;
  noteId: string;
  imageURL?: string;
}) {
  const { toast } = useToast();

  return (
    <AlertDialog>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="p-0 w-[34px] h-[34px] [&_svg]:size-[18px] rounded-full bg-transparent shadow-none text-black/80 dark:text-white/80 hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
              >
                <TrashIcon className="w-5" />
              </Button>
            </TooltipTrigger>
          </AlertDialogTrigger>
          <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
            Delete forever
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent className="border-0 shadow-lg sm:rounded-xl dark:bg-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>Delete note forever?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-500 hover:bg-zinc-900/5 dark:hover:bg-zinc-100/5">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-blue-500 hover:text-blue-500 hover:bg-zinc-900/5 dark:hover:bg-zinc-100/5"
            onClick={async () => {
              await deleteNote(uid, noteId);

              if (imageURL) {
                await deleteImageFromStorage(imageURL);
              }

              toast({
                description: 'Note deleted',
              });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
